import useDebounce from "@/hooks/useDebounce";
import { useGetUsersQuery } from "@/redux/features/user/userApi";
import { IUser, UserRole } from "@/types/common";
import { Avatar, Button, TableProps } from "antd";
import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import config from "@/utils/config";
import { useEditCurrencyMutation } from "@/redux/features/currency/currencyApi";
import AppInput from "@/components/ui/AppInput";
import { LuCircleDollarSign } from "react-icons/lu";
import AppTable from "@/components/ui/AppTable";
import TableLoading from "@/components/shared/TableLoading";
import SuperAdminLayout from "@/layout/SuperAdminLayout";
import AdminsLayout from "@/layout/AdminsLayout";

const TopUpToUser = () => {
  const [search, setSearch] = useState<string>("");
  const [amount, setAmount] = useState(0);
  const [editCurrency, { isLoading: isEditLoading }] =
    useEditCurrencyMutation();
  const [page, setPage] = useState<number>(1);
  const debouncedSearch = useDebounce(search, 500);

  const queryString = useMemo(() => {
    const info = {
      role: UserRole.User,
      page,
      limit: 50,
      searchTerm: debouncedSearch.length ? debouncedSearch : undefined
    };
    const queryString = Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value) {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
      }
      return pre;
    }, "");
    return queryString;
  }, [debouncedSearch, page]);

  const queryInfo = useGetUsersQuery(queryString);

  const handleTopup = (userId: string) => {
    if (!amount) {
      toast.error("Please enter amount to Topup");
      return;
    }
    if (amount > config.topupMax) {
      toast.error(`Maximum topup can be ${config.topupMax}`);
      return;
    }
    editCurrency({ amount, id: userId })
      .unwrap()
      .then((res) => {
        if (res.message) {
          toast.success(res.message || "success");
        }
      })
      .catch((err: any) => {
        toast.error(err?.data?.message || "something went wrong");
      });
  };

  const columns: TableProps<IUser>["columns"] = [
    {
      title: "Name",
      dataIndex: "profileImg",
      key: "id",
      className: "text-sm lg:text-base",
      render: (profileImg, data) => {
        return (
          <div className="flex items-center gap-1">
            <Avatar src={profileImg}></Avatar>
            <p className="capitalize">{data?.name}</p>
          </div>
        );
      }
    },
    {
      title: "Email",
      dataIndex: "email",
      className: "text-sm lg:text-base",
      key: "id"
    },
    {
      title: "Currency",
      dataIndex: "Currency",
      key: "id",
      className: "text-sm lg:text-base",
      render: (currency) => {
        return <span>{currency?.amount}</span>;
      }
    },

    {
      title: "Action",
      className: "text-sm lg:text-base",
      key: "action",
      render: (_, record) => (
        <div className="px-2 py-3 flex items-center justify-center gap-2 ">
          <Button
            disabled={isEditLoading}
            onClick={() => handleTopup(record.id)}
            type="primary"
            className="bg-orange-500 hover:!bg-orange-600"
          >
            Top up {amount ? "$" + amount : ""}
          </Button>
        </div>
      )
    }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <AdminsLayout roles={[UserRole.SuperAdmin, UserRole.FinanceAdmin]}>
      <h2 className="title text-center mb-5">Topup users</h2>

      <div className="flex flex-col md:flex-row items-center gap-4 my-5 md:my-10 justify-between">
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 md:gap-5">
          <AppInput
            type="text"
            onChange={handleSearchChange}
            value={search}
            placeholder="Search by name or email "
            className="min-w-60 2xl:!py-2"
          />

          <AppInput
            type="number"
            onChange={(e) => {
              setAmount(parseFloat(e.target.value));
              // if (parseFloat(e.target.value) >= 0) {
              //   setAmount((pre) => {
              //     if (parseFloat(e.target.value) < config.topupMax) {
              //       return parseFloat(e.target.value);
              //     } else {
              //       return pre;
              //     }
              //   });
              // }
            }}
            value={amount}
            placeholder="Enter Topup amount"
            className="min-w-60 2xl:!py-2"
            icon={<LuCircleDollarSign />}
          />
        </div>

        <button
          className="appBtn"
          onClick={() => {
            setSearch("");
          }}
        >
          Reset
        </button>
      </div>

      <div className="max-h-[70dvh] overflow-auto">
        <AppTable
          infoQuery={queryInfo}
          columns={columns}
          setPage={setPage}
          loadingComponent={<TableLoading columnNumber={columns.length} />}
        />
      </div>
    </AdminsLayout>
  );
};

export default TopUpToUser;

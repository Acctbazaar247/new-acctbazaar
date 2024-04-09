"use client";
import ErrorCompo from "@/components/ui/AppErrorComponent";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import Loading from "@/components/ui/Loading";
import ManageAllUserTable from "@/components/ManageAllUserTable/ManageAllUserTable";
import ManageAllUserTableSingleRow from "@/components/ManageAllUserTable/ManageAllUserTableSingleRow";
import useDebounce from "@/hooks/useDebounce";
import AdminLayout from "@/layout/AdminLayout";
import { useEditCartMutation } from "@/redux/features/cart/cartApi";
import { useGetUsersQuery } from "@/redux/features/user/userApi";
import { IUser, UserRole } from "@/types/common";
import { optionCreator } from "@/utils";
import {
  Avatar,
  Button,
  Input,
  Pagination,
  TableColumnGroupType,
  TableProps,
} from "antd";
import Search from "antd/es/input/Search";
import React, { useState, useMemo } from "react";
import { useStore } from "react-redux";
import { toast } from "react-toastify";
import { Table, TableColumnType } from "antd";
import config from "@/utils/config";
import { useEditCurrencyMutation } from "@/redux/features/currency/currencyApi";

type Props = {};

const TopUpToUser = (props: Props) => {
  const defaultValue = { value: "", label: "" };
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
      searchTerm: debouncedSearch.length ? debouncedSearch : undefined,
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
  const { data, isError, isLoading, isFetching, isSuccess, error } =
    useGetUsersQuery(queryString);

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

  let content: any = null;

  const columns: TableProps<IUser>["columns"] = [
    {
      title: "Avatar",
      dataIndex: "profileImg",
      key: "id",
      className: "text-[12px] lg:text-md",
      render: (profileImg, data) => {
        return (
          <div>
            <Avatar src={profileImg}></Avatar>
          </div>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, current) => {
        return <div>{_}</div>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "id",
    },
    {
      title: "Currency",
      dataIndex: "Currency",
      key: "id",
      className: "text-[12px] lg:text-md",

      render: (currency) => {
        return <span>{currency?.amount}</span>;
      },
    },

    {
      title: "Action",
      className: "text-[12px] lg:text-md",

      key: "action",
      render: (_, record) => (
        <div className="px-2 py-3 flex flex-nowrap gap-2 ">
          <Button
            disabled={isEditLoading}
            onClick={() => handleTopup(record.id)}
            type="primary"
            className="bg-orange-500 hover:!bg-orange-600"
          >
            Top up {amount ? "$" + amount : ""}
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading || isFetching) {
    content = <Loading></Loading>;
  } else if (isError) {
    content = <ErrorCompo></ErrorCompo>;
  } else if (isSuccess && data.data.length) {
    const info = data.data as IUser[];
    content = (
      <div>
        <div className="overflow-x-scroll md:overflow-clip">
          <Table dataSource={info} pagination={false} columns={columns}>
            {" "}
          </Table>
        </div>
        <div className="flex justify-center  mt-4">
          <Pagination
            showSizeChanger={false}
            pageSize={data.meta.limit}
            total={data.meta.total}
            current={data.meta.page}
            onChange={(value) => {
              setPage(value);
            }}
          ></Pagination>
        </div>
      </div>
    );
  } else {
    content = <ErrorCompo error="Data not found!"></ErrorCompo>;
  }
  const roleOption = Object.values(UserRole).map(optionCreator);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <AdminLayout>
      <div>
        <h2 className="text-xl text-center font-bold mb-5">Topup users</h2>
        <div className="mt-5 mb-10">
          <h2 className="mb-2">Filter </h2>
          <div className="flex border-b pb-5 flex-col md:flex-row items-center gap-4  justify-between">
            <div className="flex gap-4">
              <Input
                className="max-w-[300px] h-[45px] text-md w-full inline-block"
                type="search"
                name="search"
                onChange={handleSearchChange}
                placeholder="Search by name or email "
                value={search}
              />
            </div>
            <div>
              <button
                className="px-4 py-2 bg-blue-500 text-white leading-0 rounded"
                onClick={() => {
                  setSearch("");
                }}
              >
                Reset
              </button>
            </div>
          </div>
          <div>
            <h2 className="my-3">Amount to Topup</h2>
            <Input
              placeholder="Enter amount"
              type="number"
              onChange={(e) => {
                setAmount((pre) => {
                  if (parseFloat(e.target.value) < config.topupMax) {
                    return parseFloat(e.target.value);
                  } else {
                    return pre;
                  }
                });
              }}
              className="h-[45px] max-w-[250px]"
              name="amount"
            ></Input>
          </div>
        </div>
        {content}
      </div>
    </AdminLayout>
  );
};

export default TopUpToUser;

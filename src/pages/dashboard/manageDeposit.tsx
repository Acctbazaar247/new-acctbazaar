import AppInput from "@/components/ui/AppInput";
import AppTable from "@/components/ui/AppTable";
import AdminsLayout from "@/layout/AdminsLayout";
import { useGetCurrencyQuery } from "@/redux/features/currency/currencyApi";
import { UserRole } from "@/types/common";
import { formatDate } from "@/utils/formateDate";
import React, { useMemo, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { useGetCurrencyRequestsQuery } from "@/redux/features/currencyRequest/currencyRequestApi";
type Props = {};

const ManageDeposit = (props: Props) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const queryString = useMemo(() => {
    const info = {
      page,
      id: searchTerm,
      limit: 30
    };
    const queryString = Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value) {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
      }
      return pre;
    }, "");
    return queryString;
  }, [page, searchTerm]);

  const columns = [
    {
      title: "Id",
      dataIndex: "id"
    },
    {
      title: "orderBy",
      dataIndex: "ownBy",
      className: "min-w-[150px]",
      render: (ownBy: any, record: any) => {
        return (
          <div className="flex items-center gap-1">
            <Image
              src={ownBy?.profileImg}
              alt=""
              width={40}
              height={40}
              className="rounded-full size-8"
            />
            <div className="text-dark-grey">
              <h3 className="">{ownBy?.name}</h3>
              <h3 className="">{ownBy?.email}</h3>
            </div>
          </div>
        );
      }
    },
    {
      title: "Amount",
      dataIndex: "amount",
      className: "min-w-[145px]",
      render: (amount: string) => (
        <div className="pl-4 flex items-center gap-1">
          <FaDollarSign />
          {amount}
        </div>
      )
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      className: "min-w-[100px]",
      render: (createdAt: string) => (
        <div className="pl-4 flex items-center gap-1">
          {formatDate(createdAt)}
        </div>
      )
    },
    {
      title: "Status",
      dataIndex: "status",
      className: "min-w-[100px]",

      render: (status: string, record: any) => {
        return (
          <p
            className={cn(
              "flex items-center w-fit text-sm gap-1 px-3 py-1 capitalize rounded-full",
              status === "pending" && "bg-yellow-400 text-black",
              status === "approved" && "bg-green-800 text-white",
              status === "denied" && "bg-rose-900 text-white"
            )}
          >
            {status}
          </p>
        );
      }
    }
  ];

  const transactionsQuery = useGetCurrencyRequestsQuery(queryString);
  return (
    <AdminsLayout
      roles={[
        UserRole.SuperAdmin,
        UserRole.Admin,
        UserRole.FinanceAdmin,
        UserRole.CCAdmin
      ]}
    >
      <h1 className="heading pb-10">Transactions</h1>
      <AppInput
        placeholder="Search By ID"
        type="text"
        value={searchTerm}
        icon={<IoSearch />}
        onChange={(e) => setSearchTerm(e?.target?.value)}
      />
      <div className="h-[65dvh] overflow-auto">
        <AppTable
          setPage={setPage}
          columns={columns}
          infoQuery={transactionsQuery}
        />
      </div>
    </AdminsLayout>
  );
};

export default ManageDeposit;

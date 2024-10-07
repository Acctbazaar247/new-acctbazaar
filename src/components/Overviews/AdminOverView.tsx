import useIsMobile from "@/hooks/useIsMobile";
import SuperAdminLayout from "@/layout/SuperAdminLayout";
import {
  useDeleteAccountMutation,
  useEditAccountMutation,
  useGetAccountsQuery,
} from "@/redux/features/account/accountApi";
import { useGetAdminOverviewQuery } from "@/redux/features/user/userApi";
import { EApprovedForSale, IAccount, IUser } from "@/types/common";
import { optionCreator } from "@/utils";
import { Avatar, Button, Popconfirm } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useMemo, useState } from "react";
import AccountDeniedFrom from "../Forms/AccountDeniedFrom";
import TableLoading from "../shared/TableLoading";
import AppTable from "../ui/AppTable";
import Loading from "../ui/Loading";

type DataType = {} & IAccount;

const AdminOverView = () => {
  const { data: adminOverviewInfo, isLoading: isAdminOverviewLoading } =
    useGetAdminOverviewQuery("");
  const [page, setPage] = useState<number>(1);
  const [deleteService] = useDeleteAccountMutation();
  const [editService] = useEditAccountMutation();
  const isMobile = useIsMobile();
  const approvedStatusOption =
    Object.values(EApprovedForSale).map(optionCreator);

  const queryString = useMemo(() => {
    const info = {
      page,
      limit: 50,
    };
    const queryString = Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value) {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
      }
      return pre;
    }, "");
    return queryString;
  }, [page]);

  const queryInfo = useGetAccountsQuery(queryString);

  const info = [
    {
      title: "Total Account",
      to: "/dashboard/allService",
      value: adminOverviewInfo?.data?.totalAccount,
    },
    {
      title: "Sold Account",
      to: "/dashboard/allService",
      value: adminOverviewInfo?.data?.totalSoldAccount,
    },
    {
      title: "User",
      to: "/dashboard/manageAllUser",
      value: adminOverviewInfo?.data?.totalUser,
    },
    {
      title: "Earning",
      to: "/dashboard",
      value: "$" + adminOverviewInfo?.data?.totalEarning?.toFixed(2),
    },
    {
      title: "Total user amount",
      to: "/dashboard",
      value: "$" + adminOverviewInfo?.data?.totalUserAmount?.toFixed(2),
    },
    {
      title: "Total seller amount",
      to: "/dashboard",
      value: "$" + adminOverviewInfo?.data?.totalSellerAmount?.toFixed(2),
    },
  ];

  if (isAdminOverviewLoading) {
    return <Loading></Loading>;
  }

  const approveButton = (id: string) => {
    return (
      <button
        className="app-status-button text-xs lg:text-sm bg-green-600"
        onClick={() => {
          editService({
            id,
            approvedForSale: EApprovedForSale.approved,
            messageFromAdmin: "",
          });
        }}
      >
        Approve
      </button>
    );
  };

  const pendingButton = (id: string) => {
    return (
      <button
        className="app-status-button text-xs lg:text-sm bg-blue-600"
        onClick={() => {
          editService({ id, approvedForSale: EApprovedForSale.pending });
        }}
      >
        Pending
      </button>
    );
  };

  const deniedButton = (id: string) => {
    return (
      <AccountDeniedFrom
        handleEdit={(info) => {
          editService({
            id,
            approvedForSale: EApprovedForSale.denied,
            messageFromAdmin: info.message,
          });
        }}
      ></AccountDeniedFrom>
    );
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      className: "text-sm lg:text-base",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, current) => {
        return (
          <div>
            {current.preview ? (
              <Link
                target="_blank"
                href={current.preview}
                className="hover:underline underline text-sm lg:text-base"
              >
                {current.name}
              </Link>
            ) : (
              <p className="text-sm lg:text-base">{current.name}</p>
            )}
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      className: "text-sm lg:text-base",

      render: (price) => {
        return <span>${price}</span>;
      },
    },

    {
      title: "Owner",
      dataIndex: "ownBy",
      key: "ownBy",
      className: "text-sm lg:text-base",

      render: (ownBy: IUser) => {
        return (
          <div className="flex gap-2 items-center">
            <Avatar src={ownBy?.profileImg}></Avatar>
            <div>
              <span className=" text-xs lg:text-sm capitalize">
                {ownBy.name}
              </span>
              <p className="text-xs">{ownBy.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "approvedForSale",
      key: "approvedForSale",
      className: "text-sm lg:text-base",

      render: (current, record) => {
        return (
          <div className="flex gap-2 items-center">
            <div className="w-[120px] capitalize ">
              {record.isSold ? (
                <p className="font-bold text-center">Sold</p>
              ) : (
                <div>
                  <div className="flex items-center justify-center">
                    <span className="border text-xs rounded-full py-0.5 px-2">
                      {current}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {current === EApprovedForSale.pending ? (
                      <>
                        {approveButton(record.id)}
                        {deniedButton(record.id)}
                      </>
                    ) : current === EApprovedForSale.approved ? (
                      <>
                        {pendingButton(record.id)}
                        {deniedButton(record.id)}
                      </>
                    ) : (
                      <>
                        {approveButton(record.id)}
                        {pendingButton(record.id)}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      },
    },
    {
      title: "Action",
      className: "text-sm lg:text-base",

      key: "action",
      render: (_, record) => (
        <div className="px-2 py-3 flex flex-nowrap gap-2 ">
          {record.isSold ? null : (
            <>
              <Link href={`/dashboard/editService/${record.id}`}>
                <Button className=" px-5">Edit</Button>
              </Link>
              <Popconfirm
                title="Are your Sure to delete this faq?"
                placement="leftTop"
                onConfirm={() => deleteService(record.id)}
                okButtonProps={{
                  className: "!border !border-blue-300 text-blue-500",
                }}
              >
                <Button danger>Delete</Button>
              </Popconfirm>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <SuperAdminLayout>
      <div className="grid lg:grid-cols-3 grid-cols-2 gap-2 md:gap-8 pb-10">
        {info.map((single) => (
          <div
            key={single.title}
            className="overflow-hidden shadow py-5 relative rounded-md lg:rounded-xl border "
          >
            <div className="relative z-30">
              <p className="uppercase text-orange-500 text-sm md:text-lg font-semibold lg:text-xl  text-center ">
                {single.title}
              </p>
              <div className="text-center text-xl md:text-2xl font-bold mt-3 ">
                {single.value}
              </div>
            </div>
            <div className="absolute inset-0 backdrop-blur-md"></div>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold mb-6 ">Manage Accounts</h2>

      <div className="max-h-[45dvh] overflow-auto">
        <AppTable
          infoQuery={queryInfo}
          columns={columns}
          setPage={setPage}
          loadingComponent={<TableLoading columnNumber={columns.length} />}
        />
      </div>
    </SuperAdminLayout>
  );
};

export default AdminOverView;

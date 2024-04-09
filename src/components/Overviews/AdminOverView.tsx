// import { useGetBookingsQuery } from "@/redux/features/booking/bookingApi";
// import { useGetFaqsQuery } from "@/redux/features/faq/faqApi";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import Loading from "../ui/Loading";
// import { useGetFeedbacksQuery } from "@/redux/features/feedback/feedbackApi";
import {
  Booking,
  EApprovedForSale,
  IAccount,
  IAdminOverViewStatus,
  IFaq,
  IFeedback,
  IUser,
} from "@/types/common";
import ErrorCompo from "../ui/AppErrorComponent";
import { Avatar, Button, Pagination, Popconfirm, Table } from "antd";
import Link from "next/link";
import {
  useDeleteAccountMutation,
  useEditAccountMutation,
  useGetAccountsQuery,
} from "@/redux/features/account/accountApi";
import useDebounce from "@/hooks/useDebounce";
import FormSelectField, { SelectOptions } from "../Forms/FormSelectField";
import { ColumnsType } from "antd/es/table";
import Form from "../Forms/Form";
import { optionCreator } from "@/utils";
import useIsMobile from "@/hooks/useIsMobile";
import { useGetAdminOverviewQuery } from "@/redux/features/user/userApi";
// import BarChart from "../charts/BarChart";
// import { useGetPcServiceOverviewQuery } from "@/redux/features/pcService/pcServiceApi";
// import PieChart from "../charts/PieChart";
// import Donut from "../charts/Donut";

type Props = {};

const AdminOverView = (props: Props) => {
  // const { data, isLoading } = useGetPcServiceOverviewQuery("");

  const router = useRouter();
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
      // approvedForSale: "pending",
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
  const { data, isFetching, isLoading, isError } =
    useGetAccountsQuery(queryString);
  let content = null;

  const columns: ColumnsType<IAccount> = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      className: "text-[12px] lg:text-md",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "text-[12px] lg:text-md",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      className: "text-[12px] lg:text-md",

      render: (price) => {
        return <span>{price}$</span>;
      },
    },

    {
      title: "Owner",
      dataIndex: "ownBy",
      key: "ownBy",
      render: (ownBy: IUser) => {
        return (
          <div className="flex gap-2 items-center">
            <Avatar src={ownBy?.profileImg}></Avatar>
            <div>
              <span className="font-bold capitalize">{ownBy.name}</span>
              <p className="text-xs">{ownBy.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Approved Status",
      dataIndex: "approvedForSale",
      key: "approvedForSale",
      className: "text-[12px] lg:text-md",

      render: (status, record) => {
        return (
          <div className="flex gap-2 items-center">
            <div className="lg:w-[120px] ">
              {record.isSold ? (
                <p className="font-bold">Sold</p>
              ) : isMobile ? (
                <p>{status}</p>
              ) : (
                <Form submitHandler={() => {}}>
                  <FormSelectField
                    name="approvedForSale"
                    handleChange={(ele) => {
                      editService({ id: record.id, approvedForSale: ele });
                    }}
                    placeholder="Filter By Approved status"
                    options={approvedStatusOption}
                    value={record.approvedForSale}
                  ></FormSelectField>
                </Form>
              )}
            </div>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="px-2 py-3 flex gap-2 flex-nowrap ">
          {record.isSold ? null : (
            <>
              <Link className="" href={`/dashboard/editService/${record.id}`}>
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

  // is on mobile

  if (isMobile) {
    columns.splice(3, 1);
    columns.splice(4, 1);
  }
  if (isFetching || isAdminOverviewLoading || isLoading) {
    content = <Loading></Loading>;
  } else if (isError) {
    content = <ErrorCompo></ErrorCompo>;
  } else if (data?.data.length) {
    content = (
      <div>
        <div className=" ">
          <Table
            size={isMobile ? "small" : "middle"}
            pagination={false}
            columns={columns}
            dataSource={data.data}
          />
        </div>
        <div className="flex justify-center mt-5">
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
    content = (
      <div>
        <h2 className="text-center capitalize">No account found!</h2>
      </div>
    );
  }
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
  return (
    <div>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 md:gap-10 pb-10">
        {info.map((single) => (
          <div
            key={single.title}
            className="cursor-pointer overflow-hidden shadow py-5 relative rounded-md lg:rounded-xl border "
          >
            <div className="relative z-30">
              <p className="uppercase text-orange-500 text-md  text-center ">
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
      <h2 className="text-xl font-bold mb-10 ">Manage Accounts</h2>
      <div className="overflow-x-auto min-h-screen">{content}</div>
    </div>
  );
};

export default AdminOverView;

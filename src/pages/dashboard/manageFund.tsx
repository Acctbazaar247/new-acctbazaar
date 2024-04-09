import ErrorCompo from "@/components/ui/AppErrorComponent";
import { SelectOptions } from "@/components/Forms/FormSelectField";
import Loading from "@/components/ui/Loading";
import ManageFundDetailsModal from "@/components/ManageFundDetailsModal/ManageFundDetailsModal";
import useIsMobile from "@/hooks/useIsMobile";
import AdminLayout from "@/layout/AdminLayout";
import SuperAdminLayout from "@/layout/SuperAdminLayout";
import {
  useEditWithdrawFundMutation,
  useGetWithdrawFundsQuery,
} from "@/redux/features/withdrawFund/withdrawFundApi";
import {
  EApprovedForSale,
  EStatusOfWithdrawalRequest,
  IUser,
  IWithdrawalRequest,
} from "@/types/common";
import { optionCreator } from "@/utils";
import { Avatar, Pagination, Popconfirm, TableColumnsType, Table } from "antd";
import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
type Props = {};

const ManageFund = (props: Props) => {
  const [page, setPage] = useState<number>(1);
  const [editWithdrawFund, { isLoading: isEditLoading }] =
    useEditWithdrawFundMutation();
  const defaultValue = { value: "", label: "" }; // 500ms debounce delay
  const isMobile = useIsMobile();
  const [approvedForSale, setApprovedForSale] =
    useState<SelectOptions>(defaultValue);
  const queryString = useMemo(() => {
    const info = {
      page,
      limit: 50,
      approvedForSale: approvedForSale.value.length
        ? approvedForSale.value
        : undefined,
    };
    const queryString = Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value) {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
      }
      return pre;
    }, "");
    return queryString;
  }, [page, approvedForSale]);
  const { data, isFetching, isLoading, isError } =
    useGetWithdrawFundsQuery(queryString);
  let content = null;

  const columns: TableColumnsType<IWithdrawalRequest> = [
    {
      title: "Amount",
      dataIndex: "amount",
      //   key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      className: "capitalize",
      //   key: "age",
    },
    {
      title: "Payment type",
      dataIndex: "walletAddress",
      className: "capitalize",
      render: (current, fullData) => {
        return (
          <div>
            <ManageFundDetailsModal {...fullData}></ManageFundDetailsModal>
          </div>
        );
      },
      //   key: "age",
    },
    {
      title: "Owner",
      dataIndex: "ownBy",
      key: "ownBy",
      className: "text-[12px] lg:text-md",

      render: (ownBy: IUser) => {
        return (
          <div className="flex gap-2 items-center">
            <Avatar src={ownBy?.profileImg}></Avatar>
            <div>
              <span className="font-bold capitalize">{ownBy?.name}</span>
              <p className="text-xs">{ownBy?.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Requested Date",
      dataIndex: "createdAt",
      //   key: "date",
      render: (current) => {
        return <span>{new Date(current).toDateString()}</span>;
      },
    },

    {
      title: "Status",
      dataIndex: "approvedForSale",
      key: "approvedForSale",
      className: "text-[12px] lg:text-md",
      render: (_, record) => {
        return (
          <div className="flex gap-2 items-center">
            <div className="w-[120px] ">
              {record.status == EStatusOfWithdrawalRequest.pending ? (
                <div className="flex gap-2">
                  <Popconfirm
                    className="max-w-[100px]"
                    onConfirm={() => {
                      editWithdrawFund({
                        id: record.id,
                        status: EStatusOfWithdrawalRequest.approved,
                      })
                        .unwrap()
                        .then((res: any) => {
                          if (res.error) {
                            toast.error("Something went wrong");
                          } else {
                            toast.success("Successfully approve");
                          }
                        })
                        .catch(() => {
                          toast.error("something went wrong");
                        });
                    }}
                    okButtonProps={{
                      className:
                        "border-orange-500 text-orange-500 hover:text-white hover:!bg-orange-500",
                    }}
                    title="Are you sure to change the status to approve!"
                  >
                    <button className="border rounded px-3 py-1 border-green-500 text-green-500">
                      Approve
                    </button>
                  </Popconfirm>
                  <Popconfirm
                    okButtonProps={{
                      className:
                        "border-orange-500 text-orange-500 hover:text-white hover:!bg-orange-500",
                    }}
                    onConfirm={() => {
                      editWithdrawFund({
                        id: record.id,
                        status: EStatusOfWithdrawalRequest.denied,
                      })
                        .unwrap()
                        .then((res: any) => {
                          if (res.error) {
                            toast.error("Something went wrong");
                          } else {
                            toast.success("Successfully denied");
                          }
                        })
                        .catch(() => {
                          toast.error("something went wrong");
                        });
                    }}
                    title="Are you sure to change the status to denied"
                  >
                    <button className="border rounded px-3 py-1 bg-red-500 text-white ">
                      Denied
                    </button>
                  </Popconfirm>
                </div>
              ) : (
                <p className="font-bold capitalize">{record.status}</p>
              )}
            </div>
          </div>
        );
      },
    },
    // {
    //   title: "Action",
    //   className: "text-[12px] lg:text-md",
    //   key: "action",
    //   render: (_, record) => (
    //     <div className="px-2 py-3 flex flex-nowrap gap-2 ">
    //       {record.isSold ? null : (
    //         <>
    //           <Link href={`/dashboard/editService/${record.id}`}>
    //             <Button className=" px-5">Edit</Button>
    //           </Link>
    //           <Popconfirm
    //             title="Are your Sure to delete this faq?"
    //             placement="leftTop"
    //             onConfirm={() => deleteService(record.id)}
    //             okButtonProps={{
    //               className: "!border !border-blue-300 text-blue-500",
    //             }}
    //           >
    //             <Button danger>Delete</Button>
    //           </Popconfirm>
    //         </>
    //       )}
    //     </div>
    //   ),
    // },
  ];
  if (isMobile) {
    columns?.splice(3, 1);
  }
  if (isFetching || isLoading) {
    content = <Loading></Loading>;
  } else if (isError) {
    content = <ErrorCompo></ErrorCompo>;
  } else if (data?.data.length) {
    content = (
      <div className="overflow-x-auto overflow-y-clip">
        <div className=" ">
          <Table
            key={"id"}
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
        <h2 className="text-center capitalize">No request found!</h2>
      </div>
    );
  }
  const approvedStatusOption =
    Object.values(EApprovedForSale).map(optionCreator);

  const handleApprovedChange = (el: string) => {
    setApprovedForSale({ value: el, label: el });
  };
  return (
    <AdminLayout>
      <h2 className="text-center text-xl font-bold mb-5">Manage Fund</h2>
      <div className="">{content}</div>
    </AdminLayout>
  );
};

export default ManageFund;

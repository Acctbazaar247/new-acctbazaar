import useDebounce from "@/hooks/useDebounce";
import SuperAdminLayout from "@/layout/SuperAdminLayout";
import {
  EOrderStatus,
  IUser,
  ResponseSuccessType,
  UserRole,
} from "@/types/common";
import React, { useState, useMemo } from "react";
import AppTable from "@/components/ui/AppTable";
import AppModal from "@/components/ui/AppModal";
import { formatDate } from "@/utils/formateDate";
import {
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from "@/redux/features/order/orderApi";
import AppPopover from "@/components/ui/AppPopover";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-toastify";
import TableLoading from "@/components/shared/TableLoading";
import AppInput from "@/components/ui/AppInput";
import AdminsLayout from "@/layout/AdminsLayout";
import { Avatar } from "antd";

const ManageAllOrder = () => {
  const [orderId, setOrderId] = useState<string>("");
  const [buyerEmail, setBuyerEmail] = useState<string>("");
  const [sellerEmail, setSellerEmail] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const debouncedBuyerEmail = useDebounce(buyerEmail, 500);
  const debouncedSellerEmail = useDebounce(sellerEmail, 500);
  const debouncedOrderId = useDebounce(orderId, 500);

  const [updateOrder] = useUpdateOrderMutation();

  const statusOptions = [
    {
      status: EOrderStatus.PENDING,
    },
    {
      status: EOrderStatus.COMPLETED,
    },
    {
      status: EOrderStatus.CANCELLED,
    },
  ];

  const handleStatusUpdate = async (status: string, id: string) => {
    const updateData = {
      id,
      status,
    };
    await updateOrder(updateData)
      .unwrap()
      .then((res: ResponseSuccessType) => {
        if (!res.success) {
          return toast.error(
            res?.data.message || "Order updated unsuccessful!",
            { toastId: 1 }
          );
        }
        toast.success("Order updated successful!", { toastId: 1 });
      })
      .catch((res: any) => {
        return toast.error(res?.data.message || "Something went wrong!", {
          toastId: 1,
        });
      });
  };

  const queryString = useMemo(() => {
    const info = {
      page,
      limit: 50,
      id: debouncedOrderId.length ? debouncedOrderId : undefined,
      buyerEmail: debouncedBuyerEmail.length ? debouncedBuyerEmail : undefined,
      sellerEmail: debouncedSellerEmail.length
        ? debouncedSellerEmail
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
  }, [debouncedBuyerEmail, debouncedOrderId, debouncedSellerEmail, page]);

  const queryInfo = useGetOrdersQuery(queryString);

  const handleBuyerEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuyerEmail(e.target.value);
  };

  const handleSellerEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellerEmail(e.target.value);
  };

  const handleOrderIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderId(e.target.value);
  };

  const columns = [
    {
      title: "Account Name",
      dataIndex: "account",
      className: "min-w-[150px]",
      render: (account: any, record: any) => {
        return <p className="line-clamp-1  text-base">{account?.name}</p>;
      },
    },
    {
      title: "Price",
      dataIndex: "account",
      className: "min-w-[105px]",
      render: (account: any) => {
        return (
          <p className="line-clamp-1 max-w-[30dvw] text-base">
            {account?.price}
          </p>
        );
      },
    },
    {
      title: "Account Category",
      dataIndex: "account",
      className: "min-w-[105px]",
      render: (account: any) => {
        return <p className="line-clamp-1 text-base">{account?.category}</p>;
      },
    },
    {
      title: "Account Type",
      dataIndex: "account",
      className: "min-w-[105px]",
      render: (account: any) => {
        return (
          <p className="line-clamp-1  text-base">{account?.accountType}</p>
        );
      },
    },
    {
      title: "Order By",
      dataIndex: "orderBy",
      className: "min-w-[105px]",
      render: (orderBy: IUser) => {
        return (
          <div>
            <div className="flex items-center gap-2 text-base">
              <Avatar
                src={orderBy?.profileImg}
                alt="profile Image"
                className="rounded-full object-cover size-9"
              />
              <div>
                <p className="line-clamp-1">{orderBy?.name}</p>
                <p>{orderBy.email}</p>
                <p className="text-xs">#{orderBy.id}</p>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Seller ",
      dataIndex: "account",
      className: "min-w-[105px]",
      render: ({ ownBy }: { ownBy: IUser }) => {
        console.log(ownBy);
        return (
          <div>
            <div className="flex items-center gap-2 text-base">
              <Avatar
                src={ownBy?.profileImg}
                alt="profile Image"
                className="rounded-full object-cover size-9"
              />
              <div>
                <p className="line-clamp-1">{ownBy?.name}</p>
                <p>{ownBy?.email}</p>
                <p className="text-xs">#{ownBy?.id}</p>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      className: "min-w-[115px]",
      render: (date: string) => {
        return <p className="line-clamp-1">{formatDate(date)}</p>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      className: "min-w-[85px]",
      render: (action: any, record: any) => {
        return (
          <div className="flex items-center gap-2">
            <div className="pt-1 flex items-center gap-1">
              <AppPopover
                arrow={false}
                button={
                  <div
                    className={`flex items-center gap-1 text-textDark text-sm  rounded-full px-4 py-0.5 ${
                      record?.status === EOrderStatus.COMPLETED &&
                      "bg-green-500  cursor-pointer text-white"
                    } ${
                      record?.status === EOrderStatus.CANCELLED &&
                      "bg-red text-white"
                    } ${
                      record?.status === EOrderStatus.PENDING &&
                      "bg-yellowShadow  cursor-pointer"
                    }`}
                  >
                    <h3>{record?.status}</h3>{" "}
                    {record?.status !== "cancelled" && <IoIosArrowDown />}
                  </div>
                }
              >
                {record?.status !== "cancelled" && (
                  <div className="flex flex-col items-end text-end">
                    {statusOptions.map((stat) => (
                      <AppModal
                        key={stat.status}
                        button={
                          <button className="hover:bg-blue-50 w-full">
                            {stat.status}
                          </button>
                        }
                        cancelButtonTitle="No, Don’t"
                        primaryButtonTitle="Yes. Update"
                        primaryButtonAction={() =>
                          handleStatusUpdate(stat.status, record?.id)
                        }
                      >
                        <div className="max-w-80">
                          <p className="text-center text-darkishGrey pt-4 text-lg">
                            Are you sure Update status {record?.status} to
                            <span className="text-textDark font-medium">
                              {" "}
                              {stat.status}
                            </span>{" "}
                            from this orders list?
                          </p>
                        </div>
                      </AppModal>
                    ))}
                  </div>
                )}
              </AppPopover>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <AdminsLayout roles={[UserRole.CCAdmin, UserRole.FinanceAdmin]}>
      <h2 className="title text-center mb-5">Manage orders</h2>

      <div className="flex flex-col md:flex-row items-center gap-4 my-5 md:my-10 justify-between">
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 md:gap-5">
          <AppInput
            onChange={handleBuyerEmailChange}
            type="text"
            value={buyerEmail}
            placeholder="Search by Buyer Email"
            className="min-w-60 2xl:!py-2"
          />

          <AppInput
            onChange={handleSellerEmailChange}
            type="text"
            value={sellerEmail}
            placeholder="Search by Seller Email"
            className="min-w-60 2xl:!py-2"
          />

          <AppInput
            onChange={handleOrderIdChange}
            type="text"
            value={orderId}
            placeholder="Search by Order ID"
            className="min-w-60 2xl:!py-2"
          />
        </div>

        <button
          className="appBtn"
          onClick={() => {
            setBuyerEmail("");
            setSellerEmail("");
            setOrderId("");
          }}
        >
          Reset
        </button>
      </div>

      <div className="h-[65dvh] overflow-auto">
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

export default ManageAllOrder;

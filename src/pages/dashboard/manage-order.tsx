import useDebounce from "@/hooks/useDebounce";
import SuperAdminLayout from "@/layout/SuperAdminLayout";
import { EOrderStatus, ResponseSuccessType } from "@/types/common";
import { Input } from "antd";
import React, { useState, useMemo } from "react";
import AppTable from "@/components/ui/AppTable";
import AppModal from "@/components/ui/AppModal";
import { formatDate } from "@/utils/formateDate";
import { useGetOrdersQuery, useUpdateOrderMutation } from "@/redux/features/order/orderApi";
import AppPopover from "@/components/ui/AppPopover";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-toastify";
import TableLoading from "@/components/shared/TableLoading";

const ManageAllUser = () => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const debouncedSearch = useDebounce(search, 500);

  const [updateOrder] = useUpdateOrderMutation();

  const statusOptions = [
    {
      status: EOrderStatus.PENDING
    },
    {
      status: EOrderStatus.COMPLETED
    },
    {
      status: EOrderStatus.CANCELLED
    },
  ];

  const handleStatusUpdate = async (status: string, id: string) => {
    const updateData = {
      id, status
    }
    await updateOrder(updateData).unwrap().then((res: ResponseSuccessType) => {
      if (!res.success) {
        return toast.error(res?.data.message || "Order updated unsuccessful!", { toastId: 1 });
      }
      toast.success("Order updated successful!", { toastId: 1 });

    }).catch((res: any) => {
      return toast.error(res?.data.message || "Something went wrong!", { toastId: 1 });
    });
  }

  const columns = [
    {
      title: 'Account Name',
      dataIndex: 'account',
      className: "min-w-[150px]",
      render: (account: any, record: any) => {
        return (
          <p className="line-clamp-1  text-base">{account?.name}</p>
        )
      }
    },
    {
      title: 'Price',
      dataIndex: 'account',
      className: "min-w-[105px]",
      render: (account: any) => {
        return (
          <p className="line-clamp-1 max-w-[30dvw] text-base">{account?.price}</p>
        )
      }
    },
    {
      title: 'Account Category',
      dataIndex: 'account',
      className: "min-w-[105px]",
      render: (account: any) => {
        return (
          <p className="line-clamp-1 text-base">{account?.category}</p>
        )
      }
    },
    {
      title: 'Account Type',
      dataIndex: 'account',
      className: "min-w-[105px]",
      render: (account: any) => {
        return (
          <p className="line-clamp-1  text-base">{account?.accountType}</p>
        )
      }
    },
    {
      title: 'Order By',
      dataIndex: 'orderBy',
      className: "min-w-[105px]",
      render: (orderBy: any) => {
        return (
          <div className='flex items-center gap-1 text-base'>
            <img src={orderBy?.profileImg} alt="profile Image" className="rounded-full object-cover size-9" />
            <p className="line-clamp-1">{orderBy?.name}</p>
          </div>
        )
      }
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      className: "min-w-[115px]",
      render: (date: string) => {
        return (
          <p className="line-clamp-1">{formatDate(date)}</p>
        )
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      className: "min-w-[85px]",
      render: (action: any, record: any) => {
        return (
          <div className="flex items-center gap-2">
            <div className="pt-1 flex items-center gap-1">
              <AppPopover
                arrow={false}
                button={
                  <div className={`flex items-center gap-1 text-textDark text-sm  rounded-full px-4 py-0.5 cursor-pointer ${record?.status === EOrderStatus.COMPLETED && "bg-green-500 text-white"} ${record?.status === EOrderStatus.CANCELLED && "bg-red text-white"} ${record?.status === EOrderStatus.PENDING && "bg-[#FCF0C9] "}`}>
                    <h3>{record?.status}</h3> <IoIosArrowDown />
                  </div>
                }
              >
                <div className='flex flex-col items-end text-end'>
                  {statusOptions.map(stat => (
                    <AppModal
                      key={stat.status}
                      button={
                        <button className="hover:bg-blue-50 w-full">{stat.status}</button>
                      }
                      cancelButtonTitle="No, Don’t"
                      primaryButtonTitle="Yes. Update"
                      primaryButtonAction={() => handleStatusUpdate(stat.status, record?.id)}
                    >
                      <div className="max-w-80">
                        <p className="text-center text-[#828282] pt-4 text-lg">
                          Are you sure Update status {record?.status} to
                          <span className="text-textDark font-medium">
                            {" "}{stat.status}
                          </span>{" "}
                          from this orders list?
                        </p>
                      </div>
                    </AppModal>
                  ))}
                </div>
              </AppPopover>
            </div>
          </div>
        );
      },
    },
  ];

  const queryString = useMemo(() => {
    const info = {
      page,
      limit: 50,
      buyerEmail: debouncedSearch.length ? debouncedSearch : undefined,
      sellerEmail: debouncedSearch.length ? debouncedSearch : undefined,
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

  const queryInfo = useGetOrdersQuery(queryString);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <SuperAdminLayout>
      <h2 className="title text-center mb-5">Manage orders</h2>
      <div className="flex flex-col md:flex-row items-center gap-4 my-10 justify-between">
        <Input
          className="max-w-[300px] w-full inline-block"
          type="search"
          name="search"
          onChange={handleSearchChange}
          placeholder="Search by sellerEmail or buyerEmail"
          value={search}
        />
        <button
          className="appBtn"
          onClick={() => {
            setSearch("");
          }}
        >
          Reset
        </button>
      </div>

      <AppTable
        infoQuery={queryInfo}
        columns={columns}
        setPage={setPage}
        loadingComponent={
          <TableLoading columnNumber={columns.length} />
        }
      />
    </SuperAdminLayout>
  );
};

export default ManageAllUser;

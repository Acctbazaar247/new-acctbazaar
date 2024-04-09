import ErrorCompo from "@/components/ui/AppErrorComponent";
import Loading from "@/components/ui/Loading";
import AdminLayout from "@/layout/AdminLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { Avatar, Button, Input, Pagination, Popconfirm } from "antd";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  AccountCategory,
  EApprovedForSale,
  IAccount,
  IUser,
} from "@/types/common";
// import ServiceCard from "@/components/ServiceCard/ServiceCard";
import {
  useDeleteAccountMutation,
  useEditAccountMutation,
  useGetAccountsQuery,
} from "@/redux/features/account/accountApi";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import useDebounce from "@/hooks/useDebounce";
import Form from "@/components/Forms/Form";
import { optionCreator } from "@/utils";
import useIsMobile from "@/hooks/useIsMobile";
import { ACCOUNT_CATEGORIES } from "@/shared";
type Props = {};
type DataType = {} & IAccount;

function AllService({}: Props) {
  const [page, setPage] = useState<number>(1);
  const [deleteService] = useDeleteAccountMutation();
  const [editService, { isLoading: isEditLoading }] = useEditAccountMutation();
  const defaultValue = { value: "", label: "" };
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500); // 500ms debounce delay
  const isMobile = useIsMobile();
  const [category, setCategory] = useState<SelectOptions>(defaultValue);
  const [approvedForSale, setApprovedForSale] =
    useState<SelectOptions>(defaultValue);
  const queryString = useMemo(() => {
    const info = {
      category: category.value.length ? category.value : undefined,
      page,
      limit: 50,
      searchTerm: debouncedSearch.length ? debouncedSearch : undefined,
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
  }, [category, debouncedSearch, page, approvedForSale]);
  const { data, isFetching, isLoading, isError } =
    useGetAccountsQuery(queryString);
  let content = null;

  const approveButton = (id: string) => {
    return (
      <div>
        <button
          className="app-status-button bg-green-600"
          onClick={() => {
            editService({ id, approvedForSale: EApprovedForSale.approved });
          }}
        >
          Approve
        </button>
      </div>
    );
  };
  const pendingButton = (id: string) => {
    return (
      <div>
        <button
          className="app-status-button bg-blue-600"
          onClick={() => {
            editService({ id, approvedForSale: EApprovedForSale.pending });
          }}
        >
          Pending
        </button>
      </div>
    );
  };
  const deniedButton = (id: string) => {
    return (
      <div>
        <button
          className="app-status-button bg-yellow-500"
          onClick={() => {
            editService({ id, approvedForSale: EApprovedForSale.denied });
          }}
        >
          Denied
        </button>
      </div>
    );
  };
  const columns: ColumnsType<DataType> = [
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
      render: (_, current) => {
        return (
          <div>
            {current.preview ? (
              <Link
                target="_blank"
                href={current.preview}
                className="hover:underline underline text-[12px] lg:text-md"
              >
                {current.name}
              </Link>
            ) : (
              <p className="text-[12px] lg:text-md">{current.name}</p>
            )}
          </div>
        );
      },
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
      className: "text-[12px] lg:text-md",

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
      title: "Status",
      dataIndex: "approvedForSale",
      key: "approvedForSale",
      className: "text-[12px] lg:text-md",

      render: (current, record) => {
        return (
          <div className="flex gap-2 items-center">
            <div className="w-[120px] capitalize ">
              {record.isSold ? (
                <p className="font-bold">Sold</p>
              ) : (
                <div>
                  <span className="border rounded-full p-1 px-2">
                    {current}
                  </span>
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
                        {deniedButton(record.id)}
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
      className: "text-[12px] lg:text-md",

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
  if (isMobile) {
    columns.splice(3, 1);
  }
  if (isFetching || isLoading || isEditLoading) {
    content = <Loading></Loading>;
  } else if (isError) {
    content = <ErrorCompo></ErrorCompo>;
  } else if (data?.data.length) {
    content = (
      <div>
        <div className=" ">
          <Table pagination={false} columns={columns} dataSource={data.data} />
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
  const categoryOption = ACCOUNT_CATEGORIES.map((single) => ({
    value: single.value,
    label: (
      <div className="flex gap-2 items-center">
        <Avatar src={single.imageUrl}></Avatar>
        <span>{single.label}</span>
      </div>
    ),
  }));
  const approvedStatusOption =
    Object.values(EApprovedForSale).map(optionCreator);

  const handleCategoryChange = (el: string) => {
    setCategory({ value: el, label: el });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleApprovedChange = (el: string) => {
    setApprovedForSale({ value: el, label: el });
  };

  return (
    <>
      <AdminLayout>
        <div>
          <h2 className="text-xl text-center font-bold mb-5">
            Manage Accounts
          </h2>
          <div className="mt-5 mb-10">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-5 justify-between">
              <div className="flex flex-wrap lg:flex-nowrap gap-4">
                <div className="w-[200px] ">
                  <Form submitHandler={() => {}}>
                    <FormSelectField
                      name="category"
                      handleChange={handleCategoryChange}
                      placeholder="Filter By category"
                      options={categoryOption}
                      value={category.value}
                    ></FormSelectField>
                  </Form>
                </div>
                <div className="w-[230px] ">
                  <Form submitHandler={() => {}}>
                    <FormSelectField
                      name="approvedForSale"
                      handleChange={handleApprovedChange}
                      placeholder="Filter By Approved status"
                      options={approvedStatusOption}
                      value={approvedForSale.value}
                    ></FormSelectField>
                  </Form>
                </div>
                <Input
                  className="max-w-[350px] xl:w-[400px] w-full h-[40px] inline-block"
                  type="search"
                  name="search"
                  onChange={handleSearchChange}
                  placeholder="Search by name or description"
                  value={search}
                />
              </div>
              <div>
                <button
                  className="px-4 py-2 bg-blue-500 text-white leading-0 rounded"
                  onClick={() => {
                    setCategory(defaultValue);
                    setSearch("");
                    setApprovedForSale(defaultValue);
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="overflow-x-auto overflow-y-clip">{content}</div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export default AllService;

import AdminLayout from "@/layout/AdminLayout";
import Link from "next/link";
import React, { ChangeEvent, useMemo, useState } from "react";
import { Avatar, Button, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  EApprovedForSale,
  EPlans,
  IAccount,
  IUser
} from "@/types/common";
import {
  useDeleteAccountMutation,
  useEditAccountMutation,
  useGetAccountsQuery
} from "@/redux/features/account/accountApi";
import FormSelectField, {
  SelectOptions
} from "@/components/Forms/FormSelectField";
import useDebounce from "@/hooks/useDebounce";
import Form from "@/components/Forms/Form";
import { optionCreator } from "@/utils";
import { ACCOUNT_CATEGORIES } from "@/shared";
import AccountDeniedFrom from "@/components/Forms/AccountDeniedFrom";
import AppInput from "@/components/ui/AppInput";
import AppTable from "@/components/ui/AppTable";
import TableLoading from "@/components/shared/TableLoading";

type DataType = {} & IAccount;

function AllService() {

  const [page, setPage] = useState<number>(1);
  const [deleteService] = useDeleteAccountMutation();
  const [search, setSearch] = useState<string>("");
  const [denyMessage, setDenyMessage] = useState<string>("");

  const defaultValue = { value: "", label: "" };
  const [category, setCategory] = useState<SelectOptions>(defaultValue);
  const [approvedForSale, setApprovedForSale] =
    useState<SelectOptions>(defaultValue);
  const [planStatus, setPlanStatus] =
    useState<SelectOptions>(defaultValue);

  const debouncedSearch = useDebounce(search, 500);
  const [editService] = useEditAccountMutation();

  const queryString = useMemo(() => {
    const info = {
      category: category.value.length ? category.value : undefined,
      page,
      limit: 50,
      searchTerm: debouncedSearch.length ? debouncedSearch : undefined,
      approvedForSale: approvedForSale.value.length
        ? approvedForSale.value
        : undefined,

      planType: planStatus.value.length
        ? planStatus.value
        : undefined
    };

    const queryString = Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value) {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
      }
      return pre;
    }, "");
    return queryString;
  }, [category, page, debouncedSearch, approvedForSale, planStatus]);

  const queryInfo = useGetAccountsQuery(queryString);

  const approveButton = (id: string) => {
    return (
      <button
        className="app-status-button text-xs lg:text-sm bg-green-500"
        onClick={() => {
          editService({
            id,
            approvedForSale: EApprovedForSale.approved,
            messageFromAdmin: ""
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
      denyMessage.length > 0 ?
        <button className="app-status-button bg-yellow-500  text-xs lg:text-sm"
          onClick={() => {
            editService({
              id,
              approvedForSale: EApprovedForSale.denied,
              messageFromAdmin: denyMessage
            });
          }}
        >
          Denied
        </button>
        :
        <AccountDeniedFrom
          handleEdit={(info) => {
            editService({
              id,
              approvedForSale: EApprovedForSale.denied,
              messageFromAdmin: info.message
            });
          }}
        ></AccountDeniedFrom>
    );
  };

  const categoryOption = ACCOUNT_CATEGORIES.map((single) => ({
    value: single.value,
    label: (
      <div className="flex gap-2 items-center">
        <Avatar src={single.imageUrl}></Avatar>
        <span>{single.label}</span>
      </div>
    )
  }));

  const approvedStatusOption =
    Object.values(EApprovedForSale).map(optionCreator);

  const handleCategoryChange = (el: string) => {
    setCategory({ value: el, label: el });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleDenyMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDenyMessage(e.target.value);
  };

  const handleApprovedChange = (el: string) => {
    setApprovedForSale({ value: el, label: el });
  };

  const planOptions =
    Object.keys(EPlans).map((e) => {
      return {
        label: e.split("_").join(" ").toLowerCase(),
        value: EPlans[e as keyof typeof EPlans]
      }
    });

  const handlePlanChange = (el: string) => {
    setPlanStatus({ value: el, label: el });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      className: "text-sm lg:text-base"
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
      }
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      className: "text-sm lg:text-base",

      render: (price) => {
        return <span>${price}</span>;
      }
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
              <span className=" text-xs lg:text-sm capitalize">{ownBy.name}</span>
              <p className="text-xs">{ownBy.email}</p>
            </div>
          </div>
        );
      }
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
                  <div className='flex items-center justify-center'>
                    <span className={`border text-base text-white rounded-full py-0.5 px-2 ${current === "pending" && "bg-blue-600" || current === "denied" && "bg-red" || current === "approved" && "bg-green-500"}`}>
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
      }
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
                  className: "!border !border-blue-300 text-blue-500"
                }}
              >
                <Button danger>Delete</Button>
              </Popconfirm>
            </>
          )}
        </div>
      )
    }
  ];

  return (
    <AdminLayout>
      <h2 className="title text-center mb-5">Manage Accounts</h2>

      <div className="flex flex-col md:flex-row items-center gap-4 my-5 md:my-6 2xl:my-8 justify-between">
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 md:gap-5">
          <Form submitHandler={() => { }}>
            <FormSelectField
              name="category"
              className="min-w-40"
              handleChange={handleCategoryChange}
              placeholder="Filter By category"
              options={categoryOption}
              value={category.value}
            ></FormSelectField>
          </Form>

          <Form submitHandler={() => { }}>
            <FormSelectField
              name="approvedForSale"
              className="min-w-32"
              handleChange={handleApprovedChange}
              placeholder="Filter By Approved status"
              options={approvedStatusOption}
              value={approvedForSale.value}
            ></FormSelectField>
          </Form>

          <Form submitHandler={() => { }}>
            <FormSelectField
              className="min-w-40"
              name="planStatus"
              handleChange={handlePlanChange}
              placeholder="Filter By Plan Types"
              options={planOptions}
              value={planStatus.value}
            ></FormSelectField>
          </Form>

          <AppInput
            onChange={handleSearchChange}
            type="text"
            value={search}
            placeholder="Search by name or description"
            className="min-w-64 2xl:min-w-72 2xl:!py-2 !rounded"
          />
        </div>

        <button
          className="appBtn"
          onClick={() => {
            setCategory(defaultValue);
            setSearch("");
            setDenyMessage("");
            setApprovedForSale(defaultValue);
            setPlanStatus(defaultValue)
          }}
        >
          Reset
        </button>
      </div>

      <div className="mb-5 lg:mb-8">
        <textarea
          value={denyMessage}
          onChange={handleDenyMessageChange}
          placeholder="Enter Your Deny Message"
          className={`w-full h-fit flex items-center gap-1 outline-none md:gap-2 text-sm md:text-base border  rounded md:rounded-md  2xl:rounded-lg px-2 py-1.5 md:px-4 md:py-1.5 lg:py-2 2xl:px-4 2xl:py-2.5 border-borderColor`}
        />
      </div>

      <div className='h-[55dvh] overflow-auto'>
        <AppTable
          infoQuery={queryInfo}
          columns={columns}
          setPage={setPage}
          loadingComponent={
            <TableLoading columnNumber={columns.length} />
          }
        />
      </div>
    </AdminLayout>
  );
}

export default AllService;

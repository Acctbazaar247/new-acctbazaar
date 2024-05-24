import ErrorCompo from "@/components/ui/AppErrorComponent";
import Form from "@/components/Forms/Form";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import Loading from "@/components/ui/Loading";
import ManageAllUserTable from "@/components/ManageAllUserTable/ManageAllUserTable";
import ManageAllUserTableSingleRow from "@/components/ManageAllUserTable/ManageAllUserTableSingleRow";
import useDebounce from "@/hooks/useDebounce";
import SuperAdminLayout from "@/layout/SuperAdminLayout";
import { useGetUsersQuery } from "@/redux/features/user/userApi";
import { IUser, UserRole } from "@/types/common";
import { optionCreator } from "@/utils";
import { Input, Pagination } from "antd";
import React, { useState, useMemo } from "react";
import AppTable from "@/components/ui/AppTable";
import AppModal from "@/components/ui/AppModal";
import { formatDate } from "@/utils/formateDate";
import Link from "next/link";
import { useGetOrdersQuery } from "@/redux/features/order/orderApi";

type Props = {};

const ManageAllUser = (props: Props) => {
  const defaultValue = { value: "", label: "" };
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const debouncedSearch = useDebounce(search, 500); // 500ms debounce delay
  const [role, setRole] = useState<SelectOptions>(defaultValue);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      className: "min-w-[150px]",
      render: (name: string, record: any) => {
        return (
          <div className='flex items-center gap-1 text-base'>
            <img src={record?.profileImg} alt="" className="rounded-full object-cover size-9" />
            <p className="line-clamp-1">{name}</p>
          </div>
        )
      }
    },
    {
      title: 'Money',
      dataIndex: 'Currency',
      className: "min-w-[105px]",
      render: (Currency: any) => {
        return (
          <p className="line-clamp-1 max-w-[30dvw] text-base">{Currency?.amount}</p>
        )
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      className: "min-w-[105px]",
      render: (email: string) => {
        return (
          <p className="line-clamp-1 text-base">{email}</p>
        )
      }
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      className: "min-w-[105px]",
      render: (phoneNumber: string) => {
        return (
          <p className="line-clamp-1  text-base">{phoneNumber}</p>
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
      title: 'Action',
      dataIndex: '',
      className: "min-w-[85px]",
      render: (_text: any, record: any) => {
        return (
          <div className='flex items-center justify-evenly'>
            <button className="text-xs font-medium px-4 py-1 rounded-full bg-[#E6E6E7] hover:text-gray-800 "><Link href={`/dashboard/edit-blog/${record?.id}`}>Edit Blog</Link></button>

            <AppModal button={
              <button className="text-xs text-white px-4 py-1 rounded-full w-full bg-red">Remove</button>}
              cancelButtonTitle="No, Don’t"
              primaryButtonTitle="Yes. Remove"
            // primaryButtonAction={() => deleteBlog(record?.id)}
            >
              <div className='max-w-80'>
                <p className="text-center text-[#828282] pt-4 text-lg">Are you sure  Remove <span className="text-textDark font-medium">{record?.title}</span> from the blog list?</p>
              </div>
            </AppModal>
          </div>
        )
      }
    },
  ];


  const queryString = useMemo(() => {
    const info = {
      role: role.value.length ? role.value : undefined,
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
  }, [role, debouncedSearch, page]);
  const { data, isError, isLoading, isFetching, isSuccess, error } =
    useGetUsersQuery(queryString);

  const queryInfo = useGetOrdersQuery(queryString);
  console.log(queryInfo);
  let content = null;

  if (isLoading || isFetching) {
    content = <Loading></Loading>;
  } else if (isError) {
    content = <ErrorCompo></ErrorCompo>;
  } else if (isSuccess && data.data.length) {
    const info = data.data as IUser[];
    content = (
      <div>
        {/* <ManageAllUserTable>
          {info.map((single) => (
            <ManageAllUserTableSingleRow
              {...single}
              key={single.id}
            ></ManageAllUserTableSingleRow>
          ))}
        </ManageAllUserTable> */}
        <AppTable
          infoQuery={queryInfo}
          columns={columns}
        />
        <div className="flex justify-center mt-4">
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

  const handleRoleChange = (el: string) => {
    setRole({ value: el, label: el });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <SuperAdminLayout>
      <div>
        <h2 className="text-xl text-center font-bold mb-5">Manage orders</h2>
        <div className="mt-5 mb-10">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-5 justify-between">
            <div className="flex gap-4">
              <div className="w-[150px] ">
                <Form submitHandler={() => { }}>
                  <FormSelectField
                    name="role"
                    handleChange={handleRoleChange}
                    placeholder="Filter By Role"
                    options={roleOption}
                    value={role.value}
                  ></FormSelectField>
                </Form>
              </div>
              <Input
                className="max-w-[300px] w-full inline-block"
                type="search"
                name="search"
                onChange={handleSearchChange}
                placeholder="Search by name or email"
                value={search}
              />
            </div>
            <div>
              <button
                className="px-4 py-2 bg-blue-500 text-white leading-0 rounded"
                onClick={() => {
                  setRole(defaultValue);
                  setSearch("");
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        {content}
      </div>
    </SuperAdminLayout>
  );
};

export default ManageAllUser;

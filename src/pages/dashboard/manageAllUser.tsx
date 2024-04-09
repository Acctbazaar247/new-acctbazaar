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
import SuperAdminLayout from "@/layout/SuperAdminLayout";
import { useGetUsersQuery } from "@/redux/features/user/userApi";
import { IUser, UserRole } from "@/types/common";
import { optionCreator } from "@/utils";
import { Input, Pagination } from "antd";
import Search from "antd/es/input/Search";
import React, { useState, useMemo } from "react";
import { useStore } from "react-redux";

type Props = {};

const ManageAllUser = (props: Props) => {
  const defaultValue = { value: "", label: "" };
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const debouncedSearch = useDebounce(search, 500); // 500ms debounce delay
  const [role, setRole] = useState<SelectOptions>(defaultValue);

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

  let content = null;

  if (isLoading || isFetching) {
    content = <Loading></Loading>;
  } else if (isError) {
    content = <ErrorCompo></ErrorCompo>;
  } else if (isSuccess && data.data.length) {
    const info = data.data as IUser[];
    content = (
      <div>
        <ManageAllUserTable>
          {info.map((single) => (
            <ManageAllUserTableSingleRow
              {...single}
              key={single.id}
            ></ManageAllUserTableSingleRow>
          ))}
        </ManageAllUserTable>
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
        <h2 className="text-xl text-center font-bold mb-5">Manage users</h2>
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

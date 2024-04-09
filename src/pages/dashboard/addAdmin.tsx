import AddAdminTableSingleRow from "@/components/AddAdminTableSingleRow/AddAdminTableSingleRow";
import ErrorCompo from "@/components/ui/AppErrorComponent";
import Loading from "@/components/ui/Loading";
import ManageAllUserTable from "@/components/ManageAllUserTable/ManageAllUserTable";
import useDebounce from "@/hooks/useDebounce";
import AdminLayout from "@/layout/AdminLayout";
import SuperAdminLayout from "@/layout/SuperAdminLayout";
import { useGetUsersQuery } from "@/redux/features/user/userApi";
import { IUser } from "@/types/common";
import { Input, Pagination } from "antd";
import React, { useMemo, useState } from "react";

type Props = {};

const AddAdmin = (props: Props) => {
  const defaultValue = { value: "", label: "" };
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const debouncedSearch = useDebounce(search, 500); // 500ms debounce d
  const queryString = useMemo(() => {
    const info = {
      page,
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
  }, [debouncedSearch, page]);
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
            <AddAdminTableSingleRow
              {...single}
              key={single.id}
            ></AddAdminTableSingleRow>
          ))}
        </ManageAllUserTable>
        <div className="flex justify-center mt-4">
          <Pagination
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <SuperAdminLayout>
      <h1 className="text-center font-bold text-xl mb-5">Add new Admin</h1>
      <div className="mt-5 mb-10">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-5 justify-between">
          <div className="flex gap-4 w-full">
            <Input
              className="max-w-[500px] py-3 w-full inline-block"
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
                setSearch("");
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      {content}
    </SuperAdminLayout>
  );
};

export default AddAdmin;

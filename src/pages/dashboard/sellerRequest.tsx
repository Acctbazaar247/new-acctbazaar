import ManageSellerSingleRow from "@/components/ManageAllUserTable/ManageSellerSingleRow";
import ManageSellerTable from "@/components/ManageAllUserTable/ManageSellerTable";
import ErrorCompo from "@/components/ui/AppErrorComponent";
import Loading from "@/components/ui/Loading";
import useDebounce from "@/hooks/useDebounce";
import AdminsLayout from "@/layout/AdminsLayout";
import { useGetUsersQuery } from "@/redux/features/user/userApi";
import { IUser, UserRole } from "@/types/common";
import { Input, Pagination } from "antd";
import React, { useMemo, useState } from "react";

const SellerRequest = () => {
  const defaultValue = { value: "", label: "" };
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const debouncedSearch = useDebounce(search, 500); // 500ms debounce delay

  const queryString = useMemo(() => {
    const info = {
      role: UserRole.Seller,
      page,
      isApprovedForSeller: false,
      searchTerm: debouncedSearch.length ? debouncedSearch : undefined,
    };
    const queryString = Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value || value === false) {
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
        <ManageSellerTable>
          {info.map((single) => (
            <ManageSellerSingleRow
              {...single}
              key={single.id}
            ></ManageSellerSingleRow>
          ))}
        </ManageSellerTable>
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
    content = <ErrorCompo error="No request found!"></ErrorCompo>;
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <AdminsLayout roles={[UserRole.Admin]}>
      <div>
        <h2 className="text-xl text-center font-bold mb-5">
          Manage Seller Requested
        </h2>
        <div className="mt-5 mb-10">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-5 justify-between">
            <div className="w-1/2">
              <Input
                className="max-w-[350px] h-[40px] w-full block"
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
      </div>
    </AdminsLayout>
  );
};

export default SellerRequest;

import useDebounce from "@/hooks/useDebounce";
import SuperAdminLayout from "@/layout/SuperAdminLayout";
import {
  useEditUserMutation,
  useGetUsersQuery
} from "@/redux/features/user/userApi";
import { UserRole } from "@/types/common";
import { Avatar } from "antd";
import React, { useMemo, useState } from "react";
import AppInput from "@/components/ui/AppInput";
import AppTable from "@/components/ui/AppTable";
import TableLoading from "@/components/shared/TableLoading";
import AppModal from "@/components/ui/AppModal";
import { toast } from "react-toastify";

const AddAdmin = () => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const debouncedSearch = useDebounce(search, 500);

  const queryString = useMemo(() => {
    const info = {
      page,
      searchTerm: debouncedSearch.length ? debouncedSearch : undefined,
      role: "user"
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

  const queryInfo = useGetUsersQuery(queryString);
  const [editUser] = useEditUserMutation();

  const handleMakeAdmin = (id: string) => {
    editUser({ id, role: UserRole.Admin })
      .unwrap()
      .then((res: any) => {
        toast.success("Make Admin successful.");
      })
      .catch(() => {
        toast.error("Make Admin unsuccessful!");
      });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      className: "min-w-[150px]",
      render: (name: any, record: any) => {
        return (
          <div className="flex items-center gap-1">
            <Avatar src={record?.profileImg}></Avatar>
            <p className="line-clamp-1 text-base capitalize">{name}</p>
          </div>
        );
      }
    },
    {
      title: "Email",
      dataIndex: "email",
      className: "min-w-[105px]",
      render: (email: any) => {
        return <p className="line-clamp-1 max-w-[30dvw] text-base">{email}</p>;
      }
    },
    {
      title: "Role",
      dataIndex: "role",
      className: "min-w-[105px]",
      render: (role: any) => {
        return <p className="line-clamp-1 text-base">{role}</p>;
      }
    },
    {
      title: "Action",
      dataIndex: "status",
      className: "min-w-[85px]",
      render: (action: any, record: any) => {
        return (
          <div className="flex items-center justify-center">
            <AppModal
              key={action}
              button={<button className="appOutlineBtnSm">Make Admin</button>}
              cancelButtonTitle="No, Don’t"
              primaryButtonTitle="Yes. Make Admin"
              primaryButtonAction={() => handleMakeAdmin(record?.id)}
            >
              <div className="max-w-80">
                <p className="text-center text-[#828282] pt-4 text-lg">
                  Are you sure make admin
                  <span className="text-textDark font-medium">
                    {record?.name}
                  </span>{" "}
                  to from this Users list?
                </p>
              </div>
            </AppModal>
          </div>
        );
      }
    }
  ];

  return (
    <SuperAdminLayout>
      <h2 className="title text-center mb-5">Make New Admin</h2>

      <div className="flex flex-col md:flex-row items-center gap-4 my-5 md:my-10 justify-between">
        <AppInput
          type="text"
          onChange={handleSearchChange}
          placeholder="Search by name or email"
          value={search}
          className="min-w-60 2xl:!py-2 max-w-[30%]"
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

      <div className="max-h-[70dvh] overflow-auto">
        <AppTable
          infoQuery={queryInfo}
          columns={columns}
          setPage={setPage}
          loadingComponent={<TableLoading columnNumber={columns.length} />}
        />
      </div>
    </SuperAdminLayout>
  );
};

export default AddAdmin;

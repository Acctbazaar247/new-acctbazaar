import useDebounce from "@/hooks/useDebounce";
import SuperAdminLayout from "@/layout/SuperAdminLayout";
import {
  useEditUserMutation,
  useGetUsersQuery,
} from "@/redux/features/user/userApi";
import { IUser, UserRole } from "@/types/common";
import { Avatar } from "antd";
import React, { useMemo, useState } from "react";
import AppInput from "@/components/ui/AppInput";
import AppTable from "@/components/ui/AppTable";
import TableLoading from "@/components/shared/TableLoading";
import AppModal from "@/components/ui/AppModal";
import { toast } from "react-toastify";
import { GoUnverified } from "react-icons/go";

const AddAdmin = () => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const debouncedSearch = useDebounce(search, 500);

  const queryString = useMemo(() => {
    const info = {
      page,
      searchTerm: debouncedSearch.length ? debouncedSearch : undefined,
      role: "user",
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

  const handleMakeAdmin = (id: string, role: string) => {
    editUser({ id, role })
      .unwrap()
      .then((res: any) => {
        toast.success(
          `Make ${
            (role === UserRole.PRAdmin && "Product Reviewer Admin") ||
            (role === UserRole.CCAdmin && "Customer Care Admin") ||
            (role === UserRole.FinanceAdmin && "Finance Admin")
          } successful.`
        );
      })
      .catch(() => {
        toast.error(
          `Make ${
            (role === UserRole.PRAdmin && "Product Reviewer Admin") ||
            (role === UserRole.CCAdmin && "Customer Care Admin") ||
            (role === UserRole.FinanceAdmin && "Finance Admin")
          }  unsuccessful!`
        );
      });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      className: "min-w-[120px] md:min-w-[250px]",
      render: (name: any, record: any) => {
        return (
          <div className="flex items-center gap-1">
            <Avatar src={record?.profileImg}></Avatar>
            <p className="line-clamp-1 text-base capitalize">{name}</p>
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      className: "min-w-[120px] md:min-w-[255px]",
      render: (email: any) => {
        return <p className="line-clamp-1 max-w-[30dvw] text-base">{email}</p>;
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      className: "min-w-[120px] md:min-w-[200px]",
      render: (role: any) => {
        return <p className="line-clamp-1 text-base">{role}</p>;
      },
    },
    {
      title: "Action",
      dataIndex: "status",
      className: "min-w-[120px] ",
      render: (action: any, record: IUser) => {
        return (
          <div className="flex items-center justify-center gap-2 w-fit">
            {record?.isVerified ? (
              <>
                <AppModal
                  key={action}
                  button={
                    <button className="appOutlineBtnSm">
                      Make Product Reviewer Admin
                    </button>
                  }
                  cancelButtonTitle="No, Don’t"
                  primaryButtonTitle="Yes. Make Product Reviewer Admin"
                  primaryButtonAction={() =>
                    handleMakeAdmin(record?.id, UserRole.PRAdmin)
                  }
                >
                  <div className="max-w-80">
                    <p className="text-center text-darkishGrey pt-4 lg:text-lg">
                      Are you sure make Product Reviewer Admin{" "}
                      <span className="text-textDark font-medium">
                        {record?.name}{" "}
                      </span>
                      from this Users list?
                    </p>
                  </div>
                </AppModal>

                <AppModal
                  key={action}
                  button={
                    <button className="appOutlineBtnSm">
                      Make Customer Care Admin
                    </button>
                  }
                  cancelButtonTitle="No, Don’t"
                  primaryButtonTitle="Yes. Make Customer Care Admin"
                  primaryButtonAction={() =>
                    handleMakeAdmin(record?.id, UserRole.CCAdmin)
                  }
                >
                  <div className="max-w-80">
                    <p className="text-center text-darkishGrey pt-4 lg:text-lg">
                      Are you sure Make Customer Care Admin
                      <span className="text-textDark font-medium">
                        {" "}
                        {record?.name}
                      </span>{" "}
                      from this Users list?
                    </p>
                  </div>
                </AppModal>

                <AppModal
                  key={action}
                  button={
                    <button className="appOutlineBtnSm">
                      Make Finance Admin
                    </button>
                  }
                  cancelButtonTitle="No, Don’t"
                  primaryButtonTitle="Yes. Make Finance Admin"
                  primaryButtonAction={() =>
                    handleMakeAdmin(record?.id, UserRole.FinanceAdmin)
                  }
                >
                  <div className="max-w-80">
                    <p className="text-center text-darkishGrey pt-4 lg:text-lg">
                      Are you sure Make Finance Admin
                      <span className="text-textDark font-medium">
                        {" "}
                        {record?.name}
                      </span>{" "}
                      from this Users list?
                    </p>
                  </div>
                </AppModal>
              </>
            ) : (
              <div className="flex items-center gap-1 justify-center">
                <GoUnverified /> The user is not verified yet.
              </div>
            )}
          </div>
        );
      },
    },
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

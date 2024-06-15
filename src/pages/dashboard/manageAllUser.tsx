import Form from "@/components/Forms/Form";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import useDebounce from "@/hooks/useDebounce";
import SuperAdminLayout from "@/layout/SuperAdminLayout";
import { useDeleteUserMutation, useEditUserMutation, useGetUsersQuery } from "@/redux/features/user/userApi";
import { IUser, UserRole } from "@/types/common";
import { optionCreator } from "@/utils";
import React, { useState, useMemo } from "react";
import AppInput from "@/components/ui/AppInput";
import AppTable from "@/components/ui/AppTable";
import TableLoading from "@/components/shared/TableLoading";
import AppModal from "@/components/ui/AppModal";
import { MdBlock } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { GoUnverified, GoVerified } from "react-icons/go";
import AdminsLayout from "@/layout/AdminsLayout";

const ManageAllUser = () => {
  const defaultValue = { value: "", label: "" };
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const debouncedSearch = useDebounce(search, 500); // 500ms debounce delay
  const [role, setRole] = useState<SelectOptions>(defaultValue);
  const [deleteUser, { isLoading: isDeleteLoading }] = useDeleteUserMutation();
  const [editUser, { isLoading, isError, isSuccess, error }] =
    useEditUserMutation();

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

  const queryInfo = useGetUsersQuery(queryString);

  const roleOption = Object.values(UserRole).map(optionCreator);

  const handleRoleChange = (el: string) => {
    setRole({ value: el, label: el });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleBlockUser = (id: string, isBlocked: boolean) => {
    editUser({ id, isBlocked });
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      className: "min-w-[150px]",
      render: (name: string, record: IUser) => {
        return (
          <div className='flex items-center gap-1'>
            <img src={record?.profileImg as string} alt="" className="rounded-full w-10 h-10" />
            <p className="cursor-pointer">{name}</p>
          </div>
        )
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      className: "min-w-[150px]",
    },
    {
      title: 'Money',
      dataIndex: 'Currency',
      className: "min-w-[150px]",
      render: (Currency: any) => {
        return (
          <p className="font-medium">${Currency?.amount.toFixed(2)}</p>
        )
      }
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      className: "min-w-[145px]",
    },
    {
      title: 'Role',
      dataIndex: 'role',
      className: "min-w-[145px]",
      render: (role: any) => {
        return (
          <p className="text-base font-medium uppercase">{role}</p>
        )
      }
    },
    {
      title: "User Status",
      dataIndex: "isBlocked",
      className: "min-w-[115px]",
      render: (isBlocked: boolean) => {
        return (
          <div className={`flex items-center gap-1 text-sm ${isBlocked ? "text-textDark" : "text-success"}`}>
            {
              isBlocked ? <MdBlock /> : <RiVerifiedBadgeFill />
            }
            {isBlocked ? "Blocked" : "Active"}
          </div>
        );
      },
    },
    {
      title: 'Verified Merchant',
      dataIndex: 'isVerifiedByAdmin',
      className: "min-w-[150px]",
      render: (isVerifiedByAdmin: boolean) => {
        return (
          <div className={`flex items-center gap-1 ${isVerifiedByAdmin === true ? 'text-success' : "text-bgSecondary"}`}>
            {
              isVerifiedByAdmin === true ? <GoVerified /> : <GoUnverified />
            }
            {isVerifiedByAdmin === true ? "Verified" : "Unverified"}
          </div>
        )
      }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      className: "min-w-[145px]",
      render: (text: string, record: any) => {
        return (
          <div className='flex items-center justify-evenly gap-1'>
            <AppModal
              button={
                <button className="appOutlineBtnSmDelete">
                  {record?.isBlocked ? "UnBlock" : "Block"}
                </button>
              }
              cancelButtonTitle="No, Don’t"
              primaryButtonTitle={`Yes. ${record?.isBlocked ? "UnBlock" : "Block"}`}
              primaryButtonAction={() => handleBlockUser(record?.id, record?.isBlocked ? false : true)}
            >
              <div className="max-w-80">
                <p className="text-center text-[#828282] pt-4 text-lg">
                  Are you sure {record?.isBlocked ? "UnBlock" : "Block"}{" "}
                  <span className="text-textDark font-medium">
                    {record?.name}
                  </span>{" "}
                  from the users list?
                </p>
              </div>
            </AppModal>

            <AppModal button={
              <button className="appBtnSm">Delete</button>}
              cancelButtonTitle="No, Don’t"
              primaryButtonTitle="Yes. Remove"
              primaryButtonAction={() => deleteUser(record?.id)}
            >
              <div className='max-w-80'>
                <p className="text-center text-[#828282] pt-4 text-lg">Are you sure  Remove <span className="text-textDark font-medium">{record?.name}</span> from the user list?</p>
              </div>
            </AppModal>
          </div>
        )
      }
    },
  ];

  return (
    <AdminsLayout roles={[UserRole.CCAdmin, UserRole.FinanceAdmin]}>
      <h2 className="title text-center mb-5">Manage users</h2>

      <div className="flex flex-col md:flex-row items-center gap-4 my-5 md:my-6 2xl:my-10 justify-between">
        <div className='flex flex-wrap lg:flex-nowrap items-center gap-3 md:gap-5'>
          <Form submitHandler={() => { }}>
            <FormSelectField
              name="role"
              className="min-w-44"
              handleChange={handleRoleChange}
              placeholder="Filter By Role"
              options={roleOption}
              value={role.value}
            ></FormSelectField>
          </Form>
          <AppInput
            onChange={handleSearchChange}
            type="text"
            value={search}
            placeholder="Search by name or email"
            className="min-w-80 2xl:!py-2"
          />
        </div>

        <button
          className="appBtn"
          onClick={() => {
            setRole(defaultValue);
            setSearch("");
          }}
        >
          Reset
        </button>
      </div>

      <div className='h-[65dvh] overflow-auto'>
        <AppTable
          infoQuery={queryInfo}
          columns={columns}
          setPage={setPage}
          loadingComponent={
            <TableLoading columnNumber={columns.length} />
          }
        />
      </div>
    </AdminsLayout>
  );
};

export default ManageAllUser;

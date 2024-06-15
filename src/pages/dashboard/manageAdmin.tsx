import SuperAdminLayout from "@/layout/SuperAdminLayout";
import { useEditUserMutation, useGetUsersQuery } from "@/redux/features/user/userApi";
import { AdminRole, IUser, UserRole } from "@/types/common";
import React, { useMemo, useState } from "react";
import AppTable from "@/components/ui/AppTable";
import FormSelectField, { SelectOptions } from "@/components/Forms/FormSelectField";
import useDebounce from "@/hooks/useDebounce";
import AppInput from "@/components/ui/AppInput";
import TableLoading from "@/components/shared/TableLoading";
import AppModal from "@/components/ui/AppModal";
import { optionCreator } from "@/utils";
import Form from "@/components/Forms/Form";
import { toast } from "react-toastify";

function ManageAdmin() {
  const defaultValue = { value: "prAdmin", label: "" };
  const [role, setRole] = useState<SelectOptions>(defaultValue);
  const [page, setPage] = useState<number>(1);

  const queryString = useMemo(() => {
    const info = {
      role: role.value.length ? role.value : undefined,
      page,
      limit: 50,
    };
    const queryString = Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value) {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
      }
      return pre;
    }, "");
    return queryString;
  }, [role, page]);

  const queryInfo = useGetUsersQuery(queryString);

  const [editUser] = useEditUserMutation();

  const handleMakeAdmin = (id: string) => {
    editUser({ id, role: UserRole.User })
      .unwrap()
      .then((res: any) => {
        toast.success(`Remove From admin list successful.`);
      })
      .catch(() => {
        toast.error(`Remove From admin list  unsuccessful!`);
      });
  };


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
      title: 'Action',
      dataIndex: 'action',
      className: "min-w-[145px]",
      render: (text: string, record: any) => {
        return (
          <div className='flex items-center justify-evenly gap-1'>

            <AppModal button={
              <button className="appOutlineBtnSmDelete">Remove</button>}
              cancelButtonTitle="No, Don’t"
              primaryButtonTitle="Yes. Remove"
              primaryButtonAction={() => handleMakeAdmin(record?.id)}
            >
              <div className='max-w-80'>
                <p className="text-center text-[#828282] pt-4 text-lg">Are you sure  Remove <span className="text-textDark font-medium">{record?.name}</span> from the Admins list?</p>
              </div>
            </AppModal>
          </div>
        )
      }
    },
  ];

  const roleOption = Object.values(AdminRole).map(optionCreator);

  const handleRoleChange = (el: string) => {
    setRole({ value: el, label: el });
  };


  return (
    <SuperAdminLayout>
      <h2 className="title text-center mb-5">All Admin</h2>

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
        </div>

        <button
          className="appBtn"
          onClick={() => {
            setRole(defaultValue);
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
    </SuperAdminLayout>
  );
}

export default ManageAdmin;

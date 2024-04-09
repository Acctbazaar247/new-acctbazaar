import { useEditUserMutation } from "@/redux/features/user/userApi";
import { IUser, UserRole } from "@/types/common";
import { Avatar, Popconfirm } from "antd";
import { userAgent } from "next/server";
import React from "react";
import { toast } from "react-toastify";
type Props = {} & IUser;

const AddAdminTableSingleRow = ({
  id,
  email,
  name,
  password,
  profileImg,
  role,
  isBlocked,
}: Props) => {
  const [editUser, { isLoading, isError, isSuccess, error }] =
    useEditUserMutation();

  const handleRemove = () => {
    editUser({ id, role: UserRole.Admin })
      .unwrap()
      .then((res: any) => {
        if (res.error) {
          toast.error("something went wrong");
        } else {
          toast.success("success");
        }
      })
      .catch(() => {
        toast.error("something went wrong");
      });
  };
  const handleMakeAdmin = () => {
    editUser({ id, role: UserRole.Admin })
      .unwrap()
      .then((res: any) => {
        if (res.error) {
          toast.error("something went wrong");
        } else {
          toast.success("success");
        }
      })
      .catch(() => {
        toast.error("something went wrong");
      });
  };
  return (
    <tr className="focus:outline-none text-center h-16 border border-gray-300 mt-2 rounded">
      <td className="pl-2">
        {profileImg ? (
          <Avatar src={profileImg} alt="user" />
        ) : (
          <div>No Img</div>
        )}
      </td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role}</td>
      <td>
        {isBlocked ? (
          <span className="text-red-500 font-bold">Blocked</span>
        ) : role === UserRole.Admin ? (
          <Popconfirm
            title="Are you sure to add this as admin?"
            onConfirm={handleRemove}
            placement="leftTop"
            okButtonProps={{
              className: "!border !border-blue-300 text-blue-500",
            }}
          >
            <button
              disabled={isLoading}
              // onClick={}
              className="border border-red-300 px-3 leading-0 rounded-md  bg-red-500 transition-all text-white py-2 ml-2"
            >
              Remove
            </button>
          </Popconfirm>
        ) : role === UserRole.Seller || role === UserRole.SuperAdmin ? (
          <div></div>
        ) : (
          <Popconfirm
            title="Are you sure to add this as admin?"
            onConfirm={handleMakeAdmin}
            placement="leftTop"
            okButtonProps={{
              className: "!border !border-blue-300 text-blue-500",
            }}
          >
            <button
              disabled={isLoading}
              // onClick={}
              className="border border-blue-400 px-3 leading-0 rounded-md  bg-blue-500 transition-all text-white py-2 ml-2"
            >
              Make Admin
            </button>
          </Popconfirm>
        )}
      </td>
    </tr>
  );
};

export default AddAdminTableSingleRow;

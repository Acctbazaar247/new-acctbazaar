import {
  useDeleteUserMutation,
  useEditUserMutation,
} from "@/redux/features/user/userApi";
import { IUser } from "@/types/common";
import { Avatar, Popconfirm } from "antd";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
type Props = {} & IUser;

const ManageAllUserTableSingleRow = ({
  id,
  email,
  name,
  profileImg,
  role,
  isBlocked,
  Currency,
  phoneNumber,
}: Props) => {
  const [editUser, { isLoading, isError, isSuccess, error }] =
    useEditUserMutation();
  const [deleteUser, { isLoading: isDeleteLoading }] = useDeleteUserMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success("success");
    } else if (isError) {
      toast.error("something went wrong");
    }
  }, [isError, isSuccess]);
  const handleDelete = () => {
    deleteUser(id);
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
      <td>{Currency?.amount.toFixed(2)}</td>
      <td>{email}</td>
      <td>{phoneNumber}</td>
      <td>
        <span className="uppercase font-bold text-sm">{role}</span>
      </td>
      <td>
        {isBlocked ? (
          <button
            disabled={isLoading || isDeleteLoading}
            onClick={() => {
              editUser({ id, isBlocked: false });
            }}
            className="border border-green-300 px-3 leading-0 rounded-md text-green-400 hover:bg-green-500 transition-all hover:text-white py-2"
          >
            UnBlock
          </button>
        ) : (
          <button
            disabled={isLoading || isDeleteLoading}
            onClick={() => {
              editUser({ id, isBlocked: true });
            }}
            className="border border-red-300 px-3 leading-0 rounded-md text-red-400 hover:bg-red-500 transition-all hover:text-white py-2"
          >
            Block
          </button>
        )}
        <Popconfirm
          title="Are you sure to delete user?"
          onConfirm={handleDelete}
          placement="leftTop"
          okButtonProps={{
            className: "!border !border-blue-300 text-blue-500",
          }}
        >
          <button
            disabled={isLoading || isDeleteLoading}
            // onClick={}
            className="border border-red-300 px-3 leading-0 rounded-md  bg-red-500 transition-all text-white py-2 ml-2"
          >
            Delete
          </button>
        </Popconfirm>
      </td>
    </tr>
  );
};

export default ManageAllUserTableSingleRow;

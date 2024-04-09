import React from "react";

type Props = { children: React.ReactNode };

const ManageSellerTable = (props: Props) => {
  return (
    <div className=" overflow-x-auto border pt-4 ">
      <table className="w-full text-center whitespace-nowrap ">
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Tx Id</th>
          <th>Action</th>
        </tr>
        <tr className="mt-2 h-4"></tr>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
};

export default ManageSellerTable;

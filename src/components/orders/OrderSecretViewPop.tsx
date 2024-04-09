import { IAccount } from "@/types/common";
import React from "react";

type Props = { account: IAccount };

const OrderSecretViewPop = ({ account }: Props) => {
  return (
    <div>
      {" "}
      <div className="space-y-4 min-w-[300px] max-w-[700px] w-full mt-10">
        <div className="flex gap-5 items-center border-b pb-1 justify-between text-sm">
          <p className="text-textGrey">UserName / Email:</p>
          <p>{account.username}</p>
        </div>
        <div className="flex items-center gap-4 border-b pb-1 justify-between text-sm">
          <p className="text-textGrey">Password:</p>
          <p>{account.password}</p>
        </div>
        {account.additionalEmail && (
          <div className="flex items-center gap-4 border-b pb-1 justify-between text-sm">
            <p className="text-textGrey">Additional email:</p>
            <p>{account.additionalEmail}</p>
          </div>
        )}
        {account.additionalPassword && (
          <div className="flex items-center gap-4 border-b pb-1 justify-between text-sm">
            <p className="text-textGrey">Additional Password:</p>
            <p>{account.additionalPassword}</p>
          </div>
        )}
        {account.additionalDescription && (
          <div className="space-y-1.5 border-b pb-1">
            <p className="text-textGrey">Additional Information</p>
            <p className="text-sm">{account.additionalDescription}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSecretViewPop;

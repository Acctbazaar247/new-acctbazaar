import Image from "next/image";
import MessageBody from "./MessageBody";
import { getImageUrlByCategory } from "@/utils/getImageUrl";
import { AccountCategory, IAccount, IUser } from "@/types/common";
import { PiCurrencyDollarBold } from "react-icons/pi";
import React from "react";
import { findImageUrlByCategory } from "@/shared";

type Props = {
  user: Pick<IUser, "name" | "id" | "profileImg">;
  account: Pick<IAccount, "id" | "name" | "description" | "price" | "category">;
  orderId: string;
};

const MessageMain: React.FC<Props> = ({ user, account, orderId }) => {
  return (
    <div className="border border-[#EFECEC] rounded-lg">
      {/* this is top message div  */}
      <div className="border-b border-b-[#EFECEC] flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 pt-2 md:p-5 border-r border-r-[#EFECEC] flex items-center justify-center">
          <div className="flex items-center gap-3">
            <Image
              src={user.profileImg || ""}
              className="size-10 rounded-full"
              width={40}
              height={40}
              alt="avatar"
            />
            <h3 className="text-[#1D2939] font-semibold">{user.name}</h3>
          </div>
        </div>
        <div className="w-full md:w-2/3 px-3 py-1.5">
          <div className="flex items-center gap-1 md:gap-2 2xl:gap-3">
            <Image
              src={findImageUrlByCategory(account.category)}
              className="size-9 md:size-10 lg:size-12"
              width={70}
              height={70}
              alt="social icons"
            />
            {/* this is description div  */}
            <div className="">
              <h4 className="line-clamp-1">{account.name}</h4>
              <p className="text-textGrey line-clamp-1 pt-0.5 pb-1 text-xs">
                {account.description}
              </p>
              <h2 className="text-textBlack font-bold flex items-center">
                <PiCurrencyDollarBold />
                {account.price}
              </h2>
            </div>
          </div>
        </div>
      </div>
      {/* this is main message div  */}
      <MessageBody orderId={orderId} />
    </div>
  );
};

export default MessageMain;

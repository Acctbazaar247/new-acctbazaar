import Image from "next/image";
import { getImageUrlByCategory } from "@/utils/getImageUrl";
import { AccountCategory, IOrder } from "@/types/common";
import { PiCurrencyDollarBold } from "react-icons/pi";
import MessageBody from "../message/MessageBody";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import React from "react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hook";
type props = {
  order: IOrder;
};
const OrderDetailsMessaging: React.FC<props> = ({ order }) => {
  const user = useAppSelector((state) => state.user.user);
  const imageUrl =
    order.orderById === user?.id
      ? order.account?.ownBy?.profileImg
      : order.orderBy?.profileImg;
  const name =
    order.orderById === user?.id
      ? order.account.ownBy?.name
      : order.orderBy?.name;
  return (
    <div className="border border-[#EFECEC] rounded-lg">
      {/* this is top message div  */}
      <div className="border-b border-b-[#EFECEC] p-5 flex items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <Image
            src={imageUrl || ""}
            className="size-10 rounded-full"
            width={40}
            height={40}
            alt="avatar"
          />
          <h3 className="text-[#1D2939] font-semibold flex items-center gap-2">
            {name}
            <RiVerifiedBadgeFill className="text-success" />
          </h3>
        </div>
        <Link href={"/contactus"} className="text-red text-sm">
          Report
        </Link>
      </div>
      {/* this is main message div  */}
      <MessageBody orderId={order.id} />
    </div>
  );
};

export default OrderDetailsMessaging;

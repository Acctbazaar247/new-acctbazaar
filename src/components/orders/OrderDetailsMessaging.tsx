import Image from "next/image";
import { getImageUrlByCategory } from "@/utils/getImageUrl";
import { AccountCategory, IOrder } from "@/types/common";
import { PiCurrencyDollarBold } from "react-icons/pi";
import MessageBody from "../message/MessageBody";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import React from "react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/router";
type props = {
  order: IOrder;
};
const OrderDetailsMessaging: React.FC<props> = ({ order }) => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  // console.log(order);
  const imageUrl =
    order.orderById === user?.id
      ? order.account?.ownBy?.profileImg
      : order.orderBy?.profileImg;
  const name =
    order.orderById === user?.id
      ? order.account.ownBy?.name
      : order.orderBy?.name;
  const handleClick = () => {
    if (order.orderById === user?.id) {
      router.push(`/seller/${order.account?.ownBy?.id}`);
    }
  };
  return (
    <div className="border border-whiteGrey rounded-lg">
      {/* this is top message div  */}
      <div className="border-b border-b-whiteGrey cursor-pointer p-5 flex items-center justify-between gap-5">
        <div onClick={handleClick} className="flex items-center gap-3">
          <Image
            src={imageUrl || ""}
            className="size-10 rounded-full"
            width={40}
            height={40}
            alt="avatar"
          />
          <h3 className="text-textBlueBlack font-semibold flex items-center gap-2">
            {name}
            {order.orderById === user?.id ? (
              order.account?.ownBy?.isVerifiedByAdmin ? (
                <RiVerifiedBadgeFill className="text-success" />
              ) : null
            ) : order.orderBy?.isVerifiedByAdmin ? (
              <RiVerifiedBadgeFill className="text-success" />
            ) : null}
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

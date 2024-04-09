import { IOrder } from "@/types/common";
import React from "react";
import CurrencyLogo from "../CurrencyLogo/CurrencyLogo";
import Image from "next/image";
import { findImageUrlByCategory } from "@/shared";
import { Avatar, Collapse, CollapseProps } from "antd";
import Link from "next/link";

type Props = {} & IOrder;

const OrdersCard = ({ account, id }: Props) => {
  const {
    category,
    name,
    description,
    price,
    additionalEmail,
    additionalPassword,
    additionalDescription,
  } = account || {};
  const text = "dfd";
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Show Username/Email",
      children: <p className="text-xl font-bold">{account?.username}</p>,
    },
    {
      key: "2",
      label: "Show Password",
      children: <p className="text-xl font-bold">{account?.password}</p>,
    },
  ];
  if (additionalEmail?.length) {
    items.push(
      {
        key: "3",
        label: "Show Additional Email",
        children: (
          <p className="text-xl font-bold">{account?.additionalEmail}</p>
        ),
      },
      {
        key: "4",
        label: "Show Additional password",
        children: (
          <p className="text-xl font-bold">{account?.additionalPassword}</p>
        ),
      }
    );
  }
  if (additionalDescription?.length) {
    items.push({
      key: "5",
      label: "Show Additional Information",
      children: (
        <p className="text-xl font-bold">{account?.additionalDescription}</p>
      ),
    });
  }

  return (
    <div className="shadow-lg p-2 rounded-lg">
      <div className="flex gap-5 items-start">
        {category ? (
          <Image
            src={findImageUrlByCategory(category)}
            className="rounded-xl w-[50px]"
            width={200}
            height={200}
            alt="account-img"
          />
        ) : null}
        <div className="w-[60%]">
          <h4 className="leading-tight  font-bold">{name}</h4>
          <Link href={`/seller/order-details/${id}`}>
            <p className="text-sm my-1">{description?.slice(0, 50)}</p>
          </Link>
          <div className="flex gap-5"></div>
        </div>
      </div>
      <div className="mt-4 flex gap-2 items-center">
        {account?.ownBy?.profileImg ? (
          <Avatar src={account?.ownBy?.profileImg}></Avatar>
        ) : (
          <span>No Image</span>
        )}
        <p>{account?.ownBy?.name}</p>
        <Image
          src={"/assets/verified.png"}
          width={20}
          className="w-[25px]"
          height={20}
          alt="verified"
        ></Image>
      </div>
      <Collapse className="mt-4" items={items} defaultActiveKey={[]} />
    </div>
  );
};

export default OrdersCard;

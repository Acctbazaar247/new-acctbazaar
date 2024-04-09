import { findImageUrlByCategory } from "@/shared";
import { IAccount, ICart } from "@/types/common";
import { Avatar, Table, TableColumnsType } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CurrencyLogo from "../CurrencyLogo/CurrencyLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import {
  useAddCartMutation,
  useDeleteCartMutation,
  useGetMyCartsQuery,
} from "@/redux/features/cart/cartApi";
import AccountAction from "./AccountAction";
import Link from "next/link";

type Props = {
  dataSource: IAccount[];
};

const AccountTable = ({ dataSource }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Update isMobile based on window.innerWidth
      setIsMobile(window.innerWidth <= 767);
    };

    // Initial check on mount
    handleResize();

    // Attach the event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const columns: TableColumnsType<IAccount> = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 100,
      render: (data, current) => {
        return (
          <Image
            src={findImageUrlByCategory(current.category)}
            className="lg:rounded-xl rounded w-[30px] lg:w-[60px]"
            width={200}
            height={200}
            alt="account-img"
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, current) => {
        return (
          <div>
            {current.preview ? (
              <Link
                target="_blank"
                href={current.preview}
                className="hover:underline md:text-base font-bold"
              >
                {current.name}
              </Link>
            ) : (
              <p className=" text-[16px] font-bold">{current.name}</p>
            )}
            <p className="text-[14px]  ">{current.description.slice(0, 50)}</p>
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "age",
      render: (_, current) => (
        <div className="flex items-center gap-3">
          <CurrencyLogo className="w-[30px]"></CurrencyLogo>
          <p className="font-bold text-lg">{current.price}</p>
        </div>
      ),
    },
    {
      title: "Seller",
      dataIndex: "ownBy",
      key: "ownBy",
      render: (_, current) => (
        <div className="">
          {current.ownBy ? (
            <div className="flex items-center gap-3">
              <Avatar size={40} src={current.ownBy.profileImg}></Avatar>
              <h4 className="text-md font-bold flex items-center gap-1">
                {current?.ownBy?.name}
                <Image
                  src={"/assets/verified.png"}
                  width={20}
                  className="w-[25px]"
                  height={20}
                  alt="verified"
                ></Image>
              </h4>
            </div>
          ) : null}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (_, current) => (
        <div className=" ">
          <AccountAction {...current}></AccountAction>
        </div>
      ),
    },
  ];
  const columnsMobile: TableColumnsType<IAccount> = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (data, current) => {
        return (
          <Image
            src={findImageUrlByCategory(current.category)}
            className="lg:rounded-xl rounded w-[30px] lg:w-[100px]"
            width={200}
            height={200}
            alt="account-img"
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, current) => {
        return (
          <div>
            <p className="lg:text-2xl text-[12px] font-bold">{current.name}</p>
            <p className="lg:text-xl text-[10px] my-1">
              {current.description.slice(0, 20)}
            </p>
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "age",
      render: (_, current) => (
        <div className="flex items-center gap-3">
          {/* <CurrencyLogo className="w-[30px]"></CurrencyLogo> */}
          <p className="font-bold text-xs">${current.price}</p>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (_, current) => (
        <div className="  ">
          <AccountAction {...current}></AccountAction>
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <Table
        // showHeader={false}
        // onHeaderRow={'df'}

        pagination={false}
        rowClassName={"text-xs"}
        className="w-full account-reel"
        dataSource={dataSource}
        size={isMobile ? "small" : "middle"}
        columns={isMobile ? columnsMobile : columns}
      />
    </div>
  );
};

export default AccountTable;

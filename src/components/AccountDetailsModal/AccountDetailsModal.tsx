import { findImageUrlByCategory } from "@/shared";
import { IAccount } from "@/types/common";
import { Avatar, Modal, Popconfirm } from "antd";
import Image from "next/image";
import React from "react";
import CurrencyLogo from "../CurrencyLogo/CurrencyLogo";
import { useAddOrderMutation } from "@/redux/features/order/orderApi";
import { toast } from "react-toastify";
import { useAppSelector } from "@/redux/hook";
import Link from "next/link";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Swal from "sweetalert2";

type Props = {
  isModalOpen: boolean;
  handelOk: () => void;
  handleCancel: () => void;
} & IAccount;

const AccountDetailsModal = ({
  isModalOpen,
  price,
  handelOk,
  handleCancel,
  category,
  name,
  id,
  description,
  isSold,
  ownBy,
  preview,
}: Props) => {
  const [makeOrder, { isError, isLoading, isSuccess }] = useAddOrderMutation();
  const user = useAppSelector((state) => state.user.user);
  const handleBuyAccount = () => {
    if (!user?.id) {
      toast.error("Your are not logged in");
      return;
    }
    makeOrder({ accountId: id })
      .unwrap()
      .then((res: any) => {
        if (res.error) {
          toast.error("Something Went Wrong");
        } else {
          return Swal.fire({
            icon: "success",
            title: "Success!",
            text: "You have successfully buy this account",

            confirmButtonText: "Ok",
          });
        }
      })
      .catch((err) => {
        toast.error(err?.data?.message || "Failed To Order");
      });
  };
  return (
    <Modal
      title={name + " details"}
      open={isModalOpen}
      onOk={handelOk}
      width={600}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="flex flex-col gap-5 items-start mt-5">
        <Image
          src={findImageUrlByCategory(category)}
          className="rounded-xl w-[30%]"
          width={200}
          height={200}
          alt="account-img"
        />
        <div className=" ">
          <h4 className="text-2xl font-bold">{name}</h4>
          <div>
            <p className="text-xl my-3">{description}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 flex-wrap justify-between amt-10">
        <div className="flex items-center font-bold gap-2">
          <Avatar src={ownBy?.profileImg}></Avatar>
          <span>{ownBy?.name}</span>
          {/* <RiVerifiedBadgeFill className="text-success" /> */}
        </div>
        <div className="flex gap-5 items-center">
          <div className="font-bold text-lg text-orange-500">
            <CurrencyLogo amount={price} className="w-[24px]"></CurrencyLogo>
          </div>
          {isSold ? (
            <div>
              <span className="font-bold text-orange-600 text-sm">Sold</span>
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              {preview ? (
                <div>
                  <Link
                    href={preview}
                    target="_blank"
                    className="px-3 py-1 rounded hover:text-white hover:opacity-75 transition-all border text-white bg-green-500 text-sm"
                  >
                    Preview
                  </Link>
                </div>
              ) : null}
              <Popconfirm
                disabled={isLoading}
                onConfirm={handleBuyAccount}
                title="You want to buy this account?"
                okButtonProps={{ className: "bg-orange-500" }}
              >
                <button className="px-3 py-1 rounded hover:opacity-75 transition-all border border-orange-500 text-sm">
                  <span className="text-orange-500 font-bold">Buy</span>
                </button>
              </Popconfirm>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AccountDetailsModal;

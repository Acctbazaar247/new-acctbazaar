import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Image from "next/image";
import { useState } from "react";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import AppModal from "../ui/AppModal";
import { getImageUrlByCategory } from "@/utils/getImageUrl";
import {
  AccountCategory,
  AccountType,
  EApprovedForSale,
  IAccount,
  ICart,
  IOrder,
  IUser,
} from "@/types/common";
import { FiMinus, FiPlus } from "react-icons/fi";
import { Checkbox, Tooltip } from "antd";
import {
  removeItemFromCart,
  toggleCart,
} from "@/redux/features/cart/cartSlice";
import { AiOutlineDelete } from "react-icons/ai";
import { useDeleteCartMutation } from "@/redux/features/cart/cartApi";
import { findImageUrlByCategory } from "@/shared";
import AccountDetailsModal from "../AccountDetailsModal/AccountDetailsModal";
import { FaRegEye } from "react-icons/fa6";

type TCartAccountCard = {
  account: ICart;
  isModal?: boolean;
};

export default function CartAccountCard({
  account,
  isModal,
}: TCartAccountCard) {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteCart, { isLoading: isDeleteLoading }] = useDeleteCartMutation();

  return (
    <div
      className={` flex items-center justify-between w-full rounded-lg gap-1 md:gap-3 2xl:gap-4 border-b border-b-[#EFEFEF] p-2 md:p-3 2xl:p-4`}
    >
      <Image
        src={findImageUrlByCategory(
          account?.account?.category as AccountCategory
        )}
        className="size-7 md:size-8 lg:size-12 2xl:size-14"
        width={70}
        height={70}
        alt="social icons"
      />

      <div className="w-full">
        <div className="flex items-center gap-1 pt-1 md:pt-2">
          <img
            src={account.account?.ownBy?.profileImg as string}
            className="size-3 rounded-full"
            alt="avatar image"
          />
          <p className="text-textBlack text-xs">
            {account.account?.ownBy?.name}
          </p>
          {/* {account?.ownBy?.isVerified && (
            <RiVerifiedBadgeFill className="text-success" />
          )} */}
        </div>
        <h3 className="text-textBlack font-medium text-sm  md:text-base flex items-center justify-between md:justify-normal !line-clamp-1">
          {account?.account?.name}
        </h3>
        <p className="text-textGrey pt-0.5 text-xs md:text-sm line-clamp-1">
          {account?.account?.description}
        </p>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-textBlack font-bold flex items-center">
            <PiCurrencyDollarBold />
            {account?.account?.price}
          </h2>

          <div className="text-lg flex items-center gap-3">
            {isModal ? (
              <div>
                <FaRegEye className="text-textGrey text-lg" />
              </div>
            ) : (
              <div>
                <Tooltip title="View account details">
                  <button
                    onClick={() => setIsModalOpen(true)}
                  >
                    <FaRegEye className="text-textGrey text-lg" />
                  </button>
                </Tooltip>

                {account?.account ? (
                  <AccountDetailsModal
                    {...account.account}
                    isModalOpen={isModalOpen}
                    handleCancel={() => setIsModalOpen(false)}
                    handelOk={() => setIsModalOpen(false)}
                  ></AccountDetailsModal>
                ) : null}
              </div>
            )}

            <div className="">
              <Tooltip title="Delete Account">
                <button
                  disabled={isModal}
                  onClick={() => deleteCart(account?.id)}
                  className={`text-textGrey ${!isModal && "hover:text-red"}`}
                >
                  <AiOutlineDelete />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

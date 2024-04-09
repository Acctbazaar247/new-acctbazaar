import { IAccount, ICart } from "@/types/common";
import React, { useEffect, useState } from "react";
import CurrencyLogo from "../CurrencyLogo/CurrencyLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { findImageUrlByCategory } from "@/shared";
import { Avatar, Button, Modal } from "antd";
import {
  useAddCartMutation,
  useDeleteCartMutation,
  useGetCartsQuery,
  useGetMyCartsQuery,
} from "@/redux/features/cart/cartApi";
import { toast } from "react-toastify";
import AccountDetailsModal from "../AccountDetailsModal/AccountDetailsModal";
import { useAppSelector } from "@/redux/hook";
import AccountAction from "../AccountReel/AccountAction";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";
type Props = {} & IAccount;

const AccountCard = (props: Props) => {
  const user = useAppSelector((state) => state.user.user);
  const {
    category,
    createdAt,
    description,
    id,
    isSold,
    name,
    ownById,
    price,
    updatedAt,
    ownBy,
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [existOnCart, setExistOnCart] = useState<ICart | null>();
  const [
    addToCart,
    {
      isLoading: isAddToCartLoading,
      isError: isAddToCartError,
      error: addToCartError,
    },
  ] = useAddCartMutation();
  const [deleteCart, { isLoading: isDeleteLoading }] = useDeleteCartMutation();
  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetMyCartsQuery("");
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (data?.data) {
      const myAllCarts = data.data as ICart[];
      const isThisCartAlreadyExitsOnData = myAllCarts.find(
        (single) => single.accountId === id
      );
      if (isThisCartAlreadyExitsOnData?.id) {
        setExistOnCart(isThisCartAlreadyExitsOnData);
      } else {
        setExistOnCart(isThisCartAlreadyExitsOnData);
      }
    }
  }, [data, id]);
  return (
    <div
      className={
        existOnCart?.id
          ? " transition-all pointer-events-none opacity-15"
          : "transition-all opacity-100 p-2 "
      }
    >
      <div className="flex flex-col gap-5  items-start">
        <div className="w-full h-[145px] flex justify-center items-center rounded bg-[#FFF4F1]">
          <Image
            src={findImageUrlByCategory(category)}
            className="rounded "
            width={80}
            height={200}
            alt="account-img"
          />
        </div>
        <div className="w-full">
          <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-5  md:items-center">
            <h4 className=" text-[12px] md:text-[16px] font-[600]">{name}</h4>
            <span className="text-[12px] md:text-[16px] font-medium">
              ${price}
            </span>
          </div>

          <div className="flex items-center justify-between gap-1 pt-2 md:pt-4">
            <div className="flex gap-1">
              <Image
                width={20}
                height={20}
                src={ownBy?.profileImg as string}
                className="size-5 rounded-full"
                alt="avatar image"
              />
              <p className="text-textBlack text-xs">{ownBy?.name}</p>
              {/* {ownBy?.isVerified && (
                <RiVerifiedBadgeFill className="text-success" />
              )} */}
              {ownBy?.isVerifiedByAdmin && (
                <p
                  className={`py-0.5 px-1 rounded-full w-fit text-xs flex items-center gap-0.5 text-primary bg-[#FFFAEB]`}
                >
                  <GoDotFill />
                  verified merchant
                </p>
              )}
            </div>
            <AccountAction {...props}></AccountAction>
          </div>
        </div>
      </div>
      <AccountDetailsModal
        handelOk={handleOk}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        {...props}
      ></AccountDetailsModal>
    </div>
  );
};

export default AccountCard;

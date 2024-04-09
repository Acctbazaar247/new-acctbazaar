import { IAccount, ICart } from "@/types/common";
import React, { useEffect, useState } from "react";
import CurrencyLogo from "../CurrencyLogo/CurrencyLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faClose, faEye } from "@fortawesome/free-solid-svg-icons";
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
type Props = { cartId: string } & IAccount;

const SingleCart = (props: Props) => {
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
    cartId,
    ownBy,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [
    addToCart,
    {
      isLoading: isAddToCartLoading,
      isError: isAddToCartError,
      error: addToCartError,
    },
  ] = useAddCartMutation();
  const [deleteCart, { isLoading: isDeleteLoading }] = useDeleteCartMutation();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCartClick = () => {
    deleteCart(cartId);
  };
  return (
    <div>
      <div className="flex gap-2 items-start mb-4 ">
        <Image
          src={findImageUrlByCategory(category)}
          className="rounded-xl w-[17%]"
          width={200}
          height={200}
          alt="account-img"
        />
        <div className="w-[60%]">
          <h4 className=" text-lg font-bold">{name}</h4>
          <div>
            <p className="text-md my-1">{description.slice(0, 50)}</p>
          </div>
          <div className="flex justify-between gap-2 flex-wrap">
            <div className="font-bold text-lg text-orange-500">
              <CurrencyLogo amount={price} className="w-[30px]"></CurrencyLogo>
            </div>
            <button
              onClick={showModal}
              className="px-5 w-u w-full rounded py-1 border bg-green-500"
            >
              <FontAwesomeIcon
                icon={faEye}
                className="text-white"
              ></FontAwesomeIcon>
            </button>
          </div>
        </div>
        <div>
          <button onClick={handleCartClick}>
            <FontAwesomeIcon
              className="text-xl mt-1 text-orange-600"
              icon={faClose}
            ></FontAwesomeIcon>
          </button>
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

export default SingleCart;

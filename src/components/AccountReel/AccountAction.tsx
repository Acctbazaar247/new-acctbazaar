import { IAccount, ICart } from "@/types/common";
import React, { useEffect, useState } from "react";
import CurrencyLogo from "../CurrencyLogo/CurrencyLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import {
  useAddCartMutation,
  useDeleteCartMutation,
  useGetMyCartsQuery,
} from "@/redux/features/cart/cartApi";
import { useAppSelector } from "@/redux/hook";
import AccountDetailsModal from "../AccountDetailsModal/AccountDetailsModal";
import { toast } from "react-toastify";
import { Tooltip } from "antd";
import Image from "next/image";
import AccountModal from "../AccountCard/AccountModal";
type Props = {} & IAccount;

const AccountAction = (props: Props) => {
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
  const user = useAppSelector((state) => state.user.user);

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
  useEffect(() => {}, [addToCartError]);
  const handleCartClick = () => {
    if (!user?.id) {
      toast.error("Your are not logged in");
      return;
    }
    if (existOnCart) {
      deleteCart(existOnCart.id);
    } else {
      addToCart({ accountId: id })
        .unwrap()
        .then((res: any) => {
          if (res.error) {
            toast.error("something went wrong" + res.data.message);
          } else {
            // toast.success("Successfully add to ");
          }
        })
        .catch((res) => {
          toast.error("Failed to save. " + " " + res.data.message);
        });
    }
  };
  return (
    <div className="flex gap-2 items-center">
      <button
        disabled={isLoading || isAddToCartLoading || isDeleteLoading}
        onClick={handleCartClick}
      >
        <Tooltip title="Add to cart">
          <Image
            src={"/assets/icons/cart.png"}
            width={40}
            height={40}
            className="size-4 md:size-5 cursor-pointer min-w-4 md:min-w-5 min-h-4 md:min-h-5"
            alt="cart"
          />
        </Tooltip>
      </button>
      <div>
        <button disabled={isLoading} onClick={() => setIsModalOpen(true)}>
          <Image
            src={"/assets/icons/eye.png"}
            width={40}
            height={40}
            className="size-4 md:size-5"
            alt="eye"
          />
        </button>

        <AccountDetailsModal
          {...props}
          isModalOpen={isModalOpen}
          handleCancel={() => setIsModalOpen(false)}
          handelOk={() => setIsModalOpen(false)}
        ></AccountDetailsModal>
      </div>
    </div>
  );
};

export default AccountAction;

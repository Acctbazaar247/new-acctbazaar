import { AccountCategory, IAccount, ICart } from "@/types/common";
import { getImageUrlByCategory } from "@/utils/getImageUrl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import AppModal from "../ui/AppModal";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addCart } from "@/redux/features/cart/cartSlice";
import {
  useAddCartMutation,
  useGetMyCartsQuery,
} from "@/redux/features/cart/cartApi";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Tooltip } from "antd";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { findImageUrlByCategory } from "@/shared";
import AccountDetailsModal from "../AccountDetailsModal/AccountDetailsModal";

type TMarketplaceAccountCard = {
  account: IAccount;
  isModal?: boolean;
};

const MarketplaceAccountCard = ({
  account,
  isModal,
}: TMarketplaceAccountCard) => {
  const [existOnCart, setExistOnCart] = useState<ICart | null>();
  const user = useAppSelector((state) => state.user.user);
  const { data } = useGetMyCartsQuery("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [addToCart, { isLoading }] = useAddCartMutation();

  useEffect(() => {
    if (data?.data) {
      const myAllCarts = data.data as ICart[];
      const isThisCartAlreadyExitsOnData = myAllCarts.find(
        (single) => single.accountId === account?.id
      );
      if (isThisCartAlreadyExitsOnData?.id) {
        setExistOnCart(isThisCartAlreadyExitsOnData);
      } else {
        setExistOnCart(isThisCartAlreadyExitsOnData);
      }
    }
  }, [account?.id, data?.data]);

  const handleAddCart = () => {
    if (!user?.id) {
      toast.error("Your are not logged in");
      return;
    } else {
      addToCart({ accountId: account?.id })
        .unwrap()
        .then((res: any) => {
          if (res.error) {
            toast.error("something went wrong" + res.data.message);
          }
          toast.success("Successfully cart added");
        })
        .catch((res) => {
          toast.error("Failed to save. " + " " + res.data.message);
        });
    }
  };

  // console.log(account);

  return (
    <div
      className={`flex items-center justify-between rounded-lg gap-2 md:gap-4 2xl:gap-6 border-b border-b-[#EFEFEF] p-2 md:p-4 2xl:p-5 ${
        existOnCart && "bg-[#FBFAFA] opacity-50"
      }`}
    >
      {/* this is image and description div  */}
      <div className="flex items-center gap-1 md:gap-2 2xl:gap-3">
        <Image
          src={findImageUrlByCategory(account?.category as AccountCategory)}
          className="size-9 md:size-10 lg:size-14 2xl:size-16"
          width={70}
          height={70}
          alt="social icons"
        />
        {/* this is description div  */}
        <div className="">
          <h3
            className={`text-textBlack font-medium text-sm md:text-base flex items-center justify-between md:justify-normal ${
              !isModal && "line-clamp-1"
            }`}
          >
            {account?.name}
          </h3>
          <p
            className={`text-textGrey pt-0.5 text-xs md:text-sm ${
              !isModal && "line-clamp-1"
            }`}
          >
            {account?.description}
          </p>
          {/* this is profile div  */}
          <div className="flex items-center gap-1 pt-1 md:pt-2">
            <Image
              width={20}
              height={20}
              src={account?.ownBy?.profileImg as string}
              className="size-5 rounded-full"
              alt="avatar image"
            />
            <p className="text-textBlack text-xs">{account?.ownBy?.name}</p>
            {/* {account?.ownBy?.isVerified && (
              <RiVerifiedBadgeFill className="text-success" />
            )} */}
            {account?.ownBy?.isVerifiedByAdmin && (
              <p
                className={`py-0.5 px-1 rounded-full w-fit text-xs flex items-center gap-0.5 text-primary bg-[#FFFAEB]`}
              >
                <GoDotFill />
                verified merchant
              </p>
            )}
          </div>
        </div>
      </div>

      {/* this is right side div with icons and price  */}
      <div className="flex flex-col gap-1 md:gap-4 justify-between">
        <h2 className="text-textBlack font-bold flex items-center justify-end">
          <PiCurrencyDollarBold />
          {account?.price}
        </h2>
        {/* this is icons div view cart message  */}
        <div className="flex items-center justify-between gap-4">
          {!existOnCart?.accountId && (
            <Tooltip title="Add to cart">
              <Image
                src={"/assets/icons/cart.png"}
                width={40}
                height={40}
                className="size-4 md:size-5 cursor-pointer min-w-4 md:min-w-5 min-h-4 md:min-h-5"
                alt="cart"
                onClick={handleAddCart}
              />
            </Tooltip>
          )}

          {isModal || existOnCart?.accountId ? (
            // <Image
            //   src={"/assets/icons/eye.png"}
            //   width={40}
            //   height={40}
            //   className="size-4 md:size-5"
            //   alt="eye"
            // />
            <></>
          ) : (
            <div>
              <button
                className="w-[16px]"
                disabled={isLoading}
                onClick={() => setIsModalOpen(true)}
              >
                <Image
                  src={"/assets/icons/eye.png"}
                  width={40}
                  height={40}
                  className="size-4 md:size-5"
                  alt="eye"
                />
              </button>

              <AccountDetailsModal
                {...account}
                isModalOpen={isModalOpen}
                handleCancel={() => setIsModalOpen(false)}
                handelOk={() => setIsModalOpen(false)}
              ></AccountDetailsModal>
            </div>
            // <AppModal
            //   title="Account Details"
            //   button={
            //     <Tooltip title="Open account details">
            //       <Image
            //         src={"/assets/icons/eye.png"}
            //         width={40}
            //         height={40}
            //         className="size-4 md:size-5 cursor-pointer min-w-4 md:min-w-5 min-h-4 md:min-h-5"
            //         alt="eye"
            //       />
            //     </Tooltip>
            //   }
            // >
            //   <div className="md:w-[500px] mt-6 space-y-1">
            //     {/* <MarketplaceAccountCard isModal account={account} /> */}
            //     <div className="flex  flex-col">
            //       <Image
            //         src={getImageUrlByCategory(
            //           account?.category as AccountCategory
            //         )}
            //         className="size-9 md:size-10 lg:size-14 2xl:size-20"
            //         width={70}
            //         height={70}
            //         alt="social icons"
            //       />
            //       <h3 className="text-textBlack font-medium text-sm md:text-base flex items-center justify-between md:justify-normal mt-3">
            //         {account?.name}
            //       </h3>
            //       <p className="text-textGrey pt-2 text-xs md:text-sm">
            //         {account?.description}
            //       </p>
            //     </div>
            //     <div className="flex pt-2 items-center  gap-22 text-sm">
            //       <p className="text-textGrey text-xl">Price</p>
            //       <p className="ml-2 text-xl text-black font-bold">
            //         ${account?.price}
            //       </p>
            //     </div>

            //     {account?.preview && (
            //       <div className="flex items-center justify-center pt-5 text-sm">
            //         <Link
            //           href={account.preview}
            //           className="appBtn py-2"
            //           target="blank"
            //         >
            //           Preview
            //         </Link>
            //       </div>
            //     )}
            //   </div>
            // </AppModal>
          )}

          {/* <button>
                        <Image src={'/assets/icons/message.png'} width={40} height={40} className="size-4 md:size-5" alt="eye" />
                    </button> */}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceAccountCard;

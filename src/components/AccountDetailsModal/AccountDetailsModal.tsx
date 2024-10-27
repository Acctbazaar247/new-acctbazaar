import { useAddOrderMutation } from "@/redux/features/order/orderApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { findImageUrlByCategory } from "@/shared";
import { IAccount, ICart, IUser } from "@/types/common";
import { Modal, Popconfirm, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import CurrencyLogo from "../CurrencyLogo/CurrencyLogo";
import AvatarComponent from "../shared/AvatarComponent";
import { FaRegEye } from "react-icons/fa6";
import { PiCurrencyDollarBold } from "react-icons/pi";
import AppButton from "@/components/ui/AppButton";
import useIsMobile from "@/hooks/useIsMobile";
import { setModalOpen } from "@/redux/features/marketplace/marketplaceSlice";

type Props = {
  isModalOpen: boolean;
  handelOk: () => void;
  handleCancel: () => void;
  existOnCart?: ICart | null | undefined;
  handleAddCart?: () => void;
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
  existOnCart,
  handleAddCart,
}: Props) => {
  const [makeOrder, { isError, isLoading, isSuccess }] = useAddOrderMutation();
  const user = useAppSelector((state) => state.user.user);
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
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
          // return Swal.fire({
          //   icon: "success",
          //   title: "Success!",
          //   text: "You have successfully buy this account",

          //   confirmButtonText: "Ok",
          // });
          return dispatch(setModalOpen(true));
        }
      })
      .catch((err) => {
        toast.error(err?.data?.message || "Failed To Order");
      });
  };

  return (
    <Modal
      // title={
      //   <span className="capitalize line-clamp-1">
      //     {name.slice(0, 40) + " details"}
      //   </span>
      // }
      open={isModalOpen}
      onOk={handelOk}
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <div className="flex max-sm:flex-col items-center ">
        <div className="md:gap-2 2xl:gap-3 flex gap-5 items-start mt-5 w-full min-w-[320px] lg:w-[600px]">
          <Image
            src={findImageUrlByCategory(category)}
            className="size-9 md:size-10 lg:size-14 2xl:size-16"
            width={120}
            height={120}
            alt="social icons"
          />
          {/* this is description div  */}
          <div className="">
            <h3
              className={`text-textBlack font-medium text-sm md:text-base flex items-center justify-between md:justify-normal`}
            >
              {name}
            </h3>
            <p className={`text-textGrey py-2 text-xs md:text-sm`}>
              {description}
            </p>
            {/* this is profile div  */}
            <AvatarComponent
              nameClassName="cursor-pointer"
              user={ownBy as IUser}
              withName
            />
          </div>
        </div>

        <div className="flex md:flex-col gap-1 md:gap-4 max-sm:pt-4 max-sm:w-full max-sm:pl-12  justify-between">
          <h2 className="text-textBlack font-bold flex items-center justify-end text-base">
            <PiCurrencyDollarBold />
            <span>{price}</span>
          </h2>
          {/* this is icons div view cart message  */}
          <div className="flex justify-between gap-4">
            {!existOnCart?.id && (
              <Tooltip title="Add to cart">
                <button disabled={ownBy?.id === user?.id}>
                  <Image
                    src={"/assets/icons/cart.png"}
                    width={40}
                    height={40}
                    className="size-4 md:size-5 cursor-pointer min-w-4 md:min-w-5 min-h-4 md:min-h-5 dark:contrast-0"
                    alt="cart"
                    onClick={handleAddCart}
                  />
                </button>
              </Tooltip>
            )}

            {/* <Tooltip title="View account details">
              <button
                disabled={isSold || isLoading}
                // onClick={() => setIsModalOpen(true)}
              >
                <Link href={preview as string} target="_blank">
                  <FaRegEye className="text-textGrey text-lg mt-1" />
                </Link>
              </button>
            </Tooltip> */}
          </div>
        </div>
      </div>

      <div className="pt-6 pb-2 flex items-center justify-center gap-5">
        {preview && (
          <Tooltip title="View account details">
            <AppButton
              disabled={isSold || isLoading}
              href={preview as string}
              target="_blank"
              label="Preview"
              variant="outline"
              size={isMobile ? "small" : "default"}
            />
          </Tooltip>
        )}
        <AppButton
          isLoading={isLoading}
          onClick={handleBuyAccount}
          label="Purchase"
          size={isMobile ? "small" : "default"}
        />

        {/* <Popconfirm
          disabled={isLoading}
          onConfirm={handleBuyAccount}
          title="You want to buy this account?"
          okButtonProps={{ className: "bg-orange-500" }}
        >
        </Popconfirm> */}
      </div>
      {/* <div className="flex flex-col gap-5 items-start mt-5 w-full min-w-[320px] lg:w-[600px]">
        <Image
          src={findImageUrlByCategory(category)}
          className="rounded-xl w-[30%] mx-auto"
          width={200}
          height={200}
          alt="account-img"
        />
        <div className=" w-full">
          <h4 className="text-2xl font-bold text-center">{name}</h4>
          <div>
            <p className="text-xl my-3">{description}</p>
          </div>
        </div>
      </div> */}

      {/* <div className="flex items-center gap-4 flex-wrap justify-between amt-10">
        <AvatarComponent user={ownBy as IUser} withName size="large" />
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
      </div> */}
    </Modal>
  );
};

export default AccountDetailsModal;

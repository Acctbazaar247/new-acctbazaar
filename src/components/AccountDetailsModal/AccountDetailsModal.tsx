import { useAddOrderMutation } from "@/redux/features/order/orderApi";
import { useAppSelector } from "@/redux/hook";
import { findImageUrlByCategory } from "@/shared";
import { IAccount, IUser } from "@/types/common";
import { Modal, Popconfirm, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import CurrencyLogo from "../CurrencyLogo/CurrencyLogo";
import AvatarComponent from "../shared/AvatarComponent";
import { FaRegEye } from "react-icons/fa6";
import { PiCurrencyDollarBold } from "react-icons/pi";

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
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <div className="flex items-center ">
        <div className="md:gap-2 2xl:gap-3 flex flex-col gap-5 items-start mt-5 w-full min-w-[320px] lg:w-[600px]">
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
            <p className={`text-textGrey pt-0.5 text-xs md:text-sm`}>
              {description}
            </p>
            {/* this is profile div  */}
            <AvatarComponent user={ownBy as IUser} withName size="large" />
          </div>
        </div>

        <div className="flex flex-col gap-1 md:gap-4 justify-between">
          <h2 className="text-textBlack font-bold flex items-center justify-end">
            <PiCurrencyDollarBold />
            <span>{price}</span>
          </h2>
          {/* this is icons div view cart message  */}
          <div className="flex justify-between gap-4">
            {!id && (
              <Tooltip title="Add to cart">
                <button disabled={ownBy?.id === user?.id}>
                  <Image
                    src={"/assets/icons/cart.png"}
                    width={40}
                    height={40}
                    className="size-4 md:size-5 cursor-pointer min-w-4 md:min-w-5 min-h-4 md:min-h-5 dark:contrast-0"
                    alt="cart"
                    // onClick={handleAddCart}
                  />
                </button>
              </Tooltip>
            )}

            <Tooltip title="View account details">
              <button
                disabled={isLoading}
                // onClick={() => setIsModalOpen(true)}
              >
                <FaRegEye className="text-textGrey text-lg mt-1" />
              </button>
            </Tooltip>
          </div>
        </div>
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

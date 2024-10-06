import { useDeleteAccountMutation } from "@/redux/features/account/accountApi";
import {
  AccountCategory,
  EOrderStatus,
  IAccount,
  IOrder,
  IUser,
} from "@/types/common";
import { getImageUrlByCategory } from "@/utils/getImageUrl";
import { Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineDelete,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { MdOutlinePauseCircle, MdOutlineReviews } from "react-icons/md";
import { PiCurrencyDollarBold } from "react-icons/pi";
import AppModal from "../ui/AppModal";
import OrderSecretViewPop from "../orders/OrderSecretViewPop";
import { findImageUrlByCategory } from "@/shared";
import AppButton from "../ui/AppButton";
import AppFormTextarea from "../ui/AppFormTextarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddReviewMutation } from "@/redux/features/review/reviewApi";
import { toast } from "react-toastify";
import { useState } from "react";
import AvatarComponent from "../shared/AvatarComponent";
import { VscFeedback } from "react-icons/vsc";

interface FormData {
  reviewText: string;
  isAnonymous: boolean;
}

const MyPurchaseAccountCard = ({
  account,
  orderId,
  order,
}: {
  account: IAccount;
  order: IOrder;
  orderId: string;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [makeReview] = useAddReviewMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const submittedData = [
      {
        sellerId: account?.ownBy?.id,
        accountId: account?.id,
        reviewText: data?.reviewText,
        reviewStatus: feedback,
        isAnonymous: data?.isAnonymous,
      },
    ];
    console.log(submittedData);
    await makeReview(submittedData)
      .unwrap()
      .then((res: any) => {
        toast.success("Add review successful!", { toastId: 1 });
        setModalOpen(false);
      })
      .catch((res: any) => {
        toast.error(res?.data?.message || "Something went wrong", {
          toastId: 1,
        });
      });
  };

  return (
    <>
      <div
        className={`w-full flex items-center gap-1 md:gap-2 2xl:gap-3 rounded-lg border-b border-b-whiteGrey p-2 md:p-4 2xl:p-5 hover:bg-borderLight`}
      >
        <Image
          src={findImageUrlByCategory(account?.category)}
          className="size-9 md:size-10 lg:size-14 2xl:size-16"
          width={70}
          height={70}
          alt="social icons"
        />
        {/* this is description div  */}
        <div className="w-full ">
          <div className="flex items-center gap-4 justify-between">
            <div className="">
              <h3 className="text-textBlack line-clamp-1 font-medium text-sm md:text-base">
                {account?.name}
              </h3>
              <p className="text-textGrey pt-0.5 line-clamp-1 text-xs md:text-sm">
                {account?.description}{" "}
              </p>
            </div>
            <p
              className={`text-sm   py-1 px-2 rounded-full ${
                (order?.status === EOrderStatus.CANCELLED &&
                  "text-red bg-red/10") ||
                (order?.status === EOrderStatus.COMPLETED &&
                  "text-blue bg-blue/10")
              }`}
            >
              {order?.status}
            </p>
          </div>

          {/* this is right side div with icons and price  */}
          <div className="flex items-center gap-1 md:gap-4 justify-between  w-full">
            <h2 className="text-textBlack font-bold flex items-center justify-end">
              <PiCurrencyDollarBold />
              {account?.price}
            </h2>

            {/* this is icons div view cart message  */}
            <div className="flex items-center justify-between gap-4 text-textGrey">
              {/* {!account?.Review?.id &&
                order?.status !== EOrderStatus.CANCELLED && (
                  <div
                    className="w-fit h-fit"
                    onClick={() => setModalOpen(true)}
                  >
                    <Tooltip title="Give a Review">
                      <VscFeedback className="cursor-pointer text-[18px] md:text-[20px]" />
                    </Tooltip>
                  </div>
                )} */}

              {order?.status !== EOrderStatus.CANCELLED && (
                <AppModal
                  title="Account Information"
                  button={
                    <Tooltip title="Open account details">
                      <Image
                        src={"/assets/icons/eye.png"}
                        width={40}
                        height={40}
                        className="size-4 md:size-5 cursor-pointer min-w-4 md:min-w-5 min-h-4 md:min-h-5"
                        alt="eye"
                      />
                    </Tooltip>
                  }
                >
                  <OrderSecretViewPop account={account}></OrderSecretViewPop>
                </AppModal>
              )}

              <Link href={`/order-details/${orderId}`}>
                <Tooltip title="Message vendor">
                  <Image
                    src={"/assets/icons/message.png"}
                    width={40}
                    height={40}
                    className="size-4 md:size-5 cursor-pointer min-w-4 md:min-w-5 min-h-4 md:min-h-5"
                    alt="message"
                  />
                </Tooltip>
              </Link>
              {/* <button className="flex items-center gap-1 text-sm ">
                            <MdOutlinePauseCircle /> Pause Ad
                        </button> */}
              {/* <button onClick={() => deleteAccount(account?.id)} className="bg-background group p-2 rounded-full">
                            <AiOutlineDelete className="group-hover:text-red cursor-pointer text-lg" />
                        </button> */}
            </div>
          </div>
          <div>
            <AvatarComponent
              onlyBatch
              withName
              user={account?.ownBy as IUser}
            />
          </div>
        </div>
      </div>

      <AppModal
        // closeable={false}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      >
        <div className="w-[80dvw] md:w-[500px]">
          <div className="max-w-lg mx-auto py-4">
            <h3 className="text-sm lg:text-lg  font-medium text-textBlack">
              Leave a review
            </h3>
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => setFeedback("positive")}
                className={`flex items-center gap-1 border rounded-full px-2 py-0.5 border-green-500 text-green-500 ${
                  feedback === "positive" && "bg-green-500 text-white"
                }`}
              >
                <AiOutlineLike /> Positive
              </button>
              <button
                onClick={() => setFeedback("negative")}
                className={`flex items-center gap-1 border rounded-full px-2 py-0.5 border-red text-red  ${
                  feedback === "negative" && "bg-red text-white"
                }`}
              >
                <AiOutlineDislike /> Negative
              </button>
            </div>

            {(feedback === "positive" || feedback === "negative") && (
              <form
                className="space-y-2 pt-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <AppFormTextarea
                  label="Leave feedback"
                  name="reviewText"
                  register={register}
                  required
                  error={errors?.reviewText}
                />

                <div className=" contact-input-label   flex items-center">
                  <input
                    {...register("isAnonymous")}
                    type="checkbox"
                    id="checkbox"
                    className="mr-[8px] w-[20px] h-[20px] cursor-pointer"
                  />

                  <label
                    htmlFor="checkbox"
                    className="text-sm lg:text-base cursor-pointer text-textGrey"
                  >
                    I want to stay anonymous
                  </label>
                </div>

                <div className="flex justify-end">
                  <AppButton label="Send" size="medium" />
                </div>
              </form>
            )}
          </div>
        </div>
      </AppModal>
    </>
  );
};

export default MyPurchaseAccountCard;

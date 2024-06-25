import OrderDetailsAccountInfo from "@/components/orders/OrderDetailsAccountInfo";
import Loading from "@/components/ui/Loading";
import HomeLayout from "@/layout/HomeLayout";
import { useGetOrderByIdQuery } from "@/redux/features/order/orderApi";
import { AccountCategory, EOrderStatus, IOrder } from "@/types/common";
import { getImageUrlByCategory } from "@/utils/getImageUrl";
import Image from "next/image";
import dateFormat from "dateformat";
import { useParams } from "next/navigation";
import { BiDislike, BiLike } from "react-icons/bi";
import { GoDotFill } from "react-icons/go";
import { IoWalletOutline } from "react-icons/io5";
import { PiCurrencyDollarBold } from "react-icons/pi";
import OrderDetailsMessaging from "@/components/orders/OrderDetailsMessaging";
import appDateFormate from "@/utils/appDateFormate";
import AppErrorComponent from "@/components/ui/AppErrorComponent";
import { Tooltip } from "antd";
import AppDrawer from "@/components/ui/AppDrawer";
import { findImageUrlByCategory } from "@/shared";
import AttentionAlert from "@/components/shared/AttentionAlert";
import { MdOutlineReviews } from "react-icons/md";
import { useState } from "react";
import AppModal from "@/components/ui/AppModal";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import AppFormTextarea from "@/components/ui/AppFormTextarea";
import { useAddReviewMutation } from "@/redux/features/review/reviewApi";
import { toast } from "react-toastify";
import AppButton from "@/components/ui/AppButton";

interface FormData {
  reviewText: string;
  isAnonymous: boolean;
}
const OrderDetails = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const isCancelled = false;
  const [feedback, setFeedback] = useState("");
  const [makeReview] = useAddReviewMutation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();
  const location = useParams();
  const { data, isLoading, isError, error } = useGetOrderByIdQuery(
    location?.id,
    { skip: !location?.id }
  );
  if (isLoading) {
    return (
      <HomeLayout>
        <Loading></Loading>
      </HomeLayout>
    );
  } else if (isError) {
    return (
      <HomeLayout>
        <AppErrorComponent></AppErrorComponent>
      </HomeLayout>
    );
  } else if (!data || !data.data) {
    return (
      <HomeLayout>
        <AppErrorComponent></AppErrorComponent>
      </HomeLayout>
    );
  }
  const mainData = data.data as IOrder;

  const accountDetailsInfo = {
    id: mainData.id || "",
    email: mainData.account.username || "",
    password: mainData.account.password || "",
    preview: mainData.account.preview || "",
    additionalEmail: mainData.account.additionalEmail || "",
    additionalPassword: mainData.account.additionalPassword || "",
    additionalDescription: mainData.account.additionalDescription || ""
  };
  console.log(mainData);
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const submittedData = [
      {
        sellerId: mainData?.account?.ownBy?.id,
        accountId: mainData?.account?.id,
        reviewText: data?.reviewText,
        reviewStatus: feedback,
        isAnonymous: data?.isAnonymous
      }
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
          toastId: 1
        });
      });
  };
  return (
    <HomeLayout>
      <div className="container py-5 md:py-10 2xl:py-12">
        <h1 className="text-textBlack font-medium">
          Orders/ <span className="text-lg md:text-xl">Order Details</span>
        </h1>
        <div className="py-3 md:py-6 flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
          <div className="md:space-x-2 space-y-1 md:space-y-0">
            <p className="text-textBlack w-full flex items-center gap-1 md:gap-2 font-medium text-sm line-clamp-1 md:text-[28px]">
              <p className="w-24 md:w-fit">Order No:</p>
              <span className="text-textGrey text-sm md:text-base font-normal">
                #{location.id}
              </span>
            </p>
            <p
              className={`py-1 px-2 w-fit rounded-full text-xs flex items-center gap-2 text-[#027a48] bg-[#ECFDF3] ${
                (mainData.status === "pending" &&
                  "text-[#B54708] bg-[#FFFAEB]") ||
                (mainData.status === "cancelled" &&
                  "text-[#B42318] bg-[#FEF3F2]") ||
                (mainData.status === "completed" &&
                  "text-[#027A48] bg-[#ECFDF3]")
              }`}
            >
              <GoDotFill
                className={`${
                  (mainData.status === "pending" &&
                    "text-[#B54708] bg-[#FFFAEB]") ||
                  (mainData.status === "cancelled" &&
                    "text-[#B42318] bg-[#FEF3F2]") ||
                  (mainData.status === "completed" &&
                    "text-[#027A48] bg-[#ECFDF3]")
                }`}
              />
              {mainData.status}
            </p>
          </div>
          <div className="space-x-2 md:space-y-2 flex items-center md:block">
            <p className="text-sm text-textBlack">Order {mainData.status}</p>
            <p className="text-xs text-textGrey">
              {dateFormat(new Date(mainData.createdAt), appDateFormate)}
            </p>
          </div>
        </div>

        {/* this is main div  */}
        <div className="flex gap-4 2xl:gap-6 rounded-lg lg:rounded-2xl 2xl:max-h-[75vh] overflow-auto bg-white md:p-4 lg:p-5 2xl:p-6">
          <div className="w-full md:w-[55%] h-full space-y-3 2xl:space-y-4">
            <div
              className={`w-full flex flex-col md:flex-row items-start justify-between rounded-lg gap-2 md:gap-4 2xl:gap-6 bg-[#FBFAFA] p-2 md:p-4 2xl:p-5`}
            >
              {/* this is image and description div  */}
              <div className="flex items-center gap-1 md:gap-2 2xl:gap-3">
                <Image
                  src={findImageUrlByCategory(mainData?.account.category)}
                  className="size-9 md:size-10 lg:size-14 2xl:size-16"
                  width={70}
                  height={70}
                  alt="social icons"
                />
                {/* this is description div  */}
                <div className="">
                  <h3 className="text-textBlack line-clamp-1 font-medium text-sm md:text-base flex items-center justify-between md:justify-normal">
                    {mainData?.account.name}
                  </h3>
                  <p className="text-textGrey line-clamp-1 pt-0.5 text-xs md:text-sm">
                    {mainData?.account.description}
                  </p>
                </div>
              </div>
              <div className="flex w-full items-center justify-between md:justify-end gap-1">
                <h2 className="text-textBlack font-bold flex items-center justify-end">
                  <PiCurrencyDollarBold />
                  {mainData?.account.price}
                </h2>
                <AppDrawer
                  button={
                    <Image
                      src={"/assets/icons/message.png"}
                      width={40}
                      height={40}
                      className="size-4 md:size-5 md:hidden cursor-pointer"
                      alt="message"
                    />
                  }
                >
                  <OrderDetailsMessaging order={mainData} />
                </AppDrawer>
              </div>
            </div>
            {mainData?.status === "completed" && (
              <div className="pt-2 space-y-2">
                <OrderDetailsAccountInfo
                  index={0}
                  title="Account Details"
                  isNotDeletable
                  account={accountDetailsInfo}
                />
              </div>
            )}
            {isCancelled ? (
              <div className="space-y-2 py-10 flex items-center text-textBlack justify-center flex-col">
                <Image
                  src={"/assets/orders/order-cancel.png"}
                  width={120}
                  height={120}
                  alt="order cancelled"
                />
                <h3>Your order was cancelled</h3>
              </div>
            ) : (
              <>
                <div className="py-5 flex items-center justify-between">
                  <h4>Payment Method </h4>
                  <button className="flex items-center gap-1">
                    <IoWalletOutline />
                    Wallet
                  </button>
                </div>
                {/* <div className="">
                  <h4>Leave a Review</h4>
                  <div className="flex items-center gap-6 pt-2.5">
                    <button className="bg-[#F4F5F5] text-sm text-textBlack flex items-center gap-0.5 py-1.5 px-3 rounded-full">
                      <BiLike />
                      Positive
                    </button>
                    <button className="bg-[#F4F5F5] text-sm text-textBlack flex items-center gap-0.5 py-1.5 px-3 rounded-full">
                      <BiDislike />
                      Negative
                    </button>
                  </div>
                </div> */}
              </>
            )}
            {!mainData?.account?.Review?.id &&
              mainData?.status !== EOrderStatus.CANCELLED && (
                <div className="w-fit h-fit" onClick={() => setModalOpen(true)}>
                  <Tooltip title="Give a Review">
                    <MdOutlineReviews className="cursor-pointer text-[18px] md:text-[20px] text-[#69645ad9]" />
                  </Tooltip>
                </div>
              )}
            <p className="bg-yellow-100 rounded p-2 md:p-4 text-sm md:text-base text-gray-800">
              “When logging into your social media account, it is highly
              recommended to use a VPN or proxy. These tools provide an extra
              layer of security by encrypting your internet connection and
              masking your IP address. GET VPN”
            </p>
          </div>
          <div className="hidden md:block border border-[#EFECEC]"></div>
          <div className="hidden md:block w-[43%] h-full">
            <OrderDetailsMessaging order={mainData} />
          </div>
        </div>

        {/* <div className='absolute md:hidden bottom-20 left-0 w-full'>
          <p className="bg-yellow-100 mx-4 rounded p-2 md:p-4 text-sm md:text-base text-gray-800">“When logging into your social media account, it is highly recommended to use a VPN or proxy. These tools provide an extra layer of security by encrypting your internet connection and masking your IP address. GET VPN”</p>
        </div> */}
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
    </HomeLayout>
  );
};

export default OrderDetails;

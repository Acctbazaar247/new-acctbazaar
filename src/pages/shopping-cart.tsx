import CartAccountCard from "@/components/shared/CartAccountCard";
import AppButton from "@/components/ui/AppButton";
import AppFormTextarea from "@/components/ui/AppFormTextarea";
import AppModal from "@/components/ui/AppModal";
import HomeLayout from "@/layout/HomeLayout";
import PrivateLayout from "@/layout/PrivateLayout";
import { useGetMyCartsQuery } from "@/redux/features/cart/cartApi";
import { useGetCurrencyOfLoggedInUserQuery } from "@/redux/features/currency/currencyApi";
import { useAddOrderMutation } from "@/redux/features/order/orderApi";
import { useAddReviewMutation } from "@/redux/features/review/reviewApi";
import { useAppSelector } from "@/redux/hook";
import { ICart } from "@/types/common";
import config from "@/utils/config";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineDislike, AiOutlineLike, AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiWallet } from "react-icons/ci";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { toast } from "react-toastify";

interface FormData {
  reviewText: string;
  isAnonymous: boolean
}

export default function ShoppingCart() {
  const router = useRouter()
  const [cartsData, setCartsData] = useState<ICart[]>([]);
  const { user } = useAppSelector((state) => state.user);
  const {
    register,
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();
  const { data: cartsInfo, isLoading: isCartLoading } = useGetMyCartsQuery("");
  const myCarts = (cartsInfo?.data as ICart[]) || ([] as ICart[]);
  const [feedback, setFeedback] = useState("")
  const [successStatus, setSuccessStatus] = useState({
    totalItems: 0,
    isDone: false,
  });
  const [modalOpen, setModalOpen] = useState(false)
  const [
    makeOrder,
    { isError: isOrderError, isLoading: isOrderLoading, isSuccess },
  ] = useAddOrderMutation();
  const {
    data,
    isLoading: isCurrencyLoading,
    isError: isCurrencyError,
  } = useGetCurrencyOfLoggedInUserQuery("");

  const [makeReview] = useAddReviewMutation()

  const mainData = cartsInfo?.data as ICart[];
  useEffect(() => {
    setCartsData(cartsInfo?.data);
    if (successStatus.isDone && !modalOpen) {
      router.push('/marketplace');
    }
  }, [modalOpen, router, successStatus.isDone])

  const totalPrice = mainData?.reduce((pre, current) => {
    if (current.account?.price) {
      return current.account?.price + pre;
    }
    return 0;
  }, 0);

  const ServiceCharge = (
    (totalPrice / 100) *
    config.accountSellServiceCharge
  ).toFixed(2);

  const mainPrice = totalPrice + parseFloat(ServiceCharge);

  const handleClick = async () => {
    const currency = data?.data?.amount;
    if (currency < mainPrice) {
      return toast.error("Sorry you don't have enough money", { toastId: 1 });
    } else {

      try {
        for (const ele of mainData) {
          const res = await makeOrder({ accountId: ele.accountId }).unwrap();
          // Handle success if needed
        }

        toast.success("Order placed successfully", { toastId: 1 });
        setSuccessStatus({ isDone: true, totalItems: mainData.length });
        setModalOpen(true);
        // router.push('/marketplace');

      } catch (err: any) {
        toast.error(err.message);
      }

      // await mainData.forEach((ele) => {
      //   makeOrder({ accountId: ele.accountId })
      //     .unwrap()
      //     .then((res) => { })
      //     .catch((err) => {
      //       toast.error(err.message);
      //     });
      // });

    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {

    const submittedData = cartsData.map(cartD => ({
      sellerId: cartD?.account?.ownBy?.id,
      accountId: cartD?.account?.id,
      reviewText: data?.reviewText,
      reviewStatus: feedback,
      isAnonymous: data?.isAnonymous
    }))


    await makeReview(submittedData)
      .unwrap()
      .then((res: any) => {
        toast.success("Add review successful!", { toastId: 1 });
        setModalOpen(true);
        router.push('/marketplace');
      })
      .catch((res: any) => {
        toast.error(res?.data?.message || "Something went wrong", {
          toastId: 1
        });
      });
  };

  return (
    <HomeLayout>
      <PrivateLayout>

        <div className="container py-5 md:py-10 2xl:py-12">
          {/* this is top section div  */}
          <div>
            <h2 className="title">Shopping cart</h2>
          </div>

          {/* this is main div  */}
          <div className="flex flex-col md:flex-row gap-4 lg:gap-0 min-h-[80dvh] pt-2 md:pt-4 lg:pt-5 2xl:pt-6">
            <div className="md:w-[60%] min-h-full bg-white max-h-[60dvh] overscroll-auto md:max-h-[80dvh]">
              <h3 className="font-medium px-4 pt-4">All Items ({myCarts.length})</h3>
              {myCarts.length > 0 ? (
                <div className="max-h-[60dvh] overflow-auto">
                  {myCarts?.map((account, index) => (
                    <CartAccountCard
                      account={account}
                      key={index}
                      isModal={
                        isCartLoading || isOrderLoading || isCurrencyLoading
                      }
                    />
                  ))}
                </div>
              ) : (
                <div className="px-4 py-12 text-[#828D99] flex items-center justify-center flex-col gap-2">
                  <Image
                    width={80}
                    height={80}
                    className="size-20 object-contain"
                    src={"/assets/icons/empty-cart.png"}
                    alt="country icon"
                  />
                  Shopping cart is empty
                </div>
              )}
            </div>
            <div className="hidden md:block border border-[#E1DBDB] 2xl:mr-6"></div>
            <div className="w-full md:w-[37%] min-h-full overflow-y-auto bg-white p-2 md:p-4 2xl:p-6">
              {myCarts.length > 0 && (
                <>
                  <h2 className="subTitle">Order Summary</h2>
                  <div className="pt-4">
                    <h4>Summary</h4>
                    <div className="py-3">
                      <div className="flex items-center justify-between">
                        <p className="textG">Subtotal:</p>
                        <h2 className="text-textBlack font-bold flex items-center">
                          <PiCurrencyDollarBold />
                          {totalPrice}
                        </h2>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="textG">
                          Service charge ({config.accountSellServiceCharge}%):
                        </p>
                        <h2 className="text-textBlack font-bold flex items-center">
                          <PiCurrencyDollarBold />
                          {ServiceCharge}
                        </h2>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="textB">Total:</p>
                      <h2 className="text-textBlack font-bold flex items-center">
                        <PiCurrencyDollarBold />
                        {mainPrice}
                      </h2>
                    </div>
                    <div className="flex items-center justify-between py-6">
                      <p className="textB">Payment Method:</p>
                      <h2 className="text-textBlack font-bold flex gap-1 items-center">
                        <CiWallet className="text-xl" />
                        My Wallet
                      </h2>
                    </div>
                    {isCartLoading || isOrderLoading || isCurrencyLoading ? (
                      <button className="appBtn px-10 flex items-center justify-center w-full">
                        <AiOutlineLoading3Quarters className="animate-spin text-white text-xl" />
                      </button>
                    ) : data?.data?.amount < mainPrice ? (
                      <div className="">
                        <button className="appBtn bg-primary/50 border-none hover:bg-primary/50 w-full flex items-center gap-2 justify-center ">
                          <span>Pay</span> {mainPrice}
                        </button>
                        <p className="text-textGreyBlack pt-2 text-sm">
                          Your wallet have not enough money for pay.
                        </p>
                      </div>
                    ) : (
                      <button
                        onClick={handleClick}
                        className="appBtn w-full flex items-center gap-2 justify-center "
                      >
                        <span>Pay</span> {mainPrice}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <AppModal
          // closeable={false}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        >
          <div className="w-[80dvw] md:w-[500px]">
            <div className='max-w-lg mx-auto py-4'>
              <Image width={200} height={160} src="/assets/auth/congratulations.png" alt="" className="mx-auto" />

              <h2 className="text-lg lg:text-2xl font-medium text-textBlack text-center pt-2">Purchase successful</h2>
              <p className="text-textDarkGrey text-lg text-center">Successfully purchased 2 accounts</p>

              <Link href={"/my-purchase"} className="text-primary hover:text-primary hover:underline underline block text-center py-4 font-semibold text-lg">View order details</Link>

              <h3 className="text-sm lg:text-lg  font-medium text-textBlack">Leave a review</h3>
              <div className='flex items-center gap-4 pt-2'>
                <button onClick={() => setFeedback("positive")} className={`flex items-center gap-1 border rounded-full px-2 py-0.5 border-green-500 text-green-500 ${feedback === "positive" && "bg-green-500 text-white"}`}><AiOutlineLike /> Positive</button>
                <button onClick={() => setFeedback("negative")} className={`flex items-center gap-1 border rounded-full px-2 py-0.5 border-red text-red  ${feedback === "negative" && "bg-red text-white"}`}><AiOutlineDislike /> Negative</button>
              </div>


              {(feedback === "positive" || feedback === "negative") && <form className="space-y-2 pt-4" onSubmit={handleSubmit(onSubmit)}>

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

                  <label htmlFor="checkbox" className="text-sm lg:text-base cursor-pointer text-textGrey">
                    I want to stay anonymous
                  </label>
                </div>

                <div className='flex justify-end'>
                  <AppButton
                    label="Send"
                    size="medium"
                  />
                </div>
              </form>}
            </div>
          </div>
        </AppModal>
      </PrivateLayout>
    </HomeLayout>
  );
}

import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import config from "@/utils/config";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  useBecomeSellerMutation,
  useBecomeSellerWithWalletMutation,
} from "@/redux/features/auth/authSellerApi";
import { ResponseSuccessType } from "@/types/common";
import { IoWalletOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setUser } from "@/redux/features/user/userSlice";
import { setMakeSeller } from "@/redux/features/auth/authSlice";
type TMakePayment = {
  updateProgress: Dispatch<SetStateAction<number>>;
};

export default function MakePayment({ updateProgress }: TMakePayment) {
  const [selectedOption, setSelectedOption] = useState<string>("bank");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);

  const [becomeASeller, { isLoading }] = useBecomeSellerMutation();
  const [becomeASellerWithWallet, { isLoading: walletPaymentLoading }] =
    useBecomeSellerWithWalletMutation();

  const handlePayment = () => {
    if (selectedOption === "bank") {
      becomeASeller({ payWith: "paystack" })
        .unwrap()
        .then((res: ResponseSuccessType) => {
          if (!res?.data) {
            toast.error(res?.data?.message || "something went wrong ", {
              toastId: 1,
            });
          } else {
            router.push(res?.data?.txId);
          }
        })
        .catch((err) => {
          toast.error(err?.data?.message || "something went wrong", {
            toastId: 1,
          });
        });
    } else if (selectedOption === "crypto") {
      becomeASeller({ payWith: "nowpay" })
        .unwrap()
        .then((res: ResponseSuccessType) => {
          if (!res?.data) {
            toast.error(res?.data?.message || "something went wrong ", {
              toastId: 1,
            });
          } else {
            router.push(res.data.txId);
          }
        })
        .catch((err) => {
          toast.error(err?.data?.message || "something went wrong", {
            toastId: 1,
          });
        });
    } else if (selectedOption === "wallet") {
      becomeASellerWithWallet("")
        .unwrap()
        .then((res: ResponseSuccessType) => {
          toast.success(res?.message, { toastId: 1 });

          dispatch(setMakeSeller());
        })
        .catch((err) => {
          toast.error(err?.message || "something went wrong", { toastId: 1 });
        });
    } else {
      toast.warn("Select any one Payment option", { toastId: 1 });
    }
  };

  return (
    <div className="bg-white rounded-2xl w-full min-h-[60vh] md:min-h-[80dvh] flex items-center justify-center flex-col">
      <h3 className="text-xl md:text-3xl font-bold">Make A One Time Payment</h3>
      <div className="py-6 space-y-6 md:w-[45%] mx-auto">
        <div
          onClick={() => setSelectedOption("bank")}
          className={`flex gap-5 p-4 md:p-6 border  rounded-lg hover:bg-primary/5 cursor-pointer ${
            selectedOption === "bank" ? "border-primary" : "border-borderColor"
          }`}
        >
          <Image
            width={32}
            height={32}
            className="size-8"
            src={"/assets/icons/card-receive.png"}
            alt="bank payment"
          />
          <div className="space-y-1">
            <h3 className="text-textBlack font-bold">Bank / Card payment</h3>
            <p className="text-sm text-textGrey">
              Make deposit using either your card or transfer to our local bank
            </p>
          </div>
        </div>

        <div
          onClick={() => setSelectedOption("crypto")}
          className={`flex gap-5 p-4 md:p-6 border  rounded-lg hover:bg-primary/5 cursor-pointer ${
            selectedOption === "crypto"
              ? "border-primary"
              : "border-borderColor"
          }`}
        >
          <Image
            width={32}
            height={32}
            className="size-8"
            src={"/assets/icons/doller-recive.png"}
            alt="bank payment"
          />
          <div className="space-y-1">
            <h3 className="text-textBlack font-bold">Crypto</h3>
            <p className="text-sm text-textGrey">
              Make payment using any of the crypto exchange platform to deposit
              to an address
            </p>
          </div>
        </div>

        <div
          onClick={() => setSelectedOption("wallet")}
          className={`flex gap-5 p-4 md:p-6 border  rounded-lg hover:bg-primary/5 cursor-pointer ${
            selectedOption === "wallet"
              ? "border-primary"
              : "border-borderColor"
          }`}
        >
          <IoWalletOutline className="text-2xl" />
          <div className="space-y-1">
            <h3 className="text-textBlack font-bold">Acctbazaar Wallet</h3>
            <p className="text-sm text-textGrey">
              Make payment using your Acctbazaar account Balance
            </p>
          </div>
        </div>
      </div>

      {isLoading || walletPaymentLoading ? (
        <button className="appBtn px-14 flex items-center justify-center">
          <AiOutlineLoading3Quarters className="animate-spin text-white text-2xl" />
        </button>
      ) : (
        <button onClick={handlePayment} className="appBtn">
          Pay ${config.sellerPay}
        </button>
      )}
    </div>
  );
}

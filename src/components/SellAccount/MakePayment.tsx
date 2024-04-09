import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import config from "@/utils/config";
import { useGetCurrencyOfLoggedInUserQuery } from "@/redux/features/currency/currencyApi";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useBecomeSellerMutation } from "@/redux/features/auth/authSellerApi";
import { ResponseSuccessType } from "@/types/common";
type TMakePayment = {
  updateProgress: Dispatch<SetStateAction<number>>;
};

export default function MakePayment({ updateProgress }: TMakePayment) {

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const router = useRouter();

  const [becomeASeller, { isLoading }] = useBecomeSellerMutation();

  const handlePayment = () => {
    if (selectedOption === "bank") {
      becomeASeller({ payWith: "paystack" })
        .unwrap()
        .then((res: ResponseSuccessType) => {
          if (!res?.data) {
            toast.error("something went wrong ");
          } else {
            router.push(res.data.txId);
          }
        })
        .catch((err) => {
          toast.error("something went wrong");
        });
    } else if (selectedOption === "crypto") {
      becomeASeller({ payWith: "nowpay" })
        .unwrap()
        .then((res: ResponseSuccessType) => {
          if (!res?.data) {
            toast.error("something went wrong ");
          } else {
            router.push(res.data.txId);
          }
        })
        .catch((err) => {
          toast.error("something went wrong");
        });
    } else {
      toast.warn("Select any one Payment option");
    }
  };

  return (
    <div className="bg-white rounded-2xl w-full min-h-[60vh] md:min-h-[80dvh] flex items-center justify-center flex-col">
      <h3 className="text-xl md:text-3xl font-bold">Make Payment</h3>
      <div className="py-6 space-y-6 md:w-2/5 mx-auto">
        <div
          onClick={() => setSelectedOption("bank")}
          className={`flex gap-5 p-4 md:p-6 border  rounded-lg hover:bg-primary/5 cursor-pointer ${selectedOption === "bank" ? "border-primary" : "border-[#C5C5C5]"
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
              Make deposit using either your card or transfer to our local
              bank
            </p>
          </div>
        </div>

        <div
          onClick={() => setSelectedOption("crypto")}
          className={`flex gap-5 p-4 md:p-6 border  rounded-lg hover:bg-primary/5 cursor-pointer ${selectedOption === "crypto"
            ? "border-primary"
            : "border-[#C5C5C5]"
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
              Make payment using any of the crypto exchange platform to
              deposit to an address
            </p>
          </div>
        </div>
      </div>
      {isLoading ? (
        <button className="appBtn px-10 flex items-center justify-center">
          <AiOutlineLoading3Quarters className="animate-spin text-white text-2xl" />
        </button>
      ) : (
        <button onClick={handlePayment} className="appBtn">
          Pay $10 (₦14,500)
        </button>
      )}
    </div>
  );
}

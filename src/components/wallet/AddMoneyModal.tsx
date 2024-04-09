import Image from "next/image";
import AppModal from "../ui/AppModal";
import AppInput from "../ui/AppInput";
import { PiCurrencyDollarBold } from "react-icons/pi";
import config from "@/utils/config";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/hook";
import {
  useAddCurrencyRequestMutation,
  useAddCurrencyRequestWithPayStackMutation,
} from "@/redux/features/currencyRequest/currencyRequestApi";

export default function AddMoneyModal() {
  const [amount, setAmount] = useState(0);
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const [addRequest, { isLoading, isError, isSuccess, error }] =
    useAddCurrencyRequestMutation();
  const [addRequestWithPayStack, { isLoading: isPayStackLoading }] =
    useAddCurrencyRequestWithPayStackMutation();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handlePay = () => {
    if (amount < config.fundMinMoney) {
      toast.error(`Minimum amount is ${config.fundMinMoney}$`);
      return;
    }
    addRequest({ amount })
      .unwrap()
      .then((res: any) => {
        if (res.error) {
          toast.error("something went wrong" + res.error);
        } else {
          router.push(res.data?.url);
        }
      })
      .catch(() => {
        toast.error("something went wrong");
      });
  };

  const handllePayWithPayStack = () => {
    if (amount < config.fundMinMoney) {
      toast.error(`Minimum amount is ${config.fundMinMoney}$`);
      return;
    }
    addRequestWithPayStack({ amount })
      .unwrap()
      .then((res: any) => {
        if (res.success) {
          router.push(res.data?.url);
        } else {
          toast.error("something went wrong");
        }
      })
      .catch((err) => {
        toast.error("something went wrong" + err?.message);
      });
  };
  const handleSubmit = (data: any): void => {
    if (!selectedOption) {
      toast.error("Select a payment ");
      return;
    }

    if (selectedOption === "bank") {
      handllePayWithPayStack();
    } else {
      handlePay();
    }
  };
  return (
    <AppModal
      button={
        <div className="flex items-center justify-center flex-col space-y-2">
          <Image
            width={60}
            height={60}
            src="/assets/icons/add.png"
            alt=""
            className="size-14 rounded-lg border border-[#E6E0E0] hover:bg-[#FFCAAD]/15 cursor-pointer"
          />
          <h4>Add Money</h4>
        </div>
      }
      title="Fund your wallet"
      subTitle="Fund your wallet with any of these two channels"
    >
      <div className="space-y-4 pt-4 md:w-[520px]">
        <AppInput
          icon={<PiCurrencyDollarBold />}
          type="number"
          placeholder="Enter Amount"
          value={amount.toString()}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <button
          onClick={() => setSelectedOption("bank")}
          className={`flex gap-5 p-4 border border-[#C5C5C5] rounded-lg transition-all w-full text-left ${
            selectedOption === "bank" ? "border-orange-400" : ""
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
        </button>

        <button
          onClick={() => setSelectedOption("crypto")}
          className={`flex gap-5 p-4 border border-[#C5C5C5] rounded-lg transition-all w-full text-left ${
            selectedOption === "crypto" ? "border-orange-400" : ""
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
        </button>
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={isLoading || isPayStackLoading}
            className="mt-4 rounded-lg  px-7 py-2 bg-orange-500 text-white  hover:opacity-80 transition-all disabled:opacity-80"
          >
            {isLoading || isPayStackLoading ? "Loading" : "Continue"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}

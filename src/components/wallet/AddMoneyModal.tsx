import {
  useAddCurrencyRequestMutation,
  useAddCurrencyRequestWithPayStackMutation
} from "@/redux/features/currencyRequest/currencyRequestApi";
import { useAppSelector } from "@/redux/hook";
import config from "@/utils/config";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { toast } from "react-toastify";
import AppInput from "../ui/AppInput";
import AppModal from "../ui/AppModal";
import { FaBitcoin } from "react-icons/fa";
export default function AddMoneyModal() {
  const [amount, setAmount] = useState(0);
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const [addRequest, { isLoading, isError, isSuccess, error }] =
    useAddCurrencyRequestMutation();
  const [addRequestWithPayStack, { isLoading: isPayStackLoading }] =
    useAddCurrencyRequestWithPayStackMutation();
  const [selectedOption, setSelectedOption] = useState<string | null>("crypto");

  const handlePay = () => {
    if (selectedOption === "btc") {
      if (amount < config.fundBtcMinMoney) {
        return toast.error(`Minimum amount is ${config.fundBtcMinMoney}`, {
          toastId: 1
        });
      }
    } else if (amount < config.fundMinMoney) {
      return toast.error(`Minimum amount is ${config.fundMinMoney}`, {
        toastId: 1
      });
    }
    addRequest({ amount, pay_currency_btc: selectedOption === "btc" })
      .unwrap()
      .then((res: any) => {
        if (res.error) {
          toast.error(res?.data?.message || "something went wrong ", {
            toastId: 1
          });
        } else {
          router.push(res.data?.url);
        }
      })
      .catch(() => {
        toast.error("something went wrong", { toastId: 1 });
      });
  };

  const handllePayWithPayStack = () => {
    if (amount < config.fundMinMoney) {
      toast.error(`Minimum amount is ${config.fundMinMoney}$`, { toastId: 1 });
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
        toast.error(err.data?.message || "something went wrong", {
          toastId: 1
        });
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
            className="size-14 rounded-lg border border-brown/10 hover:bg-primary/15 cursor-pointer"
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
        {/* <button
          // onClick={() => setSelectedOption("bank")}
          onClick={() =>
            toast.error("Currently not available", { toastId: "1" })
          }
          className={`flex gap-5 p-4 border border-borderColor rounded-lg transition-all w-full text-left ${
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
              Deposit funds directly using Bank transfer or card payment.
            </p>
          </div>
        </button> */}

        <button
          onClick={() => setSelectedOption("crypto")}
          className={`flex gap-5 p-4 border border-borderColor rounded-lg transition-all w-full text-left ${
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
            <h3 className="text-textBlack font-bold">Crypto Deposit</h3>
            <p className="text-sm text-textGrey">
              Fund your wallet with popular cryptocurrencies like USDT, ETH,
              BNB, SOL and more.
            </p>
          </div>
        </button>
        {/* <button
          onClick={() => setSelectedOption("btc")}
          className={`flex gap-5 p-4 border border-borderColor rounded-lg transition-all w-full text-left ${
            selectedOption === "btc" ? "border-orange-400" : ""
          }`}
        >
          <FaBitcoin className={`text-[30px] text-orange-400`}></FaBitcoin>

          <div className="space-y-1">
            <h3 className="text-textBlack font-bold">Bitcoin Deposit</h3>
            <p className="text-sm text-textGrey">
              Make a deposit exclusively using Bitcoin.
            </p>
          </div>
        </button> */}
        {/* <p className=" ">
          For naira payment, DM
          <a href="https://t.me/acctbazaar1" className="text-blue-500">
            {" "}
            @acctbazaar1
          </a>{" "}
           on telegram
        </p> */}
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

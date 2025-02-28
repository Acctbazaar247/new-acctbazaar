import {
  useAddCurrencyRequestMutation,
  useAddCurrencyRequestWithKoraPayMutation,
  useAddCurrencyRequestWithOxMutation,
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
import Swal from "sweetalert2";
import ManualPayment from "./ManualPayment";
import { MdOnlinePrediction } from "react-icons/md";
import { GiGears } from "react-icons/gi";
import { BsBank2, BsCashCoin } from "react-icons/bs";
import { Select } from "antd";
import { oxDepositOption } from "@/shared/btcOption";
export default function AddMoneyModal() {
  const [amount, setAmount] = useState(0);
  const [paymentType, setPaymentType] = useState<string | null>(null);
  const [oxType, setOxType] = useState<string | null>(null);
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const [addRequest, { isLoading, isError, isSuccess, error }] =
    useAddCurrencyRequestMutation();
  const [addRequestWithPayStack, { isLoading: isPayStackLoading }] =
    useAddCurrencyRequestWithPayStackMutation();
  const [addRequestWithKoraPay, { isLoading: isKoraPayLoading }] =
    useAddCurrencyRequestWithKoraPayMutation();
    const [addRequestWithOx, { isLoading: isOxLoading }] =useAddCurrencyRequestWithOxMutation()
  const [selectedOption, setSelectedOption] = useState<string | null>();
  const [isBank, setIsBank] = useState(false);
  const [modalOpen, setModalOpen] = useState(false)
  const handlePay = () => {
    if (selectedOption === "crypto") { 
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
  const handllePayWithKoraPay = () => {
    if (amount < config.fundMinMoney) {
      toast.error(`Minimum amount is ${config.fundMinMoney}$`, { toastId: 1 });
      return;
    }
    addRequestWithKoraPay({ amount })
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
const handlePayWithBtc=()=>{
  if (amount < config.fundBtcMinMoney) {
    toast.error(`Minimum amount is ${config.fundBtcMinMoney}$`, { toastId: 1 });
    return;
  }
  if(!oxType){
    toast.error("Select a payment type");
    return;
  }
  addRequestWithOx({ amount, pay_currency_btc: true,currency:oxType })
    .unwrap()
    .then((res: any) => {
      if (res.error) {
        console.log(res);
        toast.error(res?.data?.message || "something went wrong ", {
          toastId: 1
        });
      } else {
        router.push(res.data?.url);
      }
    })
    .catch((err) => {
      toast.error(err?.data?.message ||"something went wrong", { toastId: 1 });
    });
}
  const handleSubmit = (data: any): void => {
    if (!selectedOption) {
      toast.error("Select a payment ");
      return;
    }

    if (selectedOption === "bank") {
      handllePayWithPayStack();
    } else if (selectedOption === "bank-kora") {
      handllePayWithKoraPay();
    } 
    else if(selectedOption==="crypto-btc"){
      handlePayWithBtc()
    }
    else {
      handlePay();
    }
  };

  return (
    <AppModal
    setModalOpen={setModalOpen}
    modalOpen={modalOpen}
      button={
        <div onClick={()=>setModalOpen(true)} className="flex items-center justify-center flex-col space-y-2">
          <Image
            width={60}
            height={60}
            src="/assets/icons/add.png"
            alt=""
            className="size-14 rounded-lg border border-brown/10 hover:bg-primary/15 cursor-pointer"
          />
          <h4>Deposit</h4>
        </div>
      }
      title={!paymentType ?"Choose Payment Type":
         paymentType==="online" ? "Automatic Deposit" : "Manual Deposit" }
      subTitle="Fund your wallet via two channels. Manual deposit is ideal for crypto."
    >
     {
      !paymentType ?<div>
        <div> 
          {/* two option online or manual */}
          <div className=" flex mt-5 flex-col md:flex-row md:w-[400px] gap-2 md:gap-5">
            <button className="p-2 py-4 md:p-4 border  rounded-lg transition-all border-borderColor w-full max-w-sm text-left group hover:border-orange-400 " onClick={() => setPaymentType("online")}>
              <div>
                <div className="flex justify-center items-center">
                <BsCashCoin className="size-10 group-hover:text-orange-400  transition-all"></BsCashCoin>

                </div>
                <div>
                  <h3 className="text-center text-textBlack mt-2 group-hover:text-orange-400 font-bold transition-all">Automatic Deposit</h3>
                  <p className="text-xs md:text-sm text-center text-textGrey">Instant deposit via Bank, Card, or Crypto.</p>
                </div>
              </div>
            </button>
            <button disabled={!config.isManualDepositActive} className="gap-5 p-2 py-4 md:p-4 border  disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-borderColor disabled:hover:text-textGrey rounded-lg transition-all w-full max-w-sm text-left group hover:border-orange-400 border-borderColor" onClick={() => setPaymentType("manual")}>
              <div className="w-full">
                <div className="flex justify-center items-center">
                <BsBank2 className="size-10 group-hover:text-orange-400 transition-all"></BsBank2>

                </div>
                <div>
                  <h3 className="text-textBlack  text-center mt-2 group-hover:text-orange-400 font-bold transition-all">Manual Deposit</h3>
                  <p className="text-xs text-center md:text-sm text-textGrey">Processed in 3-5 minutes via bank transfer or crypto. Best for crypto payments.</p>
                </div>
              </div>
              </button>
          </div>
        </div>
      </div>: paymentType === "manual" ? <ManualPayment setModalOpen={setModalOpen} setPaymentType={setPaymentType} /> : <div>
      <div className="space-y-4 pt-4 md:w-[520px]">
        <AppInput
          icon={<PiCurrencyDollarBold />}
          type="number"
          placeholder="Enter Amount"
          value={amount.toString()}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        {/* Bank / Card payment button */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsBank(true);
            setSelectedOption("");
          }}
          className={`gap-5 p-4 border border-borderColor rounded-lg transition-all w-full text-left ${
            isBank ? "border-orange-400" : ""
          }`}
        >
          <div className="flex gap-5">
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
          </div>
          {isBank && (
            <div className="mt-5 flex gap-3 md:gap-4 justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedOption("bank-kora");
                }}
                className={`flex gap-5 p-2 md:p-4 border border-borderColor rounded-lg transition-all w-full max-w-sm text-left ${
                  selectedOption === "bank-kora" ? "border-orange-400" : ""
                }`}
              >
                <div className="space-y-1 w-full text-center">
                  <h3 className="text-textBlack font-bold">KoraPay</h3>
                  <span className="text-xs">(Nigeria only)</span>
                </div>
              </button>

              {/* <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedOption("bank");
                }}
                className={`flex gap-5 p-2 md:p-4 border border-borderColor rounded-lg transition-all w-full text-left ${
                  selectedOption === "bank" ? "border-orange-400" : ""
                }`}
              >
                <div className="space-y-1 text-center w-full">
                  <h3 className="text-textBlack font-bold">Flutterwave</h3>
                  <span className="text-xs">
                    (Nigeria, Africa, UK and  EU)
                  </span>
                </div>
              </button> */}
            </div>
          )}
        </div>
        {selectedOption === "bank-kora" && (
          <p className="text-sm text-textGrey mt-2">
            <strong>Note:</strong> Transaction charges for bank deposits or card
            payments, as directed by CBN, are to be covered by the customer.
          </p>
        )}

        {/* Bank / Card payment button */}
        {/* <div
          onClick={(e) => {
            e.stopPropagation();
            Swal.fire({
              icon: "info",
              title: "Service Unavailable",
              text: "Bank deposit is currently down. Please try again later.",
              confirmButtonColor: "#f97316", 
            });
          }}
          className={`gap-5 p-4 border border-borderColor rounded-lg transition-all w-full text-left ${
            isBank ? "border-orange-400" : ""
          }`}
        >
          <div className="flex gap-5">
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
          </div>
          {isBank && (
            <div className="mt-5 flex gap-3 md:gap-4 justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  Swal.fire({
                    icon: "info",
                    title: "Service Unavailable",
                    text: "Currently Unavailable",
                    confirmButtonColor: "#f97316", 
                  });
                }}
                className={`flex gap-5 p-2 md:p-4 border border-borderColor rounded-lg transition-all w-full max-w-sm text-left ${
                  selectedOption === "bank-kora" ? "border-orange-400" : ""
                }`}
              >
                <div className="space-y-1 w-full text-center">
                  <h3 className="text-textBlack font-bold">KoraPay</h3>
                  <span className="text-xs">(Nigeria only)</span>
                </div>
              </button>
            </div>
          )}
        </div> */}

        {/* Note for Bank / Card payment */}
        {selectedOption == "bank" && (
          <p className="text-sm text-textGrey mt-2">
            <strong>Note:</strong> Transaction charges for bank deposits or card
            payments, as directed by CBN, are to be covered by the customer.
          </p>
        )}

        {/* Crypto Deposit button */}
        {/* <button
          onClick={() => {
            setSelectedOption("crypto");
            setIsBank(false);
          }}
          className={`flex gap-5 p-4 border border-borderColor rounded-lg transition-all w-full text-left ${
            selectedOption === "crypto" ? "border-orange-400" : ""
          }`}
        >
          <Image
            width={32}
            height={32}
            className="size-8"
            src={"/assets/icons/doller-recive.png"}
            alt="crypto payment"
          />
          <div className="space-y-1">
            <h3 className="text-textBlack font-bold">Crypto Deposit</h3>
            <p className="text-sm text-textGrey">
              Fund your wallet with popular cryptocurrencies like USDT, ETH,
              BNB, SOL and more.
            </p>
          </div>
        </button> */}

        {/* Message for Crypto Deposit */}
        {selectedOption === "crypto" && (
          <p className="text-sm text-textGrey mt-2">
            <strong>Important:</strong> Please send the exact amount displayed when making 
            your payment to ensure successful processing. Overpayment 
            will not result in extra credit, and underpayment will lead to insufficient funding.
          </p>
        )}


<button
          onClick={() => {
            setSelectedOption("crypto-btc");
            setIsBank(false);
          }}
          className={`flex gap-5 p-4 border border-borderColor rounded-lg transition-all w-full text-left ${
            selectedOption === "crypto-btc" ? "border-orange-400" : ""
          }`}
        >
          <Image
            width={32}
            height={32}
            className="size-8"
            src={"/assets/icons/doller-recive.png"}
            alt="crypto payment"
          />
          <div className="space-y-1">
            <h3 className="text-textBlack font-bold">OX Deposit</h3>
            <p className="text-sm text-textGrey">
              Fund your wallet with popular cryptocurrencies like USDT, ETH,
              BNB, SOL and more.
            </p>
            {
              selectedOption === "crypto-btc" && (
                <div className="w-full pt-2">
                  <Select className="w-full" placeholder="Select a Crypto" options={oxDepositOption} onChange={setOxType} value={oxType}></Select>
                </div>
              )
            }
          </div>

        </button>
        <div className="flex mt-4 gap-3">
          {/* back button */}
          <button className="border border-gray-600 text-textBlack  px-4 py-2 rounded-lg" onClick={() => setPaymentType(null)}>Back</button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || isPayStackLoading || isKoraPayLoading || isOxLoading}
            className=" rounded-lg  px-7 py-2 bg-orange-500 text-white  hover:opacity-80 transition-all disabled:opacity-80"
          >
            {isLoading || isPayStackLoading || isKoraPayLoading || isOxLoading
              ? "Loading"
              : "Continue"}
          </button>
        </div>
      </div>
      </div>
     }
    </AppModal>
  );
}

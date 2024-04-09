import CurrencyLogo from "@/components/CurrencyLogo/CurrencyLogo";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormInputNumber from "@/components/Forms/FormInputNumber";
import Loading from "@/components/ui/Loading";
import PaySelection from "@/components/PaySelection/PaySelection";
import DashboardLayout from "@/layout/DashboardLayout";
import { useGetCurrencyOfLoggedInUserQuery } from "@/redux/features/currency/currencyApi";
import {
  useAddCurrencyRequestMutation,
  useAddCurrencyRequestWithPayStackMutation,
} from "@/redux/features/currencyRequest/currencyRequestApi";
import { useAppSelector } from "@/redux/hook";
import { UserRole } from "@/types/common";
import config from "@/utils/config";
import { Button, Input } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

type Props = {};

const AddFunds = (props: Props) => {
  const [addRequest, { isLoading, isError, isSuccess, error }] =
    useAddCurrencyRequestMutation();
  const [addRequestWithPayStack, { isLoading: isPayStackLoading }] =
    useAddCurrencyRequestWithPayStackMutation();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const [amount, setAmount] = useState(0);
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const {
    data,
    isLoading: isCurrencyLoading,
    isFetching,
  } = useGetCurrencyOfLoggedInUserQuery({ id: user?.id });

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
  if (isLoading || isPayStackLoading) {
    return (
      <DashboardLayout>
        <Loading></Loading>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      {user?.role === UserRole.Admin ? (
        <div>
          <h2 className="text-center font-bold text-xl text-red-600">
            Admin can not add found!
          </h2>
        </div>
      ) : (
        <>
          <div>
            <h2 className="text-center text-xl font-bold mb-1">Add Funds</h2>
            <p className="text-center mb-5">Add money to your wallet</p>
            <div className="mt-5 mx-auto max-w-[600px]">
              <form>
                <div className="grid gap-10  grid-cols-1 md:grid-cols-2 ">
                  <div className="rounded col-span-2 shadow py-5 px-2 flex flex-col justify-center items-center">
                    <CurrencyLogo className="max-w-[100px]"></CurrencyLogo>
                    <p className="text-3xl font-bold text-orange-600">
                      {data?.data?.amount || 0}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <h4 className="text-xl">Enter amount</h4>
                    <p className="mt-1 mb-4">
                      Enter the amount you want to deposit in your wallet.
                      Minimum amount is ${config.fundMinMoney}.
                    </p>
                    <div className="relative">
                      <Input
                        placeholder="Amount"
                        type="number"
                        onChange={(e) => setAmount(parseFloat(e.target.value))}
                        required={true}
                        className=" w-full pl-6 focus-within:border-orange-300 hover:border-orange-300 h-[44px]"
                      />
                      <span className="absolute  top-1/2 left-2 -translate-y-1/2">
                        $
                      </span>
                    </div>
                  </div>
                  {/* <div>
                    <FormInput
                      placeholder="TxId"
                      name="message"
                      required={true}
                    />
                  </div> */}
                  {/* <PaySelection></PaySelection> */}
                </div>

                <div className="mt-5">
                  <PaySelection
                    onChange={setSelectedOption}
                    isDisabled={isLoading}
                  // handleCryptoClick={handlePay}
                  // handleBankClick={handllePayWithPayStack}
                  ></PaySelection>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || isPayStackLoading}
                  className="mt-4 rounded px-5 py-1 bg-orange-500 text-white  hover:opacity-80 transition-all disabled:opacity-80"
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default AddFunds;

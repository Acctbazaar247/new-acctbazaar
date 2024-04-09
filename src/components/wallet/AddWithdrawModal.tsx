import Image from "next/image";
import AppModal from "../ui/AppModal";
import AppInput from "../ui/AppInput";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { Radio } from "antd";
import { useMemo, useState } from "react";
import AppFormSelect from "../ui/AppFormSelect";
import { SubmitHandler, useForm } from "react-hook-form";
import AppFormInput from "../ui/AppFormInput";
import { GoArrowLeft } from "react-icons/go";
import CreateWithdrawPin from "./CreateWithdrawPin";
import { AnimatePresence, motion } from "framer-motion";
import EnterWithdrawPin from "./EnterWithdrawPin";
import Link from "next/link";
import { useAppSelector } from "@/redux/hook";
import { useGetWithdrawBanksQuery } from "@/redux/features/withdrawFund/withdrawFundApi";
import { useGetCurrencyOfLoggedInUserQuery } from "@/redux/features/currency/currencyApi";
import config from "@/utils/config";
import { toast } from "react-toastify";

interface FormData {
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  saveAccount?: any;
  address?: string;
  fullName?: string;
  isTrc?: boolean;
  amount: string;
}

export default function AddWithdrawModal() {
  const user = useAppSelector((state) => state.user.user);
  const { data: dataCurrency, isLoading: isCurrencyLoading } =
    useGetCurrencyOfLoggedInUserQuery("");
  const [mainModalOpen, setMainModalOpen] = useState(false);

  const [bankW, setBankW] = useState(false);
  const [cryptoW, setCryptoW] = useState(false);
  const [tronSelect, setTronSelect] = useState(false);
  const [bnbSelect, setBnbSelect] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [notCreatePin, setNotCreatePin] = useState(
    user?.withdrawalPin ? true : false
  );
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [withdrawData, setWithdrawData] = useState<FormData>({ amount: "" });

  const handleBankWithdraw = () => {
    setBankW((prev) => !prev);
    setCryptoW(false);
    reset();
    setBnbSelect(false);
    setTronSelect(false);
    setAmount(amount);
    setAmountError("");
    setWithdrawData({ amount: withdrawData.amount });
  };

  const handleCryptoWithdraw = () => {
    setCryptoW((prev) => !prev);
    setBankW(false);
    setAmount(amount);
    setAmountError("");
    setWithdrawData({ amount: withdrawData.amount });
  };

  const handleNetworkSelect = (value: string) => {
    if (value === "TRON") {
      setTronSelect(true);
      setBnbSelect(false);
    } else if (value === "BNB") {
      setBnbSelect(true);
      setTronSelect(false);
    }
  };
  const maxWithdraw = useMemo(() => {
    if (dataCurrency) {
      const amount = dataCurrency.data.amount?.toFixed(0) || 0;

      return parseFloat(amount);
    }
    return 0;
  }, [dataCurrency]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // console.log(data);
    const parseAmount: number = parseFloat(amount) || 0;
    if (!parseAmount) {
      toast.error("Amount is required");
    } else if (parseAmount < 20) {
      toast.error("Min withdrawal amount is $20");
    } else if (parseAmount > maxWithdraw) {
      toast.error("Max amount reached!");
    } else if (parseAmount > config.withdrawalMaxMoney) {
      toast.error(`Amount can not be more than ${config.withdrawalMaxMoney}`);
    } else if (bankW && data.bankName && data.accountNumber) {
      setWithdrawData({
        accountNumber: data?.accountNumber,
        fullName: data?.accountName,
        bankName: data.bankName,
        amount,
      });
      setShowPinModal(true);
    } else if (cryptoW) {
      if (!tronSelect && !bnbSelect) {
        toast.error("Choose a network ");
        return;
      }
      setWithdrawData({
        isTrc: tronSelect,
        address: data.address,
        amount,
      });
      setShowPinModal(true);
    }

    // reset();
  };
  const handleWithdraw = () => {
    if (watch("address")) {
      setNotCreatePin(false);
    }
  };

  const { data } = useGetWithdrawBanksQuery("");

  const banksOption = data?.data
    ? data?.data?.data?.map((single: any) => ({
        value: single?.name,
        label: single?.name,
      }))
    : [];

  // manage done modal withdraw
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = () => {
    setModalOpen(false);
    setBankW(false);
    setCryptoW(false);
    reset();
    setBnbSelect(false);
    setTronSelect(false);
    setMainModalOpen(false);
    // setAmount();
    setAmountError("");
    setWithdrawData({ amount });
  };
  const refresh = () => {
    setModalOpen(false);
    setBankW(false);
    setCryptoW(false);
    reset();
    setBnbSelect(false);
    setTronSelect(false);
    setShowPinModal(false);
    setMainModalOpen(false);
    // setAmount();
    setAmountError("");
    setWithdrawData({ amount });
  };

  return (
    <>
      <AppModal
        // closeable={false}
        modalOpen={mainModalOpen}
        setModalOpen={setMainModalOpen}
        button={
          <div className="flex items-center justify-center flex-col space-y-2">
            <Image
              width={60}
              height={60}
              src="/assets/icons/send.png"
              alt=""
              className="size-14 rounded-lg border border-[#E6E0E0] hover:bg-[#FFCAAD]/15 cursor-pointer"
            />
            <h4>Withdraw</h4>
          </div>
        }
        title={!showPinModal ? "Withdraw" : ""}
        subTitle={!showPinModal ? "Send funds from your wallet" : ""}
      >
        {showPinModal ? (
          <div className="space-y-1">
            <GoArrowLeft
              onClick={() => setShowPinModal(false)}
              className="text-xl text-textBlack cursor-pointer"
            />
            {
              <EnterWithdrawPin
                withdrawData={{ ...withdrawData, amount }}
                setModalOpen={setModalOpen}
                refresh={refresh}
              />
            }
          </div>
        ) : (
          <div className="space-y-4 pt-4 md:w-[520px]">
            <div className="">
              <AppInput
                value={amount}
                error={amountError}
                onChange={(e) => setAmount(e.target.value)}
                icon={<PiCurrencyDollarBold />}
                type="number"
                placeholder="Enter Amount"
              />
              <div className="flex items-center justify-between textG">
                <p>
                  Min. withdrawal amount is{" "}
                  <span className="text-textBlack font-medium">$20</span>
                </p>
                <p>
                  Available{" "}
                  <span className="text-textBlack font-medium">
                    ${maxWithdraw}
                  </span>
                </p>
              </div>
            </div>

            <div className=" p-4 border border-[#C5C5C5] rounded-lg ">
              <div
                onClick={handleBankWithdraw}
                className={`flex items-center justify-between gap-5 ${
                  bankW && "border-b pb-1"
                } cursor-pointer`}
              >
                <div className="flex items-center gap-4">
                  <Image
                    width={32}
                    height={32}
                    className="size-8"
                    src={"/assets/icons/bank.png"}
                    alt="bank payment"
                  />
                  <div className="">
                    <h3 className="text-textBlack font-medium">
                      Withdraw to Bank Account
                    </h3>
                    {bankW && (
                      <p className="textG">$1 ~ ₦{config.dollarRate}</p>
                    )}
                  </div>
                </div>
                <Radio checked={bankW} />
              </div>
              {bankW && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <form
                      className="space-y-2 py-2"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <AppFormSelect
                        control={control}
                        placeholder="Select Bank"
                        name="bankName"
                        required={true}
                        options={banksOption}
                      />
                      <AppFormInput
                        label="Account Name"
                        name="accountName"
                        type="text"
                        placeholder="Type your Account Name here"
                        register={register}
                        required
                        error={errors?.accountName}
                      />
                      <AppFormInput
                        label="Account Number"
                        name="accountNumber"
                        type="text"
                        placeholder="Type your Account Number here"
                        register={register}
                        required
                        error={errors?.accountNumber}
                      />
                      <div className="flex items-center justify-end">
                        <button
                          disabled={isCurrencyLoading}
                          type="submit"
                          className="appBtn"
                        >
                          Withdraw
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* this is crypto withdrawal code  */}
            <div className="p-4 border border-[#C5C5C5] rounded-lg">
              <div
                onClick={handleCryptoWithdraw}
                className={`flex items-center justify-between cursor-pointer gap-5 ${
                  cryptoW && "border-b pb-1"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Image
                    width={32}
                    height={32}
                    className="size-8"
                    src={"/assets/icons/bitcoin.png"}
                    alt="bank payment"
                  />
                  <h3 className="text-textBlack font-medium">
                    Withdraw to Crypto address
                  </h3>
                </div>
                <Radio checked={cryptoW} />
              </div>
              {cryptoW && (
                <AnimatePresence>
                  {!withdrawData?.address ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <h4>We only pay USDT</h4>
                        <div className="pt-3">
                          <p className="textG text-sm pb-1">Choose Network</p>
                          <div className="grid grid-cols-2 gap-3">
                            <div
                              onClick={() => handleNetworkSelect("TRON")}
                              className={`border cursor-pointer rounded-md py-3 px-4 ${
                                tronSelect
                                  ? "border-primary"
                                  : "border-[#D0D2D5]"
                              }`}
                            >
                              <h4 className="font-normal">Tron (TRC20)</h4>
                              <p className="textG text-xs">
                                Est. arrival ~ 2 mins
                              </p>
                            </div>
                            <div
                              onClick={() => handleNetworkSelect("BNB")}
                              className={`border cursor-pointer rounded-md py-3 px-4 ${
                                bnbSelect
                                  ? "border-primary"
                                  : "border-[#D0D2D5]"
                              }`}
                            >
                              <h4 className="font-normal">
                                BNB Smart Chain (BEP20)
                              </h4>
                              <p className="textG text-xs">
                                Est. arrival ~ 3 mins
                              </p>
                            </div>
                            {tronSelect && (
                              <p className="col-span-2 textG text-xs">
                                The network you have selected is{" "}
                                <span className="textB text-sm">TRON</span>.
                                Please make sure the withdrawal address supports
                                the{" "}
                                <span className="textB text-sm">
                                  TRON network
                                </span>
                                . you will potentially lose your assets if it
                                doesn’t match.
                              </p>
                            )}
                            {bnbSelect && (
                              <p className="col-span-2 textG text-xs">
                                The network you have selected is{" "}
                                <span className="textB text-sm">BSC</span>.
                                Please make sure the withdrawal address supports
                                the{" "}
                                <span className="textB text-sm">
                                  BNB Smart Chain network
                                </span>
                                . you will potentially lose your assets if it
                                doesn’t match.
                              </p>
                            )}
                            <div className="col-span-2">
                              <AppFormInput
                                label="User address"
                                name="address"
                                type="text"
                                placeholder="Type your address here"
                                register={register}
                                error={errors?.address}
                              />
                            </div>

                            {watch("address") && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 50, opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="col-span-2 flex items-center justify-end"
                              >
                                <button
                                  disabled={isCurrencyLoading}
                                  // onClick={handleWithdraw}
                                  type="submit"
                                  className="appBtn"
                                >
                                  Withdraw
                                </button>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </form>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              )}
            </div>
          </div>
        )}
      </AppModal>

      {/* this is done modal withdraw  */}
      <AppModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        closeable={false}
        primaryButtonTitle="Done"
        primaryButtonAction={handleModal}
      >
        <div className="md:w-[450px] text-center py-8 lg:py-10">
          <Image
            width={200}
            height={160}
            src="/assets/icons/withdraw-success.png"
            alt=""
            className="mx-auto size-28 mb-4"
          />
          <h2 className="subTitle">Withdrawal successful</h2>
          <p className="textG">
            <span className="textB">${amount}</span> is on its way
          </p>
        </div>
      </AppModal>
    </>
  );
}

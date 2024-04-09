import CurrencyLogo from "@/components/CurrencyLogo/CurrencyLogo";
import ErrorCompo from "@/components/ui/AppErrorComponent";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import Loading from "@/components/ui/Loading";
import OrdersCard from "@/components/OrdersCard/OrdersCard";
import DashboardLayout from "@/layout/DashboardLayout";
import SellerLayout from "@/layout/SellerLayout";
import { useGetCurrencyOfLoggedInUserQuery } from "@/redux/features/currency/currencyApi";
import {
  useAddWithdrawFundMutation,
  useDeleteWithdrawFundMutation,
  useGetWithdrawFundsOfLoggedInUserQuery,
  useGetWithdrawFundsQuery,
} from "@/redux/features/withdrawFund/withdrawFundApi";
import { useAppSelector } from "@/redux/hook";
import {
  EStatusOfWithdrawalRequest,
  IOrder,
  IWithdrawalRequest,
} from "@/types/common";
import config from "@/utils/config";
import {
  faBank,
  faCoins,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, Modal, Popconfirm, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const WithdrawFund = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const methods = useForm();
  const { handleSubmit, reset, watch } = methods;
  const [open, setOpen] = useState(false);
  const [deleteWithdraw, { isLoading: isDeleteLoading }] =
    useDeleteWithdrawFundMutation();
  const [selectedOption, setSelectedOption] = useState<
    "bank" | "crypto" | null | undefined
  >();
  const [selectCrypto, setSelectCrypto] = useState<
    "trc" | "bep" | null | undefined
  >();
  const [
    addWithdrawFundRequest,
    { isLoading: isAddFoundRequestLoading, isError: isAddFoundRequestError },
  ] = useAddWithdrawFundMutation();
  const {
    data: myFundRequests,
    isLoading: isMyFundRequestLoading,
    isFetching: isMyFundRequestFetching,
    isError: isMyFundRequestError,
  } = useGetWithdrawFundsOfLoggedInUserQuery("");
  const {
    data: currency,
    isLoading: isCurrencyLoading,
    // isFetching,
  } = useGetCurrencyOfLoggedInUserQuery({ id: user?.id });
  const { data, isLoading, isSuccess, isError, isFetching } =
    useGetWithdrawFundsQuery("");

  let content = null;
  const columns: ColumnsType<IWithdrawalRequest> = [
    {
      title: "Amount",
      dataIndex: "amount",
      //   key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      className: "capitalize",
      //   key: "age",
    },
    {
      title: "Payment type",
      dataIndex: "walletAddress",
      className: "capitalize",
      render: (current, fullData) => {
        return (
          <div>
            {current?.length
              ? fullData.isTrc
                ? "Crypto TRC 20"
                : "Crypto BEP 20"
              : "Bank"}
          </div>
        );
      },
      //   key: "age",
    },
    {
      title: "Requested Date",
      dataIndex: "createdAt",
      //   key: "date",
      render: (current) => {
        return <span>{new Date(current).toDateString()}</span>;
      },
    },
    {
      title: "Action",
      dataIndex: "createdAt",
      //   key: "date",
      render: (current, data) => {
        return (
          <Popconfirm
            disabled={isDeleteLoading}
            onConfirm={() => {
              deleteWithdraw(data.id)
                .unwrap()
                .then((res: any) => {
                  if (res.error) {
                    toast.error("something went wrong" + res.error);
                  } else {
                    toast.success("Successfully deleted ");
                  }
                })
                .catch((err: any) => {
                  toast.error("something went wrong");
                });
            }}
            title={
              data.status === EStatusOfWithdrawalRequest.pending
                ? "Don't worry you will get back your money"
                : "Are you sure you want to delete"
            }
            okButtonProps={{
              className:
                "border-orange-500 text-orange-500 hover:text-white hover:!bg-orange-500",
            }}
          >
            <button className="px-3 py-1 bg-red-600 rounded border text-white hover:opacity-90 transition-all">
              Delete
            </button>
          </Popconfirm>
        );
      },
    },
  ];
  if (isMyFundRequestLoading || isMyFundRequestFetching) {
    content = <Loading></Loading>;
  } else if (isMyFundRequestError) {
    content = <ErrorCompo></ErrorCompo>;
  } else if (myFundRequests?.data?.length) {
    const info = myFundRequests.data as IWithdrawalRequest[];

    content = (
      <div className="mt-5">
        <Table dataSource={info} columns={columns} />
      </div>
    );
  } else {
    content = <ErrorCompo error="No request found!"></ErrorCompo>;
  }

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => { };
  const handleCancel = () => {
    setOpen(false);
  };

  const onSubmit = (data: any) => {
    const amount = parseFloat(data.amount);
    if (amount > config.withdrawalMaxMoney) {
      toast.error("Amount does't exits on your account");
      return;
    }
    if (amount < config.withdrawalMinMoney) {
      toast.error(`Minimum withdraw is $${config.withdrawalMinMoney}`);
      return;
    }
    if (!selectedOption) {
      toast.error("Please select a payment option");
      return;
    }
    if (selectedOption === "crypto" && !selectCrypto) {
      toast.error("Please choose a USDT option");
      return;
    }
    let mainData: any = { amount };

    if (selectedOption === "bank") {
      mainData = {
        amount,
        fullName: data.fullName,
        bankName: data.bankName,
        accountNumber: data.accountNumber,
      };
    } else {
      mainData = {
        amount,
        isTrc: selectCrypto === "trc",
        walletAddress: data.walletAddress,
      };
    }

    addWithdrawFundRequest(mainData)
      .unwrap()
      .then((res: any) => {
        if (res.error) {
          toast.error("something went wrong" + res.error);
        } else {
          toast.success("Successfully send the request ");
        }
      })
      .catch((err: any) => {
        toast.error("something went wrong");
      })
      .finally(() => {
        setOpen(false);
        reset();
      });
  };
  return (
    <SellerLayout>
      <div className="container py-5 md:py-10">
        <h2 className="text-center text-xl font-bold">Withdraw Fund</h2>
        <div className="flex gap-5 justify-between max-w-[900px] mx-auto mt-5">
          <div className="p-3 lg:p-5 shadow-orange-50 shadow-xl border rounded max-w-[300px] w-full flex-col items-center justify-center flex ">
            <CurrencyLogo className="max-w-[60px]"></CurrencyLogo>
            <span className="text-md lg:text-2xl font-bold mt-4">
              {currency?.data?.amount}
            </span>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="p-3 lg:p-5 shadow-gray-300 shadow-xl border rounded border-orange-500 max-w-[300px] w-full flex-col items-center justify-center flex bg-orange-500 "
          >
            <FontAwesomeIcon
              icon={faMoneyBillTransfer}
              className="text-5xl text-white/95"
            ></FontAwesomeIcon>
            <span className="text-md lg:text-2xl font-bold mt-4">
              Withdraw Funds
            </span>
          </button>
        </div>
        <div className="mt-5 overflow-x-auto">{content}</div>
        <Modal
          okButtonProps={{
            className: "bg-orange-500",
            disabled: isAddFoundRequestLoading,
          }}
          title="Make withdraw fund request"
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="mb-3 flex gap-1">
                <span> Minimum withdraw amount is </span>
                <span className="flex gap-1">
                  <CurrencyLogo className="max-w-[20px]"></CurrencyLogo>
                  {config.withdrawalMinMoney}
                </span>{" "}
                <br />
                When placing crypto withdrawal, the network fee will be from your payment.
              </p>
              <FormInput
                name="amount"
                required
                type="number"
                //   onChange={(e) => setAmount(parseFloat(e.target.value))}
                placeholder="Enter amount"
              ></FormInput>

              <div>
                <div>
                  <div className=" ">
                    <div className=" mt-2">
                      <h1 className="text-xl font-semibold mb-1">
                        Choose Payment Option
                      </h1>
                      {/* Radio buttons for payment options */}
                      <div className="flex gap-4 mt-4">
                        <button
                          type="button"
                          //   disabled={isDisabled}
                          onClick={() => {
                            setSelectedOption("bank");
                            // router.push("https://nowpayments.io/payment/?iid=4613115863");
                          }}
                          className={`w-full py-4 px-2 border rounded transition-all disabled:opacity-90 ${selectedOption === "bank"
                            ? "border-orange-300 bg-orange-500 text-white"
                            : "text-orange-500 border-orange-300"
                            }`}
                        >
                          <div>
                            {/* <img src="" alt="" /> */}
                            <FontAwesomeIcon
                              className="text-5xl"
                              icon={faBank}
                            ></FontAwesomeIcon>
                            <p className="mt-2 ">Widthdraw Via Bank</p>
                          </div>
                        </button>
                        <button
                          type="button"
                          //   disabled={isDisabled}
                          onClick={() => {
                            setSelectedOption("crypto");
                            // router.push("https://nowpayments.io/payment/?iid=4613115863");
                          }}
                          className={`w-full py-4 px-2 border rounded transition-all ${selectedOption === "crypto"
                            ? "border-orange-300 bg-orange-500 text-white"
                            : "text-orange-500 border-orange-300"
                            }`}
                        >
                          <div>
                            {/* <img src="" alt="" /> */}
                            <FontAwesomeIcon
                              className="text-5xl"
                              icon={faCoins}
                            ></FontAwesomeIcon>
                            <p className="mt-2 ">Widthdraw Via Crypto</p>
                          </div>
                        </button>
                      </div>

                      {/* Content based on the selected option */}
                      {selectedOption === "bank" && (
                        <div className="border p-4 flex flex-col gap-4 rounded text-center bg-white">
                          <div className="text-left">
                            <FormInput
                              label="Enter full name"
                              type="text"
                              name="fullName"
                              placeholder="Full name"
                              required={selectedOption === "bank"}
                            ></FormInput>
                          </div>
                          <div className="text-left">
                            <FormInput
                              label="Enter account number"
                              type="text"
                              name="accountNumber"
                              placeholder="Account number"
                              required={selectedOption === "bank"}
                            ></FormInput>
                          </div>
                          <div className="text-left">
                            <FormInput
                              label="Enter bank name"
                              type="text"
                              name="bankName"
                              placeholder="bank name"
                              required={selectedOption === "bank"}
                            ></FormInput>
                          </div>
                        </div>
                      )}

                      {selectedOption === "crypto" && (
                        <div className="border p-4 rounded bg-white">
                          <p className="text-lg">Chose your USDT</p>
                          <div className="flex gap-4 mt-2">
                            <button
                              type="button"
                              //   disabled={isDisabled}
                              onClick={() => {
                                setSelectCrypto("trc");
                                // router.push("https://nowpayments.io/payment/?iid=4613115863");
                              }}
                              className={`w-full py-4 px-2 border rounded transition-all disabled:opacity-90 ${selectCrypto === "trc"
                                ? "border-orange-300 bg-orange-500 text-white"
                                : "text-orange-500 border-orange-300"
                                }`}
                            >
                              <div>
                                {/* <img src="" alt="" /> */}

                                <p>TRC 20</p>
                              </div>
                            </button>
                            <button
                              type="button"
                              //   disabled={isDisabled}
                              onClick={() => {
                                setSelectCrypto("bep");
                                // router.push("https://nowpayments.io/payment/?iid=4613115863");
                              }}
                              className={`w-full py-4 px-2 border rounded transition-all ${selectCrypto === "bep"
                                ? "border-orange-300 bg-orange-500 text-white"
                                : "text-orange-500 border-orange-300"
                                }`}
                            >
                              <div>
                                {/* <img src="" alt="" /> */}
                                <p>BEP 20</p>
                              </div>
                            </button>
                          </div>
                          <div className="text-left mt-2">
                            {selectCrypto && (
                              <FormInput
                                label={`Enter your ${selectCrypto?.toLocaleUpperCase()} wallet address`}
                                type="text"
                                name="walletAddress"
                                placeholder=" wallet address"
                                required={Boolean(selectCrypto)}
                              ></FormInput>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[30px]   flex justify-end">
                <button
                  disabled={isAddFoundRequestLoading}
                  type="submit"
                  className="px-3 text-orange-500 disabled:bg-gray-600 rounded hover:bg-orange-500 hover:text-white transition-all py-1 border border-orange-500 "
                >
                  Submit
                </button>
              </div>
            </form>
          </FormProvider>
        </Modal>
      </div>
    </SellerLayout>
  );
};

export default WithdrawFund;

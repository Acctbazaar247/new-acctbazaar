import AppButton from "@/components/ui/AppButton";
import AppRenderReduxData from "@/components/ui/AppRenderReduxData";
import Loading from "@/components/ui/Loading";
import AddMoneyModal from "@/components/wallet/AddMoneyModal";
import AddWithdrawModal from "@/components/wallet/AddWithdrawModal";
import HomeLayout from "@/layout/HomeLayout";
import PrivateLayout from "@/layout/PrivateLayout";
import { useGetCurrencyOfLoggedInUserQuery } from "@/redux/features/currency/currencyApi";
import { useGetCurrencyRequestsQuery } from "@/redux/features/currencyRequest/currencyRequestApi";
import { useGetWithdrawFundsQuery } from "@/redux/features/withdrawFund/withdrawFundApi";
import { useAppSelector } from "@/redux/hook";
import { UserRole } from "@/types/common";
import appDateFormate from "@/utils/appDateFormate";
import { Table } from "antd";
import dateFormat from "dateformat";
import { useMemo, useState } from "react";
import { GoDotFill } from "react-icons/go";

const Wallet = () => {
  const [page, setPage] = useState<number>(1);
  const [page2, setPage2] = useState<number>(1);
  const user = useAppSelector((state) => state.user.user);
  const [showWithdraw, setShowWithdraw] = useState(
    user?.role !== UserRole.User ? false : true
  );
  const { data, isLoading } = useGetCurrencyOfLoggedInUserQuery("");

  const queryString = useMemo(() => {
    const info = {
      page,
      limit: 10,
      ownById: user?.id
    };
    const queryString = Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value) {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
      }
      return pre;
    }, "");
    return queryString;
  }, [page, user]);

  const queryStringCurrencyRequest = useMemo(() => {
    const info = {
      page: page2,
      limit: 10,
      ownById: user?.id
    };
    const queryString = Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value) {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
      }
      return pre;
    }, "");
    return queryString;
  }, [page2, user]);

  const currencyQuery = useGetCurrencyRequestsQuery(queryStringCurrencyRequest);
  const queryData = useGetWithdrawFundsQuery(queryString);

  const columnsMobile = [
    {
      title: "ID",
      dataIndex: "id"
      //   key: "amount",
    },
    {
      title: "Date",
      className: "min-w-[80px]",
      dataIndex: "createdAt",
      render: (createdAt: string, record: any) => {
        return (
          <div className=" text-xs">
            {dateFormat(createdAt, appDateFormate)}
          </div>
        );
      }
    },
    {
      title: "P.t",
      dataIndex: "walletAddress",
      className: "capitalize",
      render: (current: any, fullData: any) => {
        return (
          <div className="text-xs md:text-sm ">
            {current?.length
              ? fullData.isTrc
                ? "Crypto TRC 20"
                : "Crypto BEP 20"
              : "Bank"}
          </div>
        );
      }
    },
    // {
    //   title: "Address",
    //   dataIndex: "walletAddress",
    //   className: "capitalize",
    //   render: (current: any, fullData: any) => {
    //     return <div>{current || fullData.bankName}</div>;
    //   },
    // },
    {
      title: "Dollar Rate",
      dataIndex: "dollarRate",
      className: "whitespace-nowrap",
      render: (current: number | undefined | null, fulldata: any) => {
        return <div className="text-xs">{current || "Not Applicable"}</div>;
      }
    },
    {
      title: "Amount",
      dataIndex: "amount"
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string, record: any) => {
        return (
          <div className="flex items-center justify-start">
            <p
              className={`py-1 px-2 rounded-full w-fit text-sm flex items-center gap-2 ${
                (text === "pending" && "text-brown bg-yellowShadow") ||
                (text === "failed" && "text-red bg-red/10") ||
                (text === "success" && "text-success bg-success/10")
              }`}
            >
              <GoDotFill />
              {text}
            </p>
          </div>
        );
      }
    }
  ];

  const columnsPc = [
    {
      title: "ID",
      dataIndex: "id"
      //   key: "amount",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      className: "min-w-[150px]",
      render: (createdAt: string, record: any) => {
        return (
          <div className="flex items-center gap-1">
            {dateFormat(createdAt, appDateFormate)}
          </div>
        );
      }
    },
    {
      title: "Payment type",
      dataIndex: "walletAddress",
      className: "capitalize min-w-[150px]",
      render: (current: any, fullData: any) => {
        return (
          <div>
            {current?.length
              ? fullData.isTrc
                ? "Crypto TRC 20"
                : "Crypto BEP 20"
              : "Bank"}
          </div>
        );
      }
    },
    {
      title: "Designation",
      dataIndex: "walletAddress",
      className: "capitalize",
      render: (current: any, fullData: any) => {
        return <div>{current || fullData.bankName}</div>;
      }
    },
    {
      title: "Amount",
      dataIndex: "amount",
      className: "min-w-[100px]"
    },
    {
      title: "Dollar Rate",
      dataIndex: "dollarRate",
      className: "whitespace-nowrap",
      render: (current: number | undefined | null, fulldata: any) => {
        return <div>{current || "Not Applicable"}</div>;
      }
    },
    {
      title: "Status",
      dataIndex: "status",
      className: "min-w-[150px]",
      render: (text: string, record: any) => {
        return (
          <div className="flex items-center  justify-start">
            <p
              className={`py-1 px-2 rounded-full w-fit text-sm flex items-center gap-2 ${
                (text === "pending" && "text-brown bg-yellowShadow") ||
                (text === "denied" && "text-red bg-red/10") ||
                (text === "approved" && "text-success bg-success/10")
              }`}
            >
              <GoDotFill />
              {text}
            </p>
          </div>
        );
      }
    }
  ];

  const currencyRequestColumnPc = [
    {
      title: "ID",
      dataIndex: "id"
      //   key: "amount",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      className: "md:min-w-[150px]",
      render: (createdAt: string, record: any) => {
        return (
          <div className="flex items-center gap-1">
            <span className="md:block hidden">
              {dateFormat(createdAt, appDateFormate)}
            </span>
            <div className="block md:hidden">
              <div className=" ">
                <span className="text-xs ">
                  {dateFormat(createdAt, appDateFormate)}
                </span>
              </div>
            </div>
          </div>
        );
      }
    },
    {
      title: "Amount",
      dataIndex: "amount",
      className: "md:min-w-[150px]  "
    },
    {
      title: "Status",
      dataIndex: "status",
      className: "md:min-w-[150px]",
      render: (text: string, record: any) => {
        return (
          <div className="flex items-center justify-start">
            <p
              className={`py-1 px-2 rounded-full w-fit text-sm flex items-center gap-2 ${
                (text === "pending" && "text-brown bg-yellowShadow") ||
                (text === "denied" && "text-red bg-red/10") ||
                (text === "approved" && "text-success bg-success/10")
              }`}
            >
              <GoDotFill />
              {text}
            </p>
          </div>
        );
      }
    }
  ];

  return (
    <HomeLayout>
      <PrivateLayout>
        <div className="layout">
          <h2 className="title">Wallet</h2>

          {/* this is main div  */}
          <div className="bg-background rounded flex  flex-col md:flex-row gap-6 min-h-[80dvh]  py-3 md:py-6 md:px-6 mt-2 md:mt-4 lg:mt-5 2xl:mt-6">
            <div className="md:w-1/4 space-y-6">
              {/* this is image div */}
              <div className="md:mx-2 h-[23dvh] md:h-[63vh] relative overflow-hidden">
                <img
                  className="w-full h-full hidden md:block"
                  src="/assets/icons/rectangle.png"
                  alt=""
                />
                <img
                  className="w-full h-full md:hidden"
                  src="/assets/icons/Rectangle2.png"
                  alt=""
                />
                <img
                  className="absolute -top-20 -right-16 scale-75"
                  src="/assets/icons/cics-1.png"
                  alt=""
                />
                <img
                  className="absolute -top-8 -right-8 scale-90"
                  src="/assets/icons/cics.png"
                  alt=""
                />
                <div className="absolute top-0 left-0 px-4 py-5 w-full h-full rounded flex flex-col justify-between">
                  <div className="flex items-center justify-between text-white">
                    <h3 className="text-white font-medium text-xl">
                      Your Balance
                    </h3>
                    {/* <h2 className="text-sm">USD ( $ ) </h2> */}
                  </div>

                  <div className="bg-background/15 p-4 text-white gap-3 rounded-xl">
                    <div className="space-y-1">
                      {isLoading ? (
                        <Loading screen="half"></Loading>
                      ) : (
                        <h2 className="text-2xl md:text-3xl text-center w-full font-medium">
                          ${data?.data?.amount?.toFixed(2) || 0}
                        </h2>
                      )}
                      {/* <h2 className="text-sm font-medium">+50.235 (5.25%)</h2> */}
                    </div>
                    {/* <IoEyeOutline className="text-xl md:text-2xl" /> */}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-8">
                <AddMoneyModal />
                {user?.role !== UserRole.User ? <AddWithdrawModal /> : null}
              </div>
            </div>

            {/* this is table div  */}
            <div className="md:w-3/4">
              <h2 className="text-md 2xl:text-[22px] text-textGrey pb-2 md:pb-4 ">
                {user?.role === UserRole.User ? (
                  "Add money"
                ) : showWithdraw ? (
                  <button
                    onClick={() => setShowWithdraw(false)}
                    className="border p-2 border-orange-500 rounded ml-2 py-1 text-orange-600"
                  >
                    View deposit history
                  </button>
                ) : (
                  <button
                    onClick={() => setShowWithdraw(true)}
                    className="border p-2 border-orange-500 rounded ml-2 py-1 text-orange-600"
                  >
                    View withdrawal history
                  </button>
                )}
              </h2>

              <div className="border mb-4 md:mb-5 border-borderLight rounded-lg md:max-h-[60dvh] md:overflow-y-auto  w-full">
                {showWithdraw ? (
                  <>
                    <div className="hidden md:block overflow-x-auto">
                      <AppRenderReduxData
                        queryData={queryData}
                        showData={(data) => {
                          // console.log(data);
                          return (
                            <Table
                              columns={columnsPc}
                              dataSource={data?.data}
                              pagination={{
                                onChange: (value) => setPage(value),
                                pageSize: data?.meta?.limit,
                                total: data?.meta?.total,
                                current: data?.meta?.page,
                                showSizeChanger: false
                              }}
                            />
                          );
                        }}
                      />
                    </div>

                    <div className="block md:hidden overflow-x-auto">
                      <AppRenderReduxData
                        queryData={queryData}
                        showData={(data) => {
                          // console.log(data);
                          return (
                            <Table
                              columns={columnsMobile}
                              dataSource={data?.data}
                              size="small"
                              pagination={{
                                onChange: (value) => setPage(value),
                                pageSize: data?.meta?.limit,
                                total: data?.meta?.total,
                                current: data?.meta?.page,
                                showSizeChanger: false
                              }}
                            />
                          );
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="hidden md:block overflow-x-auto">
                      <AppRenderReduxData
                        queryData={currencyQuery}
                        showData={(data) => {
                          // console.log(data);
                          return (
                            <Table
                              columns={currencyRequestColumnPc}
                              dataSource={data?.data}
                              pagination={{
                                onChange: (value) => setPage2(value),
                                pageSize: data?.meta?.limit,
                                total: data?.meta?.total,
                                current: data?.meta?.page,
                                showSizeChanger: false
                              }}
                            />
                          );
                        }}
                      />
                    </div>
                    <div className="block md:hidden overflow-x-auto">
                      <AppRenderReduxData
                        queryData={currencyQuery}
                        showData={(data) => {
                          // console.log(data);
                          return (
                            <Table
                              columns={currencyRequestColumnPc}
                              dataSource={data?.data}
                              size="small"
                              pagination={{
                                onChange: (value) => setPage2(value),
                                pageSize: data?.meta?.limit,
                                total: data?.meta?.total,
                                current: data?.meta?.page,
                                showSizeChanger: false
                              }}
                            />
                          );
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
              <AppButton label="Report transaction" href="/contactus" />
            </div>
          </div>
        </div>
      </PrivateLayout>
    </HomeLayout>
  );
};

export default Wallet;

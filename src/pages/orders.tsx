import OrderAccountCard from "@/components/orders/OrderAccountCard";
import AccountLoading from "@/components/shared/AccountLoading";
import AnimationWrapper from "@/components/ui/AnimationWrapper";
import AppRenderReduxData from "@/components/ui/AppRenderReduxData";
import AppTabs from "@/components/ui/AppTabs";
import HomeLayout from "@/layout/HomeLayout";
import SellerLayout from "@/layout/SellerLayout";
import { useGetOrdersQuery } from "@/redux/features/order/orderApi";
import { useAppSelector } from "@/redux/hook";
import { IOrder } from "@/types/common";
import { Pagination } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const Orders = () => {
  const tabs = [
    { label: "All" },
    { label: "Pending" },
    { label: "Completed" },
    { label: "Cancelled" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].label);
  const { user } = useAppSelector((state) => state.user);
  const [page, setPage] = useState<number>(1);

  const queryString = useMemo(() => {
    const info = {
      status: activeTab !== "All" ? activeTab.toLocaleLowerCase() : undefined,
      page,
      limit: 10,
      sellerId: user?.id,
    };
    const queryString = Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value) {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
      }
      return pre;
    }, "");
    return queryString;
  }, [page, user, activeTab]);

  const orderQuery = useGetOrdersQuery(queryString);

  return (
    <HomeLayout>
      <SellerLayout>
        <div className="layout">
          {/* this is top section div  */}
          <div className="flex justify-between">
            <div className="">
              <h2 className="title">Orders</h2>
              <p className="text-textGrey text-xs md:text-sm">
                All orders placed on your platform
              </p>
            </div>
            {/* <div className="w-1/3 flex items-center gap-4 2xl:gap-5">
              <AppInput
                type="text"
                value=""
                placeholder="Search by name or description"
              />
              <div className="flex text-primary items-center gap-1 w-fit cursor-pointer h-fit md:gap-2 text-sm md:text-base border border-borderColor rounded md:rounded-md lg:rounded-lg 2xl:rounded-xl px-2 py-1 md:px-4 md:py-1.5 lg:py-2 2xl:px-4 2xl:py-2.5">
                <IoFilter /> Filter
              </div>
            </div> */}
          </div>

          {/* this is main div  */}
          <div className="pt-2 md:pt-4 lg:pt-5 2xl:pt-2">
            <div>
              <div className="bg-background rounded-2xl w-full min-h-[60vh] md:pt-6 md:px-6 2xl:pt-8">
                <AppTabs
                  tabs={tabs}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                <AppRenderReduxData
                  isEmptyComponentHave
                  queryData={orderQuery}
                  loadingComponent={<AccountLoading />}
                  showData={(data) => {
                    return (
                      <div className=" pt-2 md:px-6 md:pt-4 lg:pb-4 space-y-6">
                        {data?.data.length > 0 ? (
                          <div className="max-h-[calc(100dvh-210px)] md:max-h-[60dvh] overflow-auto space-y-3 md:space-y-4">
                            {data.data.map((single: IOrder, i: number) => (
                              <AnimationWrapper
                                key={single.id}
                                transition={{ delay: i * 0.08 }}
                              >
                                <OrderAccountCard
                                  orderInfo={single}
                                  notShowDetails={true}
                                />
                              </AnimationWrapper>
                            ))}
                            <div className="flex justify-center">
                              <Pagination
                                size={
                                  window.innerWidth > 668 ? "default" : "small"
                                }
                                showSizeChanger={false}
                                pageSize={data.meta.limit}
                                total={data.meta.total}
                                current={data.meta.page}
                                onChange={(value) => {
                                  setPage(value);
                                }}
                              ></Pagination>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-background rounded-2xl w-full min-h-[48vh] flex items-center justify-center flex-col">
                            <Image
                              width={120}
                              height={120}
                              className="size-14 md:size-28"
                              src={"/assets/account/orders.png"}
                              alt="order image"
                            />
                            <h3 className="subTitle pt-5">No orders</h3>
                            <p className="text-textGrey pt-1">
                              Buy and Sell orders will be shown here
                            </p>
                            <div className="flex items-center gap-2 md:gap-4 2xl:gap-5 pt-6">
                              <Link href="/marketplace">
                                <button className="appOutlineBtn">
                                  Explore marketplace
                                </button>
                              </Link>
                              <Link href="/account/sell-your-account">
                                <button className="appBtn">Sell product</button>
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }}
                ></AppRenderReduxData>
              </div>
            </div>
          </div>
        </div>
      </SellerLayout>
    </HomeLayout>
  );
};

export default Orders;

import MyAdsMain from "@/components/myAds/MyAdsMain";
import MyPurchaseMain from "@/components/myAds/MyPurchaseMain";
import AppRenderReduxData from "@/components/ui/AppRenderReduxData";
import AppTabs from "@/components/ui/AppTabs";
import HomeLayout from "@/layout/HomeLayout";
import PrivateLayout from "@/layout/PrivateLayout";
import { useGetMyOrdersQuery } from "@/redux/features/order/orderApi";
import { useAppSelector } from "@/redux/hook";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function MyPurchase() {
  const tabs = [
    { value: "All", label: "All" },
    { value: "approved", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "denied", label: "Denied" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const user = useAppSelector((state) => state.user.user);

  const queryString = useMemo(() => {
    const info = {
      ownById: user?.id,
      isSold: false,
      approvedForSale: activeTab === "All" ? undefined : activeTab,
      limit: 50,
    };
    const queryString = Object.keys(info).reduce((pre, key: string) => {
      if (key === "isSold") {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${false}`;
      } else {
        const value = info[key as keyof typeof info];
        if (value) {
          return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
        }
      }
      return pre;
    }, "");
    return queryString;
  }, [activeTab, user?.id]);
  console.log({ queryString });
  const queryData = useGetMyOrdersQuery("");

  return (
    <HomeLayout>
      <PrivateLayout>
        <div className="container py-10 2xl:py-12">
          {/* this is top section div  */}
          <div className="">
            <h2 className="title">My Purchase</h2>
            <p className="text-textGrey text-xs md:text-sm">
              All of your product Purchase shows here
            </p>
          </div>

          {/* this is main div  */}
          <div className="mt-2 md:mt-4 lg:mt-5 2xl:mt-6 bg-white rounded-2xl w-full  p-6 2xl:p-8">
            {/* <AppTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} /> */}
            <AppRenderReduxData
              queryData={queryData}
              isEmptyComponentHave
              showData={(data) => {
                return (
                  <>
                    {data?.data.length > 0 ? (
                      <MyPurchaseMain accounts={data?.data} />
                    ) : (
                      <div className="bg-white rounded-2xl w-full min-h-[80dvh] flex items-center justify-center flex-col">
                        <Image
                          width={120}
                          height={120}
                          src={"/assets/myAds/no-ads.png"}
                          alt="order image"
                        />
                        <h3 className="subTitle pt-5">No Orders Found</h3>
                      </div>
                    )}
                  </>
                );
              }}
            />
          </div>
        </div>
      </PrivateLayout>
    </HomeLayout>
  );
}

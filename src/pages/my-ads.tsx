import MyAdsMain from "@/components/myAds/MyAdsMain";
import AccountLoading from "@/components/shared/AccountLoading";
import AppInput from "@/components/ui/AppInput";
import AppRenderReduxData from "@/components/ui/AppRenderReduxData";
import AppTabs from "@/components/ui/AppTabs";
import HomeLayout from "@/layout/HomeLayout";
import PrivateLayout from "@/layout/PrivateLayout";
import { useGetAccountsQuery } from "@/redux/features/account/accountApi";
import { useAppSelector } from "@/redux/hook";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { IoFilter } from "react-icons/io5";

const MyAds = () => {
  const tabs = [
    { value: "All", label: "All" },
    { value: "approved", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "denied", label: "Denied" },
  ];
  const [page, setPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const user = useAppSelector((state) => state.user.user);

  const queryString = useMemo(() => {
    const info = {
      ownById: user?.id,
      isSold: false,
      approvedForSale: activeTab === "All" ? undefined : activeTab,
      limit: 50,
      page,
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
  }, [activeTab, page, user?.id]);

  const queryData = useGetAccountsQuery(queryString);

  return (
    <HomeLayout>
      <PrivateLayout>
        <div className="layout">
          {/* this is top section div  */}
          <div className="">
            <h2 className="title">My Ads</h2>
            <p className="text-textGrey text-xs md:text-sm">
              All of your product ads shows here
            </p>
          </div>

          {/* this is main div  */}
          <div className="mt-2 md:mt-4 lg:mt-5 2xl:mt-6 bg-white rounded-2xl w-full pt-4  md:p-6 2xl:p-8">
            <AppTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <AppRenderReduxData
              queryData={queryData}
              isEmptyComponentHave
              loadingComponent={<AccountLoading />}
              showData={(data) => {
                return (
                  <>
                    {data?.data.length > 0 ? (
                      <MyAdsMain
                        setPage={setPage}
                        accounts={data?.data}
                        data={data}
                      />
                    ) : (
                      <div className="bg-white rounded-2xl w-full min-h-[60vh] flex items-center justify-center flex-col">
                        <Image
                          width={120}
                          height={120}
                          src={"/assets/myAds/no-ads.png"}
                          alt="order image"
                        />
                        <h3 className="subTitle pt-5">No Ads</h3>
                        <p className="text-textGrey pt-1">
                          Add products for customers to buy from you
                        </p>
                        <div className="flex items-center gap-4 2xl:gap-5 pt-6">
                          <Link href={"/account/sell-your-account"}>
                            <button className="appBtn">Start selling</button>
                          </Link>
                        </div>
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
};

export default MyAds;

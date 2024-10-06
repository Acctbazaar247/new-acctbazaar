import MyPurchaseMain from "@/components/myAds/MyPurchaseMain";
import AccountLoading from "@/components/shared/AccountLoading";
import AppButton from "@/components/ui/AppButton";
import AppRenderReduxData from "@/components/ui/AppRenderReduxData";
import HomeLayout from "@/layout/HomeLayout";
import PrivateLayout from "@/layout/PrivateLayout";
import { useGetMyOrdersQuery } from "@/redux/features/order/orderApi";
import { useAppSelector } from "@/redux/hook";
import Image from "next/image";
import { useMemo, useState } from "react";

export default function MyPurchase() {
  const user = useAppSelector((state) => state?.user?.user);
  const [page, setPage] = useState<number>(1);
  const queryString = useMemo(() => {
    const info = {
      page,
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
  }, [page]);
  const queryData = useGetMyOrdersQuery(queryString);

  return (
    <HomeLayout>
      <PrivateLayout>
        <div className="container py-10 2xl:py-12">
          {/* this is top section div  */}
          <div className="flex items-center justify-between">
            <div className="">
              <h2 className="title">My Purchase</h2>
              <p className="text-textGrey text-xs md:text-sm">
                All of your product Purchase shows here
              </p>
            </div>
            <AppButton
              label="Report Product"
              href="/contactus"
              // variant="outline"
              size="medium"
            />
          </div>

          {/* this is main div  */}
          <div className="mt-2 md:mt-4 lg:mt-5 2xl:mt-6 bg-background rounded-2xl w-full py-2 md:p-6 2xl:p-8">
            {/* <AppTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} /> */}
            <AppRenderReduxData
              queryData={queryData}
              loadingComponent={<AccountLoading />}
              isEmptyComponentHave
              showData={(data) => {
                // console.log(data);
                return (
                  <>
                    {data?.data.length > 0 ? (
                      <MyPurchaseMain
                        setPage={setPage}
                        data={data}
                        orders={data?.data}
                      />
                    ) : (
                      <div className="bg-background rounded-2xl w-full min-h-[80dvh] flex items-center justify-center flex-col">
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

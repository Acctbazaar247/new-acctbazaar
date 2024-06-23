import ReviewCard from "@/components/Seller/ReviewCard";
import SellerProfileViewComponent from "@/components/Seller/SellerProfileViewComponent";
import MarketplaceAccountCard from "@/components/marketplace/MarketplaceAccountCard";
import AccountLoading from "@/components/shared/AccountLoading";
import AppRenderReduxData from "@/components/ui/AppRenderReduxData";
import AppTabs from "@/components/ui/AppTabs";
import HomeLayout from "@/layout/HomeLayout";
import PrivateLayout from "@/layout/PrivateLayout";
import { useGetAccountsQuery } from "@/redux/features/account/accountApi";
import { useGetSellerOverviewQuery } from "@/redux/features/user/userApi";
import { EApprovedForSale, IAccount } from "@/types/common";
import { Pagination } from "antd";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

const SellerDetailsPage = () => {
  const [page, setPage] = useState<number>(1);
  const { id } = useParams();
  const profileQuery = useGetSellerOverviewQuery(id);

  const tabs = [
    { value: "Ads", label: "Ads" },
    { value: "Reviews", label: "Reviews" }
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const [activeReviewTab, setActiveReviewTab] = useState("All");
  const queryString = useMemo(() => {
    const info = {
      page,
      ownById: id,
      approvedForSale: EApprovedForSale.approved,
      isSold: false
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
  }, [id, page]);
  const queryData = useGetAccountsQuery(queryString);

  return (
    <HomeLayout>
      <PrivateLayout>
        <AppRenderReduxData
          queryData={profileQuery}
          showData={(data) => {
            return (
              <div className="layout">
                {/* this is top section div  */}
                <h2 className="space-x-2 ">
                  {" "}
                  <span className=" font-semibold">MarketPlace</span>{" "}
                  <span>/</span>{" "}
                  <span className="text-xl  font-semibold">Merchant</span>
                </h2>

                {/* this is main div  */}
                <div className="pt-2 md:pt-4 lg:pt-5 2xl:pt-6">
                  <div className="flex flex-col md:flex-row gap-4 2xl:gap-6 min-h-[75dvh]">
                    <SellerProfileViewComponent />
                    <div className="hidden md:block border border-[#EFECEC]"></div>
                    <div className="hidden md:block md:w-[68%] min-h-full bg-white  rounded-lg  p-2 md:p-4">
                      <AppTabs
                        tabs={tabs}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                      />

                      {activeTab === "Ads" && (
                        <div className="max-h-[67.8dvh] overflow-auto">
                          <AppRenderReduxData
                            queryData={queryData}
                            loadingComponent={<AccountLoading />}
                            showData={(data) => {
                              // console.log(data);
                              return (
                                <>
                                  {data.data.map((single: IAccount) => (
                                    <MarketplaceAccountCard
                                      account={single}
                                      key={single.id}
                                    />
                                  ))}
                                  <div className="flex justify-center items-center mt-5">
                                    <Pagination
                                      showSizeChanger={false}
                                      pageSize={data.meta.limit}
                                      total={data.meta.total}
                                      current={data.meta.page}
                                      onChange={(value) => {
                                        setPage(value);
                                      }}
                                    ></Pagination>
                                  </div>
                                </>
                              );
                            }}
                          />
                        </div>
                      )}

                      {activeTab === "Reviews" && (
                        <div className="max-h-[67.8dvh] overflow-auto">
                          <div className="flex items-center gap-4 text-sm py-4">
                            <button
                              onClick={() => setActiveReviewTab("All")}
                              className={`${
                                activeReviewTab === "All" && "border"
                              } px-2 py-1 rounded hover:bg-gray-100`}
                            >
                              All(150)
                            </button>
                            <button
                              onClick={() => setActiveReviewTab("Positive")}
                              className={`${
                                activeReviewTab === "Positive" && "border"
                              } px-2 py-1 rounded hover:bg-gray-100`}
                            >
                              Positive(50)
                            </button>
                            <button
                              onClick={() => setActiveReviewTab("Negative")}
                              className={`${
                                activeReviewTab === "Negative" && "border"
                              } px-2 py-1 rounded hover:bg-gray-100`}
                            >
                              Negative(50)
                            </button>
                          </div>
                          <AppRenderReduxData
                            queryData={queryData}
                            loadingComponent={<AccountLoading />}
                            showData={(data) => {
                              // console.log(data);
                              return (
                                <>
                                  <div className="pr-2">
                                    {data.data.map((single: IAccount) => (
                                      <ReviewCard
                                        // account={single}
                                        key={single.id}
                                      />
                                    ))}
                                  </div>
                                  <div className="flex justify-center items-center mt-5">
                                    <Pagination
                                      showSizeChanger={false}
                                      pageSize={data.meta.limit}
                                      total={data.meta.total}
                                      current={data.meta.page}
                                      onChange={(value) => {
                                        setPage(value);
                                      }}
                                    ></Pagination>
                                  </div>
                                </>
                              );
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        ></AppRenderReduxData>
      </PrivateLayout>
    </HomeLayout>
  );
};

export default SellerDetailsPage;

import ReviewCard from "@/components/Seller/ReviewCard";
import SellerProfileViewComponent from "@/components/Seller/SellerProfileViewComponent";
import MarketplaceAccountCard from "@/components/marketplace/MarketplaceAccountCard";
import AccountLoading from "@/components/shared/AccountLoading";
import AnimationWrapper from "@/components/ui/AnimationWrapper";
import AppErrorComponent from "@/components/ui/AppErrorComponent";
import AppRenderReduxData from "@/components/ui/AppRenderReduxData";
import AppTabs from "@/components/ui/AppTabs";
import Loading from "@/components/ui/Loading";
import HomeLayout from "@/layout/HomeLayout";
import PrivateLayout from "@/layout/PrivateLayout";
import { useGetAccountsQuery } from "@/redux/features/account/accountApi";
import { useGetReviewsQuery } from "@/redux/features/review/reviewApi";
import {
  useGetSellerOverviewQuery,
  useGetSellerProfileByIdQuery,
} from "@/redux/features/user/userApi";
import {
  EApprovedForSale,
  IAccount,
  IGenericErrorMessage,
  IReview,
} from "@/types/common";
import { Pagination } from "antd";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

const SellerDetailsPage = () => {
  const tabs = [
    { value: "Ads", label: "Ads" },
    { value: "Reviews", label: "Reviews" },
  ];
  const mobileTabs = [
    { value: "Info", label: "Info" },
    { value: "Ads", label: "Ads" },
    { value: "Reviews", label: "Reviews" },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const [activeReviewTab, setActiveReviewTab] = useState("All");
  const [page, setPage] = useState<number>(1);
  const [reviewPage, setReviewPage] = useState<number>(1);
  const pageQuery = useParams();

  const { isLoading, isFetching, isError, error, data } =
    useGetSellerProfileByIdQuery(pageQuery?.id);
  const reviewQueryString = useMemo(() => {
    const info = {
      page: reviewPage,
      sellerId: pageQuery?.id,
      reviewStatus: activeReviewTab.toLowerCase(),
    };

    const queryString = Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (key === "reviewStatus" && value === "all") {
        return pre;
      } else {
        if (value) {
          return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
        }
      }
      return pre;
    }, "");
    return queryString;
  }, [pageQuery, reviewPage, activeReviewTab]);

  const reviewQuery = useGetReviewsQuery(reviewQueryString);

  const queryString = useMemo(() => {
    const info = {
      page,
      ownById: pageQuery?.id,
      approvedForSale: EApprovedForSale.approved,
      isSold: false,
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
  }, [pageQuery, page]);
  const queryData = useGetAccountsQuery(queryString);

  if (isLoading) {
    return (
      <HomeLayout>
        <PrivateLayout>
          <>
            <Loading></Loading>
          </>
        </PrivateLayout>
      </HomeLayout>
    );
  } else if (isError) {
    const err = error as any;
    return (
      <HomeLayout>
        <PrivateLayout>
          <>
            <AppErrorComponent
              error={err?.data?.message || "Something went wrong"}
            ></AppErrorComponent>
          </>
        </PrivateLayout>
      </HomeLayout>
    );
  }
  return (
    <HomeLayout>
      <PrivateLayout>
        <div className="layout">
          {/* this is top section div  */}
          <h2 className="space-x-2 ">
            {" "}
            <span className=" font-semibold">MarketPlace</span> <span>/</span>{" "}
            <span className="text-xl  font-semibold">Merchant</span>
          </h2>

          {/* this is main div  */}
          <div className="pt-2 md:pt-4 lg:pt-5 2xl:pt-6">
            <div className="flex flex-col md:flex-row gap-4 2xl:gap-6 min-h-[75dvh]">
              <div className="hidden md:block w-full xl:w-[30%]">
                <SellerProfileViewComponent data={data.data} />
              </div>
              <div className="hidden md:block border border-[#EFECEC]"></div>
              <div className=" md:w-[68%] min-h-full bg-white  rounded-lg  p-2 md:p-4">
                <AppTabs
                  tabs={window.innerWidth > 1280 ? tabs : mobileTabs}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                {activeTab === "Info" && (
                  <SellerProfileViewComponent data={data.data} />
                )}
                {activeTab === "Ads" && (
                  <div className="max-h-[67.8dvh] overflow-auto">
                    <AppRenderReduxData
                      queryData={queryData}
                      loadingComponent={<AccountLoading />}
                      showData={(data) => {
                        // console.log(data);
                        return (
                          <>
                            {data.data.map((single: IAccount, i: number) => (
                              <AnimationWrapper
                                key={single.id}
                                transition={{ delay: i * 0.08 }}
                              >
                                <MarketplaceAccountCard account={single} />
                              </AnimationWrapper>
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
                        All( {data?.data?.totalReviews} )
                      </button>
                      <button
                        onClick={() => setActiveReviewTab("Positive")}
                        className={`${
                          activeReviewTab === "Positive" && "border"
                        } px-2 py-1 rounded hover:bg-gray-100`}
                      >
                        Positive({data?.data?.totalPositiveReviews})
                      </button>
                      <button
                        onClick={() => setActiveReviewTab("Negative")}
                        className={`${
                          activeReviewTab === "Negative" && "border"
                        } px-2 py-1 rounded hover:bg-gray-100`}
                      >
                        Negative({data?.data?.totalNegativeReviews})
                      </button>
                    </div>
                    <AppRenderReduxData
                      queryData={reviewQuery}
                      loadingComponent={<AccountLoading />}
                      showData={(data) => {
                        return (
                          <>
                            <div className="pr-2">
                              {data.data.map((single: IReview, i: number) => (
                                <AnimationWrapper
                                  key={single.id}
                                  transition={{ delay: i * 0.08 }}
                                >
                                  <ReviewCard data={single} key={single.id} />
                                </AnimationWrapper>
                              ))}
                            </div>
                            <div className="flex justify-center items-center mt-5">
                              <Pagination
                                showSizeChanger={false}
                                pageSize={data.meta.limit}
                                total={data.meta.total}
                                current={data.meta.page}
                                onChange={(value) => {
                                  setReviewPage(value);
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
      </PrivateLayout>
    </HomeLayout>
  );
};

export default SellerDetailsPage;

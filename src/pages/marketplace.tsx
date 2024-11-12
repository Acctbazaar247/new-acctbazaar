import AccountReel from "@/components/AccountReel/AccountReel";
import MarketplaceAccountCard from "@/components/marketplace/MarketplaceAccountCard";
import MarketplaceSidebar from "@/components/marketplace/MarketplaceSidebar";
import AccountLoading from "@/components/shared/AccountLoading";
import { AppAlert } from "@/components/shared/AppAlert";
import AnimationWrapper from "@/components/ui/AnimationWrapper";
import AppDrawer from "@/components/ui/AppDrawer";
import AppInput from "@/components/ui/AppInput";
import AppRenderReduxData from "@/components/ui/AppRenderReduxData";
import useDebounce from "@/hooks/useDebounce";
import HomeLayout from "@/layout/HomeLayout";
import PrivateLayout from "@/layout/PrivateLayout";
import { useGetAccountsQuery } from "@/redux/features/account/accountApi";
import { useAppSelector } from "@/redux/hook";
import { AccountType, IAccount } from "@/types/common";
import { Pagination } from "antd";
import { useMemo, useState } from "react";
import { IoFilter } from "react-icons/io5";
import Sticky from "react-sticky-el";

const Marketplace = () => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const selectedCategories = useAppSelector(
    (state) => state.categories.selectedCategories
  );

  const { minPrice, maxPrice } = useAppSelector((state) => state.marketplace);

  // console.log(minPrice, maxPrice);
  // const debouncedPrice = useDebounce([minPrice, maxPrice], 500);
  const minPriceDe = useDebounce(minPrice, 500);
  const maxPriceDe = useDebounce(maxPrice, 500);

  const debouncedSearch = useDebounce(search, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const queryString = useMemo(() => {
    const info = {
      category: selectedCategories.join("-"),
      // page,
      isSold: false,
      minPrice: minPriceDe,
      maxPrice: maxPriceDe,
      approvedForSale: "approved",
      limit: 150,
      page,
      searchTerm: debouncedSearch.length ? debouncedSearch : undefined
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
  }, [selectedCategories, debouncedSearch, minPriceDe, maxPriceDe, page]);

  const queryData = useGetAccountsQuery(queryString);
  const message = process.env.NEXT_PUBLIC_ALERT_MESSAGE;
  const [isShow, setIsShow] = useState(true);

  return (
    <HomeLayout>
      <PrivateLayout>
        <div className="layout h-[calc(100dvh-105px)]   md:h-custom-dvh-md 2xl:h-custom-dvh overflow-hidden">
          {/* this is top section div  */}
          <AppAlert message={message} isShow={isShow} setIsShow={setIsShow} />
          <div className="flex flex-col md:flex-row justify-between gap-1 py-4 2xl:py-5  w-[calc(100%-40px)] md:w-auto h-[125px] md:h-auto fixed bg-background md:static max-w-[385px] sm:max-w-[645px] md:max-w-full z-40">
            <div className="md:pl-4">
              <h2 className="title">Marketplace</h2>
              <p className="text-textGrey text-xs md:text-sm">
                Access all products on the marketplace by our verified sellers
              </p>
            </div>
            <div className="w-full md:w-1/4 pt-2 md:pt-0 flex items-center gap-3">
              <AppInput
                onChange={handleSearchChange}
                type="text"
                placeholder="Search by name or description"
                value={search}
              />
              <AppDrawer
                title="Filter"
                showExtraBottomButton={true}
                button={
                  <div className="md:hidden text-primary w-fit cursor-pointer border border-borderColor rounded md:rounded-md lg:rounded-lg 2xl:rounded-xl px-3 py-1.5 text-lg">
                    <IoFilter />
                  </div>
                }
              >
                <MarketplaceSidebar isHideTitle />
              </AppDrawer>
            </div>
          </div>

          {/* this is main div  */}
          <div className="flex gap-4 bg-background  max-h-[calc(100dvh-240px)] 2xl:max-h-[72dvh] w-full 2xl:gap-6 pt-2 md:pt-4 lg:pt-5 2xl:pt-6">
            <div className="hidden md:block md:w-[30%] min-w-[330px] max-h-[72dvh] md:max-h-[68dvh] lg:max-h-[68dvh] 2xl:max-h-[72dvh]  overflow-auto 2xl:overdflow-hidden">
              {/* <Sticky
                topOffset={-40}
                offsetTransforms={true}
                stickyClassName="mt-[90px]"
              >
              </Sticky> */}
              <div className="bg-background">
                <MarketplaceSidebar />
              </div>
            </div>
            <div className="hidden md:block border border-borderColor"></div>
            <div className="w-full mt-[120px] md:mt-0">
              <div className="w-full bg-background max-h-[calc(100dvh-248px)] md:max-h-[calc(100dvh-260px)] lg:max-h-[calc(100dvh-260px)] 2xl:max-h-[660px] overflow-auto p-2 md:p-4 2xl:p-6 ">
                <h2 className="text-xl font-bold">Latest account</h2>
                <AppRenderReduxData
                  queryData={queryData}
                  loadingComponent={<AccountLoading />}
                  showData={(data) => {
                    // console.log(data);
                    return (
                      <>
                        {data.data.map((single: IAccount, i: number) => (
                          <AnimationWrapper key={single.id}>
                            <MarketplaceAccountCard account={single} />
                          </AnimationWrapper>
                        ))}
                        <div className="flex justify-center items-center mt-5">
                          <Pagination
                            size={window.innerWidth > 668 ? "default" : "small"}
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
              {/* <div className=" md:max-w-[440px] lg:max-w-[660px] xl:max-w-[916px]  2xl:max-w-[1076px] w-full mt-5">
                <AccountReel
                  title="Gift Cards"
                  accountType={AccountType.GiftCard}
                ></AccountReel>
              </div> */}
            </div>
          </div>
        </div>
      </PrivateLayout>
    </HomeLayout>
  );
};

export default Marketplace;

// import MarketplaceAccountCard from "@/components/marketplace/MarketplaceAccountCard";
// import MarketplaceSidebar from "@/components/marketplace/MarketplaceSidebar";
// import AccountLoading from "@/components/shared/AccountLoading";
// import { AppAlert } from "@/components/shared/AppAlert";
// import AnimationWrapper from "@/components/ui/AnimationWrapper";
// import AppDrawer from "@/components/ui/AppDrawer";
// import AppInput from "@/components/ui/AppInput";
// import AppModal from "@/components/ui/AppModal";
// import useDebounce from "@/hooks/useDebounce";
// import useIsMobile from "@/hooks/useIsMobile";
// import HomeLayout from "@/layout/HomeLayout";
// import PrivateLayout from "@/layout/PrivateLayout";
// import { useGetAccountsQuery } from "@/redux/features/account/accountApi";
// import { setModalOpen } from "@/redux/features/marketplace/marketplaceSlice";
// import { useAppDispatch, useAppSelector } from "@/redux/hook";
// import { IAccount } from "@/types/common";
// import { Empty, Pagination } from "antd";
// import Image from "next/image";
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import { IoFilter } from "react-icons/io5";

// const Marketplace = () => {
//   const [search, setSearch] = useState<string>("");
//   const [page, setPage] = useState<number>(1);
//   const isMobile = useIsMobile();
//   const modalOpen = useAppSelector((state) => state.marketplace.modalOpen);
//   const dispatch = useAppDispatch();
//   const selectedCategories = useAppSelector(
//     (state) => state.categories.selectedCategories
//   );

//   const { minPrice, maxPrice } = useAppSelector((state) => state.marketplace);

//   // const debouncedPrice = useDebounce([minPrice, maxPrice], 500);
//   const minPriceDe = useDebounce(minPrice, 500);
//   const maxPriceDe = useDebounce(maxPrice, 500);

//   const debouncedSearch = useDebounce(search, 500);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearch(e.target.value);
//   };

//   const queryString = useMemo(() => {
//     const info = {
//       category: selectedCategories.join("-"),
//       // page,
//       isSold: false,
//       minPrice: minPriceDe,
//       maxPrice: maxPriceDe,
//       approvedForSale: "approved",
//       limit: 150,
//       page,
//       searchTerm: debouncedSearch.length ? debouncedSearch : undefined,
//     };

//     const queryString = Object.keys(info).reduce((pre, key: string) => {
//       if (key === "isSold") {
//         return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${false}`;
//       } else {
//         const value = info[key as keyof typeof info];
//         if (value) {
//           return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
//         }
//       }
//       return pre;
//     }, "");
//     return queryString;
//   }, [selectedCategories, debouncedSearch, minPriceDe, maxPriceDe, page]);

//   const { data, isLoading } = useGetAccountsQuery(queryString);

//   const message = process.env.NEXT_PUBLIC_ALERT_MESSAGE;
//   const [isShow, setIsShow] = useState(true);

//   return (
//     <HomeLayout>
//       <PrivateLayout>
//         <div
//           className={`container  overflow-hidden ${
//             isShow ? "pt-1  lg:pt-1 2xl:pt-3" : "py-2 md:py-4 lg:py-5 2xl:py-7"
//           }`}
//         >
//           {/* this is top section div  */}
//           <AppAlert isShow={isShow} setIsShow={setIsShow} message={message} />
//           <div className="flex flex-col md:flex-row justify-between md:gap-1 max-xxs:py-3 py-4 2xl:py-5  w-[calc(100%-40px)] md:w-auto fixed bg-background md:static z-40">
//             <div className="md:pl-4 2xl:pl-6">
//               <h2 className="title">Marketplace</h2>
//               <p className="text-textGrey max-xxs:text-[11px] text-xs md:text-sm">
//                 Access all products on the marketplace by our verified sellers
//               </p>
//             </div>

//             <div className="w-full md:w-1/4 pt-3 md:pt-0 flex items-center gap-2 md:gap-3">
//               <AppInput
//                 onChange={handleSearchChange}
//                 type="text"
//                 placeholder="Search by name or description"
//                 value={search}
//               />
//               <AppDrawer
//                 title="Filter"
//                 showExtraBottomButton={true}
//                 button={
//                   <div className="md:hidden text-primary w-fit cursor-pointer border border-borderColor rounded md:rounded-md lg:rounded-lg 2xl:rounded-xl px-3 py-1.5 md:py-1.5 text-lg">
//                     <IoFilter />
//                   </div>
//                 }
//               >
//                 <MarketplaceSidebar isHideTitle />
//               </AppDrawer>
//             </div>
//           </div>

//           {/* this is main div  */}
//           <div className="max-sm:fixed top-[136px] left-0 max-sm:px-2 md:flex gap-4 bg-background overflow-hidden h-[calc(100dvh-200px)] xl:h-[calc(100dvh-200px)] 2xl:h-[calc(100dvh-240px)] w-full 2xl:gap-6 md:pt-4 lg:pt-5 2xl:pt-2">
//             <div className="hidden md:block  md:w-[30%] min-w-[330px]">
//               <MarketplaceSidebar />
//             </div>
//             <div className="hidden md:block border border-borderColor"></div>

//             <div className="w-full px-4 lg:px-5 2xl:px-6">
//               <div className="h-[calc(100dvh-225px)] md:h-[calc(100dvh-260px)] lg:h-[calc(100dvh-265px)] xl:h-[calc(100dvh-270px)] 2xl:h-[calc(100dvh-295px)] overflow-y-auto">
//                 <h2 className="text-xl font-semibold xl:text-2xl max-sm:pt-10">
//                   Latest account
//                 </h2>
//                 {data?.data?.length === 0 ? (
//                   <Empty
//                     description="No Data Found"
//                     className="min-h-[50dvh] flex flex-col text-xl font-medium gap-4 items-center justify-center"
//                   />
//                 ) : isLoading ? (
//                   <AccountLoading />
//                 ) : (
//                   <>
//                     {data?.data?.map((single: IAccount, i: number) => (
//                       <AnimationWrapper
//                         key={single.id}
//                         // transition={{ delay: i }}
//                       >
//                         <MarketplaceAccountCard account={single} />
//                       </AnimationWrapper>
//                     ))}
//                   </>
//                 )}
//               </div>
//               <Pagination
//                 size={isMobile ? "small" : "default"}
//                 showSizeChanger={false}
//                 pageSize={data?.meta?.limit}
//                 total={data?.meta?.total}
//                 current={data?.meta?.page}
//                 className="mx-auto w-fit md:py-2"
//                 onChange={(value) => {
//                   setPage(value);
//                 }}
//               ></Pagination>
//             </div>

//             {/* <div className=" md:max-w-[440px] lg:max-w-[660px] xl:max-w-[916px]  2xl:max-w-[1076px] w-full mt-5">
//                 <AccountReel
//                   title="Gift Cards"
//                   accountType={AccountType.GiftCard}
//                 ></AccountReel>
//               </div> */}
//           </div>
//         </div>

//         <AppModal
//           // closeable={false}
//           modalOpen={modalOpen}
//           setModalOpen={() => dispatch(setModalOpen(false))}
//         >
//           <div className="w-[80dvw] md:w-[500px]">
//             <div className="max-w-lg mx-auto py-4">
//               <Image
//                 width={200}
//                 height={160}
//                 src="/assets/auth/congratulations.png"
//                 alt=""
//                 className="mx-auto"
//               />

//               <h2 className="text-lg lg:text-2xl font-medium text-textBlack text-center pt-2">
//                 Purchase successful
//               </h2>
//               <p className="text-textDarkGrey text-lg text-center">
//                 Successfully purchased 2 accounts
//               </p>

//               <Link
//                 href={"/my-purchase"}
//                 className="text-primary hover:text-primary hover:underline underline block text-center py-4 font-semibold text-lg"
//               >
//                 View order details
//               </Link>
//             </div>
//           </div>
//         </AppModal>
//       </PrivateLayout>
//     </HomeLayout>
//   );
// };

// export default Marketplace;

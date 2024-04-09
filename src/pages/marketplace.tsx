import AccountReel from "@/components/AccountReel/AccountReel";
import { SelectOptions } from "@/components/Forms/FormSelectField";
import MarketplaceAccountCard from "@/components/marketplace/MarketplaceAccountCard";
import MarketplaceSidebar from "@/components/marketplace/MarketplaceSidebar";
import PriceRange from "@/components/marketplace/PriceRange";
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
      limit: 75,
      page,
      searchTerm: debouncedSearch.length ? debouncedSearch : undefined,
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

  return (
    <HomeLayout>
      <PrivateLayout>
        <div className="container pb-5 md:py-10 2xl:py-12">
          {/* this is top section div  */}
          <div className="flex flex-col md:flex-row justify-between gap-1 pt-5 pb-5  w-[calc(100%-40px)] md:w-auto h-[125px] md:h-auto fixed bg-white md:static z-40">
            <div className="">
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
                value={""}
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
          <div className=" flex gap-4 min-h-[80dvh] w-full 2xl:gap-6 pt-2 md:pt-4 lg:pt-5 2xl:pt-6">
            <div className="hidden md:block md:w-[30%] min-w-[330px] h-full bg-white">
              <Sticky
                topOffset={-40}
                offsetTransforms={true}
                stickyClassName="mt-[90px]"
              >
                <div className="bg-white">
                  <MarketplaceSidebar />
                </div>
              </Sticky>
            </div>
            <div className="hidden md:block border border-[#E1DBDB]"></div>
            <div className="w-full mt-[120px] md:mt-0">
              <div className="w-full     bg-white p-2 md:p-4 2xl:p-6">
                <h2 className="text-xl font-bold">Latest account</h2>
                <AppRenderReduxData
                  queryData={queryData}
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
              <div className=" md:max-w-[440px] lg:max-w-[660px] xl:max-w-[916px]  2xl:max-w-[1076px] w-full mt-5">
                <AccountReel
                  title="Gift Cards"
                  accountType={AccountType.GiftCard}
                ></AccountReel>
              </div>
            </div>
          </div>
        </div>
      </PrivateLayout>
    </HomeLayout>
  );
};

export default Marketplace;

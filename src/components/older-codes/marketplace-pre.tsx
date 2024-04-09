import AccountCard from "@/components/AccountCard/AccountCard";
import AccountTable from "@/components/AccountReel/AccountTable";
import ErrorCompo from "@/components/ui/AppErrorComponent";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import Loading from "@/components/ui/Loading";
import useDebounce from "@/hooks/useDebounce";
import HomeLayout from "@/layout/HomeLayout";
import PrivateLayout from "@/layout/PrivateLayout";
import RootLayout from "@/layout/RootLayout";
import { useGetAccountsQuery } from "@/redux/features/account/accountApi";
import { ACCOUNT_CATEGORIES } from "@/shared";
import { AccountCategory, EApprovedForSale, IAccount } from "@/types/common";
import { optionCreator } from "@/utils";
import { Avatar, Input, Pagination, Slider } from "antd";
import { SliderMarks } from "antd/es/slider";
import React, { useMemo, useState } from "react";

const Marketplace = () => {
  const [page, setPage] = useState<number>(1);
  const defaultValue = { value: "", label: "" };
  const [search, setSearch] = useState<string>("");
  const [price, setPrice] = useState([0, 0]);
  const debouncedPrice = useDebounce(price, 500);
  const debouncedSearch = useDebounce(search, 500); // 500ms debounce delay
  const [category, setCategory] = useState<SelectOptions>(defaultValue);

  const queryString = useMemo(() => {
    const info = {
      category: category.value.length ? category.value : undefined,
      page,
      isSold: false,
      minPrice: debouncedPrice[0],
      maxPrice: debouncedPrice[1],
      approvedForSale: "approved",
      limit: 50,
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
  }, [category, debouncedSearch, page, debouncedPrice]);
  const { data, isFetching, isLoading, isError } =
    useGetAccountsQuery(queryString);
  let content = null;

  if (isFetching || isLoading) {
    content = <Loading></Loading>;
  } else if (isError) {
    content = <ErrorCompo></ErrorCompo>;
  } else if (data?.data.length) {
    const info = data.data as IAccount[];
    content = (
      <div>
        <AccountTable dataSource={info}></AccountTable>
        <div className="flex justify-center mt-5">
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
      </div>
    );
  } else {
    content = (
      <div>
        <h2 className="text-center capitalize">No account found!</h2>
      </div>
    );
  }
  const categoryOption = ACCOUNT_CATEGORIES.map((single) => ({
    value: single.value,
    label: (
      <div className="flex gap-2 items-center">
        <Avatar src={single.imageUrl}></Avatar>
        <span>{single.label}</span>
      </div>
    ),
  }));

  const handleCategoryChange = (el: string) => {
    setCategory({ value: el, label: el });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handlePriceChange = (value: any) => {
    setPrice(value);
  };
  const marks: SliderMarks = {
    0: "$0",
    5000: "$5000",
  };
  return (
    <RootLayout>
      <HomeLayout>
        <PrivateLayout>
          <div className="container">
            <h2 className=" font-bold text-xl mt-10 mb-4">Marketplace</h2>
            <div className="mt-5 mb-10">
              <div className="flex flex-col md:flex-row lg:items-center gap-4 mb-5 justify-between">
                <div className="flex flex-wrap gap-4">
                  <div className="w-[200px] ">
                    <Form submitHandler={() => { }}>
                      <FormSelectField
                        name="category"
                        handleChange={handleCategoryChange}
                        placeholder="Filter By category"
                        options={categoryOption}
                        value={category.value}
                        className="h-[450px]"
                      ></FormSelectField>
                    </Form>
                  </div>

                  <Input
                    className="max-w-[350px] h-[40px] xl:w-[400px] w-full inline-block"
                    type="search"
                    name="search"
                    onChange={handleSearchChange}
                    placeholder="Search by name or description"
                    value={search}
                  />
                </div>
                <div className="hidden md:block">
                  <button
                    className="px-4 py-2 bg-orange-500 text-white leading-0 rounded"
                    onClick={() => {
                      setCategory(defaultValue);
                      setSearch("");
                      setPrice([0, 0]);
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <h2>Price accounts: </h2>
                <div className="flex gap-3 items-center">
                  <Input
                    type="number"
                    placeholder="from"
                    value={price[0] || undefined}
                    onChange={(e) => {
                      setPrice((pre) => {
                        if (parseFloat(e.target.value) < 0) {
                          return [0, pre[1]];
                        }
                        return [parseFloat(e.target.value), pre[1]];
                      });
                    }}
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    value={price[1] || undefined}
                    placeholder="to"
                    onChange={(e) => {
                      setPrice((pre) => {
                        if (parseFloat(e.target.value) < 0) {
                          return [pre[0], 0];
                        }
                        return [pre[0], parseFloat(e.target.value)];
                      });
                    }}
                  />
                  <span>$</span>
                </div>
              </div>
              <div className="block md:hidden mt-5">
                <button
                  className="px-4 py-2 bg-orange-500 text-white leading-0 rounded"
                  onClick={() => {
                    setCategory(defaultValue);
                    setSearch("");
                    setPrice([0, 0]);
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
            {content}
          </div>
        </PrivateLayout>
      </HomeLayout>
    </RootLayout>
  );
};

export default Marketplace;

import { ACCOUNT_CATEGORIES, findImageUrlByCategory } from "@/shared";
import { AccountCategory, EApprovedForSale, IAccount } from "@/types/common";
import { Pagination } from "antd";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import Loading from "../ui/Loading";
import ErrorCompo from "../ui/AppErrorComponent";
import { useGetAccountsQuery } from "@/redux/features/account/accountApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCartPlus,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import CurrencyLogo from "../CurrencyLogo/CurrencyLogo";
import AccountCard from "../AccountCard/AccountCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import AccountTable from "../AccountReel/AccountTable";
import { FreeMode, Navigation } from "swiper/modules";
type Props = {};

const FilterAndFindAccountSection = (props: Props) => {
  const [activeAcc, setActiveAcc] = useState("");
  const [page, setPage] = useState<number>(1);

  const queryString = useMemo(() => {
    const info = {
      page,
      isSold: false,
      category: activeAcc || undefined,
      approvedForSale: EApprovedForSale.approved,
    };
    const queryString = Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value || value === false) {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
      }
      return pre;
    }, "");
    return queryString;
  }, [page, activeAcc]);

  const { data, isError, isLoading, isFetching, isSuccess, error } =
    useGetAccountsQuery(queryString);

  let content = null;

  if (isLoading || isFetching) {
    content = <Loading></Loading>;
  } else if (isError) {
    content = <ErrorCompo></ErrorCompo>;
  } else if (isSuccess && data.data.length) {
    const info = data.data as IAccount[];
    content = (
      <div>
        <div className=" ">
          <AccountTable dataSource={info}></AccountTable>
          <div className="flex justify-center mt-4">
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
      </div>
    );
  } else {
    content = <ErrorCompo error="No account found!"></ErrorCompo>;
  }
  const breakpoints = {
    // Breakpoints for different screen sizes
    20: {
      spaceBetween: 10,
    },
    340: {
      spaceBetween: 10,
      slidesPerView: 3,
    },
    460: {
      spaceBetween: 20,
      slidesPerView: 4,
    },
    1220: {
      spaceBetween: 40,
      slidesPerView: 6,
    },
  };

  return (
    <div className="mt-4">
      <h2 className="mb-4 font-bold text-lg">Latest Account</h2>
      <div className=" relative">
        <Swiper
          modules={[Navigation, FreeMode]}
          slidesPerView={3}
          freeMode={true}
          loop={true}
          breakpoints={breakpoints}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          autoplay={{
            delay: 2000, // Adjust the autoplay delay as needed
            disableOnInteraction: false,
          }}
        >
          {ACCOUNT_CATEGORIES.map((single, index) => (
            <SwiperSlide key={index} className="h-full">
              {" "}
              <button
                onClick={() =>
                  setActiveAcc((pre) =>
                    pre === single.value ? "" : single.value
                  )
                }
                key={single.value}
                className={`flex bg-white shadow-lg border w-full h-[40px] xl:h-[57px] border-gray-200 min-w-[100px] lg:min-w-[170px] transition-all   items-center p-2 rounded-xl   select-none gap-1 md:gap-2 ${activeAcc
                  ? activeAcc === single.value
                    ? "grayscale-0 "
                    : "grayscale opacity-70"
                  : "grayscale-0 "
                  }`}
              >
                <Image
                  //   className="w-full object-cover "
                  //   layout="cover"
                  src={single.imageUrl}
                  className="rounded lg:rounded-xl w-[20px] lg:w-[40px]"
                  width={200}
                  height={200}
                  alt={single.label}
                />
                <span className="text-[10px]  lg:text-lg font-bold">
                  {single.label.length > 12
                    ? single.label.slice(0, 9) + ".."
                    : single.label}
                </span>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex  gap-2  pointer-events-none absolute w-full justify-between top-1/2 z-20 -translate-y-1/2">
          <button className="swiper-button-prev  rounded-full  hover:text-orange-500 bg-white/60 backdrop-blur-sm hover:border-orange-500 transition-all pointer-events-auto w-[25px] h-[25px]">
            <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
          </button>
          <button className="swiper-button-next  rounded-full  hover:text-orange-500 bg-white/60 backdrop-blur-sm hover:border-orange-500 transition-all pointer-events-auto w-[25px] h-[25px]">
            <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
          </button>
        </div>
      </div>
      <div className="mt-10">{content}</div>
    </div>
  );
};

export default FilterAndFindAccountSection;

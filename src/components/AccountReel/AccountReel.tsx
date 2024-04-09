"use client";
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
import AccountTable from "./AccountTable";
import AccountCard from "../AccountCard/AccountCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode, Navigation } from "swiper/modules";
type Props = { title: string; category?: string; accountType?: string };
const breakpoints = {
  // Breakpoints for different screen sizes
  20: {
    spaceBetween: 10,
    slidesPerView: 1,
  },
  340: {
    spaceBetween: 10,
    slidesPerView: 2,
  },
  1040: {
    spaceBetween: 20,
    slidesPerView: 3.4,
  },
};
const AccountReel = ({ title, accountType, category }: Props) => {
  const [page, setPage] = useState<number>(1);

  const queryString = useMemo(() => {
    const info = {
      page,
      isSold: false,
      category,
      accountType,
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
  }, [page, category, accountType]);
  const { data, isError, isLoading, isFetching, isSuccess, error } =
    useGetAccountsQuery(queryString);

  let content = null;

  if (isLoading || isFetching) {
    content = <Loading></Loading>;
  } else if (isError) {
    content = null;
  } else if (isSuccess && data.data.length) {
    const info = data.data as IAccount[];
    content = (
      <div className="bg-white p-4 ">
        <h2 className="text-sm lg:text-lg mb-5  font-bold ">{title}</h2>
        <div className=" w-full ">
          {/* <AccountTable dataSource={info}></AccountTable> */}
          <div className=" relative ">
            <Swiper
              modules={[Navigation]}
              slidesPerView={3}
              spaceBetween={20}
              key={data}
              breakpoints={breakpoints}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
            >
              {info.map((single, index) => (
                <SwiperSlide key={index} className=" ">
                  <AccountCard {...single}></AccountCard>
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
          {/* <div className="flex justify-center mt-4">
            <Pagination
              showSizeChanger={false}
              pageSize={data.meta.limit}
              total={data.meta.total}
              current={data.meta.page}
              onChange={(value) => {
                setPage(value);
              }}
            ></Pagination>
          </div> */}
        </div>
      </div>
    );
  } else {
    content = null;
  }
  return (
    <>
      <div className="mt-2">{content}</div>
    </>
  );
};

export default AccountReel;

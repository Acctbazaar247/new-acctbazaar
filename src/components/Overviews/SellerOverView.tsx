// import { useGetSingleUserBookingByUserIdQuery } from "@/redux/features/booking/bookingApi";
// import { useGetSingleUserCartsQuery } from "@/redux/features/cart/cartApi";
import React from "react";
import Loading from "../ui/Loading";
import { Booking, BookingStatus } from "@/types/common";
import { useRouter } from "next/router";
import {
  useGetAdminOverviewQuery,
  useGetSellerOverviewQuery,
} from "@/redux/features/user/userApi";

type Props = {};

const SellerOverView = () => {
  const router = useRouter();
  const { data: sellerOverviewInfo, isLoading } = useGetSellerOverviewQuery("");

  const info = [
    {
      title: "Total Account",
      to: "/dashboard/myCreatedAccounts",
      value: sellerOverviewInfo?.data?.totalAccount,
    },
    {
      title: "Sold Account",
      to: "/dashboard/allService",
      value: sellerOverviewInfo?.data?.totalSoldAccount,
    },
    {
      title: "Total Order",
      to: "/dashboard/myOrders",
      value: sellerOverviewInfo?.data?.totalOrder,
    },
    {
      title: "Money",
      to: "/dashboard/addFund",
      value: "$" + sellerOverviewInfo?.data?.totalMoney,
    },
  ];
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <div className="grid  grid-cols-2 gap-2 md:gap-5 pb-10">
        {info.map((single) => (
          <div
            key={single.title}
            className="cursor-pointer overflow-hidden shadow py-5 lg:py-10 relative rounded-md lg:rounded-xl border "
          >
            <div className="relative z-30">
              <p className="uppercase text-orange-500 text-md md:text-2xl  text-center ">
                {single.title}
              </p>
              <div className="text-center text-xl md:text-2xl font-bold mt-3 ">
                {single.value}
              </div>
            </div>
            <div className="absolute inset-0 backdrop-blur-md"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerOverView;

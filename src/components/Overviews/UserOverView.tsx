// import { useGetSingleUserBookingByUserIdQuery } from "@/redux/features/booking/bookingApi";
// import { useGetSingleUserCartsQuery } from "@/redux/features/cart/cartApi";
import React from "react";
import Loading from "../ui/Loading";
import { Booking, BookingStatus } from "@/types/common";
import { useRouter } from "next/router";
import {
  useGetAdminOverviewQuery,
  useGetUserByIdQuery,
  useGetUserOverviewQuery,
} from "@/redux/features/user/userApi";

type Props = {};

const UserOverView = () => {
  const router = useRouter();
  const { data: userOverviewInfo, isLoading } = useGetUserOverviewQuery("");

  const info = [
    {
      title: "Total Order",
      to: "/dashboard/myOrders",
      value: userOverviewInfo?.data?.totalOrder,
    },
    {
      title: "Carts",
      to: "/checkout",
      value: userOverviewInfo?.data?.totalAccountOnCart,
    },
    {
      title: "Money",
      to: "/dashboard/addFunds",
      value: "$" + userOverviewInfo?.data?.totalMoney,
    },
  ];
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <div className="grid lg:grid-cols-3 grid-cols-2 gap-2 md:gap-10 pb-10">
        {info.map((single) => (
          <div
            key={single.title}
            className="cursor-pointer overflow-hidden shadow py-5 relative rounded-md lg:rounded-xl border "
          >
            <div className="relative z-30">
              <p className="uppercase text-orange-500 text-md  text-center ">
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

export default UserOverView;

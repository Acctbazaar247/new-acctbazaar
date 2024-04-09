import DashboardCard from "@/components/dashboard/DashboardCard";
import DashboardPayments from "@/components/dashboard/DashboardPayments";
import DashboardSalesDynamics from "@/components/dashboard/DashboardSalesDynamics";
import AppDatePicker from "@/components/ui/AppDatePicker";
import HomeLayout from "@/layout/HomeLayout";
import PrivateLayout from "@/layout/PrivateLayout";
import SellerLayout from "@/layout/SellerLayout";
import { useGetSellerOverviewQuery } from "@/redux/features/user/userApi";
import { useState } from "react";
import { LiaUserCheckSolid } from "react-icons/lia";
import { RiCoinsLine } from "react-icons/ri";
import { TbUserCircle, TbUserDollar } from "react-icons/tb";

export default function Dashboard() {
  const [date, setDate] = useState<any>(null);
  const { data } = useGetSellerOverviewQuery("");

  const dashboardCards = [
    {
      title: "Total amount",
      icon: <RiCoinsLine className="text-xl text-textGrey" />,
      amount: data?.data?.totalMoney,
      // rate: 10,
      // increase: false,
      // timeRange: "month"
    },
    {
      title: "Total accounts",
      icon: <TbUserCircle className="text-xl text-textGrey" />,
      amount: data?.data?.totalAccount,
      // rate: 40,
      // increase: true,
      // timeRange: "month"
    },
    {
      title: "Accounts sold",
      icon: <TbUserDollar className="text-xl text-textGrey" />,
      amount: data?.data?.totalSoldAccount,
      // rate: 40,
      // increase: true,
      // timeRange: "month"
    },
    {
      title: "Accounts approved",
      icon: <LiaUserCheckSolid className="text-xl text-textGrey" />,
      amount: data?.data?.totalAccountApprove,
      // rate: 40,
      // increase: true,
      // timeRange: "month"
    },
  ];

  return (
    <HomeLayout>
      <SellerLayout>
        <div className="container py-5 md:py-10 2xl:py-12">
          {/* this is top section div  */}
          <div className="flex flex-col md:flex-row gap-1 justify-between">
            <div className="">
              <h2 className="title">My Dashboard</h2>
              <p className="text-textGrey text-xs md:text-sm">
                Access all products on the marketplace by our verified sellers
              </p>
            </div>
            {/* <AppDatePicker
                            placeholder="Select date"
                            setDate={setDate}
                        /> */}
          </div>

          {/* this is main div  */}
          <div className="w-full space-y-2 md:space-y-6 bg-white md:p-5 2xl:p-6 mt-2 md:mt-4 lg:mt-5 2xl:mt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 2xl:gap-6">
              {dashboardCards.map((card) => (
                <DashboardCard key={card?.title} card={card} />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 2xl:gap-6">
              {/* this is left side dev  */}
              <DashboardPayments />

              {/* this is right side dev  */}
              <DashboardSalesDynamics />
            </div>
          </div>
        </div>
      </SellerLayout>
    </HomeLayout>
  );
}

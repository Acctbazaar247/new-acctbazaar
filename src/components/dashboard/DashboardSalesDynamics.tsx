import Image from "next/image";
import { useState } from "react";
import DashboardCard from "./DashboardCard";
import AppTabs from "../ui/AppTabs";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Tooltip } from "antd";
import { useGetSellerOverviewQuery } from "@/redux/features/user/userApi";
import { customizeData } from "@/utils/sellerSaleDataCustomize";
import AppRenderReduxData from "../ui/AppRenderReduxData";

export default function DashboardSalesDynamics() {
  const queryInfo = useGetSellerOverviewQuery("");

  return (
    <div className="w-full rounded-lg shadow-md pt-4 pb-12 px-5 border border-[#FAFAFA] ">
      <div className="text-textBlueBlack flex items-center justify-between pb-6">
        <h2 className="text-xl">Sales Dynamics</h2>
        <h2 className="text-sm">2024</h2>
      </div>

      {/* <AppTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} /> */}

      <div className="">
        <AppRenderReduxData
          isEmptyComponentHave
          queryData={queryInfo}
          showData={(data) => {
            const chartData = customizeData(data?.data.pastYearData);
            return (
              <div className=" h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    barSize={10}
                    width={550}
                    height={250}
                    data={chartData}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis dataKey="totalSold" />
                    <Tooltip />
                    <Bar dataKey="totalSold" fill="#FF5A35" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}

import Image from "next/image";
import AppTabs from "../ui/AppTabs";
import { useState } from "react";
import DashboardCard from "./DashboardCard";
import { useGetSellerOverviewQuery } from "@/redux/features/user/userApi";

export default function DashboardPayments() {
    const { data } = useGetSellerOverviewQuery("")

    const tabs = [
        { label: "12 Months" },
        { label: "3 Months" },
        { label: "30 Days" },
        { label: "7 Days" },
        { label: "24 Hours" },
    ];

    // const [activeTab, setActiveTab] = useState(tabs[0].label);

    const paymentsCards = [
        {
            title: "Withdrawal",
            icon: <Image width={24} height={24} src="/assets/icons/money-send.png" className="size-6" alt="Withdrawal" />,
            amount: data?.data?.totalWithdraw,
            // rate: 10,
            // increase: false,
            // timeRange: "year"
        },
        {
            title: "Fund wallet",
            icon: <Image width={24} height={24} src="/assets/icons/money-recive.png" className="size-6" alt="Withdrawal" />,
            amount: data?.data?.totalFundWallet,
            // rate: 40,
            // increase: true,
            // timeRange: "year"
        },
    ];

    return (
        <div className='w-full rounded-lg shadow-md pt-4 pb-12 px-5 border border-[#FAFAFA] '>
            <div className='text-textBlueBlack flex items-center justify-between pb-6'>
                <h2 className="text-xl">Payments</h2>
                <h2 className="text-sm">2024</h2>
            </div>

            {/* <AppTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} /> */}

            <div className='pt-10 grid grid-cols-2 gap-5 2xl:gap-6'>
                {
                    paymentsCards.map(card => (
                        <DashboardCard key={card?.title} card={card} />
                    ))
                }
            </div>
        </div>
    );
};

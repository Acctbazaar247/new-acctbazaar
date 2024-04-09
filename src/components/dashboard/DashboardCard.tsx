import { ReactElement } from "react";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";
import { PiCurrencyDollarBold } from "react-icons/pi";

type TDashboardCard = {
    title: string;
    icon: ReactElement;
    amount: number;
    // rate: number;
    // increase: boolean;
    // timeRange: string;
};

export default function DashboardCard({ card }: { card: TDashboardCard }) {
    return (
        <div className='w-full rounded md:rounded-lg shadow-md p-3 md:py-4 md:px-5 border border-[#FAFAFA] '>
            <div className='flex items-center justify-between text-textDarkGrey text-sm md:text-base font-medium'>
                <p>{card?.title}</p>
                {card?.icon}
            </div>
            <div className='pt-3 md:pt-6'>
                <h2 className="text-xl md:text-3xl font-medium flex items-center gap-0.5"><PiCurrencyDollarBold />{card?.amount}</h2>
                {/* <h3 className="flex text-sm md:text-base items-center gap-1"><span className={`flex items-center gap-1 ${card?.increase ? "text-red" : "text-success"}`}>{card?.increase ? <IoMdArrowUp /> : <IoMdArrowDown />}{card?.rate}%</span> <span className="text-xs md:text-sm font-medium text-textDarkGrey">vs last {card?.timeRange}</span></h3> */}
            </div>
        </div>
    );
};

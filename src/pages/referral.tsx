import AppTabs from "@/components/ui/AppTabs";
import HomeLayout from "@/layout/HomeLayout";
import PrivateLayout from "@/layout/PrivateLayout";
import Image from "next/image";
import { useState } from "react";
import { BiSolidCopy } from "react-icons/bi";
import { FiCheck } from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";
import { PiCurrencyDollarBold, PiUsersThreeLight } from "react-icons/pi";
import { toast } from "react-toastify";

export default function Referral() {
    const [copied, setCopied] = useState(false);

    const copyText = async () => {
        try {
            await navigator.clipboard.writeText("Acctbazaar,com/manny/2weydwiuhb");
            setCopied(true);
            toast.success("copied!");
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const tabs = [
        { label: "In Progress" },
        { label: "Completed" },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].label);


    return (
        <HomeLayout>
            <PrivateLayout>
                <div className='container py-5 md:py-10 2xl:py-12'>
                    {/* this is top section div  */}
                    <div className=''>
                        <h2 className="title">Referral</h2>
                        <p className="text-textGrey text-xs md:text-sm">Earn more when you invite friends to Acctbazaar</p>
                    </div>

                    {/* this is main div  */}
                    <div className='flex flex-col md:flex-row gap-4 min-h-[90dvh] 2xl:gap-6 pt-2 md:pt-4 lg:pt-5 2xl:pt-6'>
                        <div className='rounded md:w-1/2 min-h-full pb-8 bg-white'>
                            <div className='flex items-center justify-center flex-col md:px-16 gap-1 text-center py-6 lg:py-8'>
                                <Image width={200} height={160} src="/assets/icons/gift-box.png" alt="" className="mx-auto size-28 mb-4" />
                                <h2 className="subTitle">Receive $100 reward instantly</h2>
                                <p className="textG">When your friend registers, funds wallet with minimum of <span className="textB">$50</span> and purchases at least <span className="textB">one account</span>, you get rewarded instantly.</p>
                            </div>

                            <div className='px-4'>
                                <h4 className="text-center text-base">How to use invitation code</h4>
                                <div className='flex items-center my-4'>
                                    <Image width={200} height={160} src="/assets/icons/link-chain.png" alt="" className="mx-auto size-12" />
                                    <div className={`border w-12 md:w-20 border-primary border-dashed`}></div>
                                    <Image width={200} height={160} src="/assets/icons/order-card.png" alt="" className="mx-auto size-12" />
                                    <div className={`border w-12 md:w-20 border-primary border-dashed`}></div>
                                    <Image width={200} height={160} src="/assets/icons/bag-taka.png" alt="" className="mx-auto size-12" />
                                </div>

                                <div className='flex items-center gap-2 text-xs md:text-sm md:gap-6 text-center'>
                                    <p className="textB">Share invitation link/code with friends</p>
                                    <p className="textB">Let friends sign up and fund wallet with minimum of $50</p>
                                    <p className="textB">Receive $100 reward instantly</p>
                                </div>
                            </div>

                            <div className='pt-10 flex items-center flex-col gap-1'>
                                <div className="border border-[#EDE8E8] rounded-full flex flex-col md:flex-row items-center md:gap-4 py-2 px-4">
                                    <span className="textG">Your Referral link:</span>
                                    <p className="flex textB items-center gap-1">
                                        <span className="textB">Acctbazaar,com/manny/2weydwiuhb</span>
                                        {copied ?
                                            <FiCheck />
                                            :
                                            <BiSolidCopy onClick={copyText} className="cursor-pointer" />
                                        }
                                    </p>
                                </div>
                                <button className="appBtn px-12">Share Invitation link</button>
                            </div>
                        </div>

                        <div className='hidden md:block border border-[#E1DBDB]'></div>
                        <div className='w-full md:w-1/2 space-y-4 rounded min-h-full overflow-y-auto bg-white p-2 md:p-4 lg:p-6 2xl:p-6'>
                            <h4 className="text-lg">Referral Record</h4>
                            <div className='py-4 p-4 border border-borderColor grid grid-cols-2 rounded-lg'>
                                <div className='space-y-2'>
                                    <h3 className="flex items-center gap-2"><IoWalletOutline />Total Earned</h3>
                                    <h2 className="text-textBlack font-bold flex items-center"><PiCurrencyDollarBold />0</h2>
                                </div>
                                <div className='space-y-2'>
                                    <h3 className="flex items-center gap-2"><PiUsersThreeLight />Invitees</h3>
                                    <h2 className="text-textBlack font-bold flex items-center">0</h2>
                                </div>
                            </div>

                            <div className='p-4 border border-borderColor rounded-lg'>
                                <AppTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                                <div className='py-12 px-5'>
                                    <Image width={250} height={166} src="/assets/icons/earned.png" alt="" className="mx-auto" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PrivateLayout>
        </HomeLayout>
    );
};

import AppTabs from "@/components/ui/AppTabs";
import { config } from "@/config";
import HomeLayout from "@/layout/HomeLayout";
import PrivateLayout from "@/layout/PrivateLayout";
import { useGetAllReferralQuery } from "@/redux/features/referral/referralApi";
import { useAppSelector } from "@/redux/hook";
import { EReferral, TReferral } from "@/types/common";
import { formatDate, formatDateWithTime } from "@/utils/formateDate";
import Image from "next/image";
import { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BiSolidCopy } from "react-icons/bi";
import { FiCheck } from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";
import { PiCurrencyDollarBold, PiUsersThreeLight } from "react-icons/pi";
import { toast } from "react-toastify";

export default function Referral() {
    const [copied, setCopied] = useState(false);
    const user = useAppSelector((state) => state?.user);
    const clientUrlLink = process.env.NEXT_PUBLIC_FRONTEND_URL
    const referralLink = `${clientUrlLink}/auth/sign-up?referralId=${user?.user?.id}`

    const copyText = async () => {
        try {
            await navigator.clipboard.writeText(referralLink);
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
        { value: "pending", label: "Pending" },
        { value: "completed", label: "Completed" },
        { value: "cancel", label: "Cancel" },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].value);

    const { data } = useGetAllReferralQuery(`referralById=${user?.user?.id}`);

    const totalAmount = data?.data?.reduce((acc: number, curr: any) => {
        if (curr?.status === "completed") {
            return acc + curr?.amount
        } else {
            return acc;
        }
    }, 0);
    console.log(totalAmount);
    const sortedData = data?.data?.filter((refer: TReferral) => refer?.status === activeTab);


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
                                <h2 className="subTitle">Receive ${config.referralBonus} reward instantly</h2>
                                <p className="textG">When your friend registers, funds wallet with minimum of <span className="textB">${config.referralPurchaseAmount}</span> and purchases at least <span className="textB">one account</span>, you get rewarded instantly.</p>
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
                                    <p className="textB">Let friends sign up and fund wallet with minimum of ${config.referralPurchaseAmount}</p>
                                    <p className="textB">Receive ${config.referralBonus} reward instantly</p>
                                </div>
                            </div>

                            <div className='pt-10 flex items-center flex-col gap-1'>
                                <div className="mx-4 border border-[#EDE8E8] rounded-full flex flex-col md:flex-row items-center py-2 px-4">
                                    <span className="textG min-w-32">Your Referral link:</span>
                                    <p className="flex textB items-center gap-1">
                                        <span className="textB line-clamp-1">{referralLink}</span>
                                        {copied ?
                                            <FiCheck className="text-2xl" />
                                            :
                                            <BiSolidCopy onClick={copyText} className="cursor-pointer text-xl" />
                                        }
                                    </p>
                                </div>
                                <button className="appBtn px-12 mt-4">Share Invitation link</button>
                            </div>
                        </div>

                        <div className='hidden md:block border border-[#E1DBDB]'></div>
                        <div className='w-full md:w-1/2 space-y-4 border border-borderColor/50 rounded-lg min-h-full overflow-y-auto bg-transparent p-2 md:p-4 lg:p-6 2xl:p-6'>
                            <h4 className="text-xl font-medium">Referral Record</h4>
                            <div className='p-4 2xl:p-6 bg-white grid grid-cols-2 rounded-lg'>
                                <div className='space-y-2'>
                                    <h3 className="flex items-center gap-2"><IoWalletOutline />Total Earned</h3>
                                    <h2 className="text-textBlack font-bold flex items-center"><PiCurrencyDollarBold />{totalAmount}</h2>
                                </div>
                                <div className='space-y-2'>
                                    <h3 className="flex items-center gap-2"><PiUsersThreeLight className="lg:text-lg" />Invitees</h3>
                                    <h2 className="text-textBlack font-bold flex items-center">{data?.meta?.total}</h2>
                                </div>
                            </div>

                            <div className='p-2 md:p-4 2xl:py-5 2xl:px-6 min-h-[70%] bg-white rounded-lg'>
                                <AppTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                                <div className='bg-white  max-h-[55dvh] pr-1 md:pr-2 overflow-auto'>
                                    {
                                        sortedData?.map((referral: TReferral) => (
                                            <div key={referral?.id} className='border-b border-b-[#E9E4E4] flex justify-between pt-3 md:pt-5 pb-2'>
                                                <div className='flex gap-1 md:gap-4'>
                                                    <img src={referral?.ownBy?.profileImg} alt="" className="size-12 rounded-full" />
                                                    <div className=''>
                                                        <h3 className="font-medium text-textBlack pb-1">{referral?.ownBy?.name}</h3>
                                                        <p className="flex items-center gap-1 text-xs text-textGreyBlack pt-0.5"><AiFillCheckCircle className="text-green-500" />Completed registration with shared link</p>
                                                        <p className="flex items-center gap-1 text-xs text-textGreyBlack pt-0.5"><AiFillCheckCircle className={referral?.status === "completed" ? "text-green-500" : "text-textGrey/40"} />Fund wallet with $50</p>
                                                    </div>
                                                </div>
                                                <div className='space-y-2 md:space-y-0'>
                                                    <h2 className="text-textBlack/50 font-medium text-sm md:text-base">${referral?.amount}</h2>
                                                    <div className="md:text-sm text-textGrey text-xs">{formatDateWithTime(referral?.createdAt)}</div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PrivateLayout>
        </HomeLayout>
    );
};

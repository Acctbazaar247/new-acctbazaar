import { config } from "@/config";
import HomeLayout from "@/layout/HomeLayout"
import PrivateLayout from "@/layout/PrivateLayout";
import { useGetCurrentPlanQuery, useTakeAPlanMutation } from "@/redux/features/plan/planApi";
import { ResponseSuccessType } from "@/types/common";
import CountDownPlanDays from "@/utils/countDownPlanDays";
import getDaysRemaining from "@/utils/getDaysRemaining";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsStars } from "react-icons/bs";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { GoAlert } from "react-icons/go";
import { toast } from "react-toastify";

const Plans = () => {
    const { data: currentPlan } = useGetCurrentPlanQuery("");
    const [takeAPlan, { isLoading }] = useTakeAPlanMutation();

    const [active, setActive] = useState("BUSINESS PLAN")

    const plans = [
        {
            id: 1,
            name: "BASIC PLAN",
            price: config.basicPlanPrice,
            offers: [
                {
                    label: `${config.basicPlanLimit} Upload daily`,
                    isHave: true
                },
                {
                    label: 'Limited Categories',
                    isHave: true
                },
                {
                    label: 'Basic Support',
                    isHave: true
                },
                {
                    label: 'Bulk upload',
                    isHave: true
                },
                {
                    label: 'Marketplace Featured Ads',
                    isHave: false
                },
                {
                    label: 'First upload Approval',
                    isHave: false
                },
                {
                    label: 'Advanced Security',
                    isHave: false
                },
                {
                    label: 'Advance page analytics',
                    isHave: false
                },
            ]
        },
        {
            id: 2,
            name: "BUSINESS PLAN",
            price: config.proPlanPrice,
            offers: [
                {
                    label: `${config.proPlanLimit} Upload daily`,
                    isHave: true
                },
                {
                    label: 'Unlimited categories',
                    isHave: true
                },
                {
                    label: 'Priority Support',
                    isHave: true
                },
                {
                    label: 'Bulk Uploads',
                    isHave: true
                },
                {
                    label: 'Marketplace Featured Ads',
                    isHave: true
                },
                {
                    label: 'First upload Approval',
                    isHave: false
                },
                {
                    label: 'Advanced Security',
                    isHave: false
                },
                {
                    label: 'Advance page analytics',
                    isHave: false
                },
            ]
        },
        {
            id: 3,
            name: "PRO PLAN",
            price: config.proPlusPlanPrice,
            offers: [
                {
                    label: `${config.proPlusPlanLimit} Upload daily`,
                    isHave: true
                },
                {
                    label: 'Unlimited categories',
                    isHave: true
                },
                {
                    label: 'Premium Support',
                    isHave: true
                },
                {
                    label: 'Bulk Uploads',
                    isHave: true
                },
                {
                    label: 'Marketplace Featured Ads',
                    isHave: true
                },
                {
                    label: 'Quick approval of uploaded accounts.',
                    isHave: true
                },
                {
                    label: 'Weekends Upload and approval',
                    isHave: true
                },
                {
                    label: 'Advanced Security',
                    isHave: true
                },
            ]
        },
    ];

    const handleTakeAPlan = async (value: string) => {
        if (value === "BASIC PLAN") {
            value = "basic"
        } else if (value === "BUSINESS PLAN") {
            value = "pro"
        } else if (value === "PRO PLAN") {
            value = "proPlus"
        }

        if (currentPlan?.data?.days > 0) {
            return toast.error(`Now active ${currentPlan?.data?.planType === "basic" && "BASIC PLAN" || currentPlan?.data?.planType === "pro" && "BUSINESS PLAN" || currentPlan?.data?.planType === "proPlus" && "PRO PLAN"} and after ${getDaysRemaining(currentPlan?.data?.createdAt)} days you can change your plan!`, { toastId: 1 });
        };

        await takeAPlan({ planType: value }).unwrap().then((res: ResponseSuccessType) => {
            toast.success("Plan updated successfully!", { toastId: 1 });
        }).catch((res: any) => {
            return toast.error(res?.data?.message || "Plan updated unsuccessful!", { toastId: 1 });
        });
    };

    return (
        <HomeLayout>
            <PrivateLayout>
                <section className='min-h-[90dvh] layout'>
                    <div className="border-primary/50 bg-primary/10 flex flex-wrap gap-2 mx-auto w-fit rounded-lg border-l-4 2xl:border-l-[6px] p-3 md:p-4">
                        <div className=''>
                            <GoAlert className="text-primary/50 text-xl inline" /> You are in <span className="font-bold inline">{currentPlan?.data?.planType === "basic" && "BASIC PLAN" || currentPlan?.data?.planType === "pro" && "BUSINESS PLAN" || currentPlan?.data?.planType === "proPlus" && "PRO PLAN"}.</span>
                        </div>
                        <div className='flex flex-wrap gap-1 items-center'>
                            Time remaining on your plan
                            <CountDownPlanDays targetDate={currentPlan?.data?.createdAt} additionalDays={currentPlan?.data?.days} />
                        </div>
                    </div>
                    <h2 className="text-center text-2xl lg:text-4xl font-bold mt-7">Upload Packages and pricing</h2>
                    <div className="flex flex-col items-center justify-center my-8 lg:my-24 space-y-16 md:items-end md:-mx-5 md:space-y-0 md:flex-row">
                        {
                            plans.map(plan => (
                                <div onClick={() => setActive(plan?.name)} key={plan?.id} className={`w-full relative cursor-pointer px-5 py-6 transition-colors duration-300 transform rounded-2xl md:mx-5 md:w-96 border border-primary ${plan.name === active ? "bg-primary" : "bg-white"}`}>
                                    <div className="text-center">
                                        <h2 className={`text-3xl font-bold uppercase ${plan.name === active ? "text-white" : "text-textBlack"}`}>{plan.name}</h2>
                                        <p className="my-4 border-borderColor border"></p>
                                        <h4 className={`font-bold text-4xl ${plan.name === active ? "text-white" : "text-primary"}`}>${plan.price}</h4>
                                        <p className={`mt-4 text-sm font-medium ${plan.name === active ? "text-zinc-300" : "text-textBlack"}`}>Per Merchant / Billed weekly </p>
                                    </div>

                                    <div className="mt-12 space-y-6">
                                        {
                                            plan.offers.map(offer => (
                                                <div key={offer.label} className={`flex items-center  ${plan.name === active ? "text-zinc-300" : "text-textBlack"}`}>
                                                    {
                                                        offer.isHave ? <FaCheck /> : <FaXmark />
                                                    }
                                                    <span className="mx-4">{offer.label}</span>
                                                </div>
                                            ))
                                        }

                                    </div>

                                    {isLoading ? (
                                        <button className={`appBtn lg:py-3 rounded-xl mt-6 w-full disabled:cursor-not-allowed flex items-center justify-center   ${plan.name === active ? "bg-white disabled:bg-white hover:disabled:bg-white/90 hover:bg-white/90 disabled:text-primary text-primary disabled:border-primary" : "disabled:text-white disabled:bg-primary disabled:border-primary"}`}>
                                            <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
                                        </button>
                                    ) : (
                                        <button onClick={() => handleTakeAPlan(plan.name)} disabled={plan.name === currentPlan?.data?.planType} className={`appBtn lg:py-3 rounded-xl mt-6 w-full disabled:cursor-not-allowed  ${plan.name === active ? "bg-white disabled:bg-white hover:disabled:bg-white/90 hover:bg-white/90 disabled:text-primary text-primary disabled:border-primary" : "disabled:text-white disabled:bg-primary disabled:border-primary"}`}>
                                            {(plan.name === "BASIC PLAN" && "basic" || plan.name === "BUSINESS PLAN" && "pro" || plan.name === "PRO PLAN" && "proPlus") === currentPlan?.data?.planType ? "Currently Active" : "Choose Plan"}
                                        </button>
                                    )}



                                    {
                                        plan.name === "BUSINESS PLAN" && (
                                            <div className='absolute flex items-center left-0 justify-center w-full -top-10'>
                                                <div className='flex items-center gap-1 px-6 py-2 rounded-t-2xl bg-black text-zinc-200'>
                                                    Most Popular <BsStars className="text-orange-300 " />
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            ))
                        }

                    </div>
                </section>
            </PrivateLayout>
        </HomeLayout >
    );
};

export default Plans;
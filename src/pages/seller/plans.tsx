import { config } from "@/config";
import HomeLayout from "@/layout/HomeLayout"
import PrivateLayout from "@/layout/PrivateLayout";
import { useGetCurrentPlanQuery, useTakeAPlanMutation } from "@/redux/features/plan/planApi";
import { ResponseSuccessType } from "@/types/common";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsStars } from "react-icons/bs";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { toast } from "react-toastify";

const Plans = () => {
    const { data: currentPlan } = useGetCurrentPlanQuery("");
    const [takeAPlan, { isLoading }] = useTakeAPlanMutation();

    const [active, setActive] = useState("pro")

    const plans = [
        {
            id: 1,
            name: "basic",
            price: 0,
            offers: [
                {
                    label: '10 Upload daily',
                    isHave: true
                },
                {
                    label: 'Limited categories',
                    isHave: true
                },
                {
                    label: 'Bulk Uploads',
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
            ]
        },
        {
            id: 2,
            name: "pro",
            price: config.proPlanPrice,
            offers: [
                {
                    label: '100 Upload daily',
                    isHave: true
                },
                {
                    label: 'Limited categories',
                    isHave: true
                },
                {
                    label: 'Bulk Uploads',
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
            ]
        },
        {
            id: 3,
            name: "proPlus",
            price: config.proPlusPlanPrice,
            offers: [
                {
                    label: '200 Upload daily',
                    isHave: true
                },
                {
                    label: 'Limited categories',
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
                    isHave: true
                },
            ]
        },
    ];

    const handleTakeAPlan = async (value: string) => {
        if (currentPlan?.data?.days > 0) {
            return toast.error(`Now active ${currentPlan?.data?.planType} plan and after ${currentPlan?.data?.days} days you can change your plan!`, { toastId: 1 });
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
                <section className='min-h-[91dvh] container py-5 md:py-10 2xl:py-12'>
                    <h2 className="text-center text-2xl lg:text-4xl font-bold">Upload Packages and pricing</h2>
                    <div className="flex flex-col items-center justify-center my-8 lg:my-24 space-y-16 md:items-end md:-mx-5 md:space-y-0 md:flex-row">
                        {
                            plans.map(plan => (
                                <div onClick={() => setActive(plan?.name)} key={plan?.id} className={`w-full relative cursor-pointer px-6 py-6 transition-colors duration-300 transform rounded-2xl md:mx-5 md:w-96 border border-primary ${plan.name === active ? "bg-primary" : "bg-white"}`}>
                                    <div className="text-center">
                                        <h2 className={`text-3xl font-bold uppercase ${plan.name === active ? "text-white" : "text-textBlack"}`}>{plan.name === "proPlus" ? "pro Plus" : plan.name}</h2>
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
                                            {plan.name === currentPlan?.data?.planType ? "Currently Active" : "Choose Plan"}
                                        </button>
                                    )}



                                    {
                                        plan.name === "pro" && (
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
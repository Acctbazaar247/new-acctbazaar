import { useAppSelector } from "@/redux/hook";
import { useEffect, useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FiCheck, FiCopy } from "react-icons/fi";
import { IoCheckmarkCircle } from "react-icons/io5";
import { toast } from "react-toastify";

const SellerProfileViewComponent = () => {
    const [domain, setDomain] = useState('');
    const [copied, setCopied] = useState(false);
    const user = useAppSelector((state) => state?.user);

    const referralLink = `${domain}/auth/sign-up?referralId=${user?.user?.id}`

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setDomain(window.location.hostname);
        }
        if (domain === "localhost") {
            setDomain("localhost:3000")
        }
    }, []);

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

    return (
        <div className="w-full md:w-[30%] max-h-[75dvh] overflow-auto space-y-3 lg:space-y-4 2xl:space-y-5 bg-white  rounded-lg p-2 md:p-4">

            {/* this is image and details div  */}
            <div className='flex items-center gap-4 2xl:gap-5'>
                <div className=''>
                    <img src="/assets/seller/person1.png" alt="" className="size-20 2xl:size-28 rounded-full object-cover" />

                </div>
                <div className=''>
                    <h2 className="text-xl font-bold">Danny Exchange</h2>
                    <p className="text-sm text-textGrey">Last seen an hour ago</p>

                    <div className='flex items-center flex-wrap gap-x-4 text-xs 2xl:text-sm py-3'>
                        <h2 className="flex items-center gap-1"><IoCheckmarkCircle className="text-green-500" /> ID verified</h2>
                        <h2 className="flex items-center gap-1"><IoCheckmarkCircle className="text-green-500" /> Mobile</h2>
                        <h2 className="flex items-center gap-1"><IoCheckmarkCircle className="text-green-500" /> Email</h2>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                        <p>Cambodia</p>
                        <p className="border-l border-l-gray-400 h-4"></p>
                        <p>Joined: 06/01/2023</p>
                    </div>
                </div>
            </div>
            <h4 className="border-b border-b-[#EFEFEF]"></h4>

            {/* this is profile div  */}
            <div className='text-sm space-y-2.5'>
                <h2 className="font-bold lg:text-lg">Profile</h2>

                <h3 className="flex items-center justify-between">
                    <span>Total reviews</span>
                    <span className="font-bold">155</span>
                </h3>
                <h3 className="flex items-center justify-between">
                    <span>Positive reviews</span>
                    <p className="font-bold flex items-center gap-1"><AiOutlineLike className="text-green-500 text-base" />98% <span className="text-textGrey">(150)</span></p>
                </h3>
                <h3 className="flex items-center justify-between">
                    <span>Negative reviews</span>
                    <p className="font-bold flex items-center gap-1"><AiOutlineDislike className="text-red text-base" />12% <span className="text-textGrey">(50)</span></p>
                </h3>
            </div>
            <h4 className="border-b border-b-[#EFEFEF]"></h4>

            {/* this is last 30 days div  */}
            <div className='text-sm space-y-2.5'>
                <h2 className="font-bold lg:text-lg">Last 30 days</h2>

                <h3 className="flex items-center justify-between">
                    <span>Completed Orders</span>
                    <span className="font-bold">100</span>
                </h3>
                <h3 className="flex items-center justify-between">
                    <span>Completion rate</span>
                    <p className="font-bold flex items-center gap-1">90%</p>
                </h3>
                <h3 className="flex items-center justify-between">
                    <span>Buy</span>
                    <p className="font-bold flex items-center gap-1">60% <span className="text-textGrey">(50)</span></p>
                </h3>
                <h3 className="flex items-center justify-between">
                    <span>Sell</span>
                    <p className="font-bold flex items-center gap-1">30% <span className="text-textGrey">(60)</span></p>
                </h3>
            </div>
            <h4 className="border-b border-b-[#EFEFEF]"></h4>

            {/* this is total average div  */}
            <div className='text-sm space-y-2.5'>
                <h2 className="font-bold lg:text-lg">Total average</h2>

                <h3 className="flex items-center justify-between">
                    <span>Total completed orders</span>
                    <span className="font-bold">1530</span>
                </h3>
                <h3 className="flex items-center justify-between">
                    <span>Total completion rate</span>
                    <p className="font-bold flex items-center gap-1">98.33%</p>
                </h3>
                <h3 className="flex items-center justify-between">
                    <span>Avg. payment time</span>
                    <p className="font-bold flex items-center gap-1">0min 30s</p>
                </h3>

            </div>

            <div className="rounded bg-primary/5 flex flex-col md:flex-row items-center justify-between w-full py-2 2xl:py-2.5 px-4">
                <span className="textG min-w-fit">Merchant link:</span>
                <p className="flex textB items-center gap-1">
                    <span className="textB md:ml-auto mr-2  max-w-[50%] 2xl:max-w-[70%] line-clamp-1">{referralLink}</span>
                    {copied ?
                        <FiCheck className="text-green-500" />
                        :
                        <FiCopy onClick={copyText} className="cursor-pointer text-red" />
                    }
                </p>
            </div>
        </div>
    );
};

export default SellerProfileViewComponent;
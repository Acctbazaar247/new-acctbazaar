import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

const ReviewCard = () => {
    return (
        <div className='flex justify-between py-4 border-b border-b-[#EFEFEF]'>

            {/* This is details div  */}
            <div className='flex gap-2'>
                <img src="/assets/demo-user.png" alt="" className="size-9 rounded-full" />

                {/* this is details div  */}
                <div className=''>
                    <h3 className="font-semibold text-sm lg:text-base">Rakibul Hasan</h3>
                    <p className="text-xs md:text-sm text-textGrey">05/31/2024</p>

                    <p className="text-sm pt-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum rerum quo aspernatur adipisci reprehenderit explicabo veniam doloremque asperiores laudantium fugiat.</p>
                </div>
            </div>

            {/* this is negative positive div  */}
            <div className=''>
                {/* <h3 className="flex items-center gap-1 border rounded-full px-2 py-0.5 border-[#2AAE09] text-[#2AAE09] text-sm"><AiOutlineLike/> Positive</h3> */}
                <h3 className="flex items-center gap-1 border rounded-full px-2 py-0.5 border-red text-red text-sm"><AiOutlineDislike /> Negative</h3>
            </div>
        </div>
    );
};

export default ReviewCard;
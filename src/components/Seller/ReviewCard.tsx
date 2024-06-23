import { EReviewStatus, IReview } from "@/types/common";
import { Avatar } from "antd";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

const ReviewCard = ({ data }: { data: IReview }) => {
  console.log(data);
  return (
    <div className="flex justify-between py-4 border-b border-b-[#EFEFEF]">
      {/* This is details div  */}
      <div className="flex gap-2">
        <Avatar
          src={data.isAnonymous ? "A" : data?.ownBy?.profileImg || ""}
          alt=""
          className="size-9 rounded-full"
        />

        {/* this is details div  */}
        <div className="">
          <h3 className="font-semibold text-sm lg:text-base">
            {data.isAnonymous ? "Anonymous" : data.ownBy?.name}
          </h3>
          <p className="text-xs md:text-sm text-textGrey">05/31/2024</p>

          <p className="text-sm pt-2">{data.reviewText}</p>
        </div>
      </div>

      {/* this is negative positive div  */}
      <div className="">
        {data.reviewStatus === EReviewStatus.POSITIVE ? (
          <h3 className="flex items-center gap-1 border rounded-full px-2 py-0.5 border-[#2AAE09] text-[#2AAE09] text-sm">
            <AiOutlineLike /> Positive
          </h3>
        ) : (
          <h3 className="flex items-center gap-1 border rounded-full px-2 py-0.5 border-red text-red text-sm">
            <AiOutlineDislike /> Negative
          </h3>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;

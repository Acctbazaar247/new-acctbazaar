import { EReviewStatus, IReview } from "@/types/common";
import { Avatar } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import AvatarComponent from "../shared/AvatarComponent";
import { useAppSelector } from "@/redux/hook";
import AppButton from "../ui/AppButton";
import { useAddReplyMutation } from "@/redux/features/review/reviewApi";
import { toast } from "react-toastify";
import { formatDateWithTime } from "@/utils/formateDate";
import Image from "next/image";

const ReviewCard = ({ data }: { data: IReview }) => {
  const [focus, setFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const user = useAppSelector((state) => state.user.user);
  const [addReply] = useAddReplyMutation();

  const handleReply = async () => {
    const submittedData = {
      reviewId: data.id,
      reply: inputValue,
    };
    await addReply(submittedData)
      .unwrap()
      .then((res: any) => {
        toast.success(res?.message || "Reply Added Successfully.");
      })
      .catch((res: any) => {
        toast.error(res?.data?.message || "something went wrong");
      });
  };

  // console.log(data);
  return (
    <div className="py-4 border-b border-b-[#EFEFEF]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Avatar
            src={
              data.isAnonymous
                ? "/assets/home/anonymous.png"
                : data?.ownBy?.profileImg || ""
            }
            alt=""
            className="size-8 rounded-full"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold text-sm lg:text-base">
              {data.isAnonymous ? "Anonymous" : data.ownBy?.name}
            </h3>
            <p className="text-xs md:text-sm text-textGrey">
              {formatDateWithTime(data?.createdAt)}
            </p>
          </div>
        </div>
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

      <p className="text-sm pl-8 pt-2">{data.reviewText}</p>

      {data?.ReviewReply?.length > 0 &&
        data.ReviewReply.map((review: any) => (
          <div
            key={review.id}
            className="flex justify-between pl-2 md:pl-12 pt-2"
          >
            {/* This is details div  */}
            <div className="flex gap-2">
              <Avatar
                src={
                  data?.ownBy?.id === review?.ownBy?.id
                    ? data?.isAnonymous
                      ? "/assets/home/anonymous.png"
                      : review?.ownBy?.profileImg || ""
                    : review?.ownBy?.profileImg
                }
                alt=""
                className="size-8 rounded-full"
              />

              {/* this is details div  */}
              <div className="">
                <h3 className="font-semibold text-sm lg:text-base">
                  {data?.ownBy?.id === review?.ownBy?.id
                    ? data?.isAnonymous
                      ? "Anonymous"
                      : review?.ownBy?.name || ""
                    : review?.ownBy?.name}
                </h3>
                <p className="text-xs md:text-sm text-textGrey">
                  {formatDateWithTime(review?.createdAt)}
                </p>

                <p className="text-sm pt-1 pb-2">{review.reply}</p>
              </div>
            </div>
          </div>
        ))}

      {(data?.ownBy?.id === user?.id || data?.sellerId === user?.id) && (
        <>
          <div className="flex justify-center items-center gap-4 md:px-4 py-1 mt-2 ml-2 md:ml-10">
            {/* <AvatarComponent user={user} withName={false} /> */}
            <Image
              width={40}
              height={40}
              className="size-7 md:size-8 rounded-full aspect-square block object-cover"
              src={
                data?.isAnonymous && data?.ownBy?.id === user?.id
                  ? ("/assets/home/anonymous.png" as string)
                  : user?.profileImg || ""
              }
              alt="country icon"
            />

            <input
              type="text"
              placeholder="Enter your comment..."
              className="outline-none w-11/12 p-2 border rounded-full px-4"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              onKeyDown={(e) => (e?.key === "Enter" ? handleReply() : "")}
            />

            <AppButton
              onClick={handleReply}
              label="Reply"
              variant="outline"
              size="small"
              className="max-sm:hidden text-[15px] rounded-full px-4 py-2"
            />
          </div>
          <div className="flex justify-end pt-1">
            <AppButton
              onClick={handleReply}
              label="Reply"
              variant="outline"
              size="small"
              className="md:hidden ml-auto w-fit text-[15px] rounded-full px-4 md:py-2"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewCard;

import { setSellerTabShow } from "@/redux/features/account/accountSlice";
import { useAppDispatch } from "@/redux/hook";
import { EBadgeTitle, TSellerProfileInfo } from "@/types/common";
import { badgeTitleShow } from "@/utils/badgeTitleShow";
import { Avatar } from "antd";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FiCheck, FiCopy } from "react-icons/fi";
import { IoIosCloseCircle } from "react-icons/io";
import { IoCheckmarkCircle } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { toast } from "react-toastify";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

const SellerProfileViewComponent = ({
  data,
  setActiveTab,
  mobileTabs,
  setActiveReviewTab,
}: {
  data: TSellerProfileInfo;
  setActiveTab?: (tab: "Ads" | "Reviews") => void;
  mobileTabs?: { value: string; label: string }[];
  setActiveReviewTab?: (tab: string) => void;
}) => {
  const dispatch = useAppDispatch();
  const [domain, setDomain] = useState("");
  const [copied, setCopied] = useState(false);
  const positiveReviews = data.totalPositiveReviews;
  const negativeReviews = data.totalNegativeReviews;

  const percentages = useMemo(() => {
    const totalReviews = positiveReviews + negativeReviews;

    if (totalReviews === 0) {
      return {
        positivePercentage: 0,
        negativePercentage: 0,
      };
    }

    const positivePercentage = (positiveReviews / totalReviews) * 100;
    const negativePercentage = (negativeReviews / totalReviews) * 100;

    return {
      positivePercentage: Math.round(positivePercentage),
      negativePercentage: Math.round(negativePercentage),
    };
  }, [positiveReviews, negativeReviews]);

  const referralLink = `${domain}/seller/${data?.sellerInfo?.id}`;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(window.location.hostname);
    }
    if (domain === "localhost") {
      setDomain("localhost:3000");
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
      console.error("Failed to copy:", error);
    }
  };

  const graphData = [
    {
      subject: "Positive Review",
      value: data.totalPositiveReviews,
    },
    {
      subject: "Negative Review",
      value: data.totalPositiveReviews,
    },
    {
      subject: "Ads",
      value: data.totalAccountApprove,
    },
    {
      subject: "Sold",
      value: data.totalSoldAccount,
    },
    {
      subject: "Cancelled Order",
      value: data.totalCancelOrder,
    },
    {
      subject: "Total order",
      value: data.totalOrder,
    },
  ];

  return (
    <div className="w-full md:w-[30%]d max-h-[75dvh] overflow-auto space-y-3 lg:space-y-4 2xl:space-y-5 bg-background  rounded-lg p-2 md:p-4">
      {/* this is image and details div  */}
      <div className="flex items-center gap-4 2xl:gap-5">
        <div className="relative">
          <Avatar
            src={data.sellerInfo.profileImg}
            alt={data.sellerInfo.name}
            className="size-20 2xl:size-28 rounded-full object-cover"
          />

          {/* {data.sellerInfo.isVerifiedByAdmin ? (
            <div className="absolute bottom-[5px] right-[5px]">
              <img
                className="w-[20px]"
                src={"/assets/greenCheck.png"}
                alt="asdfdf"
              />
            </div>
          ) : null} */}

          {data.sellerInfo?.isVerifiedByAdmin &&
            data?.sellerInfo?.badge &&
            data?.sellerInfo?.badge !== "noBadge" && (
              <div className="absolute bottom-[5px] right-[5px] md:right-1">
                <RiVerifiedBadgeFill
                  className={`text-base lg:text-lg 2xl:text-xl bg-background rounded-full ${
                    (data.sellerInfo?.badge == "blue" && "text-success") ||
                    (data.sellerInfo?.badge == "gold" && "text-amber-400")
                  }`}
                />
              </div>
            )}

          {data.sellerInfo.isVerifiedByAdmin ? (
            <div className="flex absolute w-[200px] pt-1 items-center gap-1">
              {data.sellerInfo?.badgeTitle &&
                data.sellerInfo?.badgeTitle !== "noBadgeTitle" && (
                  <p
                    className={`capitalize rounded font-medium px-0.5 md:px-1.5 w-fit text-[10px] md:text-xs text-primary bg-primary/5 border border-primary`}
                  >
                    {badgeTitleShow(data.sellerInfo.badgeTitle as EBadgeTitle)}
                  </p>
                )}
            </div>
          ) : null}
        </div>

        <div className="">
          <h2 className="text-xl font-bold capitalize">
            {data?.sellerInfo?.name}
          </h2>

          <div className="flex items-center flex-wrap gap-x-4 text-xs 2xl:text-sm py-3">
            {data.sellerInfo.isVerifiedByAdmin ? (
              <h2 className="flex items-center gap-1">
                <IoCheckmarkCircle className="text-green-500" /> ID verified
              </h2>
            ) : (
              <h2 className="flex items-center gap-1">
                <IoIosCloseCircle className="text-orange-500" /> ID verified
              </h2>
            )}
            <h2 className="flex items-center gap-1">
              <IoCheckmarkCircle className="text-green-500" /> Mobile
            </h2>
            <h2 className="flex items-center gap-1">
              <IoCheckmarkCircle className="text-green-500" /> Email
            </h2>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <p>{data.sellerInfo?.country}</p>
            {data.sellerInfo?.country ? (
              <p className="border-l border-l-gray-400 h-4"></p>
            ) : null}
            <p>
              Joined:{" "}
              {new Date(data.sellerInfo.createdAt)
                .toLocaleDateString()
                .replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$1-$2-$3")}
            </p>
          </div>
        </div>
      </div>

      <div className="  h-[200px] flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={graphData}>
            <PolarGrid />
            <PolarAngleAxis style={{ fontSize: 12 }} dataKey="subject" />
            <PolarRadiusAxis />
            <Radar
              name="Mike"
              dataKey="value"
              stroke="#FF5A35"
              fill="#FF5A35"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <h4 className="border-b border-b-whiteGrey"></h4>

      {/* this is profile div  */}
      <div className="text-sm space-y-2.5">
        <h2 className="font-bold lg:text-lg">Profile</h2>

        <h3 className="flex items-center justify-between">
          <span
            onClick={() => {
              dispatch(setSellerTabShow("reviews"));
              if (setActiveTab) {
                setActiveTab("Reviews");
              }
              if (setActiveReviewTab) {
                setActiveReviewTab("All");
              }
              if (mobileTabs) {
                mobileTabs.push({ value: "Reviews", label: "Reviews" });
              }
            }}
            className="cursor-pointer hover:font-medium"
          >
            Total reviews
          </span>
          <span className="font-bold">{data.totalReviews}</span>
        </h3>
        <h3 className="flex items-center justify-between">
          <span
            onClick={() => {
              dispatch(setSellerTabShow("reviews"));
              if (setActiveTab) {
                setActiveTab("Reviews");
              }
              if (setActiveReviewTab) {
                setActiveReviewTab("Positive");
              }
              if (mobileTabs) {
                mobileTabs.push({ value: "Reviews", label: "Reviews" });
              }
            }}
            className="cursor-pointer hover:font-medium"
          >
            Positive reviews
          </span>
          <p className="font-bold flex items-center gap-1">
            <AiOutlineLike className="text-green-500 text-base" />
            {percentages.positivePercentage}%{" "}
            <span className="text-textGrey">({positiveReviews})</span>
          </p>
        </h3>
        <h3 className="flex items-center justify-between">
          <span
            onClick={() => {
              dispatch(setSellerTabShow("reviews"));
              if (setActiveTab) {
                setActiveTab("Reviews");
              }
              if (setActiveReviewTab) {
                setActiveReviewTab("Negative");
              }
              if (mobileTabs) {
                mobileTabs.push({ value: "Reviews", label: "Reviews" });
              }
            }}
            className="cursor-pointer hover:font-medium"
          >
            Negative reviews
          </span>
          <p className="font-bold flex items-center gap-1">
            <AiOutlineDislike className="text-red text-base" />
            {percentages.negativePercentage}%{" "}
            <span className="text-textGrey">({negativeReviews})</span>
          </p>
        </h3>
      </div>
      {/* <h4 className="border-b border-b-whiteGrey"></h4> */}

      {/* this is last 30 days div  */}
      {/* <div className="text-sm space-y-2.5">
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
          <p className="font-bold flex items-center gap-1">
            60% <span className="text-textGrey">(50)</span>
          </p>
        </h3>
        <h3 className="flex items-center justify-between">
          <span>Sell</span>
          <p className="font-bold flex items-center gap-1">
            30% <span className="text-textGrey">(60)</span>
          </p>
        </h3>
      </div> */}
      <h4 className="border-b border-b-whiteGrey"></h4>

      {/* this is total average div  */}
      <div className="text-sm space-y-2.5">
        <h2 className="font-bold lg:text-lg">Total average</h2>

        <h3 className="flex items-center justify-between">
          <span>Total sold </span>
          <span className="font-bold">{data.totalSoldAccount}</span>
        </h3>
        <h3 className="flex items-center justify-between">
          <span>Total account approve</span>
          <p className="font-bold flex items-center gap-1">
            {data.totalAccountApprove}
          </p>
        </h3>
        <h3 className="flex items-center justify-between">
          <span>Total cancelled order</span>
          <p className="font-bold flex items-center gap-1">
            {data.totalCancelOrder}
          </p>
        </h3>
      </div>

      <div className="rounded bg-primary/5 flex flex-col  items-center justify-between w-full py-2 2xl:py-2.5 px-4">
        <span className="textG min-w-fit">Merchant link:</span>
        <p onClick={copyText} className="flex textB items-center   gap-1">
          <span className="whitespace-pre-wrap text-wrap inline-block  ">
            {/* https://new-acctbazaar-development.onrender.com/seller/a0a5cc97-21f9-4f4f-b9aa-42ddd03c5546 */}
            {referralLink}
          </span>
          <div>
            {copied ? (
              <FiCheck className="text-green-500" />
            ) : (
              <FiCopy
                onClick={copyText}
                className="cursor-pointer text-red  size-5"
              />
            )}
          </div>
        </p>
      </div>
    </div>
  );
};

export default SellerProfileViewComponent;

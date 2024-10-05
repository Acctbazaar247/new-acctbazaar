import { useDeleteAccountMutation } from "@/redux/features/account/accountApi";
import { findImageUrlByCategory } from "@/shared";
import { AccountCategory, EApprovedForSale, IAccount } from "@/types/common";
import { getImageUrlByCategory } from "@/utils/getImageUrl";
import { Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";
import { MdEdit, MdErrorOutline, MdOutlinePauseCircle } from "react-icons/md";
import { PiCurrencyDollarBold } from "react-icons/pi";

const MyAdsAccountCard = ({ account }: { account: IAccount }) => {
  const [deleteAccount] = useDeleteAccountMutation();
  return (
    <div
      className={`w-full flex items-center gap-1 md:gap-2 2xl:gap-3 rounded-lg border-b border-b-whiteGrey p-2 md:p-4 2xl:p-5 hover:bg-borderLight`}
    >
      <Image
        src={findImageUrlByCategory(account?.category)}
        className="size-9 md:size-10 lg:size-14 2xl:size-16"
        width={70}
        height={70}
        alt="social icons"
      />
      {/* this is description div  */}
      <div className="w-full ">
        <div className="flex items-center gap-4 justify-between">
          <div className="md:w-full w-[calc(100vw-250px)]">
            <h3 className="text-textBlack line-clamp-1 font-medium text-sm md:text-base">
              {account?.name}
            </h3>
            <p className="text-textGrey line-clamp-1 pt-0.5 text-xs md:text-sm">
              {account?.description}{" "}
            </p>
          </div>
          <p
            className={`text-sm  capitalize  py-1 px-2 rounded-full ${
              (account?.approvedForSale === "pending" &&
                "text-brown bg-yellowShadow") ||
              (account?.approvedForSale === "denied" && "text-red bg-red/10") ||
              (account?.approvedForSale === "approved" &&
                "text-blue bg-zinc/20")
            }`}
          >
            {account?.approvedForSale}
          </p>
        </div>

        {/* this is right side div with icons and price  */}
        <div className="flex items-center gap-1 md:gap-4 justify-between  w-full">
          <h2 className="text-textBlack font-bold flex items-center justify-end">
            <PiCurrencyDollarBold />
            {account?.price}
          </h2>
          {/* this is icons div view cart message  */}
          <div className="flex items-center justify-between gap-4 text-textGrey">
            {!account.isSold ? (
              <>
                <Link
                  href={`/dashboard/editService/${account.id}`}
                  className="bg-white group p-2 rounded-full"
                >
                  <Tooltip title="Edit this ads">
                    <MdEdit />
                  </Tooltip>
                </Link>

                <button
                  onClick={() => deleteAccount(account?.id)}
                  className="bg-white group p-2 rounded-full"
                >
                  <Tooltip title="Delete this ads">
                    <AiOutlineDelete className="group-hover:text-red cursor-pointer text-lg" />
                  </Tooltip>
                </button>
              </>
            ) : null}
          </div>
        </div>
        <div>
          {account.approvedForSale === EApprovedForSale.denied ? (
            <div className="p-2 rounded w-full md:w-1/2 bg-yellowShadow mt-2 ">
              <span className="flex gap-2 items-center  mb-3 text-biskutColor ">
                <MdErrorOutline></MdErrorOutline> Reason for denied
              </span>{" "}
              <p className="text-biskutColor ml-2">
                {account.messageFromAdmin || "No Message"}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MyAdsAccountCard;

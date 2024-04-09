import { findImageUrlByCategory } from "@/shared";
import { AccountCategory, IAccount } from "@/types/common";
import { getImageUrlByCategory } from "@/utils/getImageUrl";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { MdOutlinePauseCircle } from "react-icons/md";
import { PiCurrencyDollarBold } from "react-icons/pi";

type TAccountCredentialCard = {
  account: {
    category: string;
    description: string;
    name: string;
    price: number;
  };
  updateProgress: Dispatch<SetStateAction<number>>;
};

export default function AccountCredentialCard({
  account,
  updateProgress,
}: TAccountCredentialCard) {
  console.log(
    findImageUrlByCategory(account?.category as AccountCategory)
    // account.category
  );
  return (
    <div
      className={` flex items-center gap-1 md:gap-2 2xl:gap-3 rounded-lg p-2 md:p-3 2xl:p-4 bg-[#FBFAFA]`}
    >
      <Image
        src={findImageUrlByCategory(account?.category as AccountCategory)}
        className="size-9 md:size-10 lg:size-14 2xl:size-16 rounded-full"
        width={70}
        height={70}
        alt="social icons"
      />
      {/* this is description div  */}
      <div className="w-full">
        <div className="">
          <h3 className="text-textBlack font-medium text-sm">
            {account?.name}
          </h3>
          <p className="text-textGrey pt-0.5 text-xs">{account?.description}</p>
        </div>

        {/* this is right side div with icons and price  */}
        <div className="w-full flex items-center gap-1 md:gap-4 justify-between">
          <h2 className="text-textBlack font-bold flex text-sm items-center justify-end">
            <PiCurrencyDollarBold />
            {account?.price}
          </h2>
          {/* this is icons div view cart message  */}
          <button
            onClick={() => updateProgress(2)}
            type="button"
            className="bg-white group p-2 rounded-full"
          >
            <BiEditAlt className="cursor-pointer text-textGrey text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}

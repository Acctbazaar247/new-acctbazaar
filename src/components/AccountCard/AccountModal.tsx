import { AccountCategory, IAccount } from "@/types/common";
import React from "react";
import AppModal from "../ui/AppModal";
import { Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import { getImageUrlByCategory } from "@/utils/getImageUrl";
import { findImageUrlByCategory } from "@/shared";

type Props = {
  account: IAccount;
};

function AccountModal({ account }: Props) {
  return (
    <div>
      <AppModal
        title="Account Details"
        button={
          <Tooltip title="Open account details">
            <Image
              src={"/assets/icons/eye.png"}
              width={40}
              height={40}
              className="size-4 md:size-5 cursor-pointer min-w-4 md:min-w-5 min-h-4 md:min-h-5"
              alt="eye"
            />
          </Tooltip>
        }
      >
        <div className="md:w-[500px] mt-6 space-y-1">
          {/* <MarketplaceAccountCard isModal account={account} /> */}
          <div className="flex  flex-col">
            <Image
              src={findImageUrlByCategory(account?.category as AccountCategory)}
              className="size-9 md:size-10 lg:size-14 2xl:size-20"
              width={70}
              height={70}
              alt="social icons"
            />
            <h3 className="text-textBlack font-medium text-sm md:text-base flex items-center justify-between md:justify-normal mt-3">
              {account?.name}
            </h3>
            <p className="text-textGrey pt-2 text-xs md:text-sm">
              {account?.description}
            </p>
          </div>
          <div className="flex pt-2 items-center  gap-22 text-sm">
            <p className="text-textGrey text-xl">Price</p>
            <p className="ml-2 text-xl text-black font-bold">
              ${account?.price}
            </p>
          </div>

          {account?.preview && (
            <div className="flex items-center justify-center pt-5 text-sm">
              <Link
                href={account.preview}
                className="appBtn py-2"
                target="blank"
              >
                Preview
              </Link>
            </div>
          )}
        </div>
      </AppModal>
    </div>
  );
}

export default AccountModal;

import { useDeleteAccountMutation } from "@/redux/features/account/accountApi";
import { AccountCategory, IAccount } from "@/types/common";
import { getImageUrlByCategory } from "@/utils/getImageUrl";
import { Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlinePauseCircle } from "react-icons/md";
import { PiCurrencyDollarBold } from "react-icons/pi";
import AppModal from "../ui/AppModal";
import OrderSecretViewPop from "../orders/OrderSecretViewPop";
import { findImageUrlByCategory } from "@/shared";

const MyPurchaseAccountCard = ({
  account,
  orderId,
}: {
  account: IAccount;
  orderId: string;
}) => {
  const [deleteAccount] = useDeleteAccountMutation();
  return (
    <div
      className={`w-full flex items-center gap-1 md:gap-2 2xl:gap-3 rounded-lg border-b border-b-[#EFEFEF] p-2 md:p-4 2xl:p-5 hover:bg-[#FBFAFA]`}
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
          <div className="">
            <h3 className="text-textBlack line-clamp-1 font-medium text-sm md:text-base">
              {account?.name}
            </h3>
            <p className="text-textGrey pt-0.5 line-clamp-1 text-xs md:text-sm">
              {account?.description}{" "}
            </p>
          </div>
          <p
            className={`text-sm   py-1 px-2 rounded-full ${
              (account?.approvedForSale === "pending" &&
                "text-[#B54708] bg-[#FFFAEB]") ||
              (account?.approvedForSale === "denied" &&
                "text-[#B42318] bg-[#FEF3F2]") ||
              (account?.approvedForSale === "approved" &&
                "text-[#175CD3] bg-[#EFF8FF]")
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
          <div className="flex items-center justify-between gap-4 text-[#4F4F4F]">
            <AppModal
              title="Account Information"
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
              <OrderSecretViewPop account={account}></OrderSecretViewPop>
            </AppModal>

            <Link href={`/order-details/${orderId}`}>
              <Tooltip title="Message vendor">
                <Image
                  src={"/assets/icons/message.png"}
                  width={40}
                  height={40}
                  className="size-4 md:size-5 cursor-pointer min-w-4 md:min-w-5 min-h-4 md:min-h-5"
                  alt="message"
                />
              </Tooltip>
            </Link>
            {/* <button className="flex items-center gap-1 text-sm ">
                            <MdOutlinePauseCircle /> Pause Ad
                        </button> */}
            {/* <button onClick={() => deleteAccount(account?.id)} className="bg-white group p-2 rounded-full">
                            <AiOutlineDelete className="group-hover:text-red cursor-pointer text-lg" />
                        </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPurchaseAccountCard;

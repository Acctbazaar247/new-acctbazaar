import { Dispatch, SetStateAction, useState } from "react";
import AppTabs from "../ui/AppTabs";
import MarketplaceSidebar from "../marketplace/MarketplaceSidebar";
import OrderDetailsAccountInfo from "../orders/OrderDetailsAccountInfo";
import MyAdsAccountCard from "./MyAdsAccountCard";
import { IAccount, IOrder } from "@/types/common";
import OrdersCard from "../OrdersCard/OrdersCard";
import MyPurchaseAccountCard from "./MyPurchaseAccountCard";

type TMyPurchaseMain = {
  accounts: IOrder[];
};

const MyPurchaseMain = ({ accounts }: TMyPurchaseMain) => {
  return (
    <div className="flex gap-4 max-h-[60vh] overflow-auto 2xl:gap-6">
      <div className="w-full h-full bg-white">
        {accounts.map((account) => (
          // <OrdersCard key={account.id} {...account}></OrdersCard>
          <MyPurchaseAccountCard
            account={account?.account}
            key={account.id}
            orderId={account.id}
          />
        ))}
      </div>
    </div>
  );
};

export default MyPurchaseMain;

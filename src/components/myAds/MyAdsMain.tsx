import MyAdsAccountCard from "./MyAdsAccountCard";
import { IAccount } from "@/types/common";

type TMyAdsMain = {
  accounts: IAccount[];
};

const MyAdsMain = ({ accounts }: TMyAdsMain) => {
  return (
    <div className="flex gap-4 max-h-[60vh] overflow-auto 2xl:gap-6 pt-2 md:pt-4 lg:pt-5 2xl:pt-6">
      <div className="w-full h-full bg-white">
        {accounts.map((account) => (
          <MyAdsAccountCard account={account} key={account.id} />
        ))}
      </div>
    </div>
  );
};

export default MyAdsMain;

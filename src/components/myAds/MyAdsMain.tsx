import { Pagination } from "antd";
import AnimationWrapper from "../ui/AnimationWrapper";
import MyAdsAccountCard from "./MyAdsAccountCard";
import { IAccount } from "@/types/common";

type TMyAdsMain = {
  accounts: IAccount[];
  data?: any;
  setPage?: any;
};
const MyAdsMain = ({ accounts, data, setPage }: TMyAdsMain) => {
  return (
    <div className="w-full max-h-[calc(100dvh-220px)] bg-background md:max-h-[60vh] overflow-auto  pt-2 md:pt-4 lg:pt-5 2xl:pt-6">
      {accounts.map((account, i) => (
        <AnimationWrapper key={account.id} transition={{ delay: i * 0.08 }}>
          <MyAdsAccountCard account={account} />
        </AnimationWrapper>
      ))}

      <div className="bg-background pt-4 max-sm:hidden flex justify-center items-center">
        <Pagination
          showSizeChanger={false}
          pageSize={data.meta.limit}
          total={data.meta.total}
          current={data.meta.page}
          onChange={(value) => {
            setPage(value);
          }}
        ></Pagination>
      </div>
      <div className=" md:hidden pt-2  bg-background flex justify-center items-center">
        <Pagination
          size="small"
          showSizeChanger={false}
          pageSize={data.meta.limit}
          total={data.meta.total}
          current={data.meta.page}
          onChange={(value) => {
            setPage(value);
          }}
        ></Pagination>
      </div>
    </div>
  );
};

export default MyAdsMain;

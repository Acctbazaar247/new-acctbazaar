import { IOrder } from "@/types/common";
import MyPurchaseAccountCard from "./MyPurchaseAccountCard";
import AnimationWrapper from "../ui/AnimationWrapper";

type TMyPurchaseMain = {
  orders: IOrder[];
};

const MyPurchaseMain = ({ orders }: TMyPurchaseMain) => {
  return (
    <div className="flex gap-4 md:max-h-[60vh] overflow-auto 2xl:gap-6">
      <div className="w-full h-full bg-white">
        {orders.map((order, i) => (
          <AnimationWrapper key={order.id} transition={{ delay: i * 0.08 }}>
            <MyPurchaseAccountCard
              account={order?.account}
              order={order}
              orderId={order.id}
            />
          </AnimationWrapper>
        ))}
      </div>
    </div>
  );
};

export default MyPurchaseMain;

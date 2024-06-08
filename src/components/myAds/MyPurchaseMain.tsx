import { IOrder } from "@/types/common";
import MyPurchaseAccountCard from "./MyPurchaseAccountCard";

type TMyPurchaseMain = {
  orders: IOrder[];
};

const MyPurchaseMain = ({ orders }: TMyPurchaseMain) => {
  return (
    <div className="flex gap-4 md:max-h-[60vh] overflow-auto 2xl:gap-6">
      <div className="w-full h-full bg-white">
        {orders.map((order) => (
          // <OrdersCard key={account.id} {...account}></OrdersCard>
          <MyPurchaseAccountCard
            account={order?.account}
            order={order}
            key={order.id}
            orderId={order.id}
          />
        ))}
      </div>
    </div>
  );
};

export default MyPurchaseMain;

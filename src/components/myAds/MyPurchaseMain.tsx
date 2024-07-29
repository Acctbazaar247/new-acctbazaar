import { IOrder } from "@/types/common";
import MyPurchaseAccountCard from "./MyPurchaseAccountCard";
import AnimationWrapper from "../ui/AnimationWrapper";
import { Pagination } from "antd";

type TMyPurchaseMain = {
  orders: IOrder[];
  data?: any;
  setPage?: any;
};

const MyPurchaseMain = ({ orders, setPage, data }: TMyPurchaseMain) => {
  return (
    <div className="md:max-h-[60vh] overflow-auto bg-white">
      {orders.map((order, i) => (
        <AnimationWrapper key={order.id} transition={{ delay: i * 0.08 }}>
          <MyPurchaseAccountCard
            account={order?.account}
            order={order}
            orderId={order.id}
          />
        </AnimationWrapper>
      ))}
      {/* <div className="flex justify-center items-center mt-5">
        <Pagination
          size={window.innerWidth > 668 ? "default" : "small"}
          showSizeChanger={false}
          pageSize={data.meta.limit}
          total={data.meta.total}
          current={data.meta.page}
          onChange={(value) => {
            setPage(value);
          }}
        ></Pagination>
      </div> */}
    </div>
  );
};

export default MyPurchaseMain;

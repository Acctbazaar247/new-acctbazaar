// import CartCard from "@/components/CartCard/CartCard";
import ErrorCompo from "@/components/ui/AppErrorComponent";
import Loading from "@/components/ui/Loading";
import DashboardLayout from "@/layout/DashboardLayout";
// import { useGetSingleUserCartsQuery } from "@/redux/features/cart/cartApi";
import { useAppSelector } from "@/redux/hook";
// import { Cart } from "@/types/common";
import React from "react";

type Props = {};

const MyCarts = (props: Props) => {
  // const user = useAppSelector((state) => state.user);
  // const { data, isLoading, isFetching, isError } = useGetSingleUserCartsQuery(
  //   user?.user?.id || ""
  // );
  // let content = null;

  // if (isLoading || isFetching) {
  //   content = <Loading></Loading>;
  // } else if (isError) {
  //   content = <ErrorCompo></ErrorCompo>;
  // } else if (data.data.length) {
  //   const info = data.data as Cart[];
  //   content = (
  //     <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-10">
  //       {info.map((single) => (
  //         <CartCard key={single.id} {...single}></CartCard>
  //       ))}
  //     </div>
  //   );
  // } else {
  //   content = <ErrorCompo error="No cart Found!"></ErrorCompo>;
  // }

  return (
    <DashboardLayout>
      <h1 className="dashboard-title">My carts</h1>
      {/* {content} */}
    </DashboardLayout>
  );
};

export default MyCarts;

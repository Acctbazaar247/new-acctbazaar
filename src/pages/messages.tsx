import MessageMain from "@/components/message/MessageMain";
import SingleMessageUser from "@/components/message/SingleMessageUser";
import SingleMessage from "@/components/message/SingleMessageUser";
import AppDrawer from "@/components/ui/AppDrawer";
import AppErrorComponent from "@/components/ui/AppErrorComponent";
import AppInput from "@/components/ui/AppInput";
import Loading from "@/components/ui/Loading";
import HomeLayout from "@/layout/HomeLayout";
import PrivateLayout from "@/layout/PrivateLayout";
import {
  useGetMyOrdersQuery,
  useGetOrdersQuery,
} from "@/redux/features/order/orderApi";
import { useAppSelector } from "@/redux/hook";
import { IOrder } from "@/types/common";
import Image from "next/image";
import { useEffect, useState } from "react";

const Messages = () => {
  const { user } = useAppSelector((state) => state.user);
  const [activeChatId, setActiveChatId] = useState<null | string>(null);
  const message = true;
  const { isLoading, isFetching, error, isError, data } = useGetOrdersQuery(
    `sellerId=${user?.id}`
  );
  const {
    isLoading: isMyOrderLoading,
    isFetching: isMyOrderFetching,
    isError: isMyOrderError,
    data: myOrderData,
  } = useGetMyOrdersQuery("");

  useEffect(() => {
    if (data?.data.length) {
      setActiveChatId(data.data[0]?.id);
    } else if (myOrderData?.data) {
      setActiveChatId(myOrderData.data[0]?.id);
    }
  }, [data, myOrderData]);

  if (isFetching || isLoading || isMyOrderLoading || isMyOrderFetching) {
    return (
      <HomeLayout>
        <Loading></Loading>
      </HomeLayout>
    );
  } else if (isError || isMyOrderError) {
    return (
      <HomeLayout>
        <div className="flex justify-center items-center h-screen">
          <AppErrorComponent></AppErrorComponent>
        </div>
      </HomeLayout>
    );
  }
  const mainData = (
    data.data.length ? data.data : myOrderData.data
  ) as IOrder[];
  const activeMessageBoxInfo = mainData.find(
    (single) => single.id === activeChatId
  );
  console.log({ myOrderData });
  return (
    <HomeLayout>
      <PrivateLayout>
        <div className="container py-5 md:py-10 2xl:py-12">
          {/* this is top section div  */}
          <div className="flex justify-between">
            <div className="">
              <h2 className="title">Messages</h2>
              <p className="text-textGrey text-xs md:text-sm">
                All messages sent by customers
              </p>
            </div>
            {/* <div className="w-1/4">
            <AppInput type="text" placeholder="Search for Messages..." />
          </div> */}
          </div>

          {/* this is main div  */}
          <div className="pt-2 md:pt-4 lg:pt-5 2xl:pt-6">
            {mainData.length ? (
              <div className="flex flex-col md:flex-row gap-4 2xl:gap-6 rounded-lg lg:rounded-2xl min-h-[70dvh] bg-white pt-2 md:p-4 lg:p-5 2xl:p-6">
                <div className="w-full md:w-[35%] max-h-[70dvh] overflow-auto space-y-3 2xl:space-y-4">
                  {mainData.map((single) => (
                    <>
                      <div key={single.id} className="hidden md:block">
                        <SingleMessageUser
                          isActive={single.id === activeChatId}
                          user={single.orderBy || single.account.ownBy}
                          orderId={single.id}
                          setActiveChatId={setActiveChatId}
                        />
                      </div>
                      <div key={single.id} className="md:hidden">
                        <AppDrawer
                          button={
                            <SingleMessageUser
                              isActive={single.id === activeChatId}
                              user={single.orderBy || single.account.ownBy}
                              orderId={single.id}
                              setActiveChatId={setActiveChatId}
                            />
                          }
                        >
                          {activeMessageBoxInfo && activeChatId ? (
                            <MessageMain
                              account={activeMessageBoxInfo.account}
                              user={
                                activeMessageBoxInfo?.orderBy ||
                                activeMessageBoxInfo?.account?.ownBy
                              }
                              orderId={activeChatId}
                            />
                          ) : (
                            <Loading></Loading>
                          )}
                        </AppDrawer>
                      </div>
                    </>
                  ))}
                </div>
                <div className="hidden md:block border border-[#EFECEC]"></div>
                <div className="hidden md:block md:w-[63%] h-full">
                  {activeMessageBoxInfo && activeChatId ? (
                    <MessageMain
                      account={activeMessageBoxInfo.account}
                      user={
                        activeMessageBoxInfo?.orderBy ||
                        activeMessageBoxInfo?.account?.ownBy
                      }
                      orderId={activeChatId}
                    />
                  ) : (
                    <Loading></Loading>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl w-full min-h-[80dvh] flex items-center justify-center flex-col">
                <Image
                  width={120}
                  height={120}
                  src={"/assets/account/message.png"}
                  alt="order image"
                />
                <h3 className="subTitle pt-5">No messages</h3>
                <p className="text-textGrey pt-1">
                  All messages from customers would show here
                </p>
              </div>
            )}
          </div>
        </div>
      </PrivateLayout>
    </HomeLayout>
  );
};

export default Messages;

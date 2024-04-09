import MessageMain from "@/components/message/MessageMain";
import SingleMessageUser from "@/components/message/SingleMessageUser";
import SingleMessage from "@/components/message/SingleMessageUser";
import AppErrorComponent from "@/components/ui/AppErrorComponent";
import AppInput from "@/components/ui/AppInput";
import Loading from "@/components/ui/Loading";
import HomeLayout from "@/layout/HomeLayout";
import { useGetOrdersQuery } from "@/redux/features/order/orderApi";
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

  const messageList = [
    {
      name: "Sheldon Cooper",
      imageUrl: "/assets/windscribe.png",
      message: "Will I be able to get the things??",
      time: "01:30pm",
      notificationNumber: "5+",
      isActive: true,
    },
    {
      name: "Sheldon Cooper",
      imageUrl: "/assets/windscribe.png",
      message: "Will I be able to get the things??",
      time: "01:30pm",
      notificationNumber: "5+",
      isActive: false,
    },
  ];

  useEffect(() => {
    if (data?.data) {
      setActiveChatId(data.data[0]?.id);
    }
  }, [data]);

  if (isFetching || isLoading) {
    return (
      <HomeLayout>
        <Loading></Loading>
      </HomeLayout>
    );
  } else if (isError) {
    return (
      <HomeLayout>
        <div className="flex justify-center items-center h-screen">
          <AppErrorComponent></AppErrorComponent>
        </div>
      </HomeLayout>
    );
  }
  const mainData = data.data as IOrder[];
  const activeMessageBoxInfo = mainData.find(
    (single) => single.id === activeChatId
  );
  return (
    <HomeLayout>
      <div className="container py-10 2xl:py-12">
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
            <div className="flex gap-4 2xl:gap-6 rounded-lg lg:rounded-2xl min-h-[90vh] bg-white p-2 md:p-4 lg:p-5 2xl:p-6">
              <div className="w-[35%] h-full space-y-3 2xl:space-y-4">
                {mainData.map((single) => (
                  <SingleMessageUser
                    isActive={single.id === activeChatId}
                    user={single.orderBy}
                    key={single.id}
                    orderId={single.id}
                    setActiveChatId={setActiveChatId}
                  />
                ))}
              </div>
              <div className="border border-[#EFECEC]"></div>
              <div className="w-[63%] h-full">
                {activeMessageBoxInfo && activeChatId ? (
                  <MessageMain
                    account={activeMessageBoxInfo.account}
                    user={activeMessageBoxInfo.orderBy}
                    orderId={activeChatId}
                  />
                ) : (
                  <Loading></Loading>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl w-full min-h-[90vh] flex items-center justify-center flex-col">
              <Image
                width={120}
                height={120}
                src={"/assets/message/message.png"}
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
    </HomeLayout>
  );
};

export default Messages;

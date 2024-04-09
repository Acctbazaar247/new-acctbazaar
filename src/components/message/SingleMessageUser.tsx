import { useGetMessagesQuery } from "@/redux/features/message/messageApi";
import { IMessage, IUser } from "@/types/common";
import Image from "next/image";
import dateFormat from "dateformat";
import appDateFormate from "@/utils/appDateFormate";
type TSingleuser = {
  user: Pick<IUser, "name" | "profileImg" | "id">;
  isActive?: boolean;
  unSeenCount?: number;
  setActiveChatId: (id: string) => void;
  orderId: string;
};

const SingleMessageUser = ({
  user,
  isActive,
  setActiveChatId,
  orderId,
}: TSingleuser) => {
  const { data, isLoading } = useGetMessagesQuery(`orderId=${orderId}`);
  const mainData = isLoading ? null : data || null;

  return (
    <div
      onClick={() => setActiveChatId(orderId)}
      className={`flex items-center cursor-pointer justify-between gap-2 md:gap-4 rounded-lg px-1.5 md:px-3 py-3 md:py-6 ${isActive && "bg-[#FBFAFA]"
        }`}
    >
      {/* this is left div  */}
      <div className="flex items-center gap-1.5 md:gap-3">
        <Image
          src={user.profileImg || ""}
          className="size-10 rounded-full"
          width={40}
          height={40}
          alt="avatar"
        />
        <div className="space-y-1 2xl:space-y-1.5">
          <h3 className="text-[#1D2939] font-semibold">{user?.name}</h3>
          {mainData ? (
            <p className="line-clamp-1 text-sm text-[#667085]">
              {mainData.data.length
                ? mainData.data[mainData.data.length - 1].text
                : null}
            </p>
          ) : null}
        </div>
      </div>
      {/* this is right div  */}
      <div className="space-y-2">
        <p className="text-[#475467] text-xs md:text-sm">
          {mainData?.data?.length
            ? dateFormat(
              new Date(
                mainData?.data[mainData?.data?.length - 1].createdAt ||
                new Date()
              ),
              appDateFormate
            )
            : null}
        </p>

        {mainData ? (
          mainData.meta.unSeenCount ? (
            <p className="ml-auto text-xs bg-[#FC8064] px-1.5 rounded-full text-white w-fit">
              {mainData.meta.unSeenCount}
            </p>
          ) : null
        ) : null}
      </div>
    </div>
  );
};

export default SingleMessageUser;

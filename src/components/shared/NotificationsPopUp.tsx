import Image from "next/image";
import AppPopover from "../ui/AppPopover";
import Link from "next/link";
import { IoNotificationsOffOutline } from "react-icons/io5";
import NotificationBody from "./NotificationBody";
import { useGetNotificationssQuery } from "@/redux/features/notifications/notificationsApi";
import { INotifications } from "@/types/common";

export default function NotificationsPopUp() {
  const { data, isLoading } = useGetNotificationssQuery("");
  const mainData: INotifications[] = data?.data?.length ? data.data : [];
  const isNotificationHave = isLoading
    ? false
    : mainData.some((single) => !single.isSeen);

  return (
    <AppPopover
      button={
        <div className="relative cursor-pointer">
          <Image
            width={32}
            height={32}
            className="size-5 md:size-6 object-contain"
            src={"/assets/icons/Notification.png"}
            alt="country icon"
          />
          {isNotificationHave && (
            <span className="size-1.5 md:size-2 2xl:size-2.5 rounded-full bg-primary absolute top-0 right-0.5"></span>
          )}
        </div>
      }
    >
      <NotificationBody />
    </AppPopover>
  );
}

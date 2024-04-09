import {
  useEditNotificationsMutation,
  useGetNotificationssQuery,
} from "@/redux/features/notifications/notificationsApi";
import { INotifications } from "@/types/common";
import Link from "next/link";
import { IoNotificationsOffOutline } from "react-icons/io5";
import dateFormat from "dateformat";
import appDateFormate from "@/utils/appDateFormate";
import { useEffect } from "react";
export default function NotificationBody() {
  const { data, isLoading } = useGetNotificationssQuery("");
  const [updateSeen] = useEditNotificationsMutation();
  const mainData: INotifications[] = data?.data?.length ? data.data : [];
  const notifications: INotifications[] = mainData;
  useEffect(() => {
    updateSeen({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="divide-y w-full md:max-w-80 md:max-h-[50dvh] max-h-screen pr-3 overflow-y-auto">
      {notifications.length > 0 ? (
        notifications?.map((notification, index) => (
          <div
            key={notification.id}
            className={`relative border-l pl-2.5 ml-0.5 ${index > 0 && "pt-2"}`}
          >
            <p className="size-2 rounded-full bg-primary shadow absolute top-1 -left-1" />
            <h4 className="capitalize flex items-center gap-2 justify-between">
              <span>{notification.title}</span>
              <span className="text-xs text-[#828D99]">
                {dateFormat(new Date(notification.createdAt), appDateFormate)}
              </span>
            </h4>
            <p className="textG text-[#828D99]">{notification.message}</p>
            <div className="py-2">
              {notification.link ? (
                <Link
                  href={notification.link}
                  className="text-primary hover:text-primary text-sm"
                >
                  {notification.link === "New Message"
                    ? "View message"
                    : notification.link === "Order Completed"
                    ? "View order"
                    : "View"}
                </Link>
              ) : null}
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 text-[#828D99] flex items-center justify-center flex-col gap-2">
          <IoNotificationsOffOutline className="text-3xl" />
          No notification found
        </div>
      )}
    </div>
  );
}

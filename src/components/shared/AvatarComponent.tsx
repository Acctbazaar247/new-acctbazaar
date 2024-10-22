import { EBadge, EBadgeTitle, IUser, UserRole } from "@/types/common";
import { badgeTitleShow } from "@/utils/badgeTitleShow";
import { Avatar } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { RiVerifiedBadgeFill } from "react-icons/ri";

type TAvatar = {
  user: IUser | null;
  withName?: boolean;
  onlyBatch?: boolean;
  size?: "large";
  nameClassName?: string;
};

const AvatarComponent = ({
  user,
  withName,
  size,
  onlyBatch,
  nameClassName,
}: TAvatar) => {
  const router = useRouter();

  const handleSellerClick = () => {
    if (user?.role === UserRole.Seller) {
      router.push(`/seller/${user.id}`);
    }
  };

  return (
    <div
      onClick={handleSellerClick}
      className={user?.role === UserRole.Seller ? "cursor-pointer" : ""}
    >
      {withName ? (
        <div className="flex items-center gap-1 pt-1 md:pt-2">
          <Avatar
            src={user?.profileImg as string}
            className={`rounded-full ${size === "large" ? "size-8" : "size-5"}`}
            alt="avatar image"
          />
          <p
            className={`text-textBlack ${
              size === "large"
                ? "text-sm md:text-base font-medium"
                : "text-xs md:text-sm"
            } ${nameClassName}`}
          >
            {user?.name}
          </p>

          {user?.isVerifiedByAdmin && (
            <div className="flex items-center gap-1">
              {user?.badge !== EBadge.noBadge && (
                <RiVerifiedBadgeFill
                  className={`2xl:text-lg bg-background rounded-full ${
                    (user?.badge == "blue" && "text-success") ||
                    (user?.badge == "gold" && "text-amber-400")
                  }`}
                />
              )}

              {!onlyBatch &&
                user?.badgeTitle &&
                user?.badgeTitle !== EBadgeTitle.noBadgeTitle && (
                  <p
                    className={`capitalize font-medium px-0.5 rounded md:px-1.5 w-fit text-[10px] md:text-xs text-primary bg-primary/5 border border-primary`}
                  >
                    {badgeTitleShow(user.badgeTitle as EBadgeTitle)}
                  </p>
                )}
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <Image
            width={40}
            height={40}
            className="size-7 md:size-9 rounded-full aspect-square block object-cover"
            src={user?.profileImg as string}
            alt="country icon"
          />

          {user?.isVerifiedByAdmin && user?.badge !== EBadge.noBadge && (
            <div className="absolute -bottom-0.5 md:-bottom-0.5 right-0 md:-right-1">
              <RiVerifiedBadgeFill
                className={`text-sm md:text-base 2xl:text-lg bg-background rounded-full ${
                  (user?.badge == "blue" && "text-success") ||
                  (user?.badge == "gold" && "text-amber-400")
                }`}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AvatarComponent;

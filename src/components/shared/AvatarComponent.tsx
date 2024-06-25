import { IUser, UserRole } from "@/types/common";
import { Avatar } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { RiVerifiedBadgeFill } from "react-icons/ri";

type TAvatar = {
  user: IUser | null;
  withName?: boolean;
  onlyBatch?: boolean;
  size?: "large";
};
const AvatarComponent = ({ user, withName, size, onlyBatch }: TAvatar) => {
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
            }`}
          >
            {user?.name}
          </p>

          {user?.isVerifiedByAdmin && (
            <div className="flex items-center gap-1">
              <RiVerifiedBadgeFill className="text-success 2xl:text-lg bg-white rounded-full " />
              {!onlyBatch && (
                <p
                  className={`capitalize font-medium px-0.5 md:px-1.5 w-fit text-[10px] md:text-xs text-primary bg-primary/5 border border-primary`}
                >
                  verified merchant
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
            className="size-7 md:size-9 rounded-full"
            src={user?.profileImg as string}
            alt="country icon"
          />
          {user?.isVerifiedByAdmin && (
            <div className="absolute -bottom-0.5 md:-bottom-0.5 right-0 md:-right-1">
              <RiVerifiedBadgeFill className="text-success text-sm md:text-base 2xl:text-lg bg-white rounded-full " />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AvatarComponent;

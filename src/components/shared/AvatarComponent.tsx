import { IUser } from "@/types/common";
import Image from "next/image";

const AvatarComponent = ({ user }: { user: IUser | null }) => {
    return (
        <div className="relative">
            <Image
                width={40}
                height={40}
                className="size-7 md:size-9 rounded-full"
                src={user?.profileImg as string}
                alt="country icon"
            />
            {user?.isVerifiedByAdmin && (
                <Image
                    width={16}
                    height={16}
                    className="size-2 md:size-3.5 2xl:size-4 bg-white rounded-full absolute bottom-0.5 md:-bottom-0.5 right-0 md:-right-1 object-contain"
                    src={"/assets/icons/verified.png"}
                    alt="country icon"
                />
            )}
        </div>
    );
};

export default AvatarComponent;
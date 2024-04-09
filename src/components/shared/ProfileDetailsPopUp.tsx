import Image from "next/image";
import AppPopover from "../ui/AppPopover";
import { motion } from "framer-motion";
import { SlArrowDown } from "react-icons/sl";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { loggedUserPopupNavbarLinks, popupNavbarLinks } from "./NavbarData";
import Link from "next/link";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import AppModal from "../ui/AppModal";
import { useRouter } from "next/navigation";
import { UserRole } from "@/types/common";
import ProfileDetailsBody from "./ProfileDetailsBody";

export default function ProfileDetailsPopUp() {
  const [open, setOpen] = useState(false);

  const user = useAppSelector((state) => state.user.user);

  const handlePopup = () => {
    setOpen(open === true ? false : true);
  };

  return (
    <>
      <div className="relative md:hidden">
        <Image
          width={40}
          height={40}
          className="size-7 md:size-9 rounded-full"
          src={user?.profileImg as string}
          alt="user icon"
        />
        {user?.isVerified && (
          <Image
            width={16}
            height={16}
            className="size-2 md:size-3.5 2xl:size-4 bg-white rounded-full absolute bottom-0.5 md:-bottom-0.5 right-0 md:-right-1 object-contain"
            src={"/assets/icons/verified.png"}
            alt="country icon"
          />
        )}
      </div>
      <div className="hidden md:block">
        <AppPopover
          popupOpen={open}
          setPopupOpen={setOpen}
          placement="bottomRight"
          button={
            <div
              onClick={handlePopup}
              className="cursor-pointer flex items-center md:gap-2"
            >
              {/* this is profile image div  */}
              <div className="relative">
                <Image
                  width={40}
                  height={40}
                  className="size-7 md:size-9 rounded-full"
                  src={user?.profileImg as string}
                  alt="country icon"
                />
                {user?.isVerified && (
                  <Image
                    width={16}
                    height={16}
                    className="size-2 md:size-3.5 2xl:size-4 bg-white rounded-full absolute bottom-0.5 md:-bottom-0.5 right-0 md:-right-1 object-contain"
                    src={"/assets/icons/verified.png"}
                    alt="country icon"
                  />
                )}
              </div>

              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <SlArrowDown className="text-xs md:text-base" />
              </motion.span>
            </div>
          }
        >
          <ProfileDetailsBody setOpen={setOpen} />
        </AppPopover>
      </div>
    </>
  );
}

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
import AvatarComponent from "./AvatarComponent";

export default function ProfileDetailsPopUp() {
  const [open, setOpen] = useState(false);

  const user = useAppSelector((state) => state.user.user);

  const handlePopup = () => {
    setOpen(open === true ? false : true);
  };

  return (
    <>
      <div className="md:hidden">
        <AvatarComponent user={user} />
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
              <AvatarComponent user={user} />

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

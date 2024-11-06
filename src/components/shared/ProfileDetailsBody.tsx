import { ThemeSwitcher } from "@/components/shared/ThemeSwitcher";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { EBadge, EBadgeTitle, UserRole } from "@/types/common";
import { badgeTitleShow } from "@/utils/badgeTitleShow";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import AppModal from "../ui/AppModal";
import AvatarComponent from "./AvatarComponent";
import { GiCrystalGrowth } from "react-icons/gi";

import {
  PopupLinksSuperAdmin,
  ccAdminPopUpLinks,
  financeAdminPopUpLinks,
  popupLinksForUser,
  popupNavbarLinks,
  prAdminPopUpLinks
} from "./NavbarData";

type ProfileDetailsBody = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const ProfileDetailsBody = ({ setOpen }: ProfileDetailsBody) => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleModal = (value: string) => {
    if (value === "go") {
      router.push("/account/verify-account");
      setModalOpen(false);
      setOpen(false);
    } else if (value === "business") {
      router.push("/account/verify-business-account");
      setModalOpen(false);
      setOpen(false);
    } else if (value === "close") {
      setModalOpen(false);
      setOpen(false);
    }
  };

  const openModal = () => {
    setModalOpen(true);
    setOpen(false);
  };

  const getNavItems = () => {
    if (user?.role === UserRole.SuperAdmin || user?.role === UserRole.Admin) {
      return PopupLinksSuperAdmin;
    } else if (user?.role === UserRole.PRAdmin) {
      return prAdminPopUpLinks;
    } else if (user?.role === UserRole.CCAdmin) {
      return ccAdminPopUpLinks;
    } else if (user?.role === UserRole.FinanceAdmin) {
      return financeAdminPopUpLinks;
    } else if (user?.role === UserRole.User) {
      return popupLinksForUser;
    } else {
      return popupNavbarLinks;
    }
  };

  const navItems = getNavItems();

  return (
    <>
      <div>
        <div className="border-b border-b-borderLight pb-2 pl-2 pt-2">
          <div className=" hidden md:flex flex-col md:flex-row items-center gap-2 md:gap-5 pb-1">
            <h4 className="text-sm md:text-base flex items-center gap-1">
              {user?.name}
              {user?.role === UserRole.Seller && user?.isVerifiedByAdmin && (
                <div className="flex items-center gap-1">
                  {user?.isVerifiedByAdmin &&
                    user?.badge &&
                    user?.badge !== EBadge.noBadge && (
                      <RiVerifiedBadgeFill
                        className={`2xl:text-lg bg-background rounded-full ${
                          (user?.badge == "blue" && "text-blue") ||
                          (user?.badge == "gold" && "text-amber-400")
                        }`}
                      />
                    )}
                  {user?.isVerifiedByAdmin &&
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
            </h4>
            {user?.role === UserRole.Seller && !user?.isBusinessVerified && (
              <button
                onClick={openModal}
                className="appOutlineBtnSm py-1 px-2 text-xs rounded hidden md:block"
              >
                {user?.isVerifiedByAdmin && !user?.isBusinessVerified
                  ? "Register as business"
                  : "Become Verified"}
              </button>
            )}
          </div>

          <p className="textG hidden md:block">{user?.email}</p>
          <div className="flex items-center gap-2 md:hidden">
            <AvatarComponent user={user} />
            <div className="w-full">
              <div className="w-full flex items-center justify-between">
                <h4 className="text-sm md:text-base flex items-center gap-1">
                  {user?.name}
                  {user?.role === UserRole.Seller &&
                    user?.isVerifiedByAdmin && (
                      <div className="flex items-center gap-1">
                        {user?.isVerifiedByAdmin &&
                          user?.badge &&
                          user?.badge !== EBadge.noBadge && (
                            <RiVerifiedBadgeFill
                              className={`2xl:text-lg bg-background rounded-full ${
                                (user?.badge == "blue" && "text-blue") ||
                                (user?.badge == "gold" && "text-amber-400")
                              }`}
                            />
                          )}
                        {user?.isVerifiedByAdmin &&
                          user?.badgeTitle &&
                          user?.badgeTitle !== EBadgeTitle.noBadgeTitle && (
                            <p
                              className={`capitalize font-medium px-0.5 md:px-1.5 w-fit text-[10px] md:text-xs text-primary bg-primary/5 border border-primary`}
                            >
                              {badgeTitleShow(user.badgeTitle as EBadgeTitle)}
                            </p>
                          )}
                      </div>
                    )}
                </h4>

                {/* {user?.role === UserRole.Seller && !user?.isVerifiedByAdmin && (
                  <button
                    onClick={openModal}
                    className="appOutlineBtnSm w-fit mt-2 md:hidden"
                  >
                    Become Verified
                  </button>
                )} */}
              </div>

              <p className="textG">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2 p-2">
          {user?.role === UserRole.Seller &&
            (!user?.isVerifiedByAdmin ||
              !user?.isVerifiedByAdmin ||
              !user?.isBusinessVerified) && (
              <button
                onClick={openModal}
                className="appOutlineBtnSm py-1 px-2 text-xs rounded w-fit md:hidden"
              >
                {user?.isVerifiedByAdmin && !user?.isBusinessVerified
                  ? "Register as business"
                  : "Become Verified"}
              </button>
            )}

          {navItems.map((nav: any) =>
            nav?.label === "Log out" ? (
              <div
                key={nav?.label}
                onClick={() => dispatch(userLoggedOut())}
                className="flex items-center text-textBlack gap-3 text-645D5D hover:text-primary text-base 2xl:text-lg cursor-pointer"
              >
                <nav.Icon /> {nav?.label}
              </div>
            ) : (
              <Link
                href={nav?.path}
                key={nav?.label}
                className={`flex text-textBlack items-center gap-3 text-645D5D hover:text-primary text-base 2xl:text-lg`}
              >
                <nav.Icon /> {nav?.label}
              </Link>
            )
          )}

          {user?.id && (
            // <div className="flex items-center justify-center">
            <ThemeSwitcher />
            // </div>
          )}
        </div>

        {/* this is for mobile  */}
        <div className="md:hidden p-4">
          <Link
            href={"/account/sell-your-account"}
            className="appBtn w-full block"
          >
            Sell Product
          </Link>
        </div>
      </div>

      {modalOpen && (
        <AppModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          closeable={false}
          title="Become Verified"
        >
          <div className="md:w-[450px] text-center pt-4">
            <Image
              width={200}
              height={160}
              src="/assets/icons/verification-keyc.png"
              alt=""
              className="mx-auto size-28 mb-4"
            />
            <h2 className="subTitle pb-1">Complete your KYC Verification</h2>
            <p className="textG">
              Verify your Identity with us. This gives you more edge a merchant.
              Buyers trust Merchant with verified account than not.
            </p>
            <div className="flex items-center justify-center flex-col gap-2">
              <div className="flex mt-8 items-center justify-center gap-4">
                {!user?.isVerifiedByAdmin && (
                  <button
                    onClick={() => handleModal("go")}
                    className="appBtn px-6 text-sm"
                  >
                    Begin KYC Verification
                  </button>
                )}
                <button
                  onClick={() => handleModal("business")}
                  className="appBtn  px-6 text-sm"
                >
                  Business KYC Verification
                </button>
              </div>
              <button
                onClick={() => handleModal("close")}
                className="text-textBlack hover:text-primary"
              >
                I’ll do this later
              </button>
            </div>
          </div>
        </AppModal>
      )}
    </>
  );
};

export default ProfileDetailsBody;

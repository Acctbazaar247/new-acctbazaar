import { UserRole } from "@/types/common";
import Link from "next/link";
import { loggedUserPopupNavbarLinks, popupNavbarLinks } from "./NavbarData";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Image from "next/image";
import AppModal from "../ui/AppModal";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { GoDotFill } from "react-icons/go";
import AvatarComponent from "./AvatarComponent";
import { RiVerifiedBadgeFill } from "react-icons/ri";

type ProfileDetailsBody = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ProfileDetailsBody({ setOpen }: ProfileDetailsBody) {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  const handleModal = (value: string) => {
    if (value === "go") {
      router.push("/account/verify-account");
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
  // console.log(user);
  return (
    <>

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
              <button
                onClick={() => handleModal("go")}
                className="appBtn mt-8 px-12"
              >
                Begin KYC Verification
              </button>
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

      {/* this is main component  */}
      <div>
        <div className="border-b border-b-[#EDF2F7] pb-2 pl-2 pt-2">
          <div className=" hidden md:flex flex-col md:flex-row items-center justify-between gap-2 md:gap-10 pb-1">
            <h4 className="text-sm md:text-base flex items-center gap-1">
              {user?.name}
              {user?.role === UserRole.Seller && user?.isVerifiedByAdmin && (
                <div className='flex items-center gap-1'>
                  <RiVerifiedBadgeFill className="text-success 2xl:text-lg bg-white rounded-full " />
                  <p
                    className={`capitalize font-medium px-0.5 md:px-1.5 w-fit text-[10px] md:text-xs text-primary bg-primary/5 border border-primary`}
                  >
                    verified merchant
                  </p>
                </div>
              )}
            </h4>
            {user?.role === UserRole.Seller && !user?.isVerifiedByAdmin && (
              <button
                onClick={openModal}
                className="appOutlineBtnSm py-1 px-2 text-xs rounded hidden md:block"
              >
                Become Verified
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
                  {user?.role === UserRole.Seller && user?.isVerifiedByAdmin && (
                    <div className='flex items-center gap-1'>
                      <RiVerifiedBadgeFill className="text-success 2xl:text-lg bg-white rounded-full " />
                      <p
                        className={`capitalize font-medium px-0.5 md:px-1.5 w-fit text-[10px] leading-4 md:leading-3 md:text-xs text-primary bg-primary/5 border border-primary h-fit py-0`}
                      >
                        verified merchant
                      </p>
                    </div>
                  )}
                </h4>
                {user?.role === UserRole.Seller && !user?.isVerifiedByAdmin && (
                  <button
                    onClick={openModal}
                    className="appOutlineBtnSm w-fit mt-2 md:hidden"
                  >
                    Become Verified
                  </button>
                )}
              </div>

              <p className="textG">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2 p-2">
          {(user?.role === (UserRole.SuperAdmin || UserRole.Admin)
            ? loggedUserPopupNavbarLinks
            : popupNavbarLinks
          ).map((nav) =>
            nav.label === "Log out" ? (
              <div
                key={nav?.label}
                onClick={() => dispatch(userLoggedOut())}
                className="flex items-center gap-3 text-[#4C4646] hover:text-primary text-base 2xl:text-lg cursor-pointer"
              >
                <nav.icon /> {nav?.label}
              </div>
            ) : user?.role === UserRole.User &&
              nav.label === "My Account Dashboard" ? null : (
              <Link
                href={nav?.path}
                key={nav?.label}
                className={`flex items-center gap-3 text-[#4C4646] hover:text-primary text-base 2xl:text-lg ${nav.label === "My Purchase" && "md:hidden"
                  }`}
              >
                <nav.icon /> {nav?.label}
              </Link>
            )
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
    </>
  );
}

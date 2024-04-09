import { ReactNode, useEffect, useState } from "react";
import Logo from "../ui/Logo";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { Avatar, Badge, Drawer, MenuProps, Space } from "antd";
import { useRouter } from "next/router";
import { useGetCurrencyOfLoggedInUserQuery } from "@/redux/features/currency/currencyApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useGetMyCartsQuery } from "@/redux/features/cart/cartApi";
import { ICart, UserRole } from "@/types/common";
import SingleCart from "../SingleCart/SingleCart";
import { IoMdHome } from "react-icons/io";
import { CiShop } from "react-icons/ci";
import { FiDollarSign, FiMenu } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import {
  MdOutlineDashboard,
  MdOutlinePlaylistAddCheckCircle,
} from "react-icons/md";
import { FaBuysellads } from "react-icons/fa6";
import {
  loggedSellerNavLinks,
  loggedUserNavLinks,
  nonUserNavLinks,
} from "./NavbarData";
import Image from "next/image";
import { motion } from "framer-motion";
import { SlArrowDown } from "react-icons/sl";
import AppPopover from "../ui/AppPopover";
import ProfileDetailsPopUp from "./ProfileDetailsPopUp";
import NotificationsPopUp from "./NotificationsPopUp";
import CartPopUp from "./CartPopUp";
import AppDrawer from "../ui/AppDrawer";
import MarketplaceSidebar from "../marketplace/MarketplaceSidebar";
import NotificationBody from "./NotificationBody";
import CartPopUpBody from "./CartPopUpBody";
import ProfileDetailsBody from "./ProfileDetailsBody";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleProfileMenu, setToggleProfileMenu] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const { data, isLoading, isError, isFetching } =
    useGetCurrencyOfLoggedInUserQuery({ id: user?.id });

  const { data: cartsInfo, isLoading: isCartLoading } = useGetMyCartsQuery("");
  const dispatch = useAppDispatch();
  const handleToggle = () => {
    setToggleMenu(!toggleMenu);
  };
  const router = useRouter();
  const isHome = router.pathname === "/";
  const progress = 0.4;

  const onClose = () => {
    setOpen(false);
  };

  // Extracted Currency Display
  const currencyDisplay = data?.data && (
    <div className=" ">
      <span className="text-md md:text-lg">
        ${Math.round(data?.data?.amount)}
      </span>
    </div>
  );
  const myCarts = (cartsInfo?.data as ICart[]) || ([] as ICart[]);

  type TNav = {
    icon?: ReactNode;
    path: string;
    label: string;
  };

  return (
    <header className="fixed w-full top-0 z-[500] md:shadow md:border-b border-b-[#D0D2D5]">
      <div
        className={`
      px-4 md:px-4 lg:px-10 2xl:px-16 py-2 2xl:py-2.5  flex justify-between items-center text-black transition-all
      ${
        !isHome
          ? "bg-[#FAFAFC] md:bg-white/50 backdrop-blur-sm md:backdrop-blur-xl"
          : progress >= 0.06
          ? "bg-white/80 md:bg-white/50 backdrop-blur-sm md:backdrop-blur-xl"
          : "bg-white/80 md:bg-white/50 backdrop-blur-sm md:backdrop-blur-xl lg:bg-transparent lg:backdrop-blur-0"
      }
      `}
      >
        {user?.id && (
          <div className="md:hidden">
            <AppDrawer button={<FiMenu className="md:hidden text-xl" />}>
              <ProfileDetailsBody setOpen={setOpen} />
            </AppDrawer>
          </div>
        )}

        <Logo />

        {user?.id && (
          <div className="md:hidden flex items-center gap-1">
            <AppDrawer
              title="Notifications"
              button={
                <div className="relative cursor-pointer">
                  <Image
                    width={32}
                    height={32}
                    className="size-5 md:size-6 object-contain"
                    src={"/assets/icons/Notification.png"}
                    alt="country icon"
                  />
                  <span className="size-1.5 md:size-2 2xl:size-2.5 rounded-full bg-primary absolute top-0 right-0.5"></span>
                </div>
              }
            >
              <NotificationBody />
            </AppDrawer>

            <AppDrawer
              title="Shopping cart"
              button={
                <div className="relative cursor-pointer">
                  <Image
                    width={32}
                    height={32}
                    className="size-5 md:size-6 object-contain"
                    src={"/assets/icons/shopping-cart.png"}
                    alt="country icon"
                  />
                  {myCarts.length > 0 && (
                    <span className="size-2 md:size-3 2xl:size-3.5 rounded-full bg-primary text-white font-medium text-[5px] md:text-[8px] 2xl:text-[10px] flex items-center justify-center text-center absolute top-0 md:-top-0.5 -right-0.5">
                      {myCarts.length}
                    </span>
                  )}
                </div>
              }
            >
              <CartPopUpBody />
            </AppDrawer>

            <ProfileDetailsPopUp />
          </div>
        )}

        {/* this is for tab to large screen  */}
        <div className="hidden md:flex items-center gap-2 lg:gap-6">
          {(user?.id
            ? user?.role === UserRole.User
              ? loggedUserNavLinks
              : loggedSellerNavLinks
            : nonUserNavLinks
          ).map((nav: TNav) =>
            user?.role === UserRole.User &&
            (nav.label === "Orders" || nav.label === "My Ads") ? null : (
              <Link
                className={`${
                  router?.asPath === nav?.path && "text-primary"
                } text-sm lg:text-base 2xl:text-lg font-medium hover:text-primary`}
                href={nav?.path}
                key={nav?.label}
              >
                {nav.label}
              </Link>
            )
          )}

          {/* this is login or logout section  */}
          <div className="pl-4 lg:pl-12">
            {!user?.id ? (
              <Link href="/auth/sign-in" className="appBtn text-base">
                Login
              </Link>
            ) : (
              <div className="flex items-center justify-between gap-4 lg:gap-8">
                <Link
                  href={"/account/sell-your-account"}
                  className="appBtn w-fit"
                >
                  Sell Product
                </Link>
                <div className="flex items-center justify-center gap-1 lg:gap-3">
                  {/* <Image width={32} height={32} className="size-6 object-contain" src={'/assets/icons/language.png'} alt="country icon" /> */}

                  {/* this is notification div  */}
                  <NotificationsPopUp />

                  {/* this is cart div  */}
                  <CartPopUp />
                </div>

                <ProfileDetailsPopUp />
              </div>
            )}
          </div>
        </div>

        {!user?.id && (
          <div className="md:hidden cursor-pointer flex justify-end ml-auto">
            <button
              onClick={() => setMobileMenu(true)}
              className="hover:text-orange-500 transition-all flex justify-center items-center border p-2 rounded hover:border-orange-500"
            >
              <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
            </button>
          </div>
        )}

        {/* this is for the mobile section  */}
        {!user?.id && (
          <div className="block md:hidden">
            <Drawer
              width={300}
              title={
                <>
                  <Logo></Logo>
                </>
              }
              placement={"left"}
              closable={false}
              onClose={() => setMobileMenu(false)}
              open={mobileMenu}
            >
              <div>
                {nonUserNavLinks.map((link) => (
                  <Link
                    key={link.label}
                    className={`flex items-center gap-1 nav-single-item  ${
                      router?.asPath === link.path
                        ? "!text-primary !hover:text-primary"
                        : "text-textBlack"
                    }`}
                    href={link.path}
                  >
                    {link.path === "/" && <IoMdHome />}
                    <span
                      className={`${
                        router?.asPath === link.path
                          ? "!text-primary !hover:text-primary"
                          : "text-textBlack"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                ))}
                <Link
                  href="/auth/sign-in"
                  className="appOutlineBtn w-full block mt-3"
                >
                  log in
                </Link>
                <div className="appBtn !text-white !hover:text-white w-full mt-3">
                  <Link href="/auth/sign-up">Sign up</Link>
                </div>
              </div>
            </Drawer>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

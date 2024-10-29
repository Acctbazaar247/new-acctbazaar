import { useGetMyCartsQuery } from "@/redux/features/cart/cartApi";
import { useGetCurrencyOfLoggedInUserQuery } from "@/redux/features/currency/currencyApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { ICart, UserRole } from "@/types/common";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoMdHome } from "react-icons/io";
import AppDrawer from "../ui/AppDrawer";
import Logo from "../ui/Logo";
import CartPopUp from "./CartPopUp";
import CartPopUpBody from "./CartPopUpBody";
import {
  loggedSellerNavLinks,
  loggedUserNavLinks,
  nonUserNavLinks,
} from "./NavbarData";
import NotificationBody from "./NotificationBody";
import NotificationsPopUp from "./NotificationsPopUp";
import ProfileDetailsBody from "./ProfileDetailsBody";
import ProfileDetailsPopUp from "./ProfileDetailsPopUp";
import { ThemeSwitcher } from "./ThemeSwitcher";

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
    <header className="fixed w-full top-0 z-[500] md:shadow md:border-b border-b-borderColor">
      <div
        className={`
      px-4 md:px-4 lg:px-10 2xl:px-16 py-2 2xl:py-2.5  flex justify-between items-center text-black transition-all
      ${
        !isHome
          ? "bg-borderLight md:bg-background/50 backdrop-blur-sm md:backdrop-blur-xl"
          : progress >= 0.06
          ? "bg-background/80 md:bg-background/50 backdrop-blur-sm md:backdrop-blur-xl"
          : "bg-background/80 md:bg-background/50 backdrop-blur-sm md:backdrop-blur-xl lg:bg-transparent lg:backdrop-blur-0"
      }
      `}
      >
        {user?.id && (
          <div className="md:hidden">
            <AppDrawer
              button={
                <FiMenu className="md:hidden text-textDarkGrey text-xl" />
              }
            >
              <ProfileDetailsBody setOpen={setOpen} />
            </AppDrawer>
          </div>
        )}

        <Logo />

        {user?.id && (
          <div className="md:hidden flex items-center gap-1">
            {!user?.id && <ThemeSwitcher />}
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
        <div className="hidden md:flex items-center gap-2 xl:gap-6">
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
                } text-sm lg:text-base 2xl:text-lg text-textBlack font-medium hover:text-primary`}
                href={nav?.path}
                key={nav?.label}
              >
                {nav.label}
              </Link>
            )
          )}
          {!user?.id && <ThemeSwitcher />}

          {/* this is login or logout section  */}
          <div className="pl-4 xl:pl-12">
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
          <div className="md:hidden cursor-pointer flex items-center gap-4 justify-end ml-auto">
            <ThemeSwitcher />
            <button
              onClick={() => setMobileMenu(true)}
              className="hover:text-orange-500 text-textDarkGrey transition-all flex justify-center items-center border p-1 rounded hover:border-orange-500"
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
                        : "text-textDarkGrey"
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
                <Link
                  className="appBtn !text-white !hover:text-white w-full mt-3 block"
                  href="/auth/sign-up"
                >
                  Sign up
                </Link>
              </div>
            </Drawer>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

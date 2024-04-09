import { BsClipboardCheck } from "react-icons/bs";
import { FiHome } from "react-icons/fi";
import { IoSettingsOutline, IoWalletOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiUsersThreeLight } from "react-icons/pi";
import {
  TbClipboardList,
  TbLogout2,
  TbMessage2,
  TbSpeakerphone,
} from "react-icons/tb";

export const nonUserNavLinks = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/#about",
    label: "About",
  },
  {
    path: "/#features",
    label: "Features",
  },
  {
    path: "/#how-it-works",
    label: "How it Works",
  },
  {
    path: "/become-a-merchant",
    label: "Become a Merchant",
  },
];

export const loggedUserNavLinks = [
  {
    label: "Marketplace",
    path: "/marketplace",
    icon: FiHome,
  },
  // {
  //     label: "Orders",
  //     path: "/orders",
  //     icon: TbClipboardList
  // },
  // {
  //     label: "My Ads",
  //     path: "/my-ads",
  //     icon: TbSpeakerphone
  // },
  {
    label: "My Purchase",
    path: "/my-purchase",
    icon: BsClipboardCheck,
  },
  {
    label: "Messages",
    path: "/messages",
    icon: TbMessage2,
  },
  {
    label: "Wallet",
    path: "/account/wallet",
    icon: IoWalletOutline,
  },
];
export const loggedSellerNavLinks = [
  {
    label: "Marketplace",
    path: "/marketplace",
    icon: FiHome,
  },
  {
    label: "Orders",
    path: "/orders",
    icon: TbClipboardList,
  },
  {
    label: "My Ads",
    path: "/my-ads",
    icon: TbSpeakerphone,
  },
  {
    label: "My Purchase",
    path: "/my-purchase",
    icon: BsClipboardCheck,
  },
  {
    label: "Messages",
    path: "/messages",
    icon: TbMessage2,
  },
  {
    label: "Wallet",
    path: "/account/wallet",
    icon: IoWalletOutline,
  },
];

export const popupNavbarLinks = [
  {
    label: "My Account Dashboard",
    path: "/seller/dashboard",
    icon: LuLayoutDashboard,
  },
  {
    label: "Referral",
    path: "/referral",
    icon: PiUsersThreeLight,
  },
  {
    label: "My Purchase",
    path: "/my-purchase",
    icon: BsClipboardCheck,
  },
  {
    label: "Account settings",
    path: "/account/account-setting",
    icon: IoSettingsOutline,
  },
  {
    label: "Log out",
    path: "/",
    icon: TbLogout2,
  },
];

export const loggedUserPopupNavbarLinks = [
  {
    label: "My Account Dashboard",
    path: "/dashboard",
    icon: LuLayoutDashboard,
  },
  {
    label: "Referral",
    path: "/referral",
    icon: PiUsersThreeLight,
  },
  {
    label: "My Purchase",
    path: "/my-purchase",
    icon: BsClipboardCheck,
  },
  {
    label: "Account settings",
    path: "/account/account-setting",
    icon: IoSettingsOutline,
  },
  {
    label: "Log out",
    path: "/",
    icon: TbLogout2,
  },
];

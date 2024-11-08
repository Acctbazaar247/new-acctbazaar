import { BsClipboardCheck } from "react-icons/bs";
import { FiHome } from "react-icons/fi";
import { IoIosRocket } from "react-icons/io";
import { IoSettingsOutline, IoWalletOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdSwitchAccount, MdWorkspacePremium } from "react-icons/md";
import { PiUsersThreeLight } from "react-icons/pi";
import {
  TbClipboardList,
  TbLogout2,
  TbMessage2,
  TbSpeakerphone
} from "react-icons/tb";

export const nonUserNavLinks = [
  {
    path: "/",
    label: "Home"
  },
  {
    path: "/#about",
    label: "About"
  },
  {
    path: "/#features",
    label: "Features"
  },
  {
    path: "/#how-it-works",
    label: "How it Works"
  },
  {
    path: "/become-a-merchant",
    label: "Become a Merchant"
  }
];

export const loggedUserNavLinks = [
  {
    label: "Marketplace",
    path: "/marketplace",
    Icon: FiHome
  },
  {
    label: "My Purchase",
    path: "/my-purchase",
    Icon: BsClipboardCheck
  },
  {
    label: "Messages",
    path: "/messages",
    Icon: TbMessage2
  },
  {
    label: "Wallet",
    path: "/account/wallet",
    Icon: IoWalletOutline
  }
];
export const loggedSellerNavLinks = [
  {
    label: "Marketplace",
    path: "/marketplace",
    Icon: FiHome
  },
  {
    label: "Orders",
    path: "/orders",
    Icon: TbClipboardList
  },
  {
    label: "My Ads",
    path: "/my-ads",
    Icon: TbSpeakerphone
  },
  {
    label: "My Purchase",
    path: "/my-purchase",
    Icon: BsClipboardCheck
  },
  {
    label: "Messages",
    path: "/messages",
    Icon: TbMessage2
  },
  {
    label: "Wallet",
    path: "/account/wallet",
    Icon: IoWalletOutline
  }
];

export const popupNavbarLinks = [
  {
    label: "My Account Dashboard",
    path: "/seller/dashboard",
    Icon: LuLayoutDashboard
  },
  {
    label: "Referral",
    path: "/referral",
    Icon: PiUsersThreeLight
  },
  {
    label: "Plans",
    path: "/seller/plans",
    Icon: MdWorkspacePremium
  },
  {
    label: "My Purchase",
    path: "/my-purchase",
    Icon: BsClipboardCheck
  },
  {
    label: "Account settings",
    path: "/account/account-setting",
    Icon: IoSettingsOutline
  },
  {
    label: "Boosting panel",
    path: "https://www.acctpanel.com/",
    Icon: IoIosRocket
  },
  {
    label: "Log out",
    path: "/",
    Icon: TbLogout2
  }
];

export const popupLinksForUser = [
  {
    label: "Referral",
    path: "/referral",
    Icon: PiUsersThreeLight
  },

  {
    label: "Account settings",
    path: "/account/account-setting",
    Icon: IoSettingsOutline
  },
  {
    label: "Boosting panel",
    path: "https://www.acctpanel.com/",
    Icon: IoIosRocket
  },
  {
    label: "Log out",
    path: "/",
    Icon: TbLogout2
  }
];

export const PopupLinksSuperAdmin = [
  {
    label: "My Account Dashboard",
    path: "/dashboard",
    Icon: LuLayoutDashboard
  },
  {
    label: "Referral",
    path: "/referral",
    Icon: PiUsersThreeLight
  },
  {
    label: "Account settings",
    path: "/account/account-setting",
    Icon: IoSettingsOutline
  },
  {
    label: "Boosting panel",
    path: "https://www.acctpanel.com/",
    Icon: IoIosRocket
  },
  {
    label: "Log out",
    v: "/",
    Icon: TbLogout2
  }
];

export const prAdminPopUpLinks = [
  {
    label: "My Account Dashboard",
    path: "/dashboard/allService",
    Icon: LuLayoutDashboard
  },
  {
    label: "Account settings",
    path: "/account/account-setting",
    Icon: IoSettingsOutline
  },
  {
    label: "Log out",
    path: "/",
    Icon: TbLogout2
  }
];

export const ccAdminPopUpLinks = [
  {
    label: "My Account Dashboard",
    path: "/dashboard/allService",
    Icon: LuLayoutDashboard
  },
  {
    label: "Account settings",
    path: "/account/account-setting",
    Icon: IoSettingsOutline
  },
  {
    label: "Log out",
    path: "/",
    Icon: TbLogout2
  }
];

export const financeAdminPopUpLinks = [
  {
    label: "My Account Dashboard",
    path: "/dashboard/manageAllUser",
    Icon: LuLayoutDashboard
  },
  {
    label: "Account settings",
    path: "/account/account-setting",
    Icon: IoSettingsOutline
  },
  {
    label: "Log out",
    path: "/",
    Icon: TbLogout2
  }
];

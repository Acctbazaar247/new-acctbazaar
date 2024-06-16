import { TNavItems, TNavItemsList } from "@/types/common";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { FaCartShopping, FaTicket } from "react-icons/fa6";
import { IoHome, IoPersonAddSharp, IoSettingsSharp } from "react-icons/io5";
import {
  MdAddToPhotos,
  MdAdminPanelSettings,
  MdSwitchAccount,
  MdVerified,
  MdWorkspacePremium
} from "react-icons/md";
import { RiRefund2Fill } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";

const common: any[] = [
  {
    label: "Overview",
    path: "/dashboard",
    Icon: RxDashboard
  },
  {
    label: "profile settings",
    path: "/dashboard/profileSetting",
    Icon: IoSettingsSharp
  },
  {
    label: "Withdraw Fund",
    path: "/dashboard/withdrawFund",
    Icon: BiMoneyWithdraw
  },
  {
    label: "Home",
    path: "/",
    Icon: IoHome
  }
];

export const supperItems: TNavItemsList[] = [
  {
    item: "",
    navItems: [common[3], common[0]]
  },
  {
    item: "Account",
    navItems: [
      {
        label: "Add Accounts",
        path: "/dashboard/addService",
        Icon: MdAddToPhotos
      },
      {
        label: "Manage Account",
        path: "/dashboard/allService",
        Icon: MdSwitchAccount
      }
    ]
  },
  {
    item: "Manage User",
    navItems: [
      {
        label: "Manage Users",
        path: "/dashboard/manageAllUser",
        Icon: FaUsers
      },
      {
        label: "Topup User",
        path: "/dashboard/topUpToUser",
        Icon: FaTicket
      },
      {
        label: "Manage Admin",
        path: "/dashboard/manageAdmin",
        Icon: MdAdminPanelSettings
      },
      {
        label: "Make Admin",
        path: "/dashboard/addAdmin",
        Icon: IoPersonAddSharp
      }
    ]
  },
  {
    item: "Fund",
    navItems: [
      {
        label: "Manage Fund",
        path: "/dashboard/manageFund",
        Icon: RiRefund2Fill
      },
      common[2]
    ]
  },
  {
    item: "Others",
    navItems: [
      {
        label: "Manage KYC",
        path: "/dashboard/manage-kyc",
        Icon: MdVerified
      },
      {
        label: "Manage Order",
        path: "/dashboard/manage-order",
        Icon: FaCartShopping
      },
      {
        label: "Manage Plans",
        path: "/dashboard/manage-plans",
        Icon: MdWorkspacePremium
      },
      common[1]
    ]
  }
];

const adminItems: TNavItemsList[] = [
  {
    item: "",
    navItems: [common[3]]
  },
  {
    item: "Account",
    navItems: [
      {
        label: "All Account",
        path: "/dashboard/allService",
        Icon: MdSwitchAccount
      }
    ]
  },
  {
    item: "Fund",
    navItems: [
      {
        label: "Manage Fund",
        path: "/dashboard/manageFund",
        Icon: RiRefund2Fill
      },
      common[2]
    ]
  }
];

const prAdminItems: TNavItemsList[] = [
  {
    item: "",
    navItems: [common[3]]
  },
  {
    item: "Account",
    navItems: [
      {
        label: "Manage Account",
        path: "/dashboard/allService",
        Icon: MdSwitchAccount
      }
    ]
  }
];

const ccAdminItems: TNavItemsList[] = [
  {
    item: "",
    navItems: [common[3]]
  },
  {
    item: "Account",
    navItems: [
      {
        label: "Manage Account",
        path: "/dashboard/allService",
        Icon: MdSwitchAccount
      }
    ]
  },
  {
    item: "Manage User",
    navItems: [
      {
        label: "Manage Users",
        path: "/dashboard/manageAllUser",
        Icon: FaUsers
      }
    ]
  },
  {
    item: "Order",
    navItems: [
      {
        label: "Manage Order",
        path: "/dashboard/manage-order",
        Icon: FaCartShopping
      }
    ]
  }
];

const financeAdminItems: TNavItemsList[] = [
  {
    item: "",
    navItems: [common[3]]
  },
  {
    item: "Manage User",
    navItems: [
      {
        label: "Manage Users",
        path: "/dashboard/manageAllUser",
        Icon: FaUsers
      }
    ]
  },
  {
    item: "Fund",
    navItems: [
      {
        label: "Manage Fund",
        path: "/dashboard/manageFund",
        Icon: RiRefund2Fill
      },
      {
        label: "Topup User",
        path: "/dashboard/topUpToUser",
        Icon: FaTicket
      }
    ]
  },
  {
    item: "Order",
    navItems: [
      {
        label: "Manage Order",
        path: "/dashboard/manage-order",
        Icon: FaCartShopping
      }
    ]
  }
];

export const dashboardSidebarItem = {
  adminItems: [common[0], ...adminItems, common[1]],
  supperItems,
  prAdminItems,
  ccAdminItems,
  financeAdminItems
};

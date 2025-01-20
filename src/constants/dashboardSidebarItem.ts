import { TNavItems, TNavItemsList } from "@/types/common";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { FaCartShopping, FaTicket } from "react-icons/fa6";
import { IoHome, IoPersonAddSharp, IoSettingsSharp } from "react-icons/io5";
import {
  MdAddToPhotos,
  MdAdminPanelSettings,
  MdEmail,
  MdSwitchAccount,
  MdVerified,
  MdWorkspacePremium
} from "react-icons/md";
import { RiRefund2Fill, RiVerifiedBadgeLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { FaMoneyBillTransfer } from "react-icons/fa6";

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
      },
      {
        label: "Send Email",
        path: "/dashboard/send-email",
        Icon: MdEmail
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
      common[2],
      {
        label: "Manage deposit",
        path: "/dashboard/manageDeposit",
        Icon: FaMoneyBillTransfer
      }
    ]
  },
  {
    item: "Bank",
    navItems: [
      {
        label: "Naira Bank",
        path: "/dashboard/manage-bank",
        Icon: FaMoneyBillTransfer
      },
      {
        label: "Crypto Bank",
        path: "/dashboard/manage-crypto-bank",
        Icon: FaMoneyBillTransfer
      }
    ]
  },
  {
    item: "Others",
    navItems: [
      {
        label: "Manage KYC",
        path: "/dashboard/manage-kyc",
        Icon: RiVerifiedBadgeLine
      },
      {
        label: "Manage Business KYC",
        path: "/dashboard/manage-business-kyc",
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

export const adminItems: TNavItemsList[] = [
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
      common[2],
      {
        label: "Manage deposit",
        path: "/dashboard/manageDeposit",
        Icon: FaMoneyBillTransfer
      }
    ]
  },
  {
    item: "Bank",
    navItems: [
      {
        label: "Naira Bank",
        path: "/dashboard/manage-bank",
        Icon: FaMoneyBillTransfer
      },
      {
        label: "Crypto Bank",
        path: "/dashboard/manage-crypto-bank",
        Icon: FaMoneyBillTransfer
      }
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
      },
      {
        label: "Manage deposit",
        path: "/dashboard/manageDeposit",
        Icon: FaMoneyBillTransfer
      }
    ]
  },
  {
    item: "Bank",
    navItems: [
      {
        label: "Naira Bank",
        path: "/dashboard/manage-bank",
        Icon: FaMoneyBillTransfer
      },
      {
        label: "Crypto Bank",
        path: "/dashboard/manage-crypto-bank",
        Icon: FaMoneyBillTransfer
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
  adminItems,
  supperItems,
  prAdminItems,
  ccAdminItems,
  financeAdminItems
};

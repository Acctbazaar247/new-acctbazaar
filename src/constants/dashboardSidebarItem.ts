import { INavItems } from "@/types/common";
import {
  faCoffee,
  faBorderAll,
  faTags,
  faBox,
  faFileLines,
  faGear,
  faUsers,
  faReorder,
  faUserShield,
  faComment,
  faIcons,
  faRectangleList,
  faUserPlus,
  faCartShopping,
  faDollar,
  faHouse,
  faMoneyBill,
  faMoneyBillTransfer,
  faCertificate,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";

const common: INavItems[] = [
  {
    name: "Overview",
    to: "",
    matchUrl: "/dashboard",
    icon: faBorderAll,
  },
  {
    name: "profile settings",
    to: "/profileSetting",
    matchUrl: "/dashboard/profileSetting",
    icon: faGear,
  },
  {
    name: "Withdraw Fund",
    to: "/withdrawFund",
    matchUrl: "/dashboard/withdrawFund",
    icon: faMoneyBillTransfer,
  },
  {
    name: "Home",
    to: "/",
    matchUrl: "/",
    icon: faHouse,
  },
];

const adminItems: INavItems[] = [
  common[3],
  {
    name: "All Account",
    to: "/allService",
    matchUrl: "/dashboard/allService",
    icon: faTags,
  },
  // common[2],
  {
    name: "Manage Fund",
    to: "/manageFund",
    matchUrl: "/dashboard/manageFund",
    icon: faDollar,
  },
];
const supperItems: INavItems[] = [
  common[3],
  common[0],
  {
    name: "Manage Account",
    to: "/allService",
    matchUrl: "/dashboard/allService",
    icon: faReceipt,
  },
  {
    name: "Add Accounts",
    to: "/addService",
    matchUrl: "/dashboard/addService",
    icon: faBox,
  },
  {
    name: "Manage Fund",
    to: "/manageFund",
    matchUrl: "/dashboard/manageFund",
    icon: faDollar,
  },
  {
    name: "Manage KYC",
    to: "/manage-kyc",
    matchUrl: "/dashboard/manage-kyc",
    icon: faCertificate,
  },
  {
    name: "Manage Order",
    to: "/manage-order",
    matchUrl: "/dashboard/manage-order",
    icon: faCartShopping,
  },
  common[2],
  {
    name: "Manage Users",
    to: "/manageAllUser",
    matchUrl: "/dashboard/manageAllUser",
    icon: faUsers,
  },
  {
    name: "Topup User",
    to: "/topUpToUser",
    matchUrl: "/dashboard/topUpToUser",
    icon: faMoneyBill,
  },
  {
    name: "Manage Admin",
    to: "/manageAdmin",
    matchUrl: "/dashboard/manageAdmin",
    icon: faUserShield,
  },
  {
    name: "Make Admin",
    to: "/addAdmin",
    matchUrl: "/dashboard/addAdmin",
    icon: faUserPlus,
  },
  common[1],
];

const userItems = [
  common[3],
  common[0],
  {
    name: "My Orders",
    to: "/myOrders",
    matchUrl: "/dashboard/myOrders",
    icon: faRectangleList,
  },
  // {
  //   name: "My carts",
  //   to: "/myCarts",
  //   matchUrl: "/dashboard/myCarts",
  //   icon: faCartShopping,
  // },
  {
    name: "Add Funds",
    to: "/addFunds",
    matchUrl: "/dashboard/addFunds",
    icon: faDollar,
  },

  common[1],
];
const sellerItems: INavItems[] = [
  common[3],
  common[0],
  {
    name: "Accounts",
    to: "/myCreatedAccounts",
    matchUrl: "/dashboard/myCreatedAccounts",
    icon: faIcons,
  },
  {
    name: "Add Accounts",
    to: "/addService",
    matchUrl: "/dashboard/addService",
    icon: faBox,
  },
  {
    name: "Add Funds",
    to: "/addFunds",
    matchUrl: "/dashboard/addFund",
    icon: faDollar,
  },
  common[2],
  {
    name: "My Orders",
    to: "/myOrders",
    matchUrl: "/dashboard/myOrders",
    icon: faRectangleList,
  },
  // {
  //   name: "My carts",
  //   to: "/myCarts",
  //   matchUrl: "/dashboard/myCarts",
  //   icon: faCartShopping,
  // },
  common[1],
];
export const dashboardSidebarItem = {
  adminItems: [common[0], ...adminItems, common[1]],
  sellerItems,
  userItems,
  supperItems,
};

import { INavItems } from "@/types/common";
import {
  faCoffee,
  faBorderAll,
  faTags,
  faBox,
  faFileLines,
  faGear,
  faUsers,
  faPersonCircleQuestion,
  faEnvelopeOpenText,
  faPenToSquare,
  faUserGear,
  faUsersGear,
  faUserPen,
  faCartShopping,
  faCommentMedical,
  faComment,
  faRectangleList,
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
];
const adminItems: INavItems[] = [
  {
    name: "All Services",
    to: "/allService",
    matchUrl: "/dashboard/allService",
    icon: faTags,
  },
  {
    name: "Add Service",
    to: "/addService",
    matchUrl: "/dashboard/addService",
    icon: faBox,
  },
  {
    name: "Bookings",
    to: "/allBooking",
    matchUrl: "/dashboard/allBooking",
    icon: faFileLines,
  },
  {
    name: "Manage Faqs",
    to: "/faqs",
    matchUrl: "/dashboard/faqs",
    icon: faPersonCircleQuestion,
  },
  {
    name: "Manage Users",
    to: "/manageAllUser",
    matchUrl: "/dashboard/manageAllUser",
    icon: faUsers,
  },
  {
    name: "All Blogs",
    to: "/allBlog",
    matchUrl: "/dashboard/allBlog",
    icon: faEnvelopeOpenText,
  },
  {
    name: "Add Blog",
    to: "/addBlog",
    matchUrl: "/dashboard/addBlog",
    icon: faPenToSquare,
  },
  {
    name: "All FeedBack",
    to: "/allFeedback",
    matchUrl: "/dashboard/allFeedback",
    icon: faComment,
  },
];
const superAdminItems: INavItems[] = [
  common[0],
  {
    name: "Manage Admin",
    to: "/manageAdmin",
    matchUrl: "/dashboard/manageAdmin",
    icon: faUsersGear,
  },
  {
    name: "Add Admin",
    to: "/addAdmin",
    matchUrl: "/dashboard/addAdmin",
    icon: faUserPen,
  },
  ...adminItems,
  common[1],
];
const userItems = [
  common[0],
  {
    name: "My booking",
    to: "/myOrders",
    matchUrl: "/dashboard/myOrders",
    icon: faRectangleList,
  },
  {
    name: "My carts",
    to: "/myCarts",
    matchUrl: "/dashboard/myCarts",
    icon: faCartShopping,
  },
  {
    name: "Give FeedBack",
    to: "/addFeedBack",
    matchUrl: "/dashboard/addFeedBack",
    icon: faCommentMedical,
  },
  common[1],
];
export const dashboardSidebarItem = {
  adminItems: [common[0], ...adminItems, common[1]],
  superAdminItems,
  userItems,
};

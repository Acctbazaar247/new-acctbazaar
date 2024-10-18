import React, { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { dashboardSidebarItem } from "@/constants/dashboardSidebarItem";
import { useAppSelector } from "@/redux/hook";
import { TNavItemsList, UserRole } from "@/types/common";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useRouter();
  const { pathname } = location;
  const user = useAppSelector((state) => state.user.user);

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let items: TNavItemsList[] = [];

  switch (user?.role) {
    case UserRole.SuperAdmin:
      items = dashboardSidebarItem.supperItems;
      break;

    case UserRole.Admin:
      items = dashboardSidebarItem.adminItems;
      break;

    case UserRole.PRAdmin:
      items = dashboardSidebarItem.prAdminItems;
      break;

    case UserRole.CCAdmin:
      items = dashboardSidebarItem.ccAdminItems;
      break;

    case UserRole.FinanceAdmin:
      items = dashboardSidebarItem.financeAdminItems;
      break;

    default:
      items = [];
      break;
  }

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-[1000] bg-background flex h-screen md:h-custom-dvh-md 2xl:h-custom-dvh flex-col overflow-y-auto duration-300 ease-linear lg:static lg:translate-x-0 py-5 md:py-2 pl-5 2xl:pl-7 w-[280px] 2xl:w-[300px] border-r no-scrollbar ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        ref={trigger}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-controls="sidebar"
        aria-expanded={sidebarOpen}
        className="block lg:hidden pb-2"
      >
        <svg
          className="fill-current"
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
            fill=""
          />
        </svg>
      </button>

      <div className="space-y-2 lg:space-y-3">
        {items?.map((singleItem) => (
          <div key={singleItem?.item} className="">
            <p
              className={`text-textBlack pb-2 ${
                singleItem?.item === "" && "hidden"
              }`}
            >
              {singleItem?.item}
            </p>
            <div className="space-y-0.5 2xl:space-y-0.5">
              {singleItem?.navItems.map((nav) => (
                <div key={nav.label}>
                  <Link
                    href={nav.path}
                    className={`relative flex items-center gap-2 2xl:gap-3 pl-2 lg:pl-4 hover:bg-primary hover:rounded-lg  hover:text-white hover:font-semibold group py-1.5 2xl:py-2 ${
                      pathname === nav.path
                        ? "text-white font-semibold bg-primary rounded-lg"
                        : "text-textGreyBlack"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 flex items-center justify-center rounded-full group-hover:bg-background group-hover:text-textBlack p-1 ${
                        pathname === nav.path
                          ? "bg-background text-textBlack"
                          : "bg-borderLight"
                      }`}
                    >
                      <nav.Icon />
                    </div>
                    <p className="">{nav.label}</p>
                    <div
                      className={`group-hover:bg-background absolute h-4 w-1 right-0 top-[35%] rounded-l ${
                        pathname === nav.path ? "bg-background" : ""
                      }`}
                    ></div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;

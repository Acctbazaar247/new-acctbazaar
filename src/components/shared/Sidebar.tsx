import React, { useEffect, useRef, useState } from "react";

import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { dashboardSidebarItem } from "@/constants/dashboardSidebarItem";
import { useAppSelector } from "@/redux/hook";
import { INavItems, UserRole } from "@/types/common";
import Image from "next/image";
import Logo from "../ui/Logo";

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

  const [sidebarExpanded, setSidebarExpanded] = useState();

  let items: INavItems[] = [];

  switch (user?.role) {
    case UserRole.Admin:
      items = dashboardSidebarItem.adminItems;

      break;
    case UserRole.Seller:
      items = dashboardSidebarItem.sellerItems;

      break;
    case UserRole.User:
      items = dashboardSidebarItem.userItems;

      break;
    case UserRole.SuperAdmin:
      items = dashboardSidebarItem.supperItems;

      break;

    default:
      items = [];
      break;
  }

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-[1000] bg-white flex h-screen w-72.5 flex-col overflow-y-hidden   duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 pb-[50px] pt-[15px] px-[20px] border-r border-[#eee] ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 ">
        <Logo></Logo>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
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
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-[21px] px-[16px]">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Settings --> */}
              {items.map((single) => (
                <li className="" key={single.to}>
                  <Link
                    href={
                      single.matchUrl === "/" ? "/" : `/dashboard/${single.to}`
                    }
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium w-[197px] duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname === single.matchUrl &&
                      "nav-active bg-orange-600 text-white rounded-xl"
                      }`}
                  >
                    <FontAwesomeIcon className="w-[15px]" icon={single.icon} />
                    <span>{single.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
      {/* <!-- Sidebar Menu --> */}
    </aside>
  );
};

export default Sidebar;

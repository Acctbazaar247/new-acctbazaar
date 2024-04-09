import { useAppSelector } from "@/redux/hook";
import { loggedSellerNavLinks, loggedUserNavLinks } from "./NavbarData";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { UserRole } from "@/types/common";

type TNav = {
  icon: IconType;
  path: string;
  label: string;
};

export default function MobileNavbar() {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const data =
    user?.role === UserRole.User ? loggedUserNavLinks : loggedSellerNavLinks;
  return (
    <div className="md:hidden fixed z-40 bottom-0 left-0 right-0 bg-white w-full shadow">
      <div className="flex items-center justify-between px-4 py-2.5 text-[#989292]">
        {data.map((nav: TNav) => {
          const Icon = nav.icon;
          return nav.label === "My Purchase" &&
            user?.role !== UserRole.User ? null : (
            <div
              key={nav?.label}
              className={`flex flex-col items-center justify-center gap-0.5  max-w-[84px] ${
                router?.asPath === nav?.path && "text-primary"
              } text-sm font-medium hover:text-primary`}
            >
              <Icon className="text-base" />
              <Link href={nav?.path}>{nav.label}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

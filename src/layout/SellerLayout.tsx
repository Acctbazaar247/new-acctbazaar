import React, { ReactNode } from "react";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/router";
import Loading from "@/components/ui/Loading";
import { UserRole } from "@/types/common";
import DashboardLayout from "./DashboardLayout";
import Link from "next/link";
import HomeLayout from "./HomeLayout";

interface AdminLayoutProps {
  children: ReactNode;
}

const SellerLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isLoading, user } = useAppSelector((state) => state.user);
  const router = useRouter();
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loading></Loading>
      </div>
    );
  }

  const notSeller = user?.role !== UserRole.Seller;
  const notAdmin = user?.role !== UserRole.Admin;
  const notSuperAdmin = user?.role !== UserRole.SuperAdmin;
  if (notSeller && notAdmin && notSuperAdmin) {
    router.push({
      pathname: "/",
      //   query: { from: router.pathname },
    });
    return (
      <div className="flex justify-center">
        <Loading></Loading>
      </div>
    );
  }

  // if (notAdmin) {
  //   if (!user.isPaidForSeller) {
  //     return (
  //       <HomeLayout>
  //         <div className="text-center ">
  //           <h2 className="text-red-600 text-xl mt-10">
  //             You are not paid for become a seller
  //           </h2>
  //           <Link
  //             className="mt-2 px-4 py-2 inline-block bg-orange-600 text-white "
  //             href={"/"}
  //           >
  //             Back To Home
  //           </Link>
  //         </div>
  //       </HomeLayout>
  //     );
  //   }
  //   if (!user.isApprovedForSeller) {
  //     return (
  //       <HomeLayout>
  //         <div className="text-center ">
  //           <h2 className="text-red-600 text-xl mt-10">
  //             You are not approved for a seller
  //           </h2>
  //           <Link
  //             className="mt-2 px-4 py-2 inline-block bg-orange-600 text-white "
  //             href={"/"}
  //           >
  //             Back To Home
  //           </Link>
  //         </div>
  //       </HomeLayout>
  //     );
  //   }
  // }
  return <>{children}</>;
};

export default SellerLayout;

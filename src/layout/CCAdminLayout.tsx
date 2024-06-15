import React, { ReactNode } from "react";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/router";
import Loading from "@/components/ui/Loading";
import { UserRole } from "@/types/common";
import DashboardLayout from "./DashboardLayout";

interface CCAdminLayoutLayoutProps {
  children: ReactNode;
}

const CCAdminLayout: React.FC<CCAdminLayoutLayoutProps> = ({ children }) => {

  const { isLoading, user } = useAppSelector((state) => state.user);
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loading></Loading>
      </div>
    );
  }

  const notCCAdmin = user?.role !== UserRole.CCAdmin;

  if (user?.role === UserRole.SuperAdmin) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  if (notCCAdmin) {
    router.push({
      pathname: "/dashboard",
      //   query: { from: router.pathname },
    });

    return (
      <div className="flex justify-center">
        <Loading></Loading>
      </div>
    );
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

export default CCAdminLayout;

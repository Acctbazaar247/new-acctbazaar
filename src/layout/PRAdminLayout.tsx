import React, { ReactNode } from "react";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/router";
import Loading from "@/components/ui/Loading";
import { UserRole } from "@/types/common";
import DashboardLayout from "./DashboardLayout";

interface PRAdminLayoutLayoutProps {
  children: ReactNode;
}

const PRAdminLayout: React.FC<PRAdminLayoutLayoutProps> = ({ children }) => {

  const { isLoading, user } = useAppSelector((state) => state.user);
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loading></Loading>
      </div>
    );
  }

  const notPRAdmin = user?.role !== UserRole.PRAdmin;

  if (user?.role === UserRole.SuperAdmin) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  if (notPRAdmin) {
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

export default PRAdminLayout;

import Loading from "@/components/ui/Loading";
import { useAppSelector } from "@/redux/hook";
import { UserRole } from "@/types/common";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import DashboardLayout from "./DashboardLayout";

interface AdminsLayoutLayoutProps {
  children: ReactNode;
  roles: UserRole[];
}

const AdminsLayout: React.FC<AdminsLayoutLayoutProps> = ({
  children,
  roles,
}) => {
  const { isLoading, user } = useAppSelector((state) => state.user);
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loading></Loading>
      </div>
    );
  }

  const userHasRole = user && roles.includes(user?.role);

  if (user?.role === UserRole.SuperAdmin || userHasRole) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }
  // console.log(userHasRole, user?.role);
  if (!userHasRole) {
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
};

export default AdminsLayout;

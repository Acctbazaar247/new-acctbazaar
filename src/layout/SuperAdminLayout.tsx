import Loading from "@/components/ui/Loading";
import { useAppSelector } from "@/redux/hook";
import { UserRole } from "@/types/common";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import DashboardLayout from "./DashboardLayout";
import Link from "next/link";

type Props = { children: ReactNode };

const SuperAdminLayout = ({ children }: Props) => {
  const { isLoading, user } = useAppSelector((state) => state.user);
  const router = useRouter();
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loading></Loading>
      </div>
    );
  }

  if (user?.role !== UserRole.SuperAdmin) {
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

export default SuperAdminLayout;

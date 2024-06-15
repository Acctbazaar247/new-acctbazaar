import Loading from "@/components/ui/Loading";
import AdminOverView from "@/components/Overviews/AdminOverView";
import SellerOverView from "@/components/Overviews/SellerOverView";
import UserOverView from "@/components/Overviews/UserOverView";
import DashboardLayout from "@/layout/DashboardLayout";
import { useAppSelector } from "@/redux/hook";
import { UserRole } from "@/types/common";
import React from "react";
import { useRouter } from "next/router";

const Dashboard = () => {
  const user = useAppSelector((state) => state.user.user);
  const router = useRouter();
  let content = null;
  if (!user) {
    content = <Loading></Loading>;
  } else if (user.role === UserRole.User) {
    content = <UserOverView></UserOverView>;
  } else if (user.role === UserRole.Seller) {
    router.push("/seller/dashboard");
    content = <SellerOverView></SellerOverView>;
  } else {
    content = <AdminOverView></AdminOverView>;
  }
  return <>{content}</>;
};

export default Dashboard;

import Loading from "@/components/ui/Loading";
import AdminOverView from "@/components/Overviews/AdminOverView";
import SellerOverView from "@/components/Overviews/SellerOverView";
import UserOverView from "@/components/Overviews/UserOverView";
import DashboardLayout from "@/layout/DashboardLayout";
import { useAppSelector } from "@/redux/hook";
import { UserRole } from "@/types/common";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const Dashboard = (props: Props) => {
  const user = useAppSelector((state) => state.user.user);
  let content = null;
  if (!user) {
    content = <Loading></Loading>;
  } else if (user.role === UserRole.User) {
    content = <UserOverView></UserOverView>;
  } else if (user.role === UserRole.Seller) {
    content = <SellerOverView></SellerOverView>;
  } else {
    content = <AdminOverView></AdminOverView>;
  }
  return <DashboardLayout>{content}</DashboardLayout>;
};

export default Dashboard;

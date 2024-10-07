import React, { useState } from "react";

import Header from "../components/Header/Header";
import PrivateLayout from "./PrivateLayout";
import Sidebar from "@/components/shared/Sidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
interface props {
  children: React.ReactNode;
}
const DashboardLayout: React.FC<props> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <PrivateLayout>
      <div className="h-screen bg-background overflow-hidden w-full">
        <DashboardNavbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="flex h-custom-dvh-sm md:h-custom-dvh-md 2xl:h-custom-dvh">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="container px-4 py-4 md:px-4 md:py-4 lg:py-8 2xl:py-10 lg:max-w-[83%] 2xl:max-w-[80%]">
            {children}
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
};

export default DashboardLayout;

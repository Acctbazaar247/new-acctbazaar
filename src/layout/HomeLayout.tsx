import Footer from "@/components/shared/Footer";
import MobileNavbar from "@/components/shared/MobileNavbar";
import Navbar from "@/components/shared/Navbar";
import { useAppSelector } from "@/redux/hook";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const HomeLayout = ({ children }: Props) => {
  const user = useAppSelector((state) => state.user.user);
  return (
    <>
      <Navbar />
      <main
        className={`bg-background min-h-screen md:bg-borderLight ${
          user?.id &&
          "px-5 mb-10 md:mb-0 md:px-0 pt-11 md:pt-14 lg:pt-16 2xl:pt-20 "
        }`}
      >
        {children}
      </main>
      {user?.id && <MobileNavbar />}
      {!user?.id && <Footer />}
    </>
  );
};

export default HomeLayout;

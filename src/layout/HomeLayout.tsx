import Footer from "@/components/shared/Footer";
import MobileNavbar from "@/components/shared/MobileNavbar";
import Navbar from "@/components/shared/Navbar";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const HomeLayout = ({ children }: Props) => {
  const user = useAppSelector((state) => state.user.user);
  const router = useRouter();
  console.log(router.pathname);
  return (
    <>
      <Navbar />
      <main
        className={`bg-background min-h-screen md:bg-borderLight ${
          user?.id && router.pathname === "/marketplace"
            ? "px-5 mb-0 md:mb-0 md:px-0 pt-11 md:pt-14 lg:pt-16 2xl:pt-20 "
            : "px-5 mb-10 md:mb-0 md:px-0 pt-11 md:pt-14 lg:pt-16 2xl:pt-20 "
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

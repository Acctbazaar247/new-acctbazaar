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
      <main className={`mt-11 md:mt-14 lg:mt-16 2xl:mt-20 bg-white md:bg-[#FBFAFA] ${user?.id && "px-5 mb-10 md:mb-0 md:px-0"}`}>{children}</main>
      {user?.id &&
        <MobileNavbar />
      }
      {!user?.id &&
        <Footer />
      }
    </>
  );
};

export default HomeLayout;

import React, { ReactNode } from "react";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/router";
import Loading from "@/components/ui/Loading";
import NotVerified from "@/components/NotVerified/NotVerified";
import { toast } from "react-toastify";
import Link from "next/link";

interface PrivateLayoutProps {
  children: ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const { isLoading, user } = useAppSelector((state) => state.user);
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loading />
      </div>
    );
  }

  if (!user?.email) {
    router.push({
      pathname: "/auth/sign-in",
      query: { from: router?.pathname },
    });

    return (
      <div className="flex justify-center">
        <Loading />
      </div>
    );
  }

  if (!user.isVerified) {
    router.push("/auth/enter-otp");
    return <></>;
  }
  if (user.isBlocked) {
    return (
      <div className="flex justify-center flex-col items-center h-screen">
        <h2 className="text-2xl">You are Block by Admin</h2>
        {/* <Link href={"/contactus"}>Contact Us</Link> */}
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateLayout;

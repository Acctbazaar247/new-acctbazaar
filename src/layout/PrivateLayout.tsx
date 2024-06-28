import React, { ReactNode, useEffect } from "react";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/router";
import Loading from "@/components/ui/Loading";
import AppButton from "@/components/ui/AppButton";

interface PrivateLayoutProps {
  children: ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const { isLoading, user } = useAppSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (!user?.email && !isLoading) {
      router.push({
        pathname: "/auth/sign-in",
        query: { from: router?.asPath }
      });
    }
  }, [user, router, isLoading]);
  useEffect(() => {
    if (user?.isBlocked) {
      setTimeout(() => {
        router.push("/contactus");
      }, 2000);
    }
  }, [user]);
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
      query: { from: router?.asPath }
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
      <div className="flex justify-center flex-col  custom-hight max-w-4xl mx-auto space-y-5">
        <h2 className="md:text-xl flex flex-col gap-2">
          <span className="font-semibold">Dear {user?.name}, </span>
          <span>
            Your account with Acctbazaar.com is currently inactive. This may be
            due to a violation of our policies or an issue with your
            trades/transactions. Please contact our support team for further
            assistance and to resolve this matter promptly.
          </span>
        </h2>
        <AppButton label="Contact support" href="/contactus" />
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateLayout;

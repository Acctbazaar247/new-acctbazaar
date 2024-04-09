import MakePayment from "@/components/SellAccount/MakePayment";
import WelcomeModal from "@/components/SellAccount/WelcomeModal";
import HomeLayout from "@/layout/HomeLayout";
import { useEffect, useState } from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiPlusCircle } from "react-icons/fi";
import { TbMessage2Search, TbWallet } from "react-icons/tb";
import AddSellAccount from "@/components/SellAccount/AddSellAccount";
import { GoCheckCircleFill } from "react-icons/go";
import AccountCredentials from "@/components/SellAccount/AccountCredentials";
import ReviewSellAccount from "@/components/SellAccount/ReviewSellAccount";
import { AnimatePresence, motion } from "framer-motion";
import PrivateLayout from "@/layout/PrivateLayout";
import { useAppSelector } from "@/redux/hook";
import { UserRole } from "@/types/common";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function SellYourAccount() {
  const [sellAccountState, setSellAccountState] = useState(1);
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user?.role && sellAccountState === 1) {
      if (user.role === UserRole.User) {
        setSellAccountState(1);
      } else if (user.role === UserRole.Seller) {
        setSellAccountState(2);
      } else {
        setSellAccountState(0);
        toast.error("Admin cannot access sell product page", { toastId: "1" });
        router.push("/");
      }
    }
  }, [user, router, sellAccountState]);

  return (
    <HomeLayout>
      <PrivateLayout>
        <WelcomeModal />
        {/* {UserRole.User === user?.role ? <WelcomeModal /> : null} */}
        <div className="container py-5 md:py-10 2xl:py-12">
          {/* this is top section div  */}
          <div className="flex flex-col md:flex-row gap-1 justify-between">
            <div className="">
              <h2 className="title">
                {sellAccountState === 1
                  ? "Become a merchant "
                  : "Sell your account"}
              </h2>
              <p className="text-textGrey text-xs md:text-sm">
                {sellAccountState === 1
                  ? " A one-time payment is required to complete your merchant registration."
                  : " Add any account to sell to thousands of customers on our platform "}
              </p>
            </div>

            {/* right side div  */}
            <div className="flex text-[#CCCCCC] flex-col items-center justify-end gap-1">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-white size-12 flex items-center justify-center">
                  {sellAccountState > 1 ? (
                    <GoCheckCircleFill className={`text-2xl text-textBlack`} />
                  ) : (
                    <TbWallet
                      className={`text-2xl ${
                        sellAccountState === 1 && "text-primary"
                      }`}
                    />
                  )}
                </div>
                <div
                  className={`border w-12 md:w-20 ${
                    sellAccountState === 1
                      ? "border-primary"
                      : "border-textBlack"
                  }`}
                ></div>
                <div className=" p-2 rounded-full bg-white size-12 flex items-center justify-center">
                  {sellAccountState > 2 ? (
                    <GoCheckCircleFill className={`text-2xl text-textBlack`} />
                  ) : (
                    <FiPlusCircle
                      className={`text-2xl ${
                        sellAccountState === 2 && "text-primary"
                      }`}
                    />
                  )}
                </div>
                <div
                  className={`border w-12 md:w-20 ${
                    sellAccountState < 2 && "border-[#CCCCCC] border-dashed"
                  } ${
                    sellAccountState > 2 && "border-textBlack border-solid"
                  }  ${
                    sellAccountState === 2 && "border-primary border-dashed"
                  }`}
                ></div>
                <div className=" p-2 rounded-full bg-white size-12 flex items-center justify-center">
                  {sellAccountState > 3 ? (
                    <GoCheckCircleFill className={`text-2xl text-textBlack`} />
                  ) : (
                    <BiMessageSquareDetail
                      className={`text-2xl ${
                        sellAccountState === 3 && "text-primary"
                      }`}
                    />
                  )}
                </div>
                <div
                  className={`border w-12 md:w-20 ${
                    sellAccountState < 2 && "border-[#CCCCCC] border-dashed"
                  } ${
                    sellAccountState > 3 && "border-textBlack border-solid"
                  }  ${
                    sellAccountState === 3 && "border-primary border-dashed"
                  }`}
                ></div>
                <div className=" p-2 rounded-full bg-white size-12 flex items-center justify-center">
                  {sellAccountState > 4 ? (
                    <GoCheckCircleFill className={`text-2xl text-textBlack`} />
                  ) : (
                    <TbMessage2Search
                      className={`text-2xl ${
                        sellAccountState === 4 && "text-primary"
                      }`}
                    />
                  )}
                </div>
              </div>

              <div className="flex text-xs md:text-sm items-center justify-between md:gap-6 font-medium">
                <p
                  className={`${sellAccountState === 1 && "text-primary"} ${
                    sellAccountState > 1 && "text-textBlack"
                  }  min-w-[80px]`}
                >
                  Make Payment
                </p>
                <p
                  className={`${sellAccountState === 2 && "text-primary"} ${
                    sellAccountState > 2 && "text-textBlack"
                  } min-w-20 md:min-w-24 text-center ml-4`}
                >
                  Add account
                </p>
                <p
                  className={`${sellAccountState === 3 && "text-primary"} ${
                    sellAccountState > 3 && "text-textBlack"
                  } min-w-16 md:min-w-24 text-end mx-2`}
                >
                  Credentials
                </p>
                <p
                  className={`${sellAccountState === 4 && "text-primary"} ${
                    sellAccountState > 4 && "text-textBlack"
                  } min-w-16 md:min-w-24 text-end md:pr-2`}
                >
                  Review
                </p>
              </div>
            </div>
          </div>

          {/* this is main div  */}
          <AnimatePresence mode="wait">
            <motion.div
              className="pt-2 md:pt-4 lg:pt-5 2xl:pt-6"
              key={sellAccountState ? sellAccountState : "empty"}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 30, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {sellAccountState === 1 && (
                <MakePayment updateProgress={setSellAccountState} />
              )}
              {sellAccountState === 2 && (
                <AddSellAccount updateProgress={setSellAccountState} />
              )}
              {sellAccountState === 3 && (
                <AccountCredentials updateProgress={setSellAccountState} />
              )}
              {sellAccountState === 4 && (
                <ReviewSellAccount updateProgress={setSellAccountState} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </PrivateLayout>
    </HomeLayout>
  );
}

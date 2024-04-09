"use client";
import AccountSettingNotifications from "@/components/account-setting/AccountSettingNotifications";
import AccountSettingProfile from "@/components/account-setting/AccountSettingProfile";
import AccountSettingSecurity from "@/components/account-setting/AccountSettingSecurity";
import AppTabs from "@/components/ui/AppTabs";
import HomeLayout from "@/layout/HomeLayout";
import PrivateLayout from "@/layout/PrivateLayout";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const AccountSetting = () => {
  const tabs = [
    { label: "Profile" },
    { label: "Security" },
    { label: "Notifications" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <HomeLayout>
      <PrivateLayout>
        <div className="container py-5 md:py-10 2xl:py-12">
          <h2 className="title">Account settings</h2>

          {/* this is main div  */}
          <div className="bg-white rounded min-h-[80dvh] py-3 md:py-6 md:px-10 mt-2 md:mt-4 lg:mt-5 2xl:mt-6">
            <AppTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            <AnimatePresence mode="wait">
              <motion.div
                className="w-full md:w-[80%] py-2 md:py-4"
                key={activeTab ? activeTab : "empty"}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "Profile" && <AccountSettingProfile />}

                {activeTab === "Security" && <AccountSettingSecurity />}

                {activeTab === "Notifications" && (
                  <AccountSettingNotifications />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </PrivateLayout>
    </HomeLayout>
  );
};

export default AccountSetting;

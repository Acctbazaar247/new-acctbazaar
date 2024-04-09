import ChangePassword from "@/components/ProfileSettingsCom/ChangePassword";
import ProfileInfo from "@/components/ProfileSettingsCom/ProfileInfo";
import DashboardLayout from "@/layout/DashboardLayout";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

const onChange = (key: string) => {};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Profile Settings",
    children: <ProfileInfo></ProfileInfo>,
  },
  {
    key: "2",
    label: "Change Password",
    children: <ChangePassword></ChangePassword>,
  },
];

type Props = {};

const ProfileSetting = (props: Props) => {
  return (
    <DashboardLayout>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </DashboardLayout>
  );
};

export default ProfileSetting;

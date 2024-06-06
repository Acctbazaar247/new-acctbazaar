import { useAppSelector } from "@/redux/hook";
import ProfileDetailsPopUp from "../shared/ProfileDetailsPopUp";
import Logo from "../ui/Logo";
import { FiMenu } from "react-icons/fi";

interface TDashboardNavbar {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}

const DashboardNavbar = ({ sidebarOpen, setSidebarOpen }: TDashboardNavbar) => {
    const user = useAppSelector((state) => state.user.user);

    return (
        <div className='w-full flex items-center justify-between px-4 md:px-6 lg:px-10 2xl:px-10 py-2 2xl:py-2 border border-b text-black'>
            <FiMenu onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-xl" />

            <Logo />

            <div className='flex items-center gap-2 md:gap-4'>
                <div className='hidden md:block'>
                    <h2 className="text-sm md:text-base 2xl:text-lg font-medium">{user?.name}</h2>
                    <h2 className="font-medium uppercase text-textGrey text-xs">{user?.role}</h2>
                </div>
                <ProfileDetailsPopUp />
            </div>
        </div>
    );
};

export default DashboardNavbar;
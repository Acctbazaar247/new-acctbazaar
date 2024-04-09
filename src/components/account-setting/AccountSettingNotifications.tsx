import { useEditUserMutation } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hook";

const AccountSettingNotifications = () => {
    const user = useAppSelector(state => state.user.user);
    const [editUser, { isLoading }] = useEditUserMutation();

    return (
        <div className='py-1 md:py-4 2xl:py-5 flex gap-4 flex-col md:flex-row justify-between'>
            {/* this is left side text  */}
            <div className='text-textBlueBlack space-y-1'>
                <h3 className="font-semibold">Notifications</h3>
                <p className="text-textGrey text-sm hidden md:block">Get notified on activities within   <br />Acctbazaar</p>
                <p className="text-textGrey text-sm md:hidden">Get notified on activities within  Acctbazaar</p>
            </div>
            {/* this is right side text  */}
            <div className='w-full md:w-[40%] space-y-3'>
                <div className='flex gap-4'>
                    <input
                        // {...register("accept", {
                        //     required: true,
                        // })}
                        required
                        type="checkbox"
                        className="size-5 cursor-pointer"
                    />
                    <div className='space-y-1'>
                        <p className="text-sm font-medium text-textBlueBlack">Add Account Email Notification</p>
                        <p className="text-sm  text-[#98A2B3] font-light">Get notified when a new account is added to the platform</p>
                    </div>
                </div>
                {/* another one  */}
                <div className='flex gap-4'>
                    <input
                        // {...register("accept", {
                        //     required: true,
                        // })}
                        required
                        type="checkbox"
                        className="size-5 cursor-pointer"
                    />
                    <div className='space-y-1'>
                        <p className="text-sm font-medium text-textBlueBlack">Messages SMS Notification</p>
                        <p className="text-sm  text-[#98A2B3] font-light">Get notified when you get new messages</p>
                    </div>
                </div>
                {/* another one  */}
                <div className='flex gap-4'>
                    <input
                        // {...register("accept", {
                        //     required: true,
                        // })}
                        required
                        type="checkbox"
                        className="size-5 cursor-pointer"
                    />
                    <div className='space-y-1'>
                        <p className="text-sm font-medium text-textBlueBlack">Messages Email Notification</p>
                        <p className="text-sm  text-[#98A2B3] font-light">Get notified when you get new messages</p>
                    </div>
                </div>
                {/* another one  */}
                <div className='flex gap-4'>
                    <input
                        // {...register("accept", {
                        //     required: true,
                        // })}
                        required
                        type="checkbox"
                        className="size-5 cursor-pointer"
                    />
                    <div className='space-y-1'>
                        <p className="text-sm font-medium text-textBlueBlack">Review Email Notification</p>
                        <p className="text-sm  text-[#98A2B3] font-light">Be notified when your account gets approved</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSettingNotifications;
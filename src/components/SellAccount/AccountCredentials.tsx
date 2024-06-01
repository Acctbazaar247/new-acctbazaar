import { Dispatch, SetStateAction } from "react";
import AccountCredentialCard from "./AccountCredentialCard";
import OrderDetailsAccountInfo from "../orders/OrderDetailsAccountInfo";
import AppFormInput from "../ui/AppFormInput";
import { SubmitHandler, useForm } from "react-hook-form";
import AppFormTextarea from "../ui/AppFormTextarea";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setAccountCredentials } from "@/redux/features/account/accountSlice";
import { toast } from "react-toastify";
import { GoAlert } from "react-icons/go";
import { useGetCurrentPlanQuery } from "@/redux/features/plan/planApi";
import Link from "next/link";

type TAccountCredentials = {
  updateProgress: Dispatch<SetStateAction<number>>;
  UploadLeftOnCurrentPlan: any
};

interface FormData {
  email: string;
  password: string;
  preview?: string;
  additionalEmail?: string;
  additionalPassword?: string;
  additionalDescription?: string;
}

export default function AccountCredentials({
  updateProgress, UploadLeftOnCurrentPlan
}: TAccountCredentials) {
  const { data: currentPlan } = useGetCurrentPlanQuery("");

  const { user } = useAppSelector((state) => state.user);
  const { accountCard, accountCredentials } = useAppSelector(
    (state) => state.account
  );

  const dispatch = useAppDispatch();

  const {
    register,
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const randomId = Math.random().toString(36).substr(2, 8);

    if ((UploadLeftOnCurrentPlan?.data?.left - accountCredentials.length) === 0) {
      return toast.error("Your upload limit has finished for today, want to more upload account? Please upgrade your plan", {
        toastId: 1,
      });
    };

    dispatch(
      setAccountCredentials({ ...data, username: user?.name, id: randomId })
    );
    reset();
  };

  const handleCredentials = () => {
    if (accountCredentials.length < 1) {
      return toast.error("Please set minimum one account Credentials", {
        toastId: 1,
      });
    }
    updateProgress(4);
  };

  return (
    <div className="bg-white rounded-2xl w-full min-h-[80vh] p-1 md:p-6 2xl:p-8">
      <div className="border-yellow-500 bg-yellow-50 flex flex-wrap gap-2 w-full rounded-lg border-l-4 2xl:border-l-[6px] p-3 md:p-4">
        <div className=''>
          <GoAlert className="text-yellow-500 text-xl inline" /> You are in <span className="font-bold inline">{currentPlan?.data?.planType} plan,</span> your account upload limit number for today is <span className="font-bold inline">{UploadLeftOnCurrentPlan?.data?.left - accountCredentials.length},</span> if you want to upload more account, upgrade your plan.
        </div>
        <div className=''>
          <Link href={"/seller/plans"} className="appOutlineBtnSm  inline">Choose Your Plan Here</Link>
        </div>
      </div>

      <h2 className="subTitle pt-4 md:pt-2 2xl:pt-6 pb-6 2xl:pb-8 text-center">
        Account Credentials
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* this is main div  */}
        <div className="flex  flex-col md:flex-row gap-4 2xl:gap-6 min-h-[70dvh]">
          {/* this is left div  */}
          <div className="md:w-[33%] max-h-[50dvh] md:max-h-full overflow-y-auto">
            <AccountCredentialCard
              updateProgress={updateProgress}
              account={accountCard}
            />
          </div>
          {/* this is middle div  */}
          <div className="md:w-[30%] space-y-3">
            <AppFormInput
              label="Username"
              name="email"
              type="text"
              placeholder="Type your Account Username here"
              register={register}
              error={errors?.email}
              required
            />

            <AppFormInput
              label="Account Password"
              name="password"
              type="password"
              placeholder="Type your Account Password here"
              register={register}
              error={errors?.password}
              required
            />
            <AppFormInput
              label="Preview link of account (optional)"
              name="preview"
              type="url"
              placeholder="Type your link here"
              register={register}
              error={errors?.preview}
            />
            <div className="pt-2">
              <h2 className="text-lg font-medium text-textBlack">
                Additional information.
                <span className="text-sm font-normal">(optional)</span>
              </h2>
              <p className="text-xs text-textGrey">
                Add more information to your account
              </p>
            </div>
            <AppFormInput
              label="Email attached to account"
              name="additionalEmail"
              type="email"
              placeholder="Type your email here"
              register={register}
              error={errors?.additionalEmail}
            />
            <AppFormInput
              label="Password"
              name="additionalPassword"
              type="password"
              placeholder="Type your Password here"
              register={register}
              error={errors?.additionalPassword}
            />
            <AppFormTextarea
              label="Additional information"
              name="additionalDescription"
              register={register}
              error={errors?.additionalDescription}
            />
            {/* <div className=''>
                            <input type="file" id="file" className="hidden" />
                            <label htmlFor="file" className='cursor-pointer border border-borderColor rounded hover:bg-gray-100 border-dashed py-3 px-3 flex items-center gap-1 justify-between'>
                                <h2 className="text-[#7D7878] flex items-center gap-1 text-sm"><CgFileAdd />Upload Valid Identity Document</h2>
                                <p className="text-primary text-xs font-medium">Select File</p>
                            </label>
                            <h2 className="text-[#7D7878] pt-1 text-xs">JPEG, PNG, PDF. Max file size: 2mb</h2>
                        </div> */}
          </div>
          <div className="hidden md:block border border-[#EFECEC]"></div>
          {/* this is last div  */}
          <div className="md:w-[35%] space-y-2 min-h-full">
            {accountCredentials.length < 1 ? (
              <div className="md:h-[30dvh]"></div>
            ) : (
              <div className="max-h-[60dvh] space-y-2 overflow-auto">
                {accountCredentials.map((account, index) => (
                  <OrderDetailsAccountInfo
                    key={index}
                    index={index}
                    account={account}
                  />
                ))}
              </div>
            )}
            <div className="mt-auto pt-3 md:pt-6 flex items-center justify-center gap-2 md:gap-5">
              <button
                type="submit"
                className="appBtn text-xs px-2 md:text-sm 2xl:text-base md:px-10"
              >
                {accountCredentials.length > 0
                  ? "Add another account"
                  : "Add account"}
              </button>
              <button
                type="button"
                onClick={handleCredentials}
                className="appOutlineBtn"
              >
                Review
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

import { SubmitHandler, useForm } from "react-hook-form";
import AppFormInput from "../ui/AppFormInput";
import { useState } from "react";
import {
  useAddWithdrawPinMutation,
  useChangePasswordMutation,
} from "@/redux/features/user/userApi";
import OTPInput from "react-otp-input";
import {
  IGenericErrorResponse,
  ResponseErrorType,
  ResponseSuccessType,
} from "@/types/common";
import { toast } from "react-toastify";
import { useAppSelector } from "@/redux/hook";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface FormData {
  password: string;
  prePassword: string;
  confirmPassword: string;
}

const AccountSettingSecurity = () => {
  const [otp, setOtp] = useState("");
  const user = useAppSelector((state) => state.user.user);
  const [createWithdrawPin] = useAddWithdrawPinMutation();
  const [updatePassword, { isLoading }] = useChangePasswordMutation();

  const handleWithdrawPinSubmit = async () => {
    if (otp.length !== 4) {
      toast.error("Please Enter Pin Number and try again");
    } else if (otp.length === 4) {
      const submittedData = {
        password: otp,
      };
      await createWithdrawPin(submittedData)
        .unwrap()
        .then((res: ResponseErrorType) => {
          if (!res.data?.success) {
            toast.error(res?.data?.message || "Something went wrong");
          }
          toast.success("withdrawalPin are Created successfully!", {
            toastId: 1,
          });
        })
        .catch((res: ResponseErrorType) => {
          if (!res.data?.success) {
            toast.error(res?.data?.message || "Something went wrong");
          }
        });
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (data.confirmPassword !== data.password) {
      toast.error("Your confirm password and new password didn't match!");
    } else if (data.password === data.confirmPassword) {
      const submittedData = {
        email: user?.email,
        password: data.password,
        prePassword: data.prePassword,
      };
      await updatePassword(submittedData)
        .unwrap()
        .then((res: ResponseSuccessType) => {
          if (!res.success) {
            toast.error(res?.data?.message || "Something went wrong");
          } else {
            toast.success("Password changed successfully!", { toastId: 1 });
            reset();
          }
        })
        .catch((res: ResponseErrorType) => {
          toast.error(res?.data?.message || "Something went wrong e");
        });
    }
  };

  return (
    <form
      className="w-full md:py-4 2xl:py-5 space-y-4 lg:space-y-5 2xl:space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col md:flex-row gap-3 justify-between">
        {/* this is left side text  */}
        <div className="text-textBlueBlack space-y-1">
          <h3 className="font-semibold">Password</h3>
          <p className="text-textGrey text-sm">
            Please enter your current password to <br /> change your password.
          </p>
        </div>

        {/* this is right side text  */}
        <div className="w-full md:w-[37%] space-y-3">
          <AppFormInput
            label="Current Password"
            name="prePassword"
            type="password"
            required={true}
            placeholder="Type your Current Password here"
            register={register}
            error={errors?.prePassword}
          />
          <div>
            <AppFormInput
              label="New Password"
              name="password"
              type="password"
              required={true}
              register={register}
              placeholder="Type your Password"
              error={errors.password}
            />
            <div className="text-textBlack ml-5 text-xs mt-2 space-y-1">
              <p className="list-item">Minimum length of 3-30 characters</p>
              <p className="list-item">
                Only lowercase, numeric and symbols allowed
              </p>
            </div>
          </div>

          <AppFormInput
            name="confirmPassword"
            required={true}
            register={register}
            type="password"
            label="Confirm password"
            placeholder="Type your Confirm password"
            error={errors.confirmPassword}
          />
          <div className="flex items-center justify-end gap-2 md:gap-4">
            <button
              type="button"
              onClick={() => reset()}
              className="appOutlineBtn  text-xs md:text-sm 2xl:text-base"
            >
              Cancel
            </button>
            {isLoading ? (
              <button className="appBtn px-10">
                <AiOutlineLoading3Quarters className="animate-spin text-white text-xl" />
              </button>
            ) : (
              <button
                type="submit"
                className="appBtn text-xs md:text-sm 2xl:text-base"
              >
                Update password
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="border border-[#F2F4F7]"></div>
      {!user?.withdrawalPin && (
        <div className="flex justify-between flex-col md:flex-row">
          {/* this is left side text  */}
          <div className="text-textBlueBlack space-y-1">
            <h3 className="font-semibold">Withdrawal PIN</h3>
            <p className="text-textGrey text-sm">Set your withdrawal pin</p>
          </div>
          {/* this is right side text  */}
          <div className="md:w-[37%] space-y-3 mt-2">
            <p className="text-sm"> Create Withdrawal pin</p>
            <div className="pt-2">
              <OTPInput
                numInputs={4}
                value={otp}
                onChange={(e) => setOtp(e)}
                renderInput={(props) => (
                  <input
                    {...props}
                    placeholder="-"
                    type="number"
                    className="size-11 lg:size-14 mr-2 md:mr-10 bg-[#F2F4F7] rounded text-center focus:border-2 !w-[56px] focus-visible:outline-none px-2 focus:!border-primary"
                  />
                )}
              />
            </div>
            <div className="flex items-center justify-end w-full">
              <button
                type="button"
                onClick={handleWithdrawPinSubmit}
                className="appBtn"
              >
                Create Pin
              </button>
            </div>
            {/* <div className="flex items-center justify-end pt-2 text-primary text-sm">
                        <p>Forgot pin?</p>
                    </div> */}
          </div>
        </div>
      )}
    </form>
  );
};

export default AccountSettingSecurity;

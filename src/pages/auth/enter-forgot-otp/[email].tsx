import AppCaptcha from "@/components/AppCaptcha/AppCaptcha";
import CreateNewPassword from "@/components/CreateNewPassword/CreateNewPassword";
import LeftSideAuthComponent from "@/components/auth/LeftSideAuthComponent";
import { useEnterForgotOtpMutation } from "@/redux/features/auth/authSellerApi";
import { useAppDispatch } from "@/redux/hook";
import { ResponseSuccessType } from "@/types/common";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";

interface FormData {
  input1: string;
}

const EnterForgotOtp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const email = router.query.email;
  const [otp, setOtp] = useState("");
  const [verifyOtp, { isLoading }] = useEnterForgotOtpMutation();
  const dispatch = useAppDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState<null | string>(null);
  const onSubmit = () => {
    if (otp.length !== 6) {
      toast.error("Enter otp properly");
      return;
    }
    verifyOtp({ token: parseInt(otp), email })
      .unwrap()
      .then((res: ResponseSuccessType) => {
        if (!res.success) {
          toast.error(res.message || "Something went wrong");
        } else {
          setIsSuccess(true);
          toast.success("Otp verified");
        }
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err?.data?.message || "Something went wrong");
      });
  };

  if (isSuccess) {
    return (
      <CreateNewPassword email={email as string} otp={otp}></CreateNewPassword>
    );
  }
  return (
    <AppCaptcha>
      <div className="flex bg-background  lg:h-[100vh]">
        {/* this is left side div  */}
        <LeftSideAuthComponent />

        {/* this is form and other staff  */}
        <div className="w-full lg:w-[58%] h-screen lg:h-full px-4 lg:px-0 overflow-auto flex items-center justify-center ">
          <div className="max-w-lg mx-auto py-8 mt-10 lg:py-20 2xl:py-36">
            <h2 className="text-2xl lg:text-4xl font-bold text-textBlack pb-1 lg:pb-2">
              Enter OTP
            </h2>
            <p className="text-textGrey text-xs lg:text-sm">
              A 6-digit OTP (one time password) has been sent to your e-mail for
              Forgot you password.
            </p>

            <div className="w-full  2xl:w-[560px] py-2 lg:py-4 2xl:py-5 ">
              <div className="py-4 2xl:py-5">
                <OTPInput
                  numInputs={6}
                  value={otp}
                  // {...register("input1", { required: true })}
                  onChange={(e) => setOtp(e)}
                  // renderSeparator={<span>-</span>}
                  renderInput={(props) => (
                    <input
                      {...props}
                      placeholder="-"
                      type="number"
                      className="size-11 lg:size-14 mr-2 md:mr-10 bg-borderLight rounded text-center focus:border-2 !w-[30px] md:!w-[56px] focus-visible:outline-none px-2 focus:!border-primary"
                    />
                  )}
                />

                <div className="flex items-center justify-between pt-2 text-textGreyBlack text-sm">
                  <p>
                    <span className="text-primary font-medium pl-1">
                      <Link href="/">Back to home</Link>
                    </span>
                  </p>
                </div>
              </div>
              {/* <GoogleReCaptcha
                onVerify={(t) => {
                  setToken(t);
                }}
              /> */}
              <button
                onClick={onSubmit}
                // disabled={isLoading || !token}
                type="submit"
                className="appBtn mt-4 w-full"
              >
                Verify code
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppCaptcha>
  );
};

export default EnterForgotOtp;

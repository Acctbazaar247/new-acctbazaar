import { useAddWithdrawPinMutation } from "@/redux/features/user/userApi";
import { ResponseErrorType, ResponseSuccessType } from "@/types/common";
import React, { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";
import Loading from "../ui/Loading";
import AppSmallLoading from "../ui/AppSmallLoading";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  addWithdrawalPin,
  userLoggedIn,
} from "@/redux/features/auth/authSlice";

type TCreateWithdrawPin = {
  setNotCreatePin: Dispatch<SetStateAction<boolean>>;
};
const CreateWithdrawPin: React.FC<TCreateWithdrawPin> = ({
  setNotCreatePin,
}) => {
  const [otp, setOtp] = useState("");
  const [confirmOTP, setConfirmOTP] = useState("");
  const [createWithdrawPin, { isLoading }] = useAddWithdrawPinMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    if (otp === "" || confirmOTP === "") {
      toast.error("Please Enter Pin Number and try again");
    } else if (otp !== confirmOTP) {
      toast.error("Please ensure Enter Pin and confirm pin are same");
    } else if (otp === confirmOTP) {
      const submittedData = {
        password: otp,
      };
      await createWithdrawPin(submittedData)
        .unwrap()
        .then((res: ResponseErrorType | ResponseSuccessType) => {
          if (!res.data) {
            toast.error(res?.data?.message || "Something went wrong");
          } else {
            setNotCreatePin(true);
            dispatch(addWithdrawalPin());
            toast.success("withdrawalPin are Created successfully!", {
              toastId: 1,
            });
          }
        })
        .catch((res: ResponseErrorType | ResponseSuccessType) => {
          if (!res.data?.success) {
            toast.error(res?.data?.message || "Something went wrong");
          }
        });
    }
  };

  return (
    <div className="px-4">
      <h2 className="subTitle">Create PIN</h2>
      <p className="textG">Create your withdrawal pin</p>

      <div className="space-y-4 pt-4 w-fit">
        <div className="">
          <p>Enter Pin</p>
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
        </div>
        <div className="">
          <p>Confirm PIN</p>
          <div className="pt-2">
            <OTPInput
              numInputs={4}
              value={confirmOTP}
              onChange={(e) => setConfirmOTP(e)}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  type="number"
                  className="size-11 lg:size-14  mr-2 md:mr-10 bg-[#F2F4F7] rounded text-center focus:border-2 !w-[56px] focus-visible:outline-none px-2 focus:!border-primary"
                />
              )}
            />
          </div>
        </div>
        {isLoading ? (
          <AppSmallLoading></AppSmallLoading>
        ) : (
          <button
            type="submit"
            onClick={handleSubmit}
            className="appBtn w-full"
          >
            Create PIN
          </button>
        )}
      </div>
    </div>
  );
};
export default CreateWithdrawPin;

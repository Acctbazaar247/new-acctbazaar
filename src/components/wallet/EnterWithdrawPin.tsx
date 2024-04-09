import { useAddWithdrawFundMutation } from "@/redux/features/withdrawFund/withdrawFundApi";
import { useAppSelector } from "@/redux/hook";
import { ResponseErrorType, ResponseSuccessType } from "@/types/common";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";
import CreateWithdrawPin from "./CreateWithdrawPin";

type TEnterWithdrawPin = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  refresh: () => void;
  withdrawData?: {
    accountNumber?: string;
    fullName?: string;
    bankName?: string;
    amount: string;
    address?: string;
  };
};

export default function EnterWithdrawPin({
  setModalOpen,
  withdrawData,
  refresh,
}: TEnterWithdrawPin) {
  const user = useAppSelector((state) => state.user.user);
  const [otp, setOtp] = useState("");
  const [makeWithdrawRequest, { isLoading }] = useAddWithdrawFundMutation();
  const [isPinExits, setIsPinExits] = useState(
    user?.withdrawalPin ? true : false
  );
  useEffect(() => {
    if (user) {
      setIsPinExits(user.withdrawalPin ? true : false);
    }
  }, [user]);
  const handleWithdraw = async () => {
    if (otp.length !== 4) {
      toast.error("Please Enter 4 digit Pin Number and try again");
    } else if (otp.length === 4) {
      if (!withdrawData?.amount) {
        return;
      }
      const submittedData = {
        ...withdrawData,
        withdrawalPin: otp,
        amount: parseFloat(withdrawData.amount),
        walletAddress: withdrawData.address || undefined,
      };

      await makeWithdrawRequest(submittedData)
        .unwrap()
        .then((res: ResponseErrorType | ResponseSuccessType) => {
          if (!res.data) {
            toast.error(res?.data?.message || "Something went wrong");
          } else {
            setModalOpen(true);
            toast.success("withdraw request are send successfully!", {
              toastId: 1,
            });
            refresh();
          }
        })
        .catch((res: ResponseErrorType | ResponseSuccessType) => {
          if (!res.data?.success) {
            toast.error(res?.data?.message || "Something went wrong");
          }
        });
    }
  };
  if (!isPinExits) {
    return (
      <CreateWithdrawPin setNotCreatePin={setIsPinExits}></CreateWithdrawPin>
    );
  }
  return (
    <div className="p-4">
      <h2 className="subTitle">Enter Withdrawal PIN</h2>
      <p className="textG">Enter your 4-digit withdrawal pin</p>

      <div className="space-y-4 pt-4 ">
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
                  className="size-11 lg:size-14 mr-4 md:mr-10 bg-[#F2F4F7] rounded text-center focus:border-2 !w-[56px] focus-visible:outline-none px-2 focus:!border-primary"
                />
              )}
            />
          </div>
        </div>

        <button
          type="submit"
          className="appBtn w-full"
          onClick={handleWithdraw}
          disabled={isLoading}
        >
          {isLoading ? "Loading" : "Withdraw"}
        </button>
      </div>
    </div>
  );
}

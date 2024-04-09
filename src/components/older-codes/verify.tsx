import Loading from "@/components/ui/Loading";
import {
  loginUserWithToken,
  resendEmail,
  verifyUserWithToken,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {};

const Verify = (props: Props) => {
  const query = useSearchParams();
  const toEmail = query.get("toEmail");
  const token = query.get("token");
  const [isDisabled, setIsDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(loginUserWithToken());
  }, [dispatch]);
  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;

    if (isDisabled) {
      // Start countdown when button is disabled
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            // If countdown reaches 1, enable the button
            setIsDisabled(false);
            clearInterval(countdownInterval);
            return 30; // Reset countdown to 30 seconds
          }
          return prevCountdown - 1;
        });
      }, 1000); // Update countdown every second
    }

    // Clear interval when component is unmounted or when button is re-enabled
    return () => clearInterval(countdownInterval);
  }, [isDisabled]);
  const handleResendClick = () => {
    // Add your logic for sending the verification email here
    // For example, you might make an API request to resend the email.
    if (toEmail) {
      dispatch(resendEmail(toEmail))
        .unwrap()
        .then((res) => {
          toast.success("Successfully verification email sent");
        })
        .catch((err) => {
          toast.error("something went wrong to send email");
        });
    }
    // After clicking the button, disable it and start the countdown
    setIsDisabled(true);
  };
  useEffect(() => {
    if (token) {
      dispatch(verifyUserWithToken(token));
    }
  }, [token, dispatch]);
  useEffect(() => {
    if (user?.isVerified) {
      router.push("/");
    }
  }, [user, router]);

  if (token) {
    return (
      <>
        <Loading></Loading>
      </>
    );
  }
  return (
    <div>
      {" "}
      <div className="flex h-full flex-col items-center justify-center space-y-1">
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Image src={"/assets/logo.PNG"} fill alt="hippo email sent image" />
        </div>

        <h3 className="font-semibold text-2xl">Check your email</h3>

        {toEmail ? (
          <>
            <p className="text-muted-foreground text-center">
              We&apos;ve sent a verification link to{" "}
              <span className="font-semibold">{toEmail}</span>.
            </p>
            <div>
              <button
                className="bg-orange-500 py-2 px-5 rounded disabled:opacity-65 disabled:bg-slate-400 transition-all  text-white mt-2"
                onClick={handleResendClick}
                disabled={isDisabled}
              >
                Resend Email
              </button>
              {isDisabled && (
                <p className="text-center">Resend in {countdown}s</p>
              )}
            </div>
          </>
        ) : (
          <p className="text-muted-foreground text-center p-5">
            We&apos;ve sent a verification link to your email. <br />
            The verification link might take a while to deliver due to high
            volume of registration. Rest assured the link will deliver
            in a few minutes
          </p>
        )}
      </div>
    </div>
  );
};

export default Verify;

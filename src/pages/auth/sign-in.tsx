import LeftSideAuthComponent from "@/components/auth/LeftSideAuthComponent";
import AppFormInput from "@/components/ui/AppFormInput";
import AppSmallLoading from "@/components/ui/AppSmallLoading";
import { loginUser, setError } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "react-phone-input-2/lib/material.css";
import { toast } from "react-toastify";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  accept?: any;
}

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { isLoading, user, error } = useAppSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (data.password.length < 8) {
      toast.error("minimum password value is 8");
    } else {
      dispatch(loginUser(data));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { toastId: 1 });
    } else if (!isLoading && user?.email) {
      if (router.query && router?.query?.from) {
        router.push(router.query.from as string);
      } else {
        router.push(router.locale || "/marketplace");
      }
    }
    return () => {
      dispatch(setError({ isError: false, error: "" }));
    };
  }, [error, isLoading, user, router, dispatch]);

  return (
    <div className="flex lg:h-[100vh]">
      {/* this is left side div  */}
      <LeftSideAuthComponent />
      {/* this is form and other staff  */}
      <div className="w-full lg:w-[50%] h-screen lg:h-full px-4 lg:px-0 overflow-auto flex items-center justify-center ">
        <div className="w-full lg:max-w-lg mx-auto py-8 mt-10 lg:py-20 2xl:py-36">
          <h2 className="text-2xl lg:text-4xl font-bold text-textBlack pb-1 lg:pb-2">
            Login to your account{" "}
          </h2>
          <p className="text-[#645D5D] text-xs lg:text-sm">
            Don’t have an account?{" "}
            <span className="text-primary font-medium">
              <Link href="/auth/sign-up">Sign up</Link>
            </span>
          </p>

          <form
            className="w-full md:w-[500px] 2xl:w-[560px] py-4 2xl:py-5 space-y-3 lg:space-y-4 2xl:space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <AppFormInput
              name="email"
              required={true}
              register={register}
              type="email"
              label="Email address"
              placeholder="Type your Email address"
              error={errors.email}
            />

            <AppFormInput
              name="password"
              required={true}
              register={register}
              type="password"
              label="Password"
              placeholder="Type your Password"
              error={errors.password}
            />

            <div className="flex items-center justify-end text-xs text-textGrey hover:text-primary lg:text-sm">
              <Link href={"/auth/forgot-password"}>
                <p>Forgot Password?</p>{" "}
              </Link>
            </div>
            {isLoading ? (
              <AppSmallLoading />
            ) : (
              <button type="submit" className="appBtn mt-4 w-full">
                Login
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

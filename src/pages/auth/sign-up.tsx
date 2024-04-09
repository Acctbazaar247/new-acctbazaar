import FormInputNumber from "@/components/Forms/FormInputNumber";
import LeftSideAuthComponent from "@/components/auth/LeftSideAuthComponent";
import AppFormInput from "@/components/ui/AppFormInput";
import AppSmallLoading from "@/components/ui/AppSmallLoading";
import Loading from "@/components/ui/Loading";
import { createUser, setError } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { UserRole } from "@/types/common";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
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

const SignUp = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, user, error } = useAppSelector((state) => state.user);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (data.password.length < 8) {
      toast.error("minimum password value is 8");
      return;
    }
    if (data.confirmPassword !== data.password) {
      toast.error(`Password does't match`);
      return;
    }

    const { confirmPassword, accept, ...rest } = data;
    dispatch(createUser({ ...rest, role: UserRole.User } as any));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    } else if (!isLoading && user?.email) {
      router.push(`/auth/enter-otp`);
    }
    return () => {
      dispatch(setError({ isError: false, error: "" }));
    };
  }, [error, isLoading, user, router, dispatch]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="flex lg:h-[100vh]">
      {/* this is left side div  */}
      <LeftSideAuthComponent />

      {/* this is form and other staff  */}
      <div className="w-full lg:w-[58%] h-full px-4 lg:px-0 overflow-auto flex items-center justify-center ">
        <div className="max-w-lg mx-auto py-8 mt-10 lg:py-20 2xl:py-36">
          <h2 className="text-2xl lg:text-4xl font-bold text-textBlack pb-1 lg:pb-2">
            Welcome to Acctbazaar 👋🏾
          </h2>
          <p className="text-[#645D5D] text-xs lg:text-sm">
            Already have an account?{" "}
            <span className="text-primary font-medium">
              <Link href="/auth/sign-in">Login</Link>
            </span>
          </p>

          <form
            className="w-full md:w-[500px] 2xl:w-[560px] py-4 2xl:py-5 space-y-3 lg:space-y-4 2xl:space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <AppFormInput
              name="name"
              required={true}
              register={register}
              type="text"
              label="Full Name"
              placeholder="Type your full name"
              error={errors.name}
            />

            <AppFormInput
              name="email"
              required={true}
              register={register}
              type="email"
              label="Email address"
              placeholder="Type your Email address"
              error={errors.email}
            />

            <Controller
              name="phoneNumber"
              rules={{
                required: true,
              }}
              control={control}
              render={({ field: { name, onBlur, onChange, ref, value } }) => (
                <PhoneInput
                  value={value}
                  // enableAreaCodes={true}
                  specialLabel={""}
                  inputClass="h-11 2xl:h-12 !w-full focus:!border-2 focus-visible:!ring-0 focus:!outline-none focus:!border-primary hover:!border-[#D0D2D5]"
                  country={"ng"}
                  placeholder="Phone Number"
                  inputProps={{
                    name,
                    onBlur,
                    ref,
                    onChange,
                  }}
                />
              )}
            />

            {/* <FormInputNumber name="phone"/> */}
            {errors.phoneNumber && (
              <span className="text-xs tracking-wide text-red">
                Phone number field is required
              </span>
            )}

            <div>
              <AppFormInput
                name="password"
                required={true}
                register={register}
                type="password"
                label="Password"
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

            <div className="flex flex-col col-span-full">
              <div className=" contact-input-label   flex items-center">
                <input
                  {...register("accept", {
                    required: true,
                  })}
                  required
                  type="checkbox"
                  className="mr-[8px] w-[20px] h-[20px] cursor-pointer"
                />

                <div className="text-xs 2xl:text-sm text-textGrey">
                  By clicking on this, I give consent to
                  <Link
                    href="/terms-and-condition"
                    className="text-blue-500 ml-1"
                  >
                    Acctbazaar Privacy Policy
                  </Link>
                  and
                  <Link
                    href="/terms-and-condition"
                    className="text-blue-500 ml-1"
                  >
                    Terms of Use
                  </Link>
                </div>
              </div>
              {errors.accept && (
                <span className="text-xs mt-2 tracking-wide text-red">
                  Must accept our privacy policy
                </span>
              )}
            </div>
            {isLoading ? (
              <AppSmallLoading></AppSmallLoading>
            ) : (
              <button type="submit" className="appBtn mt-4 w-full">
                Sign up
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

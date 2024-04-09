import Loading from "@/components/ui/Loading";
import Logo from "@/components/ui/Logo";
import UserCreateOptions from "@/components/UserCreateOptions/UserCreateOptions";
import HomeLayout from "@/layout/HomeLayout";
import { createUser, setError } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { UserRole } from "@/types/common";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
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

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, user, error } = useAppSelector((state) => state.user);

  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Perform form submission logic here
    // e.g., send form data to server, perform validation, etc.
    if (data.password.length < 8) {
      toast.error("minimum password value is 8");
      return;
    }
    if (data.confirmPassword !== data.password) {
      toast.error(`Password does't match`);
      return;
    }

    const { confirmPassword, accept, ...rest } = data;
    // dispatch(createUser({ ...rest, role: UserRole.User }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    } else if (!isLoading && user?.email) {
      router.push(`/verify?toEmail=${user.email}`);
    }
    return () => {
      dispatch(setError({ isError: false, error: "" }));
    };
  }, [error, isLoading, user, router, dispatch]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <HomeLayout>
      <div className="flex items-center md:pt-10 justify-center my-20 px-4">
        <div className="md:px-8 px-3 py-6 mt-4 text-left bg-white shadow-lg">
          <div className="flex justify-center mb-4">
            <Logo small={true} />
          </div>
          <h3 className="text-2xl font-bold text-center">
            Create Your Account
          </h3>
          <UserCreateOptions defaultValue={true}></UserCreateOptions>
          <form
            className="w-ful md:w-[500px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mt-4">
              <div>
                <label className="block" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  {...register("name", { required: true })}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {errors.name && (
                  <span className="text-xs tracking-wide text-red-600">
                    Name field is required
                  </span>
                )}
              </div>
              <div className="mt-4">
                <label className="block" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {errors.email && (
                  <span className="text-xs tracking-wide text-red-600">
                    Email field is required
                  </span>
                )}
              </div>
              <div className="my-4">
                <label className="block mb-2" htmlFor="email">
                  Phone Number
                </label>

                <Controller
                  name="phoneNumber"
                  rules={{
                    required: true,
                  }}
                  control={control}
                  render={({
                    field: { name, onBlur, onChange, ref, value },
                  }) => (
                    <PhoneInput
                      value={value}
                      // enableAreaCodes={true}
                      specialLabel={""}
                      inputClass="h-[25px] !w-full"
                      country={"ng"}
                      inputProps={{
                        name,
                        onBlur,
                        ref,
                        onChange,
                      }}
                    />
                  )}
                />

                {errors.phoneNumber && (
                  <span className="text-xs tracking-wide text-red-600">
                    Phone number field is required
                  </span>
                )}
              </div>
              <div className="mt-4">
                <label className="block">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {errors.password && (
                  <span className="text-xs tracking-wide text-red-600">
                    Password field is required
                  </span>
                )}
              </div>
              <div className="mt-4">
                <label className="block">Password</label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", { required: true })}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {errors.confirmPassword && (
                  <span className="text-xs tracking-wide text-red-600">
                    Confirm password field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col col-span-full mt-2 ">
                <div className=" contact-input-label   flex items-center">
                  <input
                    {...register("accept", {
                      required: true,
                    })}
                    required
                    type="checkbox"
                    className="mr-[8px] w-[20px] h-[20px]"
                  />

                  <div>
                    Please read our terms and condition
                    <Link
                      href="/terms-and-condition"
                      className="text-blue-500 ml-1"
                    >
                      privacy policy
                    </Link>
                  </div>
                  {errors.accept && (
                    <span className="text-xs tracking-wide text-red-600">
                      Must accept our privacy policy
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <button
                  type="submit"
                  className="px-6 py-2 mt-4 text-white bg-orange-600 rounded-lg hover:bg-orange-700"
                >
                  Sign Up
                </button>
                <Link
                  href="/signIn"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Already have an account?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default SignUp;

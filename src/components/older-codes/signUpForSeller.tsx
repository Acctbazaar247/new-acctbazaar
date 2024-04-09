import Loading from "@/components/ui/Loading";
import Logo from "@/components/ui/Logo";
import PaySelection from "@/components/PaySelection/PaySelection";
import UserCreateOptions from "@/components/UserCreateOptions/UserCreateOptions";
import HomeLayout from "@/layout/HomeLayout";
import {
  createUser,
  setError,
  userLoggedOut,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { UserRole } from "@/types/common";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  useForm,
  SubmitHandler,
  ChangeHandler,
  Controller,
} from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import "react-phone-input-2/lib/material.css";
import config from "@/utils/config";
interface FormData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  confirmPassword: string;
  accept?: any;
}
const SignUpForSeller: React.FC = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
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
    }
    if (data.confirmPassword !== data.password) {
      toast.error("Password does'nt match");
      return;
    }
    if (!selectedOption) {
      toast.error("Please select a payment option");
      return;
    }

    const { confirmPassword, accept, ...rest } = data;

    // dispatch(
    //   createUser({
    //     ...rest,
    //     role: UserRole.Seller,
    //     paymentWithPaystack: selectedOption === "bank",
    //   })
    // )
    //   .unwrap()
    //   .then((res: any) => {
    //     if (res.user) {
    //       router.push(res.user.txId);
    //     } else if (res.error) {
    //       toast.error(res.message);
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error(err);
    // });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    } else if (!isLoading && user?.email) {
      // router.push(`/verify?toEmail=${user.email}`);
    }
    return () => {
      dispatch(setError({ isError: false, error: "" }));
    };
  }, [error, isLoading, user, router, dispatch]);

  useEffect(() => {
    if (user?.role === UserRole.Seller) {
      if (user.isApprovedForSeller === false) {
        dispatch(userLoggedOut());
      }
    }
  }, [user, dispatch]);
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <HomeLayout>
      <div className="flex items-center md:pt-10 justify-center  ">
        <div className="md:px-8 px-3 py-6 mt-4 text-left bg-white shadow-lg">
          <div className="flex justify-center mb-4">
            <Logo small={true} />
          </div>
          <h3 className="text-2xl font-bold text-center">
            Create Merchant Account
          </h3>
          <div className=" "></div>
          <UserCreateOptions defaultValue={false}></UserCreateOptions>
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
              <div className="my-2">
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
                      enableAreaCodeStretch
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
              <div className="my-4">
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
              <div className="my-4">
                <label className="block">Confirm password</label>
                <input
                  type="confirmPassword"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: true,
                  })}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {errors.password && (
                  <span className="text-xs tracking-wide text-red-600">
                    Password field is required
                  </span>
                )}
              </div>
              <div className="my-4">
                <p className="text-sm">
                  <span className="font-bold text-lg block mb-4">
                    What is the store responsible for?
                  </span>
                  <ol className="list-decimal pl-5">
                    <li className="mb-2">
                      Automatic worldwide sale of your accounts at your price.
                    </li>
                    <li className="mb-2">
                      We extensively promote the store and products through
                      search engines, contextual ads, forums, etc. Monthly, we
                      invest thousands of dollars in advertising.
                    </li>
                    <li className="mb-2">
                      Engaging with customers, addressing issues. Replacements
                      and refunds account for just 0.5% of total sales.
                    </li>
                    <li className="mb-2">
                      Payment & Payout: We accept card, bank, crypto payment and
                      also payout in both Naira via bank and USD through crypto
                      with zero interest.
                    </li>
                  </ol>
                </p>
              </div>

              <PaySelection
                onChange={(value) => setSelectedOption(value)}
                description={`A one-time payment of $${config.sellerPay} is required`}
              ></PaySelection>
              <div className="flex flex-col col-span-full mt-4 ">
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
              <div className="flex pt-3 items-baseline justify-between">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-55 transition-all py-2 mt-4 text-white bg-orange-600 rounded-lg hover:opacity-50"
                >
                  Complete request
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

export default SignUpForSeller;

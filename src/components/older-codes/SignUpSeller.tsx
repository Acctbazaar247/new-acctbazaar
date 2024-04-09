import FormInputNumber from "@/components/Forms/FormInputNumber";
import AppFormInput from "@/components/ui/AppFormInput";
import Link from "next/link";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  accept?: any;
}

const SignUpSeller = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };
  return (
    <div className="flex lg:h-[100vh]">
      {/* this is left side div  */}
      <div className="hidden lg:block lg:w-[42%] p-3 2xl:p-5">
        <div className="relative bg-textBlack h-full w-full rounded-2xl lg:rounded-3xl">
          <img
            src="/assets/auth/Rectangle.png"
            alt="left side "
            className="absolute top-0 left-0 h-full w-full rounded-2xl lg:rounded-3xl"
          />
          <img
            src="/assets/auth/dots-dots.png"
            alt="left side "
            className="absolute top-0 left-0 h-full w-full rounded-2xl lg:rounded-3xl"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between rounded-2xl lg:rounded-3xl p-12 2xl:p-14">
            <Link href={"/"} className="flex items-center">
              <img
                src="/assets/logo.PNG"
                alt=""
                className="size-10 2xl:size-11"
              />
              <h2 className="text-white text-xl 2xl:text-2xl font-medium">
                cctbazaar
              </h2>
            </Link>
            <div className="">
              <h1 className="font-bold text-4xl 2xl:text-5xl text-white mr-10">
                Connect. Trade. Transform Your Influence
              </h1>
              <p className="pt-4 2xl:pt-8 text-[#F5F5F5] 2xl:text-lg">
                Empower your social journey by discovering and trading social
                media accounts on a platform that values integrity and fosters
                ethical engagement. Your next digital adventure starts here
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* this is form and other staff  */}
      <div className="w-full lg:w-[58%] h-full px-4 lg:px-0 overflow-auto flex items-center justify-center ">
        <div className="max-w-lg mx-auto py-8 mt-10 lg:py-20 2xl:py-36">
          <h2 className="text-2xl lg:text-4xl font-bold text-textBlack pb-1 lg:pb-2">
            Welcome to Acctbazaar 👋🏾
          </h2>
          <p className="text-[#645D5D] text-sm">
            Already have an account?{" "}
            <span className="text-primary font-medium">
              <Link href="/signIn">Login</Link>
            </span>
          </p>

          <form
            className="w-full md:w-[500px] 2xl:w-[560px] py-4 2xl:py-5 space-y-2 lg:space-y-4 2xl:space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <AppFormInput
              name="name"
              required={true}
              register={register}
              type="text"
              label="Full Name"
              placeholder="Type your full name"
            />
            {errors.name && (
              <span className="text-xs tracking-wide text-red-600">
                Full Name field is required
              </span>
            )}

            <AppFormInput
              name="email"
              required={true}
              register={register}
              type="email"
              label="Email address"
              placeholder="Type your Email address"
            />
            {errors.email && (
              <span className="text-xs tracking-wide text-red-600">
                Email address field is required
              </span>
            )}

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
                  inputClass="h-[25px] !w-full"
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
              <span className="text-xs tracking-wide text-red-600">
                Phone number field is required
              </span>
            )}

            <div>
              <AppFormInput
                name="password"
                required={true}
                // isPassword={true}
                register={register}
                type="text"
                label="Password"
                placeholder="Type your Password"
              />
              {errors.password && (
                <span className="text-xs tracking-wide text-red-600">
                  Password field is required
                </span>
              )}
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
              //   isPassword={true}
              register={register}
              type="text"
              label="Confirm password"
              placeholder="Type your Confirm password"
            />
            {errors.confirmPassword && (
              <span className="text-xs tracking-wide text-red-600">
                Confirm password field is required
              </span>
            )}

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
                <span className="text-xs mt-2 tracking-wide text-red-600">
                  Must accept our privacy policy
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-6 py-2 2xl:py-3 font-medium text-white bg-primary rounded-lg hover:bg-primary/90"
            >
              Get started
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpSeller;

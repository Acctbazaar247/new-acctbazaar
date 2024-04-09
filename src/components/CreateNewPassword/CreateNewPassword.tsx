import LeftSideAuthComponent from "@/components/auth/LeftSideAuthComponent";
import AppFormInput from "@/components/ui/AppFormInput";
import { useChangePasswordMutation } from "@/redux/features/auth/authSellerApi";
import { ResponseSuccessType } from "@/types/common";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface FormData {
  password: string;
  confirmPassword: string;
}
type Props = {
  otp: string;
  email: string;
};
const CreateNewPassword: React.FC<Props> = ({ otp, email }) => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    // console.log(data);
    if (data.password.length < 8) {
      toast.error("Minimum password length is 8");
      return;
    }
    if (data.confirmPassword !== data.confirmPassword) {
      toast.error("password doesn't match");
      return;
    }
    changePassword({
      password: data.password,
      otp: parseInt(otp),
      email,
    })
      .unwrap()
      .then((res: ResponseSuccessType) => {
        if (!res.success) {
          toast.error(res.message || "Something went wrong");
        } else {
          toast.success("Password successfully changed");
          router.push("/auth/sign-in");
        }
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err?.data?.message || "Something went wrong");
      });
  };
  return (
    <div className="flex lg:h-[100vh]">
      {/* this is left side div  */}
      <LeftSideAuthComponent />
      {/* this is form and other staff  */}
      <div className="w-full lg:w-[58%] h-screen lg:h-full px-4 lg:px-0 overflow-auto flex items-center justify-center ">
        <div className="w-full lg:max-w-lg mx-auto py-8 mt-10 lg:py-20 2xl:py-36">
          <h2 className="text-2xl lg:text-4xl font-bold text-textBlack pb-1 lg:pb-2">
            Create new password
          </h2>
          <p className="text-[#645D5D] text-xs lg:text-sm">
            Create your new password to get back into your account
          </p>

          <form
            className="w-full md:w-[500px] 2xl:w-[560px] py-4 2xl:py-5 space-y-3 lg:space-y-4 2xl:space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <AppFormInput
                name="password"
                required={true}
                register={register}
                type="text"
                label="Password"
                placeholder="Type your Password"
                error={errors.password}
              />
              <div className="text-textBlack ml-5 text-xs mt-2 space-y-1">
                <p className="list-item">Minimum length of 8-30 characters</p>
              </div>
            </div>

            <AppFormInput
              name="confirmPassword"
              required={true}
              register={register}
              type="text"
              label="Confirm password"
              placeholder="Type your Confirm password"
              error={errors.confirmPassword}
            />
            <div className="">
              <button
                disabled={isLoading}
                type="submit"
                className="appBtn mt-4 w-full"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;

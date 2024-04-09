import Loading from "@/components/ui/Loading";
import Logo from "@/components/ui/Logo";
import HomeLayout from "@/layout/HomeLayout";
import {
  loginUser,
  setError,
  setLoading,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import config from "@/utils/config";
import { Modal } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
interface FormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotEmailLoading, setForgotEmailLoading] = useState(false);

  const { isLoading, user, error } = useAppSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Perform form submission logic here
    // e.g., send form data to server, perform validation, etc.
    if (data.password.length < 8) {
      toast.error("minimum password value is 8");
    } else {
      dispatch(loginUser(data));
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    } else if (!isLoading && user?.email) {
      if (router.query && router?.query?.from) {
        router.push(router.query.from as string);
      } else {
        router.push(router.locale || "/");
      }
    }
    return () => {
      dispatch(setError({ isError: false, error: "" }));
    };
  }, [error, isLoading, user, router, dispatch]);
  const handleSendTokenRequest = () => {
    setForgotEmailLoading(true);
    axios
      .post(`${config.serverUrl}/auth/send-forgot-email/${forgotEmail}`)
      .then((res) => {
        if (res.data?.success) {
          toast.success(res?.data?.message);
          setIsModalOpen(false);
          setForgotEmail("");
        }
      })
      .catch((res) => {
        (res);
        toast.error(res?.response?.data?.message || "something went wrong");
      })
      .finally(() => {
        setForgotEmailLoading(false);
      });
  };
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <HomeLayout>
      <div className="flex items-center w-full justify-center py-20  md:mt-[50px]">
        <div className="md:px-8 px-4 py-6  text-left bg-white shadow-lg">
          <div className="flex justify-center mb-4">
            <Logo small={true}></Logo>
          </div>
          <h3 className="text-2xl font-bold text-center">
            Login to your account
          </h3>
          <form
            className="w-full md:w-[500px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mt-4">
              <div>
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
              <div className="mt-4">
                <label className="block">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div className="flex items-baseline justify-between">
                <button
                  type="submit"
                  className="px-6 py-2 mt-4 text-white bg-orange-600 rounded-lg hover:bg-blue-900"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={showModal}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password
                </button>
              </div>
              <div>
                <Link
                  href="/signUp"
                  className="mt-4 text-sm font-semibold hover:underline w-full inline-block text-center"
                >
                  {`    Don't have an Account?`}
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Modal
        title="Send Forgot Password Token"
        open={isModalOpen}
        onOk={handleSendTokenRequest}
        onCancel={handleCancel}
        confirmLoading={forgotEmailLoading}
        okButtonProps={{
          disabled: forgotEmail.includes("@") ? false : true,
          className:
            "bg-orange-500 hover:!bg-orange-600 disabled:bg-gray-300 disabled:hover:!bg-gray-300",
        }}
        okText="Send token"
      >
        <div>
          <label className="block" htmlFor="email">
            Enter your email
          </label>
          <input
            type="email"
            onChange={(e) => setForgotEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
      </Modal>
    </HomeLayout>
  );
};

export default SignIn;

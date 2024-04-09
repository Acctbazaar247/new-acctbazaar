"use client";
import Loading from "@/components/ui/Loading";
import HomeLayout from "@/layout/HomeLayout";
import { setLoading } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { IUser } from "@/types/common";
import config from "@/utils/config";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Props = {};
type FormData = {
  password: string;
  confirmPassword: string;
};

const ChangePassword = (props: Props) => {
  const query = useSearchParams();
  const router = useRouter();
  const token = query.get("token");
  const user = useAppSelector((state) => state.user.user);
  const [verifyInfo, setVerifiedInfo] = useState<{
    accessToken: string;
    user: IUser;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
    if (!verifyInfo?.accessToken || !verifyInfo.user) {
      toast.error("something went wrong try again after some time");
      return;
    }
    setIsLoading(true);
    fetch(`${config.serverUrl}/users/${verifyInfo?.user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: verifyInfo?.accessToken || "",
      },
      body: JSON.stringify({ password: data.password }),
    })
      .then((result) => {
        return result.json();
      })
      .then((res) => {
        if (res.statusCode === 200) {
          toast.success("Successfully password changed ");
          //   setLoading(false)
          router.push("/signIn");
        }
      })
      .catch((err) => {
        toast.error(
          err.response.data.message || "Please try again after some time"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (token) {
      axios
        .post(`${config.serverUrl}/auth/verify-forgot-token/${token}`)
        .then((res) => {
          setIsLoading(false);
          setVerifiedInfo(res?.data?.data);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message || "something went wrong", {
            toastId: 1,
          });
          setIsLoading(false);
          router.push("/signIn");
        });
    }
  }, [token, router]);
  useEffect(() => {
    if (user?.id) {
      router.push("/");
    }
  }, [user, router]);
  if (isLoading || !verifyInfo?.user?.id) {
    return (
      <HomeLayout>
        <Loading></Loading>
      </HomeLayout>
    );
  }
  return (
    <HomeLayout>
      <div className="flex justify-center">
        <form
          className="w-ful md:w-[500px] shadow-lg p-4 rounded-xl mt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-center font-bold md:text-lg pb-2">
            Change password
          </h2>
          <div className="mt-4">
            <div className="mt-4">
              <label className="block">New Password</label>
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
              <label className="block">Confirm Password</label>
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
            <div className="flex items-baseline justify-between">
              <button
                type="submit"
                className="px-6 py-2 mt-4 text-white bg-orange-600 rounded-lg hover:bg-orange-700"
              >
                Change password
              </button>
            </div>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
};

export default ChangePassword;

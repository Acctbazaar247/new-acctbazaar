import DashboardLayout from "@/layout/DashboardLayout";
import { IUser } from "@/types/common";
import React from "react";
import Loading from "../ui/Loading";
import useFormUploadImage from "../Forms/useFormUploadImage";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useEditUserMutation } from "@/redux/features/user/userApi";
import { toast } from "react-toastify";
import { userLoggedIn } from "@/redux/features/auth/authSlice";
import { Avatar, Input } from "antd";
import FormUploadImage from "../Forms/FormUploadImage";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import FormInputCheck from "../Forms/FormInputCheck";

type Props = {};

const ProfileInfo = (props: Props) => {
  const userInfo = useAppSelector((state) => state.user);
  const [editUser, { isLoading: isEditLoading }] = useEditUserMutation();
  const dispatch = useAppDispatch();
  const user = userInfo.user;

  const {
    handleChange,
    loading: imageUploadLoading,
    url,
  } = useFormUploadImage();

  if (!user) {
    return (
      <DashboardLayout>
        <Loading></Loading>
      </DashboardLayout>
    );
  }
  const { id, name, email, profileImg, shouldSendEmail } = user;
  const onSubmit = (data: any) => {
    if (imageUploadLoading) {
      toast.error("Please wait for image upload");
      return;
    }
    let info: Pick<IUser, "id" | "name" | "profileImg" | "shouldSendEmail"> = {
      id,
      name: data.name,
      profileImg: profileImg,
      shouldSendEmail: data.shouldSendEmail,
    };
    if (url) {
      info.profileImg = url;
    }
    editUser(info)
      .unwrap()
      .then((res) => {
        if (res.error) {
          toast.error("something went wrong");
        } else {
          dispatch(
            userLoggedIn({
              accessToken: userInfo.accessToken,
              user: res.data,
            })
          );
          toast.success("success");
        }
      })
      .catch(() => {
        toast.error("something went wrong");
      });
  };
  return (
    <div>
      <div>
        <div>
          <Form
            submitHandler={onSubmit}
            defaultValues={{
              name,
              email,
            }}
          >
            <div className="flex gap-3">
              <div className="border-r-2 pr-5 ">
                {user.profileImg || url ? (
                  <Avatar
                    className="w-[120px] h-[120px] "
                    src={url || user?.profileImg}
                    alt=""
                  />
                ) : (
                  <></>
                )}
              </div>
              <div>
                {/* <FormUploadImage
                  loading={imageUploadLoading}
                  handleChange={handleChange}
                  imgUrl={url}
                ></FormUploadImage> */}
              </div>
            </div>
            <h4 className="mt-10 font-bold text-xl">
              Change Profile Information
            </h4>
            <div className="grid-cols-1 md:grid-cols-2 mt-10 grid gap-5">
              <div>
                <FormInput
                  name="name"
                  required={true}
                  placeholder="name"
                ></FormInput>
              </div>
              <div>
                <Input
                  type="text"
                  disabled={true}
                  placeholder="email"
                  value={email}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <FormInputCheck
                defaultChecked={Boolean(shouldSendEmail)}
                name="shouldSendEmail"
                id=""
              />
              <p className="font-bold ">Email me when new product listed</p>
            </div>
            <div className="flex justify-end mt-5">
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                Save Changes
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;

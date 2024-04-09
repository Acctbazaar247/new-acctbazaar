import React from "react";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import { toast } from "react-toastify";
import DashboardLayout from "@/layout/DashboardLayout";
import Loading from "../ui/Loading";
import useFormUploadImage from "../Forms/useFormUploadImage";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useEditUserMutation } from "@/redux/features/user/userApi";

type Props = {};

const ChangePassword = (props: Props): any => {
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
      <>
        <Loading></Loading>
      </>
    );
  }
  const { id, name, email, profileImg } = user;

  const onSubmit = (data: any) => {
    if (data.password !== data.passwordConfirm) {
      toast.error("Password doesn't match!");
      return;
    }

    editUser({ password: data.password, id: user.id })
      .unwrap()
      .then((res) => {
        if (res.error) {
          toast.error("something went wrong");
        } else {
          toast.success("success");
        }
      })
      .catch(() => {
        toast.error("something went wrong");
      });
  };
  return (
    <div>
      <div className="max-w-[500px] mx-auto">
        <h1 className="text-center font-bold text-xl pb-5">
          Change your password
        </h1>
        <Form submitHandler={onSubmit}>
          <FormInput
            name="password"
            type="password"
            label="Enter new password"
            required={true}
            placeholder="Enter new password"
          ></FormInput>
          <div className="mt-5">
            <FormInput
              name="passwordConfirm"
              required={true}
              type="password"
              label="Confirm password"
              placeholder="Confirm password"
            ></FormInput>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="mt-5 px-5 rounded py-2 bg-blue-500 text-white "
            >
              Save
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;

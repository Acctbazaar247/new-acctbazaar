import { useEditAccountMutation } from "@/redux/features/account/accountApi";
import {
  AccountCategory,
  EApprovedForSale,
  IAccount,
  UserRole,
} from "@/types/common";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Form from "./Form";
import FormInput from "./FormInput";
import FormInputNumber from "./FormInputNumber";
import FormSelectField from "./FormSelectField";
import { Button } from "antd";
import FormTextArea from "./FormTextArea";
import { optionCreator } from "@/utils";
import { useAppSelector } from "@/redux/hook";
import ErrorCompo from "../ui/AppErrorComponent";
import hasScientificNotation from "@/utils/hasScientificNotation";
import Loading from "../ui/Loading";
import { MdErrorOutline } from "react-icons/md";

type Props = { data: IAccount };

const EditServiceForm = ({ data }: Props) => {
  const [editService, { isLoading, isError, isSuccess, error }] =
    useEditAccountMutation();
  const user = useAppSelector((state) => state.user.user);

  const handleSubmit = async ({
    username,
    ownById,
    isSold,
    password,
    createdAt,
    updatedAt,
    approvedForSale,
    ...rest
  }: any) => {
    if (hasScientificNotation(rest.price)) {
      toast.error("price is not valid");
      return;
    } else {
      editService({
        ...rest,
        id: data.id,
        username,
        password,
        approvedForSale: EApprovedForSale.pending,
      })
        .unwrap()
        .then((res: any) => {
          if (res.error) {
            toast.error("something went wrong");
          } else {
            toast.success("success");
          }
        })
        .catch((res) => {
          toast.error("something went wrong" + " " + res?.data?.message);
        });
    }
  };

  const categoryOption = Object.values(AccountCategory).map(optionCreator);
  const notAdmin = user?.role !== UserRole.Admin;
  const notSuperAdmin = user?.role !== UserRole.SuperAdmin;
  if (notAdmin && notSuperAdmin) {
    if (user?.id !== data.ownById) {
      return <ErrorCompo error="You do not own this account"></ErrorCompo>;
    }
  }

  if (isLoading) {
    return <Loading></Loading>;
  }
  const isStatusSuccess = data.approvedForSale === EApprovedForSale.approved;
  return (
    <div className="pb-10">
      <div>
        {isStatusSuccess ? (
          <div className="p-2 rounded w-full md:w-1/2 mb-2 bg-[#FFFAE6] mt-2 ">
            <span className="flex gap-2 items-center    text-[#A77207] ">
              <MdErrorOutline></MdErrorOutline> Sorry you can not update active
              account
            </span>{" "}
          </div>
        ) : null}
      </div>
      <Form
        submitHandler={handleSubmit}
        defaultValues={{
          ...data,
          price: hasScientificNotation(data.price) ? 0 : data.price,
        }}
      >
        <div className="grid gap-3  grid-cols-1 xl:grid-cols-2 ">
          <div>
            <FormInput
              disabled={isStatusSuccess}
              label="Name"
              name="name"
              required={true}
            />
          </div>
          <div>
            <FormInputNumber
              label="Price"
              name="price"
              required={true}
              disabled={isStatusSuccess}
              validation={{ max: 4000 }}
            ></FormInputNumber>
          </div>
          <div>
            <FormInput
              label="Username/Email of Account"
              name="username"
              required={true}
              disabled={isStatusSuccess}
            />
          </div>
          <div>
            <FormInput
              label="Password of Account"
              name="password"
              required={true}
              disabled={isStatusSuccess}
            />
          </div>
          <div className="xl:col-span-2">
            <FormInput
              label="Preview"
              type="url"
              placeholder="Add and preview link"
              name="preview"
              disabled={isStatusSuccess}
            />
          </div>
          <div className="xl:col-span-2">
            <FormSelectField
              label="Select category"
              name="category"
              required={true}
              disabled={isStatusSuccess}
              options={categoryOption}
            ></FormSelectField>
          </div>
          <div className="xl:col-span-2">
            <FormTextArea
              disabled={isStatusSuccess}
              label="Description"
              name="description"
            />
          </div>

          <div className="xl:col-span-2">
            <h2 className="text-xl  mt-2">Additional Info</h2>
          </div>
          <div>
            <FormInput
              disabled={isStatusSuccess}
              label="Additional Email"
              name="additionalEmail"
            />
          </div>
          <div>
            <FormInput
              disabled={isStatusSuccess}
              label="Additional password"
              name="additionalPassword"
            />
          </div>
          <div>
            <FormInput
              label="Additional Information"
              name="additionalDescription"
              disabled={isStatusSuccess}
            />
          </div>
        </div>

        <Button danger disabled={isLoading} htmlType="submit" className="mt-3">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default EditServiceForm;

import { useEditAccountMutation } from "@/redux/features/account/accountApi";
import { AccountCategory, IAccount, UserRole } from "@/types/common";
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
      editService({ ...rest, id: data.id })
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
  return (
    <div>
      <Form
        submitHandler={handleSubmit}
        defaultValues={{
          ...data,
          price: hasScientificNotation(data.price) ? 0 : data.price,
        }}
      >
        <div className="grid gap-3  grid-cols-1 md:grid-cols-2 ">
          <div>
            <FormInput label="Name" name="name" required={true} />
          </div>
          <div>
            <FormInputNumber
              label="Price"
              name="price"
              required={true}
              validation={{ max: 4000 }}
            ></FormInputNumber>
          </div>
          <div>
            <FormInput
              disabled={true}
              label="Username/Email of Account"
              name="username"
              required={true}
            />
          </div>
          <div>
            <FormInput
              label="Password of Account"
              disabled={true}
              name="password"
              required={true}
            />
          </div>
          <div className="col-span-2">
            <FormInput
              label="Preview"
              placeholder="Add and preview link"
              name="preview"
            />
          </div>
          <div className="col-span-2">
            <FormSelectField
              label="Select category"
              name="category"
              required={true}
              options={categoryOption}
            ></FormSelectField>
          </div>
          <div className="col-span-2">
            <FormTextArea label="Description" name="description" />
          </div>

          <div className="col-span-2">
            <h2 className="text-xl  mt-2">Additional Info</h2>
          </div>
          <div>
            <FormInput
              disabled={true}
              label="Additional Email"
              name="additionalEmail"
            />
          </div>
          <div>
            <FormInput
              label="Additional password"
              disabled={true}
              name="additionalPassword"
            />
          </div>
          <div>
            <FormInput
              label="Additional Information"
              disabled={true}
              name="additionalDescription"
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

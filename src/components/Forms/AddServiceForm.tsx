import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import FormInput from "./FormInput";
import FormInputNumber from "./FormInputNumber";
import FormSelectField from "./FormSelectField";
import FormTextArea from "./FormTextArea";
import Form from "./Form";
import { Avatar, Button } from "antd";
import { optionCreator } from "@/utils";
import FormUploadImage from "./FormUploadImage";
import useFormUploadImage from "./useFormUploadImage";
import { toast } from "react-toastify";
import { AccountCategory } from "@/types/common";
import Swal from "sweetalert2";
import { ACCOUNT_CATEGORIES } from "@/shared";

type Props = {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  defaultValues?: any;
};

const AddServiceForm = ({ onSubmit, isLoading, defaultValues }: Props) => {
  const [categoryOption, setCategoryOption] = useState(
    ACCOUNT_CATEGORIES.map((single) => ({
      value: single.value,
      label: (
        <div className="flex gap-2 items-center">
          <Avatar src={single.imageUrl}></Avatar>
          <span>{single.label}</span>
        </div>
      ),
    }))
  );

  const handleSubmit: SubmitHandler<any> = async (data) => {
    onSubmit(data);
    // Show success alert after form submission
  };

  return (
    <div>
      <div>
        <div className="mt-5">
          <Form submitHandler={handleSubmit} defaultValues={defaultValues}>
            <div className="grid gap-3  grid-cols-1 md:grid-cols-2 ">
              <div className="col-span-2">
                <FormSelectField
                  placeholder="Select category"
                  name="category"
                  required={true}
                  options={categoryOption}
                ></FormSelectField>
              </div>
              <div>
                <FormInput placeholder="Name" name="name" required={true} />
              </div>
              <div>
                <FormInputNumber
                  placeholder="Price"
                  name="price"
                  required={true}
                ></FormInputNumber>
              </div>
              <div>
                <FormInput
                  placeholder="Username/Email of Account"
                  name="username"
                  required={true}
                />
              </div>
              <div>
                <FormInput
                  placeholder="Password of Account"
                  name="password"
                  required={true}
                />
              </div>
              <div className="col-span-2">
                <FormInput
                  placeholder="Add preview link of Account (https://link.com)"
                  name="preview"
                  type="url"
                />
              </div>
              <div className="col-span-2">
                <FormTextArea
                  placeholder="Description"
                  required={true}
                  name="description"
                />
              </div>
              <div className="col-span-2">
                <h2>
                  Additional Information{" "}
                  <span className="text-sm">(Optional)</span>{" "}
                </h2>
              </div>
              <div>
                <FormInput
                  placeholder="Email"
                  type="email"
                  name="additionalEmail"
                ></FormInput>
              </div>
              <div>
                <FormInput
                  placeholder="Password"
                  type="text"
                  name="additionalPassword"
                ></FormInput>
              </div>
              <div className="col-span-2">
                <FormTextArea
                  placeholder="Additional Information"
                  name="additionalDescription"
                />
              </div>
            </div>

            <Button
              danger
              disabled={isLoading}
              htmlType="submit"
              className="mt-3"
            >
              Add
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddServiceForm;

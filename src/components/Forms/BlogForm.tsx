import React from "react";
import FormInput from "./FormInput";
import FormTextArea from "./FormTextArea";
import Form from "./Form";
import useFormUploadImage from "./useFormUploadImage";
import { toast } from "react-toastify";
import FormUploadImage from "./FormUploadImage";

type Props = {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  defaultValues?: any;
};

const BlogForm = ({ onSubmit, defaultValues, isLoading }: Props) => {
  const {
    handleChange,
    loading: imageUploadLoading,
    url,
    setUrl,
  } = useFormUploadImage(defaultValues?.thumbnails || undefined);
  const handleSubmit = (data: any) => {
    if (imageUploadLoading) {
      toast.error("please wait for img upload");
      return;
    }
    if (!url) {
      toast.error("Please select img");
      return;
    }
    onSubmit({ ...data, thumbnails: url });

    setUrl(null);
  };
  return (
    <div>
      <Form submitHandler={handleSubmit} defaultValues={defaultValues}>
        <div className="grid grid-cols-2 gap-2 mt-10">
          <div>
            <FormInput name="title" required={true} placeholder="Enter title" />
          </div>
          <div>
            {/* <FormUploadImage
              loading={imageUploadLoading}
              handleChange={handleChange}
              imgUrl={url}
              showImg={true}
            ></FormUploadImage> */}
          </div>
          <div className="col-span-2">
            <FormTextArea
              name="content"
              rows={5}
              required={true}
              placeholder="Contents"
            ></FormTextArea>
          </div>
        </div>
        <button
          disabled={isLoading}
          className="bg-blue-400 mt-5 px-4 py-2 rounded text-white"
        >
          Submit
        </button>
      </Form>
    </div>
  );
};

export default BlogForm;

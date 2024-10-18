import { useUploadImageMutation } from "@/redux/features/user/userApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CgFileAdd } from "react-icons/cg";
import { toast } from "react-toastify";

interface IKycImageUpload {
  name: string;
  control: Control<any>;
  required?: boolean;
  placeholder?: string;
}

const KycImageUpload = ({
  name,
  control,
  required,
  placeholder,
}: IKycImageUpload) => {
  const [uploadImage, { isLoading }] = useUploadImageMutation();
  const [image, setImage] = useState<string | undefined>("");

  const handleFileUpload = async (
    value: File,
    onChange: (value: string) => void
  ) => {
    const formData = new FormData();
    const maxSizeInBytes = 2 * 1024 * 1024;

    if (value?.size && value?.size > maxSizeInBytes) {
      return toast.error("Your file was more than 2 Megabyte!", { toastId: 1 });
    }

    formData.append("image", value);

    await uploadImage(formData)
      .unwrap()
      .then((res) => {
        toast.success("File upload successfully!", { toastId: 1 });
        setImage(res?.data?.url);
        onChange(res?.data?.url);
      })
      .catch((res) => {
        toast.error(res?.message || "Something went wrong", { toastId: 1 });
      });
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={image}
      rules={{
        required: required ? `Please upload your ${name} document` : undefined,
      }}
      render={({ field, fieldState }) => {
        field.value && setImage(field.value);
        return (
          <div className="">
            <input
              type="text"
              className="hidden"
              defaultValue={image}
              {...field}
            />
            <input
              type="file"
              id={name}
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files && e.target.files[0];
                if (file) {
                  handleFileUpload(file, field.onChange);
                }
              }}
            />

            <label
              htmlFor={name}
              className="cursor-pointer border border-borderColor rounded hover:bg-zinc/20 border-dashed flex items-center gap-1 justify-between"
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin text-primary text-xl text-center mx-auto my-3" />
              ) : (
                <>
                  {image === "" || image === undefined ? (
                    <div className="flex items-center justify-between p-3 w-full">
                      <h2 className="text-darkishGrey flex items-center gap-1 text-sm">
                        <CgFileAdd />
                        {placeholder}
                      </h2>
                      <p className="text-primary text-xs font-medium">
                        Select File
                      </p>
                    </div>
                  ) : (
                    <Image
                      width={600}
                      height={200}
                      src={image}
                      alt="identity image"
                      className="w-full rounded min-h-40 max-h-44 object-cover"
                    />
                  )}
                </>
              )}
            </label>

            <h2 className="text-darkishGrey pt-1 text-xs">
              JPEG, PNG, PDF. Max file size: 2mb
            </h2>
            {fieldState.error && (
              <p className="text-red text-xs">{fieldState.error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
};

export { KycImageUpload };

"use client";

import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { InputNumber } from "antd";
import { spawn } from "child_process";
import { useFormContext, Controller } from "react-hook-form";
interface IInput {
  name: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

const FormInputNumber = ({
  name,
  size = "large",
  value,
  id,
  placeholder,
  validation,
  label,
  required,
  className,
  disabled,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <>
      {label ? <label className="mb-2 inline-block">{label}</label> : null}
      <Controller
        control={control}
        name={name}
        rules={{
          required: required,
        }}
        render={({ field }) => (
          <InputNumber
            className={className || "w-full"}
            type={"number"}
            size={size}
            placeholder={placeholder}
            {...field}
            disabled={disabled}
            value={value ? value : field.value}
          />
        )}
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  );
};

export default FormInputNumber;

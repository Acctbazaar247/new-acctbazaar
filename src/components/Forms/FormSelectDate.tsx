import { DatePicker } from "antd";
import dayjs from "dayjs";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  defaultValue?: Date;
  required?: boolean;
};

const FormSelectDate = ({
  name,
  size = "large",
  value,
  id,
  placeholder,
  validation,
  label,
  defaultValue,
  required,
}: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        rules={{ required: required }}
        render={({ field }) => (
          <DatePicker
            className="w-full"
            size={size}
            placeholder={placeholder}
            {...field}
            value={value ? value : field.value}
          />
        )}
      />
    </>
  );
};

export default FormSelectDate;

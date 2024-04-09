"use client";

import { Select } from "antd";
import { useFormContext, Controller } from "react-hook-form";

export type SelectOptions = {
  label: string | any;
  value: string;
};

type SelectFieldProps = {
  options: SelectOptions[];
  name: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string | any;
  required?: boolean;
  className?: string;
  defaultValue?: SelectOptions;
  handleChange?: (el: string) => void;
};

const FormSelectField = ({
  name,
  size = "large",
  value,
  placeholder = "select",
  options,
  label,
  defaultValue,
  required,
  handleChange,
  className,
}: SelectFieldProps) => {
  const { control } = useFormContext();

  return (
    <>
      {label ? <label className="mb-2 inline-block">{label}</label> : null}
      <Controller
        control={control}
        name={name}
        rules={{ required: required }}
        defaultValue={defaultValue}
        render={({ field: { value: renderValue, onChange } }) => (
          <Select
            onChange={handleChange ? handleChange : onChange}
            size={size}
            popupClassName="capitalize"
            className={className ? className + `capitalize ` : "`capitalize `"}
            options={options}
            value={value ? value : renderValue}
            style={{ width: "100%" }}
            placeholder={placeholder}
          />
        )}
      />
    </>
  );
};

export default FormSelectField;

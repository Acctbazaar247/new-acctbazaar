import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { Checkbox, Input } from "antd";
import { spawn } from "child_process";
import { useFormContext, Controller } from "react-hook-form";
interface IInput {
  name: string;
  value?: boolean;
  defaultChecked?: boolean;
  id?: string;
  validation?: object;
  label?: string;
  disabled?: boolean;
  required?: boolean;
}

const FormInputCheck = ({
  name,
  value,
  id,
  validation,
  label,
  disabled,
  defaultChecked,
  required,
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
        rules={{ required: required }}
        render={({ field }) => (
          <Checkbox
            {...field}
            disabled={disabled}
            defaultChecked={defaultChecked}
            value={value ? value : field.value}
          />
        )}
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  );
};

export default FormInputCheck;

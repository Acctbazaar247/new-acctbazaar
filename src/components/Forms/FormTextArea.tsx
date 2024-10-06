import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TextAreaProps = {
  name: string;
  label?: string;
  rows?: number;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};

const FormTextArea = ({
  name,
  label,
  rows,
  value,
  required,
  placeholder,
  disabled,
}: TextAreaProps) => {
  const { control } = useFormContext();
  return (
    <div className={`flex flex-col  w-full`}>
      {label ? <label className="mb-2 inline-block">{label}</label> : null}
      <Controller
        name={name}
        rules={{ required: required }}
        control={control}
        render={({ field }) => (
          <Input.TextArea
            rows={rows}
            className="bg-transparent border-borderColor placeholder:text-darkishGrey"
            placeholder={placeholder}
            {...field}
            defaultValue={value}
            disabled={disabled}
          />
        )}
      />
    </div>
  );
};

export default FormTextArea;

import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Control, Controller } from "react-hook-form";

interface TAppDatePicker {
  control: Control<any>;
  name: string;
  placeholder?: string;
  label?: string;
  defaultValue?: string;
}

const AppFormDatePicker = ({
  control,
  name,
  label,
  placeholder
}: TAppDatePicker) => {
  return (
    <Controller
      control={control}
      //   defaultValue={}
      name={name}
      rules={
        {
          // required:tru
          // required: `${label} field is required`,
        }
      }
      render={({ field, fieldState }) => {
        console.log(field.value, dayjs(field.value).isValid(), "hi");
        return (
          <div className="text-textDark">
            <label
              className="md:pb-1 block text-black/80 text-sm lg:text-base"
              htmlFor={name}
            >
              {label}
            </label>

            <DatePicker
              size="large"
              className="w-full h-11"
              placeholder={placeholder}
              format="DD-MM-YYYY"
              rootClassName="my-date-picker"
              status={fieldState.error ? "error" : undefined}
              ref={field.ref}
              name={field.name}
              onBlur={field.onBlur}
              value={
                field.value
                  ? dayjs(field.value).isValid()
                    ? dayjs(field.value)
                    : null
                  : null
              }
              onChange={(date) => {
                field.onChange(date);
              }}
            />
            {fieldState.error && (
              <p className="text-sm text-red font-normal">
                {fieldState.error?.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default AppFormDatePicker;

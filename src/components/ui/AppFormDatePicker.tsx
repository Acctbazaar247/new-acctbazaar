import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Control, Controller } from "react-hook-form";
// import DatePicker from "react-date-picker";
// import "react-date-picker/dist/DatePicker.css";
// import "react-calendar/dist/Calendar.css";

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
  placeholder,
}: TAppDatePicker) => {
  return (
    <Controller
      control={control}
      //   defaultValue={}
      name={name}
      rules={
        {
          // required: `${label} field is required`,
        }
      }
      render={({ field, fieldState }) => {
        return (
          <div className="text-textDark">
            <label htmlFor={name}>{label}</label>
            {/* <DatePicker
              className="!w-full border !border-[#D0D2D5]  h-11"
              inputRef={field.ref}
              name={field.name}
              onBlur={field.onBlur}
              clearIcon={null}
              value={field.value ? field.value : null}
              onChange={(date) => {
                field.onChange(date);
              }}
            /> */}
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
                dayjs(field.value).isValid()
                  ? dayjs(field.value)
                  : dayjs(new Date())
              }
              onChange={(date, dateString) => {
                console.log(date);
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

import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

type TPhoneInput = {
  control: any;
  name: string;
  placeholder: string;
  label?: string;
  error?: any;
};

const AppPhoneInput = ({
  control,
  placeholder,
  name,
  label,
  error,
}: TPhoneInput) => {
  return (
    <div className="text-textDarkGrey">
      <label className="md:pb-1 block text-sm lg:text-base" htmlFor={name}>
        {label}
      </label>
      <Controller
        name={name}
        rules={{
          required: true,
        }}
        control={control}
        render={({ field: { name, onBlur, onChange, ref, value } }) => (
          <PhoneInput
            value={value}
            // enableAreaCodes={true}
            specialLabel={""}
            inputClass="h-11 !bg-transparent 2xl:h-12 !w-full focus:!border-2 focus-visible:!ring-0 focus:!outline-none focus:!border-primary hover:!border-borderColor"
            country={"ng"}
            autocompleteSearch={false}
            placeholder={placeholder || "Phone Number"}
            inputProps={{
              name,
              onBlur,
              ref,
              onChange,
            }}
          />
        )}
      />

      {/* <FormInputNumber name="phone"/> */}
      {error && (
        <span className="text-xs tracking-wide text-red">
          {label} field is required
        </span>
      )}
    </div>
  );
};

export default AppPhoneInput;

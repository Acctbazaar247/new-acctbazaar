import { ChangeEventHandler, ReactElement, useEffect } from "react";
import { IoSearch } from "react-icons/io5";

type TAppInputProps = {
  placeholder?: string;
  type: "text" | "number" | "password" | "url";
  icon?: ReactElement;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  error?: string;
  value: string | number;
};

const AppInput = ({
  type,
  placeholder,
  icon,
  className,
  onChange,
  error,
  value,
}: TAppInputProps) => {
  return (
    <>
      <div
        className={`w-full h-fit flex items-center gap-1 md:gap-2 text-sm md:text-base border  rounded md:rounded-md  2xl:rounded-lg px-2 py-1.5 md:px-4 md:py-1.5 lg:py-2 2xl:px-4 2xl:py-2.5 ${
          error ? "border-red" : "border-borderColor"
        } ${className}`}
      >
        {icon ? (
          <span className="text-lg text-textBlueGrey">{icon}</span>
        ) : (
          <IoSearch className="text-lg text-textBlueGrey" />
        )}

        <input
          value={value}
          onChange={onChange}
          className="focus-visible:outline-none placeholder:text-textBlueGrey  bg-inherit w-full"
          type={type}
          placeholder={placeholder}
        />
      </div>
      {error && <span className="text-xs tracking-wide text-red">{error}</span>}
    </>
  );
};

export default AppInput;

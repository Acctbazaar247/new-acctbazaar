import { UseFormRegister } from "react-hook-form";

type TAppFormTextareaProps = {
  label: string;
  placeholder?: string;
  name: string;
  required?: true | false;
  register: UseFormRegister<any>;
  error?: any;
  defaultValue?: string | number;
  readOnly?: boolean;
  rows?: number;
};

const AppFormTextarea = ({
  label,
  defaultValue,
  readOnly,
  error,
  placeholder,
  required,
  name,
  register,
  rows,
}: TAppFormTextareaProps) => {
  return (
    <>
      {readOnly ? (
        <div className="bg-borderLight rounded select-none border border-borderColor h-11 2xl:h-12 w-full flex items-center min-w-[200px] px-3 2xl:px-4 py-2.5 font-sans text-base 2xl:text-lg font-normal text-textBlack/50">
          {defaultValue}
        </div>
      ) : (
        <>
          <div className="relative float-label-input w-full min-w-[200px]">
            <textarea
              id="textarea"
              rows={rows || 5}
              {...register(name, { ...(required && { required: true }) })}
              // className="peer min-h-[140px] 2xl:min-h-[160px] resize-none overflow-auto w-full rounded border border-borderColor border-t-transparent bg-transparent px-3 2xl:px-4 py-2.5 font-sans text-base 2xl:text-lg font-normal text-textBlack outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-borderColor placeholder-shown:border-t-borderColor focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 caret-primary"
              className="block w-full bg-background focus:outline-none focus:shadow-outline border 2xl:border-[1.5px] border-borderColor rounded 2xl:rounded py-2 md:py-2.5 2xl:py-2.5 px-2 2xl:px-3 appearance-none leading-normal focus:border-primary"
              placeholder={""}
            />
            <label
              htmlFor="textarea"
              // className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 2xl:-top-1 flex h-full w-full select-none !overflow-visible truncate text-xs 2xl:text-base font-normal leading-tight text-textBlack transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl before:border-t before:border-l before:border-borderColor before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr after:border-t after:border-r after:border-borderColor after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-textBlack peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-xs 2xl:peer-focus:text-sm peer-focus:leading-tight peer-focus:text-primary peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-primary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
              className="absolute top-2 md:top-2.5 2xl:top-3 left-0 2xl:left-1 text-sm md:text-base text-textDarkGrey pointer-events-none transition duration-200 ease-in-out px-2 dark:bg-background"
            >
              {label}
            </label>
          </div>

          {error && (
            <span className="text-xs tracking-wide text-red">
              {label} field is required
            </span>
          )}
        </>
      )}
    </>
  );
};

export default AppFormTextarea;

import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type TAppButtonProps = {
  isLoading?: boolean;
  href?: string;
  type?: "button" | "submit" | "reset";
  label: string;
  variant?: "solid" | "outline" | "deleteOutline" | "deleteSolid";
  size?: "small" | "medium" | "default";
  onClick?: () => void;
  className?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  disabled?: boolean;
};

const AppButton = ({
  isLoading,
  onClick,
  label,
  href,
  variant = "solid",
  size = "default",
  className,
  type = "submit",
  target,
  disabled,
}: TAppButtonProps) => {
  let btnStyle = "appBtn";

  switch (variant) {
    case "solid":
      if (size === "small") {
        btnStyle = "appBtnSm";
      } else if (size === "medium") {
        btnStyle = "appBtnMd";
      } else {
        btnStyle = "appBtn";
      }
      break;

    case "outline":
      if (size === "small") {
        btnStyle = "appOutlineBtnSm";
      } else if (size === "medium") {
        btnStyle = "appOutlineBtnMd";
      } else {
        btnStyle = "appOutlineBtn";
      }
      break;

    case "deleteOutline":
      if (size === "small") {
        btnStyle = "appOutlineBtnSmDelete";
      } else {
        btnStyle = "appOutlineBtnDelete";
      }
      break;

    case "deleteSolid":
      if (size === "small") {
        btnStyle = "appBtnSmDelete";
      } else {
        btnStyle = "appBtnDelete";
      }
      break;

    default:
      btnStyle = "appBtn";
      break;
  }

  return (
    <>
      {href ? (
        <Link href={href} target={target}>
          <button
            disabled={disabled || isLoading}
            type="submit"
            className={btnStyle}
          >
            {label}
          </button>
        </Link>
      ) : isLoading ? (
        <button type="button" className={`${btnStyle} px-10`}>
          <AiOutlineLoading3Quarters className="animate-spin text-white text-xl" />
        </button>
      ) : (
        <button
          onClick={onClick}
          disabled={disabled || isLoading}
          type={type}
          className={`${btnStyle} ${className}`}
        >
          {label}
        </button>
      )}
    </>
  );
};

export default AppButton;

import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type TAppButtonProps = {
  isLoading?: boolean;
  href?: string;
  label: string;
  variant?: "solid" | "outline" | "deleteOutline" | "deleteSolid";
  size?: "small" | "medium" | "default";
  onClick?: () => void;
  className?: string;
};

const AppButton = ({
  isLoading,
  onClick,
  label,
  href,
  variant = "solid",
  size = "default",
  className,
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
        <Link href={href}>
          <button disabled={isLoading} type="submit" className={btnStyle}>
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
          disabled={isLoading}
          type="submit"
          className={`${btnStyle} ${className}`}
        >
          {label}
        </button>
      )}
    </>
  );
};

export default AppButton;

import { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

const AppAlert = () => {
  const [isShow, setIsShow] = useState(true);

  const message = process.env.NEXT_PUBLIC_ALERT_MESSAGE;

  return (
    <>
      {isShow && message && (
        <div className="bg-primary flex items-center gap-2 text-white rounded px-2 md:px-4 capitalize text-xs md:text-lg py-1.5 md:py-2">
          <FiAlertTriangle className="text-xl 2xl:text-2xl w-fit" /> {message}{" "}
          <RxCross2
            className="ml-auto cursor-pointer inline-block text-2xl"
            onClick={() => setIsShow(false)}
          />
        </div>
      )}
    </>
  );
};

export { AppAlert };

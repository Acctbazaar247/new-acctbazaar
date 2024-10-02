import { useState } from "react";
import { FiAlertTriangle, FiBell } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

const AppAlert = () => {
  const [isShow, setIsShow] = useState(true);

  const message = process.env.NEXT_PUBLIC_ALERT_MESSAGE;

  return (
    <>
      {isShow && message && (
        <div className="bg-primary flex font-bold items-center gap-2 text-white rounded px-2 md:px-4 text-xs md:text-lg py-1.5 md:py-2">
          <FiBell className="text-2xl font-bold xl:text-[30px] w-[40px]" />{" "}
          <span
            style={{ wordSpacing: "7px" }}
            className="uppercase text-center md:text-left font-bold"
          >
            {message}
          </span>
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

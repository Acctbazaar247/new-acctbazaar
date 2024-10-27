import { useState } from "react";
import { FiBell } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

const AppAlert = ({
  message,
  isShow,
  setIsShow,
}: {
  message: string | undefined;
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
}) => {
  return (
    <>
      {isShow && message && (
        <div className="absolute top-0 md:top-16 right-0 left-0 z-[999] bg-primary flex font-bold items-center gap-2 text-white rounded px-2 md:px-4 text-xs md:text-lg py-1.5 md:py-2 md:container">
          <FiBell className="text-xl md:text-2xl font-bold xl:text-[30px] w-[40px]" />{" "}
          <span
            style={{ wordSpacing: "7px" }}
            className="uppercase text-center w-full font-bold"
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

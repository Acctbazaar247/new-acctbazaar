import { ReactNode, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { motion } from "framer-motion";

type TAppDrawer = {
  button: ReactNode;
  children: ReactNode;
  title?: string;
  showExtraBottomButton?: boolean;
};

const AppDrawer = ({
  button,
  children,
  title,
  showExtraBottomButton,
}: TAppDrawer) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {button && <div onClick={() => setOpen(true)}>{button}</div>}
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: open ? 1 : 0, x: open ? 0 : 100 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`${
          open
            ? "md:hidden fixed bottom-0 top-0 right-0 left-0 min-h-[100dvh] z-[99999999] bg-transparent"
            : "hidden"
        }`}
      >
        <div className="bg-borderLight h-full p-4 mt-11">
          <div className="flex items-center text-center">
            <HiOutlineArrowLeft
              onClick={() => setOpen(false)}
              className="text-3xl font-bold p-1 rounded-full border text-textDarkGrey"
            />
            <h4 className="text-center w-full text-base text-textBlack font-semibold">
              {title}
            </h4>
          </div>
          <div className="mt-2 rounded bg-background h-full overflow-y-auto">
            {children}
            <div className="flex justify-center">
              {showExtraBottomButton ? (
                <button
                  onClick={() => setOpen(false)}
                  className="bg-primary text-sm px-4 py-2 rounded text-white"
                >
                  Show Accounts
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AppDrawer;

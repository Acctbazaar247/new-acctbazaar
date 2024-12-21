import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const FixedContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="fixed bottom-[5px] right-[100px]">
              <Link target="blank" href={"https://t.me/acctbazaar1"}>
                <Image
                  className="w-[30px]"
                  width={50}
                  height={50}
                  alt="contact us with telegram"
                  src={"/assets/telegram.png"}
                ></Image>
              </Link>
            </div>
            <div className="fixed bottom-[55px] right-[90px]">
              <Link href={"mailto:help@acctbazaar.com"}>
                <Image
                  className="w-[38px]"
                  width={50}
                  height={50}
                  alt="contact us through email"
                  src={"/assets/product/gmail.png"}
                ></Image>
              </Link>
            </div>
            <div className="fixed bottom-[95px] right-[40px]">
              <Link
                target="blank"
                href={"https://api.whatsapp.com/send/?phone=2347073823800"}
              >
                <Image
                  className="w-[35px]"
                  width={50}
                  height={50}
                  alt="contact us through email"
                  src={"/assets/whatsapp.png"}
                ></Image>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="size-[60px] flex justify-center items-center bg-orange-600 fixed right-[20px] bottom-[10px] rounded-full"
      >
        <FaPlus className="text-white text-xl"></FaPlus>
      </button>
    </div>
  );
};

export default FixedContactButton;

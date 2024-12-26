import Image from "next/image";
import Link from "next/link";
import React, { use, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { motion, AnimatePresence, easeIn } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

const FixedContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const location = usePathname();
  if (location === "/") {
    return null;
  }
  return (
    <div className="overflow-hidden hidden md:block">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ease: "easeInOut" }}
              className="fixed bottom-[5px] right-[100px]"
            >
              <Link target="blank" href={"https://t.me/acctbazaar1"}>
                <Image
                  className="w-[30px]"
                  width={50}
                  height={50}
                  alt="contact us with telegram"
                  src={"/assets/telegram.png"}
                ></Image>
              </Link>
            </motion.div>
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, ease: "easeInOut" }}
              className="fixed bottom-[55px] right-[90px]"
            >
              <Link href={"mailto:help@acctbazaar.com"}>
                <Image
                  className="w-[38px]"
                  width={50}
                  height={50}
                  alt="contact us through email"
                  src={"/assets/product/gmail.png"}
                ></Image>
              </Link>
            </motion.div>
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, ease: "easeInOut" }}
              className="fixed bottom-[95px] right-[40px]"
            >
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ rotate: 0 }}
        animate={{ rotate: isOpen ? 90 : 0 }}
        transition={{ ease: "easeInOut" }}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="size-[60px] flex justify-center items-center bg-orange-600 fixed right-[20px] bottom-[10px] rounded-full"
      >
        <FaPlus className="text-white text-2xl"></FaPlus>
      </motion.button>
    </div>
  );
};

export default FixedContactButton;

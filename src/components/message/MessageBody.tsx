import {
  useAddMessageMutation,
  useGetMessagesQuery,
  useUpdateSeenMessageMutation,
} from "@/redux/features/message/messageApi";
import { useAppSelector } from "@/redux/hook";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiPaperclip } from "react-icons/fi";
import { LuSendHorizonal } from "react-icons/lu";
import { MdAddReaction } from "react-icons/md";
import Loading from "../ui/Loading";
import dateFormat from "dateformat";
import { IMessage } from "@/types/common";
import { Popover } from "antd";
import appDateFormate from "@/utils/appDateFormate";

const transition = {
  type: "spring",
  stiffness: 200,
  mass: 0.2,
  damping: 20,
};

const variants = {
  initial: {
    opacity: 0,
    y: 300,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition,
  },
};

type props = {
  orderId: string;
};

const MessageBody: React.FC<props> = ({ orderId }) => {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading: isDataLoading } = useGetMessagesQuery(
    `orderId=${orderId}`
  );
  const { user } = useAppSelector((state) => state.user);
  const [inputText, setInputText] = useState("");
  const [addNewMessage, { isLoading }] = useAddMessageMutation();
  const [updateSeenMessage] = useUpdateSeenMessageMutation();
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
    //
    // console.log("before", "dfadf");
    if (data?.meta?.unSeenCount && !isLoading) {
      // console.log("after in");
      updateSeenMessage({ orderId: orderId });
    }
  }, [data, bodyRef, updateSeenMessage, orderId, isLoading]);
  const handleAddNewMessage = () => {
    if (user?.id) {
      if (inputText.length) {
        addNewMessage({ text: inputText, sendById: user.id, orderId });
        setInputText("");
      }
    }
  };
  if (isDataLoading || !data || !user?.id) {
    return <Loading></Loading>;
  }

  return (
    <>
      <div
        ref={bodyRef}
        className="p-4 2xl:p-5 min-h-[50dvh] md:min-h-[50dvh] max-h-[50dvh] md:max-h-[50dvh] w-full overflow-x-hidden overflow-y-auto"
      >
        {/* this is chats  */}
        <div className="p-1 mt-4 space-y-4">
          {data.data?.map((single: IMessage, index: number) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              variants={variants}
            >
              {single.sendById === user.id ? (
                <div className="flex flex-col items-end">
                  <Popover
                    content={
                      <div>
                        {dateFormat(
                          new Date(single.createdAt || new Date()),
                          appDateFormate
                        )}
                      </div>
                    }
                  >
                    <p className="relative messageMine mineLast">
                      {single?.text}
                    </p>
                  </Popover>
                  <p className="flex items-end bottom-1 text-[10px] text-[#667085]">
                    {single.createdAt ? "Delivered" : "Sending"}
                  </p>
                </div>
              ) : (
                <p className="relative message yoursLast">{single?.text}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="p-4 2xl:p-5 ">
        {/* this is send divs  */}
        <div className="bg-[#F6F6F6]   rounded-xl py-2.5 px-4 pr-[33px] relative">
          <input
            type="text"
            placeholder="Enter message"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddNewMessage();
              }
            }}
            className="w-full bg-inherit outline-none border-none"
          />
          <div className="flex  text-xl items-center justify-between py-1 absolute right-2 top-1/2 -translate-y-1/2">
            <div className="">
              {/* <FiPaperclip className="text-[#98A2B3] cursor-pointer" />
              <MdAddReaction className="text-[#98A2B3] cursor-pointer" /> */}
            </div>
            <button
              onClick={handleAddNewMessage}
              disabled={isLoading}
              className="disabled:opacity-45 opacity-100 transition-all"
            >
              <LuSendHorizonal className="text-[#344054] cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageBody;

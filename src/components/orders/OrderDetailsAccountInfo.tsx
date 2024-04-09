import { deleteAccountCredentials } from "@/redux/features/account/accountSlice";
import { useAppDispatch } from "@/redux/hook";
import { motion } from "framer-motion";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { SlArrowDown } from "react-icons/sl";

type TOrderDetailsAccountInfo = {
  isNotDeletable?: boolean;
  index: number;
  title?: string;
  account: {
    id: string;
    email: string;
    password: string;
    preview?: string;
    additionalEmail?: string;
    additionalPassword?: string;
    additionalDescription?: string;
  };
};

const OrderDetailsAccountInfo = ({
  index,
  account,
  isNotDeletable,
  title,
}: TOrderDetailsAccountInfo) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div className="rounded-lg border border-borderColor p-4">
      <div
        className={`flex items-center justify-between ${
          open && "border-b border-b-borderColor pb-3"
        }`}
      >
        <h4 className={`${!open && "text-textGrey"}`}>
          {title || `Account ${index + 1}`}
        </h4>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.5 }}
          className="cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <SlArrowDown />
        </motion.div>
      </div>

      {open ? (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden px-1 space-y-3.5 py-2 text-textBlack"
        >
          <div className="flex items-center justify-between text-sm">
            <p className="text-textGrey">Email</p>
            <p>{account?.email}</p>
          </div>
          <div className="flex items-center justify-between text-sm">
            <p className="text-textGrey">Password</p>
            <p>{account?.password}</p>
          </div>
          {account?.additionalEmail && (
            <div className="flex items-center justify-between text-sm">
              <p className="text-textGrey">2FA Email</p>
              <p>{account?.additionalEmail}</p>
            </div>
          )}
          {account?.additionalPassword && (
            <div className="flex items-center justify-between text-sm">
              <p className="text-textGrey">2FA password</p>
              <p>{account?.additionalPassword}</p>
            </div>
          )}
          {account?.additionalDescription && (
            <div className="space-y-1.5">
              <p className="text-textGrey">Additional Information</p>
              <p className="text-sm">{account?.additionalDescription}</p>
            </div>
          )}
          {/* <div className='space-y-1.5'>
                        <p className="text-textGrey">Images</p>
                        <div className='rounded-lg py-2 px-3 flex items-center gap-3'>
                            <Image src={'/assets/orders/upload.png'} width={32} height={32} alt="upload image" />
                            <div className=''>
                                <h4>Amazon gift card.png</h4>
                                <p className="text-xs text-textGrey">200 KB</p>
                            </div>
                        </div>
                    </div> */}
        </motion.div>
      ) : (
        <div className="pt-2 flex items-center justify-between ">
          <h4>{account?.email}</h4>
          {!isNotDeletable && (
            <AiOutlineDelete
              onClick={() => dispatch(deleteAccountCredentials(account?.id))}
              className="hover:text-red cursor-pointer text-lg"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default OrderDetailsAccountInfo;

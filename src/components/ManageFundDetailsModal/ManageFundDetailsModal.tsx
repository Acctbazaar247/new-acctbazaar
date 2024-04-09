import React, { useState } from "react";
import { IWithdrawalRequest } from "@/types/common";
import { Divider, Modal, QRCode } from "antd";
type Props = {} & IWithdrawalRequest;

const ManageFundDetailsModal = ({
  walletAddress,
  isTrc,
  fullName,
  amount,
  createdAt,
  id,
  ownById,
  status,
  accountNumber,
  bankName,
}: Props) => {
  const [open, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="border-b border-orange-500"
        onClick={() => setIsOpen(true)}
      >
        {walletAddress?.length
          ? isTrc
            ? "Crypto TRC 20"
            : "Crypto BEP 20"
          : "Bank"}
      </button>
      <Modal
        open={open}
        onCancel={() => setIsOpen(false)}
        title="Payment Details"
        okButtonProps={{
          className:
            "border-orange-500 text-orange-500 hover:text-white hover:!bg-orange-500",
        }}
      >
        <div>
          {walletAddress?.length ? (
            <div className="shadow items-center border p-2 rounded flex justify-between">
              <div>
                <h2 className="">
                  Address for USDT {isTrc ? "TRC 20" : "BEP 20"}
                </h2>
                <p className="font-bold ">{walletAddress}</p>
              </div>
              <QRCode size={100} value={walletAddress}></QRCode>
            </div>
          ) : (
            <div>
              <div className="shadow border p-2 rounded">
                <h2>Full name</h2>
                <p>{fullName}</p>
              </div>
              <div className="shadow border p-2 rounded my-2 flex justify-between items-center">
                <div>
                  <h2>Account number</h2>
                  <p>{accountNumber}</p>
                </div>
                <QRCode size={100} value={accountNumber || ""}></QRCode>
              </div>
              <div className="shadow border p-2 rounded">
                <h2>Bank Name</h2>
                <p>{bankName}</p>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ManageFundDetailsModal;

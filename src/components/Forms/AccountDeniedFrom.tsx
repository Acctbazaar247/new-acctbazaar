import React, { useState } from "react";
import Form from "./Form";
import AppFormTextarea from "../ui/AppFormTextarea";
import FormTextArea from "./FormTextArea";
import AppModal from "../ui/AppModal";

type Props = {
  handleEdit: (data: { message?: string }) => void;
  isButton?: boolean
};

const AccountDeniedFrom = ({ handleEdit, isButton = true }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleSubmit = (data: { message: string }) => {
    setModalOpen(false);
    handleEdit(data);
  };

  return (
    <div>
      <AppModal
        title="Change status to Denied"
        setModalOpen={setModalOpen}
        handleClose={() => setModalOpen(false)}
        modalOpen={modalOpen}
        button={
          <button
            className={isButton ? "app-status-button bg-yellow-500  text-xs lg:text-sm" : ""}
          //  onClick={() => {
          //    editService({ id, approvedForSale: EApprovedForSale.denied });
          //  }}
          >
            Denied
          </button>
        }
      >
        <div>
          <Form submitHandler={handleSubmit}>
            <h2 className="mb-2">
              Enter a message which will help seller while update this account
              (optional)
            </h2>
            <FormTextArea
              placeholder="Enter Message"
              name="message"
            ></FormTextArea>
            <button className="rounded bg-yellow-600 text-white px-2 py-1 mt-2">
              Denied
            </button>
          </Form>
        </div>
      </AppModal>
    </div>
  );
};

export default AccountDeniedFrom;

import AdminLayout from "@/layout/AdminLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import React, { useEffect } from "react";
import { Button, Space, message } from "antd";
import { toast } from "react-toastify";
import AddServiceForm from "@/components/Forms/AddServiceForm";
import { useAddAccountMutation } from "@/redux/features/account/accountApi";
import SellerLayout from "@/layout/SellerLayout";
import { AccountCategory } from "@/types/common";
import Swal from "sweetalert2";
import { isValidURL } from "@/utils";

type Props = {};

const AddService = (props: Props) => {
  const [addService, { isLoading, isError, isSuccess, error }] =
    useAddAccountMutation();

  const onSubmit = async (data: any) => {
    if (data?.preview?.length) {
      if (!isValidURL(data.preview)) {
        toast.error("Preview link is not valid");
        return;
      }
    }
    addService(data)
      .unwrap()
      .then((res: any) => {
        if (res.error) {
          toast.error("something went wrong");
        } else {
          toast.success("Successfully added");
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Account has been successfully added.",
            confirmButtonText: "Ok",
          });
        }
      })
      .catch(() => {
        toast.error("something went wrong");
      });
  };

  return (
    <>
      <SellerLayout>
        <div className="container py-5 md:py-10">
          <h2 className="text-center text-2xl font-bold pb-4">
            Add an Account
          </h2>
          <div className="mt-5">
            <AddServiceForm
              isLoading={isLoading}
              onSubmit={onSubmit}
            ></AddServiceForm>
          </div>
          <div className="p-6 pt-10 md:p-4 md:pt-8 upload-guide">
            <h2 className="text-center pb-4 font-bold text-xl">Upload Guide</h2>
            <div className="text-sm">
              <li className="pb-4">
                When you add social media accounts like Facebook, Instagram,
                Twitter, or Snapchat, try putting the link of the account in the
                preview link option. For example:
                (https://website.com/username). This helps AcctBazaar.com show a
                preview of your accounts so buyers can check them before buying,
                which can help you sell more. Remember, this is optional.
              </li>
              <li className="pb-4">
                If you&apos;re uploading WhatsApp or Google Voice accounts, make
                sure the account name is just the NUMBER and then add any other
                info. You can use your phone number as the account password so
                buyers can contact you for codes if needed.
              </li>
              <li className="pb-4">
                For social media accounts that need verification before access,
                fill in the email and password details in the extra information
                section when you upload them.
              </li>
              <li className="pb-4">
                When you name your account, especially if it&apos;s been around
                for 1 to 5 years or more, make sure to put how long you&apos;ve
                had it in the Name section. Keep it short and simple, like 4
                Years Facebook Account. You can give more details about the
                account in the description part.
              </li>
              <li className="pb-4">
                If you want to sell accounts that don&apos;t fit into any
                category, choose {`“Others"`} when you upload them.
              </li>
              <li className="pb-4">
                When you upload email accounts, use the email address as the
                username. You don&apos;t need to repeat the email in the extra
                information section.
              </li>
              <li className="pb-4">
                All accounts you upload have to be checked before they can be
                sold on AcctBazaar. So, make sure all the information you give
                is right.
              </li>
              <p>
                If you need help uploading accounts or want to upload a lot of
                them at once, send a message to{" "}
                <a href="mailto:support@acctbazaar.com">
                  support@acctbazaar.com.
                </a>
              </p>
            </div>
          </div>
        </div>
      </SellerLayout>
    </>
  );
};

export default AddService;

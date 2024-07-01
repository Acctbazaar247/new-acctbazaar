import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import AppButton from "@/components/ui/AppButton";
import Loading from "@/components/ui/Loading";
import { config } from "@/config";
import { authKey } from "@/constants/storageKey";
import HomeLayout from "@/layout/HomeLayout";
import PrivateLayout from "@/layout/PrivateLayout";
import { useAppSelector } from "@/redux/hook";
import { getFromLocalStorage } from "@/utils/local-storage";
import { Button } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Contactus = () => {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  //new state for handling the selected option
  const [queryType, setQueryType] = useState("");

  const handleSubmit = (data: any) => {
    if (!queryType) {
      toast.error("Please select a subject");
      return;
    }
    const payload = {
      ...data,
      queryType,
      description: data.orderNumber
        ? `
      ${data.description}


      Order Number: ${data.orderNumber}
      `
        : data.description
    };
    setLoading(true);
    fetch(`${config?.baseUrl}/users/send-query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: getFromLocalStorage(authKey) || ""
      },
      body: JSON.stringify(payload)
    })
      .then((result) => {
        if (!result.ok) {
          // Convert non-2xx HTTP responses into errors
          return result.json().then((err) => {
            throw new Error(err.message || "Please try again after some time");
          });
        }
        return result.json();
      })
      .then((res) => {
        if (res.statusCode === 200) {
          toast.success("Thanks for your query we will get in touch soon! ");
        }
      })
      .catch((err) => {
        toast.error("Please try again after some time");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  if (isLoading) {
    return (
      <HomeLayout>
        <Loading></Loading>
      </HomeLayout>
    );
  } else if (!user?.id) {
    return (
      <HomeLayout>
        <Loading></Loading>
      </HomeLayout>
    );
  }
  return (
    <HomeLayout>
      <>
        <div className="layout max-w-7xl custom-hight">
          <h1 className="title">New Ticket</h1>

          <div className="mt-4 md:mt-10">
            <Form
              submitHandler={handleSubmit}
              defaultValues={{ name: user?.name, email: user?.email }}
            >
              <div className="grid gap-3  grid-cols-1 md:grid-cols-2 mb-4">
                {/* Add the select dropdown here */}

                <div>
                  <FormInput
                    placeholder="Name"
                    name="name"
                    disabled={true}
                    required={true}
                  />
                </div>
                <div>
                  <FormInput
                    placeholder="email"
                    type="email"
                    name="email"
                    required={true}
                    disabled={true}
                  />
                </div>
                <div className="md:col-span-2">
                  <select
                    id="queryType"
                    name="queryType"
                    value={queryType}
                    onChange={(e) => setQueryType(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Select subject</option>
                    <option value="product">
                      I have a problem with the product
                    </option>
                    <option value="payment">
                      I have a problem with payment/funding
                    </option>
                    <option value="question">
                      I have a simple question/need consult
                    </option>
                  </select>
                </div>
                {queryType === "product" && (
                  <div className="col-span-2">
                    <FormInput
                      placeholder="Enter you order number"
                      name="orderNumber"
                    />
                  </div>
                )}
                <div className="md:col-span-2">
                  <FormTextArea
                    placeholder="Enter your message here"
                    required={true}
                    rows={5}
                    name="description"
                  />
                </div>
              </div>

              <AppButton isLoading={loading} label="Send Message" />
            </Form>
            <div className="mt-5 md:mt-10 text-left">
              If you encounter any issues with the ticket system or haven&apos;t
              received a response, please reach out to us via email at
              help@acctbazaar.com. Our technical support is available in
              English.
            </div>
          </div>
        </div>
      </>
    </HomeLayout>
  );
};

export default Contactus;

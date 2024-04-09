"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import Loading from "@/components/ui/Loading";
import { authKey } from "@/constants/storageKey";
import HomeLayout from "@/layout/HomeLayout";
import PrivateLayout from "@/layout/PrivateLayout";
import { useAppSelector } from "@/redux/hook";
import config from "@/utils/config";
import { getFromLocalStorage } from "@/utils/local-storage";
import { Button } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

type Props = {};
const Contactus = (props: Props) => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const user = useAppSelector((state) => state.user.user);
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
      queryType, // Add this line to include the query type in your submission
    };
    setLoading(true);
    fetch(`${baseUrl}/users/send-query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: getFromLocalStorage(authKey) || "",
      },
      body: JSON.stringify(payload),
    })
      .then((result) => {
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
  if (!user?.id) {
    return (
      <HomeLayout>
        <Loading></Loading>
      </HomeLayout>
    );
  }
  return (
    <HomeLayout>
      <PrivateLayout>
        <div className="container max-w-[1200px]">
          <h1 className="text-center pt-2 pb-2 text-2xl">New Ticket</h1>
          <div className="mt-10">
            <Form
              submitHandler={handleSubmit}
              defaultValues={{ name: user.name, email: user?.email }}
            >
              <div className="grid gap-3  grid-cols-1 md:grid-cols-2 ">
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
                <div className="md:col-span-2">
                  <FormTextArea
                    placeholder="Enter your message here"
                    required={true}
                    rows={5}
                    name="description"
                  />
                </div>
              </div>

              <Button
                disabled={loading}
                htmlType="submit"
                className="mt-3 contact-us-btn"
              >
                Send Message
              </Button>
            </Form>
            <div className="flex my-10">
              <div className="max-w-[700px] mb-10 text-left">
                If you encounter any issues with the ticket system or
                haven&apos;t received a response, please reach out to us via
                email at support@acctbazaar.com. Our technical support is
                available in English.
              </div>
            </div>
          </div>
        </div>
      </PrivateLayout>
    </HomeLayout>
  );
};

export default Contactus;

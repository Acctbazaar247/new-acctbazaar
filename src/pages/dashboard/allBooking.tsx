import ErrorCompo from "@/components/ui/AppErrorComponent";
import Loading from "@/components/ui/Loading";
import AdminLayout from "@/layout/AdminLayout";
import { Pagination } from "antd";
import React, { useState } from "react";

type Props = {};

const AllBooking = (props: Props) => {
  return (
    <AdminLayout>
      <div>hi</div>
      {/* <AllBookingTable></AllBookingTable> */}
      <h1 className="text-center text-4xl font-bold">Seller Requested</h1>
      <div className="text-center">
        <p className="mt-5">naimurrhman53@gmail.com wants to become seller</p>
        <p className="mt-2">
          The transaction Id is<span>1200dfdfdfdf</span>
        </p>
        <a
          href=""
          className="inline-block font-bold mt-5 px-5 py-2 bg-blue-700 text-white rounded-md "
        >
          Visit site
        </a>
      </div>
    </AdminLayout>
  );
};

export default AllBooking;

import React, { useEffect } from "react";
// importing aos
import AOS from "aos";
import WorksCard from "./WorksCard";
import Link from "next/link";

export default function BecomeSeller() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="container px-4 py-16 lg:py-0 flex flex-col lg:flex-row text-textBlack">
      <div
        className="w-full lg:w-2/5 flex flex-col justify-center"
        data-aos="fade-left"
        data-aos-duration="1500"
      >
        <h2 className="headline pb-4">Become a Merchant</h2>
        <p className="leading-7">
          Elevate your sales journey with Acctbazaar. List your products
          effortlessly, and watch your sales soar. Join our community of sellers
          and reach customers globally.
        </p>
        <Link href={"/become-a-merchant"}>
          <button className="appBtn mt-10 lg:mt-12">Learn More</button>
        </Link>
      </div>
      <div
        className="w-full lg:w-3/5"
        data-aos="fade-right"
        data-aos-duration="1500"
      >
        <img className="" src="/assets/home/seller.png" alt="" />
      </div>
    </div>
  );
}

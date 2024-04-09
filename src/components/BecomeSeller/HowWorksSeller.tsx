import React, { useEffect } from "react";
// importing aos
import AOS from "aos";
import "aos/dist/aos.css";
import WorksCard from "../Home/WorksCard";

export default function HowWorksSeller() {
  useEffect(() => {
    AOS.init();
  }, []);
  const howItWorksCards = [
    {
      number: "1",
      title: "Sign up for Free",
      details:
        "Joining Acctbazaar is quick, and easy. Fill out a simple registration form to create your seller account.",
    },
    {
      number: "2",
      title: "List Your Products",
      details:
        "Provide clear product descriptions and links. Use our intuitive product listing tools to showcase your goods.",
    },
    {
      number: "3",
      title: "Connect with Buyers",
      details:
        "Engage with potential buyers through our messaging system. Answer inquiries promptly and build customer relationships.",
    },
    {
      number: "4",
      title: "Complete Transactions",
      details:
        "Our secure payment system ensures hassle-free transactions. Receive payments directly to your wallet.",
    },
  ];
  return (
    <div className="bg-[#252120] text-white">
      <div
        className="container px-4 py-16 lg:py-20"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <h2 className="headline pb-14 text-center">How it works</h2>
        <div className="grid gap-y-12 gap-x-14 grid-cols-1 lg:grid-cols-2">
          {howItWorksCards.map((worksCard, index) => (
            <WorksCard worksCard={worksCard} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

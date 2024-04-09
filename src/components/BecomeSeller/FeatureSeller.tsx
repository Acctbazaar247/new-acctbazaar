import React, { useEffect } from "react";
// importing aos
import AOS from "aos";
import "aos/dist/aos.css";
import FeaturesCard from "../Home/FeaturesCard";

export default function FeatureSeller() {
  useEffect(() => {
    AOS.init();
  }, []);
  const featureCards = [
    {
      title: "Reach a Global Audience",
      details:
        "Expand your reach beyond local markets and connect with buyers worldwide.",
      imageUrl: "/assets/seller/globe.png",
      imagePosition: "flex justify-end",
      imageClass: "w-[220px] lg:w-[311px]",
    },
    {
      title: "Easy Listing Proces",
      details:
        "Quickly upload product details, images, and set your preferred pricing. Simple and user-friendly interface for effortless product listing.",
      imageUrl: "/assets/seller/social.png",
      imagePosition: "flex justify-end ",
      imageClass: "w-[220px] lg:w-[311px]  mt-auto",
    },
    {
      title: "Secure Transactions",
      details:
        "Built-in secure payment system to ensure smooth and safe transactions. Gain trust from buyers with our reliable payment processing.",
      imageUrl: "/assets/home/lock.png",
      imagePosition: "flex justify-end",
      imageClass: "w-[220px] lg:w-[311px]",
    },
    {
      title: "Real-time Analytics",
      details:
        "Understand customer behavior and tailor your strategy for better results. Access detailed insights into your sales performance.",
      imageUrl: "/assets/seller/graph.png",
      imagePosition: "flex justify-end",
      imageClass: "w-[220px] lg:w-[311px]",
    },
  ];
  return (
    <div className="container px-4 py-20 text-textBlack">
      <div className="text-center pb-16" data-aos="fade-up">
        <h4 className="text-primary pb-4 font-medium">Features</h4>
        <h2 className="headline">Unlock Your Selling Potential</h2>
      </div>
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        data-aos="fade-down"
        data-aos-duration="1500"
      >
        {featureCards.map((featureCard, index) => (
          <FeaturesCard featureCard={featureCard} key={index} />
        ))}
      </div>
    </div>
  );
}

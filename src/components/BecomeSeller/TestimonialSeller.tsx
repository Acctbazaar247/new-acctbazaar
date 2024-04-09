import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React, { useEffect } from "react";
// importing aos
import AOS from "aos";
import "aos/dist/aos.css";
import TestimonialCard from "../Home/TestimonialCard";

export default function TestimonialSeller() {
  useEffect(() => {
    AOS.init();
  }, []);
  const testimonials = [
    {
      imageUrl: "/assets/seller/person1.png",
      text: "“AcctBazaar has been a game-changer for me. As a seller, I’ve been able to easily list my social media and email accounts, reaching a wide audience of interested buyers. The platform’s interface is intuitive, and I’ve had great success selling my accounts here.“",
      name: "Tariq Abubakar",
      designation: "",
    },
    {
      imageUrl: "/assets/seller/person2.png",
      text: "“AcctBazaar provides a fantastic platform for selling VPN accounts. I’ve been able to connect with buyers who are looking for reliable VPN services, and the process of listing my accounts and managing sales has been effortless.Highly recommended for anyone looking to monetize their VPN subscriptions.“",
      name: "Nala Mbeki",
      designation: "",
    },
    {
      imageUrl: "/assets/seller/person3.png",
      text: "“AcctBazaar has exceeded my expectations as a platform for selling various types of accounts.Whether it’s social media, emails, or VPNs, I’ve been able to showcase my offerings to a targeted audience of buyers.The support team is also responsive and helpful, making my experience as a seller enjoyable.“",
      name: "Obi Eze",
      designation: "",
    },
  ];
  return (
    <div className="bg-[#F8F6F6]">
      <div
        className="container py-16 lg:py-20 px-4"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <div className="pb-6 lg:pb-20">
          <h2 className="headline text-textBlack pb-1">
            What sellers have to say
          </h2>
          <p className="text-textGrey leading-7">
            Hear from some of our amazing sellers using our platform.
          </p>
        </div>
        <div className="flex flex-col-reverse lg:flex-row gap-4">
          <div className="max-w-[99%] lg:max-w-[87%]">
            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              loop={true}
              navigation={{
                nextEl: ".swiper-testimonial-next",
                prevEl: ".swiper-testimonial-prev",
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index} className="h-full">
                  <TestimonialCard testimonial={testimonial} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="flex items-end justify-end lg:justify-center gap-6 lg:mb-10">
            <button className="cursor-pointer swiper-testimonial-prev bg-white dropShadow rounded-full h-11 w-11">
              <FontAwesomeIcon icon={faArrowLeft} className="text-[#667085]" />
            </button>
            <button className="cursor-pointer swiper-testimonial-next bg-white dropShadow rounded-full h-11 w-11">
              <FontAwesomeIcon icon={faArrowRight} className="text-[#667085]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

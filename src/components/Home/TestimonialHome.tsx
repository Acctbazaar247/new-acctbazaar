import { Swiper, SwiperSlide } from "swiper/react";
import TestimonialCard from "./TestimonialCard"
import { Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "swiper/css";
import React,{useEffect} from "react";
// importing aos
import AOS from 'aos';

export default function TestimonialHome() {
    useEffect(() => {
        AOS.init();
      }, [])
    const testimonials = [
        {
            imageUrl: "/assets/home/person1.png",
            text: "“I’ve been using AcctBazaar to purchase social media accounts for my business, and I’ve been extremely satisfied with the quality and variety available.The transactions have been smooth, and I appreciate the security measures in place to protect both buyers and sellers.“",
            name: "Fatima Kamara",
            designation: ""
        },
        {
            imageUrl: "/assets/home/person2.png",
            text: "“I stumbled upon AcctBazaar while searching for a reliable source to buy email accounts for my marketing campaigns.I was impressed by the range of options available and found exactly what I needed at competitive prices.The transaction was smooth, and I’ll definitely be returning for future purchases.“",
            name: "Kwame Adjei",
            designation: ""
        },
        {
            imageUrl: "/assets/home/person3.png",
            text: "“I’ve used AcctBazaar to purchase social media accounts for personal use, and I couldn’t be happier with the experience.The platform offers a seamless buying process, and I’ve found authentic accounts at reasonable prices.I highly recommend AcctBazaar to anyone looking to buy or sell accounts online“",
            name: "Aisha Njoku",
            designation: ""
        },
    ]
    return (
        <div className='bg-[#F8F6F6]'>
            <div className='container py-16 lg:py-20 px-4' data-aos="fade-up">
                <div className='pb-6 lg:pb-20'>
                    <h2 className="headline text-textBlack pb-1">Don’t just take our word for it</h2>
                    <p className="text-textGrey leading-7">Hear from some of our amazing customers who are using our platform.</p>
                </div>
                <div className='flex flex-col-reverse lg:flex-row gap-4'>
                    <div className='max-w-[99%] lg:max-w-[87%]'>
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

                    <div className='flex items-end justify-end lg:justify-center gap-6 lg:mb-10'>
                        <button className='cursor-pointer swiper-testimonial-prev bg-white dropShadow rounded-full h-11 w-11'>
                            <FontAwesomeIcon icon={faArrowLeft} className="text-[#667085]" />
                        </button>
                        <button className='cursor-pointer swiper-testimonial-next bg-white dropShadow rounded-full h-11 w-11'>
                            <FontAwesomeIcon icon={faArrowRight} className="text-[#667085]" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

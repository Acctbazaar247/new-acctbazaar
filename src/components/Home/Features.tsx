import React,{useEffect} from "react";
// importing aos
import AOS from 'aos';
import 'aos/dist/aos.css';import FeaturesCard from "./FeaturesCard";

export default function Features() {
    useEffect(() => {
        AOS.init();
      }, [])
    const featureCards = [
        {
            title: "Unique Selections",
            details: "Browse through a curated collection of unique accounts that reflect the creativity and craftsmanship of our community of sellers.",
            imageUrl: "/assets/home/smartphone.png",
            imagePosition: "flex justify-center",
            imageClass: ""
        },
        {
            title: "Secure Transactions",
            details: "Shop with confidence knowing that our platform prioritizes security. Your transactions are protected, and we facilitate a secure environment for both buyers and sellers.",
            imageUrl: "/assets/home/lock.png",
            imagePosition: "flex justify-center",
            imageClass: "w-[200px] lg:w-[311px]"
        },
        {
            title: "Direct Communication",
            details: "Connect with sellers directly to ask questions, and get personalized recommendations. Enjoy a more human and interactive shopping experience.",
            imageUrl: "/assets/home/message.png",
            imagePosition: "flex justify-center",
            imageClass: "w-[200px] lg:w-[311px]"
        },
        {
            title: "Reviews and Ratings",
            details: "Make informed decisions by reading reviews and ratings from other buyers. Share your experiences to contribute to our growing community of trusted users.",
            imageUrl: "/assets/home/ratings.png",
            imagePosition: "flex justify-center",
            imageClass: "w-[200px] lg:w-[311px]"
        },
    ]
    return (
        <div className='container px-4 py-20 text-textBlack' id="features">
            <div className='text-center pb-16' data-aos="fade-up">
                <h4 className="text-primary pb-4 font-medium">Features</h4>
                <h2 className="headline">Crafting Connections, One Sale at a Time</h2>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8' 
                 data-aos="fade-down"
                 data-aos-easing="linear"
                 data-aos-duration="1500">
                {
                    featureCards.map((featureCard, index) => (
                        <FeaturesCard featureCard={featureCard} key={index} />
                    ))
                }
            </div>
        </div>
    );
};

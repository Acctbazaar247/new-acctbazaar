import React,{useEffect} from "react";
// importing aos
import AOS from 'aos';
import WorksCard from "./WorksCard";

export default function HowItWorks() {
    useEffect(() => {
        AOS.init();
      }, [])
    const howItWorksCards = [
        {
            number: "1",
            title: "Explore",
            details: "Dive into our marketplace and discover a world of unique products. Use our intuitive search and filter options to find exactly what you're looking for."
        },
        {
            number: "2",
            title: "Connect",
            details: "Communicate directly with sellers to ask questions, or discuss customization options. Our platform fosters a sense of connection between buyers and sellers."
        },
        {
            number: "3",
            title: "Secure Checkout",
            details: "Once you've found your perfect item, proceed to our secure checkout process. Rest easy knowing that your payment is protected, and your purchase is in good hands."
        },
        {
            number: "4",
            title: "Enjoy",
            details: "Sit back and relax as your chosen item makes its way to you. Join a community of like-minded individuals who appreciate the value of genuine and authentic product."
        },
    ]
    return (
        <div className='bg-[#252120] text-white' id="how-it-works">
            <div className='container px-4 py-4 grid grid-cols-1 lg:grid-cols-2'>
                <div className='space-y-8 py-16' data-aos="fade-left">
                    <h2 className="headline">How it works</h2>
                    <div className='space-y-6'>
                        {
                            howItWorksCards.map((worksCard, index) => (
                                <WorksCard worksCard={worksCard} key={index} />
                            ))
                        }
                    </div>
                </div>
                <div className='-mx-4 lg:-mr-12' data-aos="fade-right">
                    <img src="/assets/home/how-works.png" alt="" />
                </div>
            </div>
        </div>
    );
};

import React,{useEffect} from "react";
// importing aos
import AOS from 'aos';

export default function WhyChoose() {
    useEffect(() => {
        AOS.init();
      }, [])
    const chooseCards = [
        {
            imageUrl: "/assets/home/circs.png",
            title: "Community-Centric",
            details: "We prioritize building a close-knit community of buyers and sellers who share a passion for unique and quality products."
        },
        {
            imageUrl: "/assets/home/files.png",
            title: "Support Local Businesses",
            details: "Empower small businesses and independent sellers by shopping directly from them. Every purchase you make contributes to the growth of individual entrepreneurs."
        },
        {
            imageUrl: "/assets/home/personalize.png",
            title: "Personalized Experience",
            details: "Enjoy a personalized shopping experience by directly engaging with sellers and discovering products curated with care and attention."
        },
    ]
    return (
        <div className='bg-[#FFDB94] text-textBlack'>
            <div className='container px-4 py-20' data-aos="fade-up" data-aos-duration="1500">
                <h2 className="headline pb-12 lg:pb-16 text-center">Why choose Acctbazaar</h2>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 2xl:gap-8'>
                    {
                        chooseCards.map((chooseCard, index) => (
                            <div key={index} className='flex flex-col items-center text-center'>
                                <img src={chooseCard?.imageUrl} alt={chooseCard?.title} />
                                <h2 className="subHeadline py-4">{chooseCard?.title}</h2>
                                <p className="font-normal">{chooseCard?.details}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

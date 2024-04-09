import React,{useEffect} from "react";
// importing aos
import AOS from 'aos';
import 'aos/dist/aos.css'; 

export default function BgTextSection() {
    useEffect(() => {
        AOS.init();
      }, [])
    return (
        <div className='bg-[#252120]'>
            <div className='container py-32 lg:py-20 relative px-10 lg:px-20'>
                <img className="w-full lg:w-[90%]" src="/assets/seller/bg.png" alt="" />
                <div className='absolute top-0 left-0 px-4 h-full w-full flex items-center justify-center' data-aos="fade-up" data-aos-duration="1500">
                    <h3 className="lg:max-w-3xl text-center mx-auto text-lg lg:text-3xl 2xl:text-4xl font-medium leading-7 lg:leading-10 text-white">Welcome to Acctbazaar, where sellers like you find a thriving platform to connect with buyers. Whether you&apos;re an individual seller or a small business owner, our P2P marketplace empowers you to showcase your accounts to a diverse and engaged audience.</h3>
                </div>
            </div>
        </div>
    );
};

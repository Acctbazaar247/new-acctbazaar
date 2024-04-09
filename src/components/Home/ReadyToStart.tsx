import Link from "next/link";
import React, { useEffect } from "react";
// importing aos
import AOS from 'aos';
import 'aos/dist/aos.css';


interface TReadySection {
    readySection: {
        title: string;
        details: string;
        buttonText: string;
        linkSrc: string;
    }
}

export default function ReadyToStart({ readySection }: TReadySection) {
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <div className='container my-16 px-4'>
            <div className='relative bgGradient rounded-xl lg:rounded-3xl' data-aos="fade-up" data-aos-duration="1500">
                <img className="rounded-3xl h-[420px] lg:h-full" src="/assets/home/bg.png" alt="" />
                <div className='absolute top-0 left-0 w-full h-full flex flex-col text-center items-center justify-center rounded-3xl px-4'>
                    <h2 className="headline text-left lg:text-center pb-4">{readySection?.title}</h2>
                    <p className="max-w-2xl pb-8 leading-7">{readySection?.details}</p>
                    <Link href={readySection?.linkSrc}>
                        <button className="appBtn">{readySection?.buttonText}</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

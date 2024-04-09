import Image from "next/image";
import Link from "next/link";
import React from "react";

import { MdMailOutline } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="bg-[#581203] text-white">

      <div className="container px-4 py-16 lg:py-20 flex justify-between  gap-3 lg:flex-row flex-col w-full">
        <div className="max-w-[300px]">
          <Link href="/" className="flex items-center pb-3">
            <Image
              width={200}
              height={200}
              className="w-12 lg:w-18"
              src="/assets/logo.PNG"
              alt="pc"
            />
            <span className="font-black text-white text-xl lg:text-2xl whitespace-nowrap ml-2">
              cctbazaar
            </span>
          </Link>
          <p className="text-sm md:text-base font-normal mb-5 ">
            Empower your social journey with our P2P platform! Connect, collaborate, and thrive as you share experiences and ideas.
          </p>
        </div>

        <div className='flex justify-between lg:gap-32'>
          <div className="">
            <h2 className="font-bold text-[#F7AC9B] pb-5">Links</h2>
            <div className="space-y-3 flex flex-col font-normal">
              <Link
                className="text-nowrap text-sm sm:text-md font-normal"
                href="/signIn"
              >
                About
              </Link>
              <Link
                className="text-nowrap text-sm sm:text-md font-normal"
                href="/pricing-rules"
              >
                Pricing Rules
              </Link>
              <Link
                className="text-nowrap text-sm sm:text-md font-normal"
                href="/become-a-seller"
              >
                Become a Merchant
              </Link>
              <Link href="/contactus">
                <Image
                  src="/assets/ticket2.png"
                  alt="Play Store"
                  width={150}
                  height={100}
                >

                </Image>
              </Link>

            </div>
          </div>

          {/* this is contact section  */}
          <div className=''>
            <h2 className="font-bold text-[#F7AC9B]">Contact</h2>
            <p className="text-sm font-normal pt-4">Support@acctbazaar.com</p>
            <div className="flex my-4">
              <Link
                target="_blank"
                href="https://www.instagram.com/acctbazaar/"
                className="mr-4 text-white invert"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="text-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>

              <Link
                target="_blank"
                href="https://twitter.com/AcctBazaar"
                className="mr-4 text-white"
                style={{ fontSize: "24px" }}
              >
                <FaXTwitter />
              </Link>



              <Link
                target="_blank"
                href="http://T.me/acctbazaarchannel"
                className="text-white mr-4 "
              >
                <Image
                  width={24}
                  height={24}
                  alt="telegram"
                  src="/assets/home/telegram.png"
                ></Image>
              </Link>


              <Link
                target="_blank"
                href="https://www.tiktok.com/@acctbazaar?lang=en"
                className="invert text-white"
              >
                <Image
                  width={24}
                  height={24}
                  alt="tiktok"
                  src="/tiktok-svgrepo-com.svg"
                ></Image>
              </Link>

            </div>
          </div>
        </div>

        <div className="flex justify-between lg:justify-normal gap-6 pt-6 lg:pt-0">
          <div className='space-y-2'>
            <h2 className="font-medium">Get the app</h2>
            <p className="bg-[#CAFBBE] text-sm px-2 py-1 rounded-full text-textBlack">Coming Soon</p>
          </div>

          {/* Images for Play Store and App Store */}
          <div className="space-y-4">
            <Image
              src="/assets/home/apple.png"
              alt="apple Store"
              className="mr-4"
              width={140}
              height={80}
            ></Image>

            <Image
              src="/assets/home/play.png"
              alt="Play Store"
              className="mr-4"
              width={140}
              height={80}
            ></Image>
          </div>
        </div>
      </div>

      <div className='hidden lg:block container px-4'>
        <hr className="bg-[#A4A1A1]" />
      </div>

      <div className="container flex flex-col-reverse lg:flex-row justify-between items-center px-4 lg:pt-9 pb-12">
        <p className="text-sm">
          Copyright &copy; 2024 Acctbazaar. All rights reserved !
        </p>
        <div className='lg:hidden container px-4 py-6'>
          <hr className="bg-[#A4A1A1]" />
        </div>
        <div className='flex items-start w-full lg:w-fit pl-4 lg:pl-0 lg:items-center font-normal gap-6 text-sm'>
          <Link href={'/terms-and-condition'}>
            <p>Privacy Policy </p>
          </Link>
          <Link href={'/terms-and-condition'}>
            <p>Terms of Use </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;

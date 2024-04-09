import { useAppSelector } from "@/redux/hook";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = { small?: boolean };

const Logo = ({ small }: Props) => {
  const user = useAppSelector((state) => state.user.user);
  return (
    <div className={`${user?.id && "pl-6 md:pl-0"}`}>
      <Link href="/" className="flex items-center">
        <Image
          width={200}
          height={200}
          className="size-5 md:size-7 lg:size-11 2xl:size-14"
          src={"/assets/logo.PNG"}
          alt="pc"
        ></Image>
        {small ? null : (
          <span className="text-textBlack font-semibold md:font-black md:text-xl lg:text-2xl 2xl:text-3xl whitespace-nowrap">
            cctbazaar
          </span>
        )}
      </Link>
    </div>
  );
};

export default Logo;

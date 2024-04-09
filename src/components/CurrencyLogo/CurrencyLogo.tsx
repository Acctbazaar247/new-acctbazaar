import Image from "next/image";
import React from "react";

type Props = {
  className?: string;
  amount?: number;
};

const CurrencyLogo = (props: Props) => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/assets/dollar.png"
        height={100}
        width={100}
        className={props.className || "w-full"}
        alt="currency"
      ></Image>
      {props.amount === 0 || props.amount ? <span>{props.amount}</span> : null}
    </div>
  );
};

export default CurrencyLogo;

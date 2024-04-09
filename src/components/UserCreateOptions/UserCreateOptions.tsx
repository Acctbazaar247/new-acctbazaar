import Link from "next/link";
import React, { useState } from "react";

type Props = { defaultValue: boolean };

const UserCreateOptions = ({ defaultValue }: Props) => {
  const [forUser, setForUser] = useState(defaultValue);
  return (
    <div className="flex mt-5 pb-4 gap-3 md:gap-5">
      <Link
        href={"/signUp"}
        className={`w-full py-4 text-sm mg:text-md px-2 border rounded transition-all disabled:opacity-90  text-center inline-block${
          forUser
            ? "border-orange-300 bg-orange-500 text-white"
            : "text-orange-500 border-orange-300"
        }`}
      >
        User
      </Link>
      <Link
        href={"/signUpForSeller"}
        className={`w-full py-4 px-2 border rounded transition-all disabled:opacity-90 text-center text-sm mg:text-md inline-block ${
          !forUser
            ? "border-orange-300 bg-orange-500 text-white"
            : "text-orange-500 border-orange-300"
        }`}
      >
        Become a Merchant
      </Link>
    </div>
  );
};

export default UserCreateOptions;

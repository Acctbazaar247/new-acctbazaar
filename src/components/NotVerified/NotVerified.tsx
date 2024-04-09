import React from "react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hook";

export default function NotVerified() {
  const user = useAppSelector((state) => state.user.user);
  return (
    <main className="main">
      <section className="bg-[var(--first-color)] p-[9rem_0_2rem] h-screen grid">
        <div className="container max-w-[1024px] mx-[1.5rem] grid content-center gap-10">
          <div className="text-center">
            <h1 className="text-6xl my-[.75rem]">
              Oops! You are not verified yet
            </h1>
            <p>All pages will be accessible once you are verified</p>
            <br />
            <Link
              href={`/verify?toEmail=${user?.email}`}
              className="inline-block bg-[rgb(255,85,0)] text-white py-[.80rem] px-[1.5rem] rounded-full transition duration-400 hover:shadow-[0_4px_12px_rgba(38,69,8,0.2)]"
            >
              Verify
            </Link>
          </div>

          <div className="justify-self-center mb-5">
            <img
              src="/assets/oops.png"
              alt=""
              className="w-[250px] animate-floaty"
            />
            <div className="home__shadow w-[130px] h-[24px] bg-[hsla(38,21%,19%,.16)] mx-auto rounded-full filter blur-[7px] animate-shadow"></div>
          </div>
        </div>
      </section>
    </main>
  );
}

import { useEffect, useState } from "react";
import AppModal from "../ui/AppModal";
import Image from "next/image";
import { useAppSelector } from "@/redux/hook";

export default function WelcomeModal() {
  const { user } = useAppSelector((state) => state.user);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (user?.isPaidForSeller) {
      setModalOpen(false);
    }
  }, [user?.isPaidForSeller])

  return (
    <AppModal
      button=""
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      title="Welcome to the Store"
      subTitle="Add any account to sell to thousands of customers on our platform"
    >
      <div className="pt-4 md:w-[840px]">
        <Image
          src={"/assets/account/welcome-account.png"}
          width={577}
          className="mx-auto"
          height={181}
          alt="welcome to the sell account"
        />
        <div className="flex gap-4 py-4 h-full">
          <div className="w-[49%]">
            <p className="text-textGrey text-xs">
              This is a private space for listing accounts.
            </p>
            <h4 className="font-normal">
              To start selling your account, you need to follow these simple
              steps;
            </h4>
            <div className="py-4 space-y-2">
              <div className="flex gap-2">
                <Image
                  src={"/assets/account/send.png"}
                  width={32}
                  height={32}
                  className="size-8 object-cover"
                  alt="icons"
                />
                <div className="">
                  <h4>Make payment</h4>
                  <p className="text-sm">
                    Make a one time payment fee of $10,{" "}
                    <span onClick={() => setModalOpen(false)} className="text-primary font-medium">
                      Make payment
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Image
                  src={"/assets/account/list.png"}
                  width={32}
                  height={32}
                  className="size-8 object-cover"
                  alt="icons"
                />

                <div className="">
                  <h4>List</h4>
                  <p className="text-sm">
                    Add & authorize and place a price on your account to the
                    platform
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Image
                  src={"/assets/account/review.png"}
                  width={32}
                  height={32}
                  className="size-8 object-cover"
                  alt="icons"
                />

                <div className="">
                  <h4>Review</h4>
                  <p className="text-sm">
                    Your account would be reviewed and you are good to go
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#F9F7F7] text-sm space-y-2 p-3 rounded-lg">
              <p>
                As a plus, you can become a{" "}
                <span className="text-textBlack font-medium">
                  “verified seller”
                </span>{" "}
                so buyers feel more secured buying from you
              </p>
              <button className="appOutlineBtnSm">Become Verified</button>
            </div>
          </div>
          <div className="border border-borderColor min-h-full w-0"></div>
          <div className="w-[49%]">
            <h3 className="font-medium text-base text-textBlack pb-3">
              Responsibilities of the store
            </h3>
            <ol className="space-y-3">
              <li className="flex gap-1 text-sm text-textBlack">
                <span>1.</span>Automatic worldwide sale of your accounts at your
                price.
              </li>
              <li className="flex gap-1 text-sm text-textBlack">
                <span>2.</span>We extensively promote the store and products
                through search engines, contextual ads, forums, etc. Monthly, we
                invest thousands of dollars in advertising.
              </li>
              <li className="flex gap-1 text-sm text-textBlack">
                <span>3.</span>Engaging with customers, addressing issues.
                Replacements and refunds account for just 0.5% of total sales.
              </li>
              <li className="flex gap-1 text-sm text-textBlack">
                <span>4.</span>Payment & Payout: We accept card, bank, crypto
                payment and also payout in both Naira via bank and USD through
                crypto with zero interest.
              </li>
            </ol>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button className="appBtn px-10" onClick={() => setModalOpen(false)}>
            Get Started
          </button>
        </div>
      </div>
    </AppModal>
  );
}

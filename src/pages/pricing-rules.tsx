import HomeLayout from "@/layout/HomeLayout";
import Image from "next/image";
import React from "react";

type Props = {};

const PricingRules = (props: Props) => {
  return (
    <HomeLayout>
      <section className="flex_center">
        <div className="tc_main !mt-0">
          <div className="tc_content">
            <div className="tc_top !m-0">
              <div className="flex justify-center">
                <Image
                  width={200}
                  height={200}
                  className="!w-[200px] lg:!w-[240px]"
                  src="/fav-icon.png"
                  alt=""
                />
              </div>
              <div className="title mt-5">
                <p>Pricing Rules</p>
              </div>
              <h3 className="text-2xl font-bold">
                Last Updated: [December 2023]
              </h3>
              <div className="info lg:w-full lg:pl-8">
              For each successful transaction on AcctBazaar, a 10% transaction fee will be charged from the buyer and 15% from the seller.
              </div>
            </div>
            <div className="tc_bottom">
              <div className="info  lg:flex lg:justify-center lg:items-center w-full">
                <ul>
                  <li>
                    <h3 className="text-xl font-bold">1. Listing Fee</h3>
                    <div>
                      <p>
                        Sellers are required to pay a listing fee when creating a new listing for an account on AcctBazaar. 
                        <br />The listing fee is 5% of the amount of the account listed. <br /> The listing fee is charged after the account has been sold.
                      </p>
                    </div>
                  </li>
                  <li>
                    <h3 className="text-xl font-bold">2. Buyers Account</h3>
                    <div>
                      <p>
                        Buyers are required to Fund their account with at least
                        $10 before carrying out any purchase.
                      </p>
                      <p>
                        Buyers can leave a review and ratings on each seller
                        profile
                      </p>
                      <p>
                        Payment deposited can&apos;t be withdrawn from a buyers
                        account
                      </p>
                    </div>
                  </li>
                  <li>
                    <h3 className="text-xl font-bold">3. Account Funding</h3>
                    <div>
                      <p>Minimum Funding is 10 USD</p>
                      <p>
                        USD (crypto) Funding and Naira Funding options are
                        available
                      </p>
                      <p>
                        Users and Sellers can Fund their account via Bank
                        Payment, Card Payment & Crypto Payment
                      </p>
                      <p>
                        Naira Funding will be calculated at the current exchange
                        rate at the time of the funding
                      </p>

                      <p>
                        For issues regarding account funding, contact support on
                        telegram @acctbazaar1
                      </p>
                    </div>
                  </li>
                  <li>
                    <h3 className="text-xl font-bold">4. Withdrawal Fee</h3>
                    <div>
                      <p>
                        When withdrawing funds via crypto from your AcctBazaar
                        account, a withdrawal fee will be applied to cover the
                        network fee for crypto payment.
                      </p>
                      <p>No Withdrawal fee is charged for Naira payment</p>
                      <p>
                        Minimum Withdrawal is $20 for crypto payment and N10,000
                        for naira payment
                      </p>
                      <p>
                        USD withdrawal and Naira withdrawal options will be
                        available
                      </p>
                      <p>
                        Naira withdrawal will be processed with the standard
                        Banking Rate.
                      </p>
                      <p>
                        For issues regarding account withdrawal, contact support
                        on telegram @acctbazaar1
                      </p>
                    </div>
                  </li>
                  <li>
                    <h3 className="text-xl font-bold">
                      5. Currency Conversion
                    </h3>
                    <div>
                      <p>
                        All transactions on AcctBazaar are conducted in USD
                        (United State Dollar)
                      </p>
                      <p>Each AcctBazaar Dollar is Equal</p>
                    </div>
                  </li>
                  <li>
                    <h3>6. Adjustments and Notifications</h3>
                    <div>
                      <p>
                        AcctBazaar reserves the right to adjust the transaction,
                        listing, and withdrawal fees at any time. Changes will
                        be communicated to users via the platform&apos;s
                        official communication channels.
                      </p>
                      <p>
                        Sellers and buyers will be notified of any changes to
                        fees prior to engaging in transactions.
                      </p>
                    </div>
                  </li>
                  <li>
                    <h3 className="text-xl font-bold">7. Special Promotions</h3>
                    <div>
                      <p>
                        AcctBazaar may introduce special promotions or discounts
                        on transaction and listing fees during specific periods.
                        The terms and conditions of such promotions will be
                        communicated to users during the promotional period.
                      </p>
                    </div>
                  </li>
                  <li>
                    <h3 className="text-xl font-bold">
                      8. Dispute Resolution Fee
                    </h3>
                    <div>
                      <p>
                        In the event of a dispute resolution process initiated
                        by users, a dispute resolution fee may be charged to the
                        party deemed responsible for the dispute.
                      </p>
                      <p>
                        The dispute resolution fee is $2 , payable in AcctBazaar
                        Balance
                      </p>
                    </div>
                  </li>
                  <li>
                    <h3 className="text-xl font-bold">9. Taxes</h3>
                    <div>
                      <p>
                        Users are responsible for any taxes or fees associated
                        with their transactions on AcctBazaar. AcctBazaar is not
                        responsible for withholding, collecting, reporting, or
                        remitting any taxes arising from transactions.
                      </p>
                      <p>
                        By using AcctBazaar, users agree to abide by these
                        pricing rules. AcctBazaar reserves the right to modify
                        these rules at any time, and users will be notified of
                        such changes through the platform&apos;s official
                        channels.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* <div className="tc_btns">
            <button className="accept">Accept</button>
            <button className="decline">Decline</button>
          </div> */}
        </div>
      </section>
    </HomeLayout>
  );
};

export default PricingRules;

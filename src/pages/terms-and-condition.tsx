import HomeLayout from "@/layout/HomeLayout";
import Image from "next/image";
import React from "react";

type Props = {};

const TermsAndCondition = (props: Props) => {
  return (
    <HomeLayout>
      <section className="flex_center px-4 sm:px-2 md:px-10 lg:px-10">
        <div className="tc_main !mt-0">
          <div className="tc_content px-4 sm:px-2 md:px-10 lg:px-10">
            <div className="tc_top !m-0">
              <div className="flex justify-center">
                <Image
                  width={200}
                  height={200}
                  className="!w-[200px] lg:!w-[240px]"
                  src="/fav-icon.png"
                  alt="AcctBazaar Logo"
                />
              </div>
              <div className="title mt-5 text-center">
                <p>AcctBazaar Terms and Conditions</p>
              </div>
              <h3 className="text-center">Last Updated: 20th March 2024</h3>
              <div className="info mt-5">
                Welcome to AcctBazaar, Nigeria’s leading Peer-to-Peer (P2P) digital marketplace. AcctBazaar facilitates seamless transactions between buyers and sellers of digital products, including but not limited to gift cards, VPN subscriptions, gaming accounts, and social media logins. By accessing our platform, you acknowledge and agree to these terms and conditions, which govern your use of the website, services, and applications associated with AcctBazaar.

                These Terms and Conditions form a legally binding agreement between you (“the User”) and AcctBazaar. If you disagree with any part of these terms, you must immediately discontinue your use of the platform.
              </div>
            </div>
            <div className="tc_bottom mt-8 mb-20">
              <div className="info text-left">
                <h3 className="font-bold mt-6 mb-2 text-[18px]">1. Introduction</h3>
                <p>AcctBazaar serves as a neutral intermediary connecting buyers and sellers of digital goods. We are committed to providing a secure, user-friendly environment that simplifies transactions and fosters trust between users. While AcctBazaar operates primarily in the Nigerian market, our platform is accessible to users globally.</p>
                <ul className="list-disc ml-5">
                  <li className="font-bold mt-3">What We Do:
                    <ul className="list-circle ml-4">
                      <li>Facilitate transactions of digital products in a secure P2P environment.</li>
                      <li>Provide optional KYC verification for merchants to boost credibility.</li>
                      <li>Offer transparent transaction processing and a dispute resolution mechanism.</li>
                    </ul>
                  </li>
                  <li className="font-bold mt-3">What We Don’t Do:
                    <ul className="list-circle ml-4">
                      <li>Monitor or control how products listed on the platform are used.</li>
                      <li>Guarantee the legality or authenticity of any products.</li>
                      <li>Participate in or endorse activities, whether legal or illegal, involving the listed products.</li>
                    </ul>
                  </li>
                </ul>

                <h3 className="font-bold mt-6 mb-2 text-[18px]">2. User Registration and Verification</h3>
                <ul className="list-disc ml-5">
                  <li className="font-bold mt-3">Registration Requirements:
                    <ul className="list-circle ml-4">
                      <li>All users must register with a valid email address and phone number.</li>
                      <li>No additional personal information is required for basic access to the platform.</li>
                    </ul>
                  </li>
                  <li className="font-bold mt-3">Merchant Verification:
                    <ul className="list-circle ml-4">
                      <li>Merchants may choose to submit Know Your Customer (KYC) documents for optional verification.</li>
                      <li>Verified merchants are awarded a badge to signify enhanced credibility.</li>
                    </ul>
                  </li>
                  <li className="font-bold mt-3">User Obligations:
                    <ul className="list-circle ml-4">
                      <li>Users must provide accurate and up-to-date information during registration.</li>
                      <li>Misrepresentation of information may lead to suspension or permanent banning from the platform.</li>
                    </ul>
                  </li>
                </ul>

                <h3 className="font-bold mt-6 mb-2 text-[18px]">3. Prohibited Activities</h3>
                <p>Users are prohibited from engaging in the following activities on AcctBazaar:</p>
                <ul className="list-disc ml-5">
                  <li>Listing, purchasing, or facilitating the trade of illegal, counterfeit, or stolen products.</li>
                  <li>Fraudulent activities or scams targeting other users.</li>
                  <li>Misrepresenting product descriptions or intentionally deceiving other users.</li>
                  <li>Using the platform for money laundering or any criminal purposes.</li>
                  <li>Attempting to exploit platform vulnerabilities or disrupt its services.</li>
                </ul>
                <p className="mt-3">Important Notice: AcctBazaar operates as a marketplace and is not responsible for the actions of buyers or sellers. All users are solely accountable for ensuring their activities comply with local and international laws.</p>

                <h3 className="font-bold mt-6 mb-2 text-[18px]">4. Transactions on AcctBazaar</h3>
                <ul className="list-disc ml-5">
                  <li className="font-bold mt-3">Payment and Fees:
                    <ul className="list-circle ml-4">
                      <li>AcctBazaar charges a nominal transaction fee for completed sales.</li>
                      <li>The fee structure is transparent and displayed before transactions are finalized.</li>
                    </ul>
                  </li>
                  <li className="font-bold mt-3">Currency:
                    <ul className="list-circle ml-4">
                      <li>Transactions on AcctBazaar are conducted in USD.</li>
                      <li>Users may need to convert their local currency to USD to access the platform.</li>
                    </ul>
                  </li>
                  <li className="font-bold mt-3">Dispute Resolution:
                    <ul className="list-circle ml-4">
                      <li>In the event of a dispute between buyers and sellers, AcctBazaar provides mediation services.</li>
                      <li>Disputes must be reported within 48 hours of the transaction for investigation.</li>
                    </ul>
                  </li>
                </ul>

                <h3 className="font-bold mt-6 mb-2 text-[18px]">5. Disclaimer of Liability</h3>
                <p>AcctBazaar assumes no responsibility for the following:</p>
                <ul className="list-disc ml-5">
                  <li>The legality, authenticity, or intended use of products traded on the platform.</li>
                  <li>Losses resulting from disputes, fraud, or misuse of the platform by users.</li>
                  <li>Any penalties or legal consequences users may face due to the misuse of digital products.</li>
                </ul>

                <h3 className="font-bold mt-6 mb-2 text-[18px]">6. Indemnity Clause</h3>
                <p>By using AcctBazaar, you agree to indemnify and hold harmless AcctBazaar, its affiliates, and its operators against any claims, damages, liabilities, or legal proceedings arising from:</p>
                <ul className="list-disc ml-5">
                  <li>Your use or misuse of the platform.</li>
                  <li>Transactions conducted on AcctBazaar, whether lawful or unlawful.</li>
                  <li>Violations of these Terms and Conditions.</li>
                </ul>

                <h3 className="font-bold mt-6 mb-2 text-[18px]">7. Governing Law</h3>
                <p>These Terms and Conditions are governed by the laws of the Federal Republic of Nigeria. Any legal disputes shall be resolved in Nigerian courts.</p>
      
                <h3 className="font-bold mt-6 mb-2 text-[18px]">Contact Us</h3>
                <p>If you have any questions or concerns about these Terms and Conditions, please contact us at:</p>
                <p>Email: help@acctbazaar.com</p>
                <p>Phone: +234 707 382 3800</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HomeLayout>
  );
};

export default TermsAndCondition;

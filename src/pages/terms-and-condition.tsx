import HomeLayout from "@/layout/HomeLayout";
import Image from "next/image";
import React from "react";

type Props = {};

const TermsAndCondition = (props: Props) => {
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
                <p>Terms of serivce</p>
              </div>
              <h3>Last Updated: [December 2023]</h3>
              <div className="info">
                Welcome to AcctBazaar, an online peer-to-peer marketplace for
                social media a ccounts, VPN accounts, email services accounts,
                and gaming accounts. These Terms and Conditions outline the
                rules and regulations for the use of the AcctBazaar platform. By
                accessing this website and using our services, you agree to
                accept and abide by these terms. Please read them carefully.
              </div>
            </div>
            <div className="tc_bottom">
              <div className="title my-5 !mb-5">
                <p>please go through the terms before Accepting it.</p>
              </div>
              <div className="info">
                <ul>
                  <li>
                    <h3>1. Acceptance of Terms</h3>
                    <div>
                      <p>
                        By accessing or using the AcctBazaar platform, you agree
                        to be bound by these Terms and Conditions. If you do not
                        agree to all the terms and conditions of this agreement,
                        you must not access the website or use our services.
                      </p>
                    </div>
                  </li>
                  <li>
                    <h3>2. Account Registration</h3>
                    <div>
                      <p>
                        To use certain features of AcctBazaar, you may be
                        required to register for an account. You must provide
                        accurate, current, and complete information during the
                        registration process and update such information to keep
                        it accurate, current, and complete.
                      </p>
                      <p>
                        You are responsible for maintaining the confidentiality
                        of your account and password and for restricting access
                        to your computer or device. You agree to accept
                        responsibility for all activities that occur under your
                        account or password.
                      </p>
                    </div>
                  </li>
                  <li>
                    <h3>3. Prohibited Activities</h3>
                    <div>
                      <p>
                        You agree not to engage in any of the following
                        activities on the AcctBazaar platform:
                      </p>
                      <ol>
                        <li>
                          a. Violating any applicable laws or regulations.
                        </li>
                        <li>
                          b. Infringing on the intellectual property rights of
                          others.
                        </li>
                        <li>
                          c. Distributing spam, viruses, or any other
                          technologies that may harm AcctBazaar, or the
                          interests or property of its users.
                        </li>
                        <li>
                          d. Engaging in fraudulent, deceptive, or unethical
                          practices.
                        </li>
                        <li>
                          e. Selling accounts that violate the terms of service
                          of the respective platform or service provider.
                        </li>
                      </ol>
                    </div>
                  </li>
                  <li>
                    <h3>4. Listing and Selling Accounts</h3>
                    <div>
                      <p>
                        Sellers on AcctBazaar must accurately represent the
                        accounts they are selling, including information about
                        followers, engagement, and any other relevant details.
                      </p>
                      <p>
                        Sellers are responsible for ensuring that the sale of
                        accounts complies with the terms of service of the
                        respective platform or service provider.
                      </p>
                    </div>
                  </li>
                  <li>
                    <h3>5. Fees and Payments</h3>
                    <div>
                      <p>
                        AcctBazaar may charge fees for certain services, and
                        these fees will be clearly disclosed. Sellers are
                        responsible for paying any applicable fees associated
                        with the use of our platform.
                      </p>
                    </div>
                  </li>
                  <li>
                    <h3>6. Dispute Resolution</h3>
                    <div>
                      <p>
                        In the event of a dispute between buyers and sellers,
                        AcctBazaar may, at its discretion, provide assistance in
                        resolving the dispute.
                      </p>
                      <p>
                        AcctBazaar is not responsible for the quality or
                        authenticity of the accounts listed on the platform.
                        Users are encouraged to communicate and verify details
                        before making a purchase.
                      </p>
                    </div>
                  </li>
                  <li>
                    <h3>7. Termination of Account</h3>
                    <div>
                      <p>
                        AcctBazaar reserves the right to terminate or suspend
                        your account at any time and for any reason, without
                        prior notice.
                      </p>
                    </div>
                  </li>
                  <li>
                    <h3>8. Changes to Terms and Conditions</h3>
                    <div>
                      <p>
                        AcctBazaar reserves the right to modify these Terms and
                        Conditions at any time. Changes will be effective
                        immediately upon posting on the website. It is your
                        responsibility to review these Terms and Conditions
                        regularly to stay informed of updates.
                      </p>
                    </div>
                  </li>
                  <li>
                    <h3>9. Contact Information</h3>
                    <div>
                      <p>
                        If you have any questions or concerns about these Terms
                        and Conditions, please contact us at{" "}
                        <a
                          className="telegram-link"
                          href="https://t.me/acctbazaar"
                        >
                          @acctbazaar1{" "}
                        </a>
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

export default TermsAndCondition;

import React from "react";

type Props = {};

const OnDeployment = (props: Props) => {
  return (
    <div>
      <>
        <header className="header" data-header="">
          <nav className="nav container">
            <a href="#" className="nav__logo">
              <img src="/fav-icon.png" alt="" />
            </a>
            <div className="nav__menu" id="nav-menu">
              <ul className="nav__list">
                <li className="nav__item">
                  <a href="#" className="nav__link" />
                </li>
                <li className="nav__item">
                  <a href="#" className="nav__link" />
                </li>
                <li className="nav__item">
                  <a href="#" className="nav__link" />
                </li>
              </ul>
              <div className="nav__close" id="nav-close">
                <i className="bx bx-x" />
              </div>
            </div>
            {/* Toggle button */}
            <div className="nav__toggle" id="nav-toggle">
              <i className="bx bx-grid-alt" />
            </div>
          </nav>
        </header>
        {/*==================== MAIN ====================*/}
        <main className="main">
          {/*==================== HOME ====================*/}
          <section className="home overflow-x-hidden">
            <div className="home__container !ml-0 md:!ml-auto   container">
              <div className="home__data">
                <h1 className="home__title text-xl">
                  Your Premier P2P Marketplace for Social Media Accounts
                </h1>
                <p className="home__description">
                  We appreciate your continuous support and trust in Acctbazaar
                  as your preferred P2P marketplace for digital products.
                </p>
                <p>
                  Currently, we are undergoing essential upgrades and resolving
                  some technical issues to enhance your overall user experience.
                  As a result, Acctbazaar will be temporarily
                  unavailable&nbsp;for&nbsp;access.
                </p>
                <br />
                <div className="social-icons">
                  <div className="social-icon">
                    <img src="/assets/facebook.png" alt="" />
                  </div>
                  <div className="social-icon">
                    <img src="/assets/sanpchat.png" alt="" />
                  </div>
                  <div className="social-icon">
                    <img src="/assets/whatsapp.png" alt="" />
                  </div>
                  <div className="social-icon">
                    <img src="/assets/twitter.png" alt="" />
                  </div>
                  <div className="social-icon">
                    <img src="/assets/instagram.png" alt="" />
                  </div>
                  <div className="social-icon">
                    <img src="/assets/windscribe.png" alt="" />
                  </div>
                  <div className="social-icon">
                    <img src="/assets/tiktok.png" alt="" />
                  </div>
                  <div className="social-icon">
                    <img src="/assets/telegram.png" alt="" />
                  </div>
                </div>
                {/* <div class="btn">
                      <a href="#" class="home__button create_account">
                          Create Account
                      </a>
                      <a href="https://t.me/acctbazaar" class="home__button">
                          Sign In
                      </a>
                  </div> */}
              </div>
              <div className="home__img">
                <img src="/assets/update.png" alt="" />
                <div className="home__shadow" />
              </div>
            </div>
            {/* <footer>
              <div class="footer-container">
                  <div class="sec aboutus">
                      <h2>About Us</h2>
                      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus quisquam minus quo illo numquam vel incidunt pariatur hic commodi expedita tempora praesentium at iure fugiat ea, quam laborum aperiam veritatis.</p>
                      <ul class="sci">
                          <li><a href="#"><i class="bx bxl-facebook"></i></a></li>
                          <li><a href="#"><i class="bx bxl-instagram"></i></a></li>
                          <li><a href="#"><i class="fa-brands fa-x-twitter"></i></a></li>
                          <li><a href="#"><i class="bx bxl-linkedin"></i></a></li>
                      </ul>
                  </div>
                  <div class="sec quicklinks">
                      <h2>Quick Links</h2>
                      <ul>
                          <li><a href="#">Terms And Conditions</a></li>
                          <li><a href="#">Sellers T&C</a></li>
                          <li><a href="">Pricing Rules</a></li>
                          <li><a href=""></a></li>
                          <li><a href=""></a></li>
                          <li><a href=""></a></li>
                          <li><a href=""></a></li>
                      </ul>
                  </div>
                  <div class="sec contactBx">
                      <h2>Contact Info</h2>
                      <ul class="info">
                          <li>
                              <span><i class='bx bxs-map'></i></span>
                              <span>6444 London street <br> Brighton PA 33445 <br> Uk</span>
                          </li>
                          <li>
                              <span><i class='bx bx-envelope' ></i></span>
                              <p><a href="mailto:codemyhobby9@gmail.com">Codemyhobby9@gmail.com</a></p>
                          </li>
                      </ul>
                  </div>
              </div>
          </footer> */}
          </section>
        </main>
      </>
    </div>
  );
};

export default OnDeployment;

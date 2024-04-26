import NavBar from "../components/layout/Navbar";
import React, { useState } from "react";
import icecream from "../image/bg.avif";
import Footer from "../components/layout/Footer";

import "./about.css";
function About() {
  return (
    <div>
      <NavBar />
          <main id="main">
            {/* ======= Breadcrumbs ======= */}

            <div className="breadcrumbs d-flex align-items-center" style={{backgroundImage: `url(${icecream})`}}>
              <div className="container position-relative d-flex flex-column align-items-center" data-aos="fade">
                <h2>About</h2>
                <ol>
                  <li><a href="index.html">Home</a></li>
                  <li>About</li>
                </ol>
              </div>
            </div>{/* End Breadcrumbs */}
            {/* ======= About Section ======= */}
            <section id="about" className="about">
              <div className="container" data-aos="fade-up">
                <div className="row position-relative">
                <div className="col-lg-7 about-img" style={{backgroundImage: `url(${icecream})`}}></div>
                  <div className="col-lg-7">
                    <h2>Consequatur eius et magnam</h2>
                    <div className="our-story">
                      <h4>Est 1988</h4>
                      <h3>Our Story</h3>
                      <p>Inventore aliquam beatae at et id alias. Ipsa dolores amet consequuntur minima quia maxime autem. Quidem id sed ratione. Tenetur provident autem in reiciendis rerum at dolor. Aliquam consectetur laudantium temporibus dicta minus dolor.</p>
                     
                      <p>Vitae autem velit excepturi fugit. Animi ad non. Eligendi et non nesciunt suscipit repellendus porro in quo eveniet. Molestias in maxime doloremque.</p>
                      
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Footer />
    </div>
  );
}

export default About;

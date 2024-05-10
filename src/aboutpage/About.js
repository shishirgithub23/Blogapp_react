import NavBar from "../components/layout/Navbar";
import React, { useState } from "react";
import icecream from "../image/bg.avif";
import Footer from "../components/layout/Footer";
import { useNavigate } from "react-router-dom";
import "./about.css";
function About() {
  
  var navigate = useNavigate()
  return (
    <div>
      <NavBar />
          <main id="main">
            {/* ======= Breadcrumbs ======= */}

            <div className="breadcrumbs d-flex align-items-center" style={{backgroundImage: `url(${icecream})`}}>
              <div className="container position-relative d-flex flex-column align-items-center" data-aos="fade">
                <h2>About</h2>
                <ol>
                  <li><a onClick={()=>{navigate("/")}}>Home</a></li>
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
                 
                    <div className="our-story">
                    <h3>Welcome to Our Blog!</h3>
                      <p>Hello and welcome to our blog! We're thrilled to have you here. Our blog is your go-to destination for informative and engaging content covering a wide range of topics across different sectors. Whether you're interested in technology, finance, health, or lifestyle, we've got you covered!</p>
                      <h3>Our Mission!</h3>
                      <p>Our mission is simple: to provide valuable information and insights that empower our readers to make informed decisions and lead fulfilling lives. We believe that knowledge is power, and we're dedicated to sharing knowledge across all sectors to help you navigate the complexities of today's world.</p>
                      <h3>What We Cover</h3>
                      <p>From the latest trends in technology to tips for managing your finances, we cover a diverse range of topics to cater to all interests</p>
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

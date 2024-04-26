import React from "react";
import { Link } from "react-router-dom"; // Import the Link component from react-router-dom
import './navbar.css';

import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NavBar = () => {
  return (
<header id="header" className="header d-flex align-items-center">
  <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
    <a href="index.html" className="logo d-flex align-items-center">
      {/* Uncomment the line below if you also wish to use an image logo */}
      {/* <img src="assets/img/logo.png" alt=""> */}
      <h1>BLOG<span>.</span></h1>
    </a>
    <i className="mobile-nav-toggle mobile-nav-show bi bi-list" />
    <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x" />
    <nav id="navbar" className="navbar">
      <ul>
        <li><Link to="/"><a className="nav-link scrollto ">Home</a></Link></li>
        <li><Link to="/aboutus"><a className="nav-link scrollto">About Us</a></Link></li>
        <li><Link to="/blog"><a className="nav-link scrollto">Our Blog</a></Link></li>
        <li><Link to="/Login"><a className="nav-link scrollto">Login</a></Link></li>
        <li><Link to="/DashBoard"><a className="nav-link scrollto">Dashboard</a></Link></li>
      </ul>
    </nav>
    {/* .navbar */}
  </div>
  <hr />
</header>



  );
};

export default NavBar;
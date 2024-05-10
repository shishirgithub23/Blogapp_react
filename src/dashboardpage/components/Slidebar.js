import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admin.css";
import icecream from "../../image/bg.avif";
import { BiMenu } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaBars, FaSun, FaMoon } from "react-icons/fa";

function Slidebar() {
  const [menuActive, setMenuActive] = useState(false); // Initialize menuActive state
  const mobileNavShow = useRef(null);
  const mobileNavHide = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const mobileNavToggles = document.querySelectorAll(".mobile-nav-toggle");

    const mobileNavToogle = () => {
      document.querySelector("body").classList.toggle("mobile-nav-active");
      mobileNavShow.current.classList.toggle("d-none");
      mobileNavHide.current.classList.toggle("d-none");
      setMenuActive(!menuActive); // Update menuActive state
    };

    return () => {
      mobileNavToggles.forEach((el) => {
        el.removeEventListener("click", mobileNavToogle);
      });
    };
  }, []);

  const mobileNavToogle = () => {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavShow.current.classList.toggle("d-none");
    mobileNavHide.current.classList.toggle("d-none");
  };


  return (
    <header>
      <header className="header">
      <button
          ref={mobileNavShow}
          className="mobile-nav-toggle mobile-nav-show bi bi-list "
          onClick={mobileNavToogle}
        >
          <BiMenu />
        </button>
        <button
          ref={mobileNavHide}
          className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x "
          onClick={mobileNavToogle}
        >
          <BiMenu />
        </button>
      </header>

      <div className="side-bar">
        <div className="close-side-bar">
          {/* Add close button logic here */}
        </div>
        <div className="profile">
          {/* <img src={icecream} alt /> */}
          <h3>Dashboard</h3>
        </div>

        <nav className={menuActive? "navbar1 active" : "navbar1"}>
          
          <Link to="/">
            <a
              className={location.pathname === "/"? "active" : "nav-link scrollto"}
            >
              <i className="fas fa-home" />
              <span>Back To Home </span>
            </a>
          </Link>

          {(localStorage.role=="BLOGGER" || localStorage.role=="ADMIN")?
          <>
              <Link to="/DashBoard">
                <a
                  className={location.pathname === "/"? "active" : "nav-link scrollto"}
                >
                  <i className="fas fa-home" />
                  <span>Dashboard</span>
                </a>
              </Link>

              <Link to="/ShowBlog">
                <a
                  className={location.pathname === "/"? "active" : "nav-link scrollto"}
                >
                  <i className="fas fa-home" />
                  <span> Blog</span>
                </a>
              </Link>
            </>
          :
          <>
          </>
          }
          {
            localStorage.role=="ADMIN"?
            <>
              <Link to="/Admin">
              <a
                className={location.pathname === "/"? "active" : "nav-link scrollto"}
              >
                <i className="fas fa-home" />
                <span>Users</span>
              </a>
            </Link>
          <Link to="/Category">
            <a
              className={location.pathname === "/"? "active" : "nav-link scrollto"}
            >
              <i className="fas fa-home" />
              <span>Category</span>
            </a>
          </Link>
            </>
            :
            <>
            </>
          }

          
        </nav>
      </div>
    </header>
  );
}

export default Slidebar;
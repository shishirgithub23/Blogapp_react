import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./homepage/Home";
import About from "./aboutpage/About";
import Details from "./detailspage/Details";
import Blog from "./blogpage/Blog";
import DashBoard from "./dashboardpage/components/Slidebar";
import Login from "./authpage/loginpage/Login";
import Register from "./authpage/registerpage/Register";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/details" element={<Details />} />
        <Route path="/DashBoard" element={<DashBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>

  );
};

export default App;
import React ,{createContext, useEffect,useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./homepage/Home";
import About from "./aboutpage/About";
import Details from "./detailspage/Details";
import Blog from "./blogpage/Blog";
import DashBoard from "./dashboardpage/components/Homepage/Home";
import Login from "./authpage/loginpage/Login";
import Register from "./authpage/registerpage/Register";
import AdminBlog from "./dashboardpage/components/Blogpage/Blog";
import UpdateBlog from "./dashboardpage/components/Blogpage/UpdateBlog";

import AddAdmin from "./dashboardpage/components/Adminpage/Admin";
import ShowBlog from "./dashboardpage/components/Blogpage/ShowBlog";
import Category from "./dashboardpage/components/categorypage/Category";
import data from './AppConfig.json'
import ManageProfilePage from "./dashboardpage/ProfilePage/ManageProfilePage";

import { ToastContainer } from "react-toastify";
import Unauthorized from "./Unauthorized";
import NotificationComponent from "./Notification/NotificationComponent";
import axios from "axios";

export const AppContext=createContext();

const App = () => {

  const [notification,setNotification]=useState([])

  //TO Get Api URL For Global Use
  useEffect(() => {
    localStorage.api_url = data.api_url;
    LoadNotification();
  },[]);

  //Notification Data 
  const LoadNotification =()=>{
   
    if(localStorage.role!=undefined && (localStorage.role=="ADMIN" || localStorage.role=="BLOGGER"))
      {
        axios({
          method:"GET",
          url:localStorage.api_url+"api/v1/notification/getnotification",
          headers:({'Content-Type':'application/json','Authorization': `Bearer ${localStorage.token}`}),
          data:{}
        }).then((function(response)
        {
          setNotification(response.data)
        })).catch(function(error){
          // if(error.response?.status==401)
          // {
          //   navigate("/login")
          // }
        }) 
      }
  }
  
  
  return (
    <>
      <ToastContainer />
      <AppContext.Provider value={{LoadNotification:LoadNotification,notification:notification}}>
        <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/aboutus" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/details" element={<Details />} />
              <Route path="/DashBoard" element={<DashBoard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/AddBlog" element={<AdminBlog />} />
              <Route path="/ShowBlog" element={<ShowBlog />} />
              <Route path="/UpdateBlog" element={<UpdateBlog />} />
              <Route path="/Category" element={<Category />} />
              <Route path="/Admin" element={<AddAdmin />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/notification" element={<NotificationComponent />} />
            </Routes>
        </Router>
      </AppContext.Provider>
      
    </>
  );
};

export default App;
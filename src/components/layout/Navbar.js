import React, { useContext, useEffect, useRef ,useState} from "react";
import './navbar.css';
import { BiMenu } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ManageProfilePage from "../../dashboardpage/ProfilePage/ManageProfilePage";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from "../../App";
import { IoIosNotifications } from "react-icons/io";

var initialValues={
  currentPassword:'',
  password:'',
  confirmPassword:''
}

const ShowNotificationModal  =({CloseNotificationModal})=>{

  var {notification}=useContext(AppContext)


  return(
    <>
        <div class="modal-body">
          <div>
            <div class="row" style={{fontSize:"20px"}}>
              <div class="col-md-12">
                   
                    
                    <table className="table table-striped">
                      <thead>
                        {/* <tr>
                          <th scope="col" colSpan={5} style={{textAlign:"center"}}></th>
                        </tr> */}
                      </thead>
                      <tbody>
                      
                      {notification && notification.length>0?notification.map((x,i)=>(
                        <tr>
                          <th scope="row">{i+1}</th>
                          <td colSpan={4}>
                            {x.notification_title}
                            {
                              x.notification_text
                            }
                           </td>
                        </tr>
                        )):<>
                        <tr>
                          <td style={{textAlign:"center"}} colSpan={5}>Noting to show!</td>
                        </tr>
                        </>}
                      </tbody>
                    </table>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

const ChangePasswordModal =({closePasswordChangeModal})=>{

  const ChangePasswordSchema=Yup.object({
    currentPassword:Yup.string().required("Please enter current password!").min(8, 'Password must be at least 8 characters'),
    password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  });

  const {
    values,
    setValues,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue
  } = useFormik({
    initialValues,
    validationSchema: ChangePasswordSchema,
    onSubmit: (values, action) => {
      HandleSubmit(values, action);
    },
  });

  const HandleSubmit = (data, action) => {

    var input_data={
      'current_password':data.currentPassword || '',
      'password':data.password || '',
      'confirm_password':data.confirmPassword
    }
    axios({
      method:"POST",
      url:localStorage.api_url+"api/v1/Auth/changepassword",
      headers:({'Content-Type':'application/json', 'Authorization': `Bearer ${localStorage.token}`}),
      data:input_data
    }).then((function(response)
    {
       closePasswordChangeModal(true)
       toast.success("Password Changed Successfully",{autoClose:2000})
    })).catch(function(error){
    }) 
  };

  return(
    <>
        <div class="modal-body">
          <div>
            <div class="row">
              <div class="col-md-12">
                <form onSubmit={handleSubmit}>
                  <div className="row mt-2">
                    <div className="col-md-12"><label className="labels">Current Password</label>
                      <input 
                        type="password" 
                        name="currentPassword"
                        className="form-control" 
                        placeholder="Please enter current password." 
                        value={values.currentPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                        {errors.currentPassword && touched.currentPassword ? (
                          <div className="text-danger">{errors.currentPassword}</div>
                        ) : null}
                    </div>
                    
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12"><label className="labels">Password</label>
                      <input
                        type="password" 
                        className="form-control" 
                        placeholder="Please enter password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.password && touched.password ? (
                          <div className="text-danger">{errors.password}</div>
                        ) : null}
                    </div>
                  
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12"><label className="labels">Confirm Password</label>
                      <input 
                        type="password"
                        name="confirmPassword" 
                        className="form-control"
                        placeholder="Please enter confirm password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.confirmPassword && touched.confirmPassword ? (
                          <div className="text-danger">{errors.confirmPassword}</div>
                        ) : null}
                    </div>
                  
                  </div>
                  <div className="mt-5 text-center">
                    <button className="btn btn-primary profile-button">Change Password</button>
                    {/* <div className='row'>
                      <div className='col-md-6'>
                          <button className="btn btn-primary profile-button">Update Password</button>
                      </div>
                      <div className='col-md-6'>
                          <button className="btn btn-danger">Delete Profile</button>
                      </div>
                    </div> */}
                    
                  </div>
                </form>
              </div>
            
            </div>
          </div>
        </div>
    </>
  )
}

const NavBar = () => {

  var navigate=useNavigate()
  var {notification}=useContext(AppContext)

  const mobileNavShow = useRef(null);
  const mobileNavHide = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const mobileNavToggles = document.querySelectorAll(".mobile-nav-toggle");

    mobileNavToggles.forEach((el) => {
      el.addEventListener("click", (event) => {
        event.preventDefault();
        mobileNavToogle();
      });
    });

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

  const [showUserProfileModal, setShowUserProfileModal] = useState(false);
  const [openChangePasswordModal,setOpenChangePasswordModal]=useState(false)
  const [showNotification,setShowNotification]=useState(false)

  //This Function Will Close The Notification Popup 
  const CloseNotificationModal =()=>{
    setShowNotification(false)
  }

  //This Function Will Open And Close The Modal
  const closeUserProfileModal = () => {
    setShowUserProfileModal(false);
  };

  const closePasswordChangeModal =()=>{
    setOpenChangePasswordModal(false)
  }

  const LogOutUser = () => {
    localStorage.clear();
    window.location.reload();
    navigate("/")
  };

  return (
  <header id="header" className="header d-flex align-items-center">
    <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
    <Link to="/" className="logo d-flex align-items-center">
      <a>
        {/* Uncomment the line below if you also wish to use an image logo */}
        {/* <img src="assets/img/logo.png" alt=""> */}
        <h1>BLOG<span>.</span></h1>
      </a>
      </Link>
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
      <nav id="navbar" className="navbar">
        <ul>
        <li>
          <Link to="/">
            <a className={location.pathname === "/" ? "active" : "nav-link scrollto"}>Home</a>
          </Link>
        </li>
        <li>
          <Link to="/aboutus">
            <a className={location.pathname === "/aboutus" ? "active" : "nav-link scrollto"}>About Us</a>
          </Link>
        </li>
        <li >
          <Link to="/blog">
            <a className={location.pathname === "/blog" ? "active" : "nav-link scrollto"}>Our Blog</a>
          </Link>
        </li>
        {
          localStorage.role!=null && (localStorage.role=="ADMIN" || localStorage.role=="BLOGGER")?
          <>
            <li>
              <Link to="/DashBoard">
                <a className="nav-link scrollto">Dashboard</a>
              </Link>
            </li>
          </>
          :
          <>
          
          </>
        }

        {
          localStorage.token==null?
          <>
             <li>
              <Link to="/Login">
                <a className="nav-link scrollto">Login</a>
              </Link>
            </li>
          </>
          :
          <>
          </>
        }
        
        {
          localStorage.token!=null?
          <>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {localStorage.role || 'USER'}
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" onClick={()=>{setShowUserProfileModal(true)}}>User Profile</a>
              
                  <a className="dropdown-item" onClick={()=>{setOpenChangePasswordModal(true)}}>Change Password</a>
                  <a className="dropdown-item" onClick={()=>{LogOutUser()}}>Logout</a>
                
                </div>
              </li>
            <li>
            </li>
          </>
          :
          <>
           
          </>
        }
        {
           localStorage.role!=undefined && (localStorage.role=="ADMIN" || localStorage.role=="BLOGGER") ?
            <>
              <a className="nav-link scrollto" onClick={()=>{setShowNotification(true)}}><IoIosNotifications style={{fontSize:"20px"}} /><sup style={{fontSize:"20px", color:"red"}}>{notification  && notification?.length}</sup></a>
            </>
            :
            <>

            </>
          
        }
      </ul>

      </nav>
      {/* .navbar */}
    </div>
    <hr />
    {(showUserProfileModal || false) && (
      <div
        className="modal"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        onClick={() => {
          closeUserProfileModal();
        }}
      >
        <div
          className="modal-dialog"
          style={{ maxWidth: "40%", margin: "auto", marginTop: "10%" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">View Proifle</h5>
              <button
                type="button"
                className="close"
                onClick={() => {
                  closeUserProfileModal();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <ManageProfilePage
                closeUserProfileModal={closeUserProfileModal}
              />
            </div>
          </div>
        </div>
      </div>
    )}

    {( openChangePasswordModal || false) && (
      <div
        className="modal"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        onClick={() => {
          closePasswordChangeModal();
        }}
      >
        <div
          className="modal-dialog"
          style={{ maxWidth: "40%", margin: "auto", marginTop: "10%" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Change Password</h5>
              <button
                type="button"
                className="close"
                onClick={() => {
                  closePasswordChangeModal();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <ChangePasswordModal
                closePasswordChangeModal={closePasswordChangeModal}
              />
            </div>
          </div>
        </div>
      </div>
    )}

 {(showNotification || false) && (
      <div
        className="modal"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        onClick={() => {
          CloseNotificationModal();
        }}
      >
        <div
          className="modal-dialog"
          style={{ maxWidth: "40%", margin: "auto", marginTop: "10%" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Notification</h5>
              <button
                type="button"
                className="close"
                onClick={() => {
                  CloseNotificationModal();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <ShowNotificationModal
                CloseNotificationModal={CloseNotificationModal}
              />
            </div>
          </div>
        </div>
      </div>
    )}

  
  </header> 
  )
}

export default NavBar;
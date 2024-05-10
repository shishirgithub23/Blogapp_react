import React, { useEffect } from 'react'
import NavBar from '../../components/layout/Navbar'
import icecream from "../../image/bg.avif";
import "./ProfilePage.css";
import Footer from '../../components/layout/Footer';
import * as Yup from 'yup';
import { useFormik } from "formik";
import axios from 'axios';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialValues = {
  userid:'',
  username: "",
  email:"",
  role:"",
  role_name:""
};

function ManageProfilePage({closeUserProfileModal}) {

  const ProfileSchema=Yup.object({
    email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

    username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .required('Username is required')
  });


  const LoadUserProfile =()=>{
    axios({
      method:"GET",
      url:localStorage.api_url+"api/v1/users/GetUserProfile",
      headers:({'Content-Type':'application/json', 'Authorization': `Bearer ${localStorage.token}`}),
      data:{}
    }).then((function(response)
    {
      //console.log(response.data)
      setValues(response.data)
    })).catch(function(error){
        //console.log(error)
    }) 
  }

  useEffect(()=>{
   LoadUserProfile()
  },[])

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
    validationSchema: ProfileSchema,
    onSubmit: (values, action) => {
      HandleSubmit(values, action);
    },
  });

  const HandleSubmit = (data, action) => {

    var input_data={
      'username':data.username,
      'email':data.email
    }
    axios({
      method:"POST",
      url:localStorage.api_url+"api/v1/users/updateUserProfile",
      headers:({'Content-Type':'application/json', 'Authorization': `Bearer ${localStorage.token}`}),
      data:input_data
    }).then((function(response)
    {
       toast.success("User Profile Updated Successfully.",{autoClose:2000})
       closeUserProfileModal()
       //console.log(response);
    })).catch(function(error){
       // console.log(error)
    }) 
  };

  const DeleteProfile =()=>{
    toast.info(
      <div className="container">
        <p>Are you sure you want to proceed?</p>
        <button
          className="btn-danger mr-4"
          onClick={() => ConfirmDeleteProfile()}
        >
          Confirm
        </button>
        <button className="btn-info m-1" onClick={() => CancelToast()}>
          Cancel
        </button>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
    
  }

  const CancelToast = () => {
    toast.dismiss();
  };

  const ConfirmDeleteProfile =()=>{
    if(parseInt(values.userid)>0)
    {
      axios({
        method:"POST",
        url:localStorage.api_url+"api/v1/users/deleteprofile?userid="+parseInt(values.userid,0),
        headers:({'Content-Type':'application/json', 'Authorization': `Bearer ${localStorage.token}`}),
        data:{}
      }).then((function(response)
      {
         toast.success("User Profile Deleted Successfully.",{autoClose:900})
         localStorage.clear();
         window.location.reload();
      })).catch(function(error){
        //  console.log(error)
      }).finally(function(){
        CancelToast()
      })
    }
  }

  return (
    <>
      <div class="modal-body">
        <div>
          <div class="row">
            <div class="col-md-12">
              <form onSubmit={handleSubmit}>
                <div className="row mt-2">
                  <div className="col-md-12"><label className="labels">UserName</label>
                    <input 
                      type="text" 
                      name="username"
                      className="form-control" 
                      placeholder="Username" 
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                      {errors.username && touched.username ? (
                        <div className="text-danger">{errors.username}</div>
                      ) : null}
                  </div>
                  
                </div>
                <div className="row mt-3">
                  <div className="col-md-12"><label className="labels">Email</label>
                    <input
                      type="text" 
                      className="form-control" 
                      placeholder="Email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? (
                        <div className="text-danger">{errors.email}</div>
                      ) : null}
                  </div>
                
                </div>
                <div className="row mt-3">
                  <div className="col-md-12"><label className="labels">Role</label>
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="Role"
                      name="role_name"
                      value={values.role_name}
                      disabled
                    />
                  </div>
                
                </div>
                <div className="mt-5 text-center">
                  <div className='row'>
                    <div className='col-md-5'>
                        <button  className="btn btn-primary profile-button">Update Profile</button>
                    </div>
                    <div className='col-md-5'>
                      <a type="submit" onClick={DeleteProfile} className="my-button">Delete Profile</a>
                    </div>
                    
                  </div>
                </div>
              </form>
            </div>
           
          </div>
        </div>
      </div>
    </>
  )
}
export default ManageProfilePage
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom"; // Import the Link component from react-router-dom
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
  .email('Invalid email address')
  .required('Email is required'),
  username: Yup.string()
  .min(3, 'Username must be at least 3 characters')
  .max(20, 'Username must be at most 20 characters')
  .required('Username is required'),
  password: Yup.string()
  .min(8, 'Password must be at least 8 characters')
  .required('Password is required'),
  confirmPassword: Yup.string()
  .oneOf([Yup.ref('password'), null], 'Passwords must match')
  .required('Confirm Password is required'),
});

function Register() {

    const navigate = useNavigate();

    const HandleSignup =(values)=>{
        var input_data={
            'UserName':values.username,
            'Password':values.password,
            'Email':values.email
        }
        axios({
          method:"POST",
          url:localStorage.api_url+"api/v1/Auth/register",
          headers:({'Content-Type':'application/json'}),
          data:input_data
        }).then((function(response)
        {
          toast.success("User Registered Successfully.",{autoClose:1900})
          
          navigate("/login")
        })).catch(function(error){
            //console.log(error)
        }) 
    }

  return (
    <div>
        <div className="vh-100" >
        <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
                <div className="card" style={{borderRadius: '1rem'}}>
                <div className="row g-0">
                    <div className="col-md-6 col-lg-5 d-none d-md-block d-lg">
                    <img src={`https://source.unsplash.com/random/?sig=${Math.floor(Math.random() * 1000)}`} alt="register form" className="img-fluid" style={{borderRadius: '0 1rem 1rem 0'}} />
                </div>
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                     <ul>
                        <Formik
                        initialValues={{ email: '', username: '', password: '', confirmPassword: '' }}
                        validationSchema={RegisterSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            HandleSignup(values)
                        }}
                        >
                        {({ isSubmitting }) => (
                            <Form>
                            <div className="d-flex align-items-center mb-3 pb-1">
                                <i className="fas fa-cubes fa-2x me-3" style={{color: '#ff6219'}} />
                                <span className="h1 fw-bold mb-0">Blog</span>
                            </div>
                            <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: 1}}>Create your account</h5>
                            <div data-mdb-input-init className="form-outline mb-1">
                                <label className="form-label" htmlFor="email">Email:</label>
                                <Field name="email" type="email" id="email" className="form-control form-control-lg" />
                                <ErrorMessage name="email" component="div" className="text-danger" />
                            </div>
                            <div data-mdb-input-init className="form-outline mb-1">
                                <label className="form-label" htmlFor="username">Username:</label>
                                <Field name="username" type="text" id="username" className="form-control form-control-lg" />
                                <ErrorMessage name="username" component="div" className="text-danger" />
                            </div>
                            <div data-mdb-input-init className="form-outline mb-1">
                                <label className="form-label" htmlFor="password">Password:</label>
                                <Field name="password" type="password" id="password" className="form-control form-control-lg" />
                                <ErrorMessage name="password" component="div" className="text-danger" />
                            </div>
                            <div data-mdb-input-init className="form-outline mb-1">
                                <label className="form-label" htmlFor="confirmPassword">Confirm Password:</label>
                                <Field name="confirmPassword" type="password" id="confirmPassword" className="form-control form-control-lg" />
                                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                            </div>
                            <div className="pt-1 mb-4">
                                <button data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-lg btn-block" type="submit" disabled={isSubmitting}>
                                Register
                                </button>
                            </div>
                            <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Already have an account? <Link to="/Login" style={{color: '#393f81'}}>Login here</Link></p>
                            </Form>
                        )}
                        </Formik>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
     </div>
     </div>
   
  )
  
}

export default Register
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom"; // Import the Link component from react-router-dom
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
   .email('Invalid email address')
   .required('Email is required'),
  password: Yup.string()
   .min(8, 'Password must be at least 8 characters')
   .required('Password is required'),
});

function Login() {
  const navigate = useNavigate();

  const HandleLogin =(values,setSubmitting)=>{
    var input_data={
        'UserName':values.email,
        'Password':values.password
    }
    axios({
      method:"POST",
      url:localStorage.api_url+"api/v1/Auth/login",
      headers:({'Content-Type':'application/json'}),
      data:input_data
    }).then((function(response)
    {

      toast.success("User Logged In Successfully.",{autoClose:900})
      localStorage.token=response.data.token
      localStorage.role=response.data.role
      
      navigate("/")
    })).catch(function(error){
     // console.log(error)
      if(error!=undefined && error!=null)
        {
          if(error.response.data.response_status=="1")
            {
              toast.error(error.response.data.Message,{autoClose:900})
              return
            }
        }
    }).finally(function(){
      setSubmitting(false);
    })
  }

  const HandleForgetPassword =()=>{
      navigate('/forgetpassword')
  } 

  return (
    <div>
      <div className="vh-100" >
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{borderRadius: '1rem'}}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img src={`https://source.unsplash.com/random/?sig=${Math.floor(Math.random() * 1000)}`} alt="register form" className="img-fluid" style={{borderRadius: '0 1rem 1rem 0'}} />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      
                      <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={LoginSchema}
                        onSubmit={(values, { setSubmitting }) => {
                          HandleLogin(values,setSubmitting)
                         
                        }}
                      >
                        {({ isSubmitting }) => (
                          <Form>
                            <div className="d-flex align-items-center mb-3 pb-1">
                              <i className="fas fa-cubes fa-2x me-3" style={{color: '#ff6219'}} />
                              <span className="h1 fw-bold mb-0">Blog</span>
                            </div>
                            <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: 1}}>Sign into your account</h5>
                            <div data-mdb-input-init className="form-outline mb-4">
                              <label className="form-label" htmlFor="email">Email:</label>
                              <Field name="email" type="email" id="email" className="form-control form-control-lg" />
                              <ErrorMessage name="email" component="div" className="text-danger" />
                            </div>
                            <div data-mdb-input-init className="form-outline mb-4">
                              <label className="form-label" htmlFor="password">Password:</label>
                              <Field name="password" type="password" id="password" className="form-control form-control-lg" />
                              <ErrorMessage name="password" component="div" className="text-danger" />
                            </div>
                            <div className="pt-1 mb-4">
                              <button data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-lg btn-block" type="submit" disabled={isSubmitting}>
                                Login
                              </button>
                            </div>
                            <a className="small text-muted" onClick={()=>{HandleForgetPassword()}}>Forgot password?</a>
                            <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? 

                            <Link to="/Register"> <a  style={{color: '#393f81'}}>Register here</a></Link>
                            
                          </p>

                          </Form>
                        )}
                      </Formik>
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

export default Login
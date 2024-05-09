import React,{useState,useEffect} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom"; // Import the Link component from react-router-dom
import axios from 'axios';

function ForgetPasswordManage() {

    const [passwordResetMessage,setPasswordResetMessage]=useState("")

    const [passwordResetToken,setPasswordResetToken]=useState("")
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const tokenFromURL = queryParams.get('token');
        console.log(tokenFromURL)
        setPasswordResetToken(tokenFromURL);
    }, []);


    const ForgetPasswordSchema = Yup.object().shape({
       email: Yup.string()
        .email('This is not a valid email .Please enter valid email')
        .required('Please enter your email .'),
    });

    const HandleForgetPassword =(values,setSubmitting)=>{

        var input_data={
            'Email':values.email
        }
        axios({
            method:"POST",
            url:localStorage.api_url+"api/v1/Auth/sendresetlink",
            headers:({'Content-Type':'application/json'}),
            data:input_data
          }).then((function(response)
          {
            setPasswordResetMessage("Password Reset Link Has Been Sent To Your Email.Please Click The Link For New Password.")
          })).catch(function(error){
            console.log(error)
          }).finally(function(){
            setSubmitting(false);
          })
       }

    return (
        <>
       {
         passwordResetToken!=""?
         <>
              <div>
            {
                <p>{passwordResetMessage}</p>
            }
          <div className="vh-100" >
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-xl-10">
                  <div className="card" style={{borderRadius: '1rem'}}>
                    <div className="row g-0">
                      <div className="col-md-6 col-lg-7 d-flex align-items-center">
                        <div className="card-body p-4 p-lg-5 text-black">
                          
                          <Formik
                            initialValues={{ email: ''}}
                            validationSchema={ForgetPasswordSchema}
                            onSubmit={(values, { setSubmitting }) => {
                              HandleForgetPassword(values,setSubmitting)
                            }}
                          >
                            {({ isSubmitting }) => (
                              <Form>
                                <div className="d-flex align-items-center mb-3 pb-1">
                                  <i className="fas fa-cubes fa-2x me-3" style={{color: '#ff6219'}} />
                                  <span className="h1 fw-bold mb-0">Blog</span>
                                </div>
                                <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: 1}}>Password Reset</h5>
                                <div data-mdb-input-init className="form-outline mb-4">
                                  <label className="form-label" htmlFor="email">Email:</label>
                                  <Field name="email" type="email" id="email" className="form-control form-control-lg" />
                                  <ErrorMessage name="email" component="div" className="text-danger" />
                                </div>
                                
                                <div className="pt-1 mb-4">
                                  <button  data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-lg btn-block" type="submit" disabled={isSubmitting}>
                                    Send Reset Link
                                  </button>
                                </div>
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
         </>
         :
         <>
           
         </>
       }
      
        </>

      )
}

export default ForgetPasswordManage
import React, { useState,useEffect } from "react";
import { Table, Button, Form, FormGroup, Label, Input, Col, Row } from "reactstrap";
import Slidebar from "../Slidebar";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialValues={
  username:"",
  email:"",
  role:"",
  updateIndex:-1
}

function Admin() {
  const roles = [{"value":0,"label":"USER"},
                 {"value":1, "label":"ADMIN"},
                 {"value":2, "label":"BLOGGER"}
              ]

  const [data,setData]=useState([])
  
  const LoadUserData=()=>{
    axios({
      method:"GET",
      url:localStorage.api_url+"api/v1/Users/getusers",
      headers:({'Content-Type':'application/json', 'Authorization': `Bearer ${localStorage.token}`}),
      data:{}
    }).then((function(response)
    {
      setData(response.data)
    })).catch(function(error){
      if(error!=undefined && error!=null)
        {
             // console.log(error)
          if(error.response?.data.response_status=="1")
          {
            toast.error(error.response.data.Message,{autoClose:1900})
            return
          }
        }
    }) 
  }

  useEffect(()=>{
    LoadUserData()
  },[])

  const AdminSchema=Yup.object({

    username: Yup.string()
      .required("Please enter username")
      .min(3,"Username  should at least contain 3 characters.").max(100,"Username should not exceed more than 100 characters."),
    email:Yup.string()
      .required("Please enter email")
      .email('Please enter valid email'),
    role:Yup.number()
    .required('Please select user role')
    
   });

  const {
    values,
    setValues,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm
  } = useFormik({
    initialValues,
    validationSchema: AdminSchema,
    onSubmit: (values, action) => {
      HandleSubmit(values, action);
    },
  });

  const HandleSubmit =(values,action)=>{
      var input_data={
        'username':values.username,
        'email':values.email,
        'role':parseInt(values.role ,null)
      }
      if(values.updateIndex==-1)
      {
        axios({
          method:"POST",
          url:localStorage.api_url+"api/v1/users/createuser",
          headers:({'Content-Type':'application/json', 'Authorization': `Bearer ${localStorage.token}`}),
          data:input_data
        }).then((function(response)
        {
          toast.success("New user added successfully.")
          resetForm()
          LoadUserData()
        })).catch(function(error){
          if(error!=undefined && error!=null)
          {
              //   console.log(error)
            if(error.response.data.response_status=="1")
            {
              toast.error(error.response.data.Message,{autoClose:900})
              return
            }
          }
        }) 
      }
      else
      {
        input_data.userid=values.updateIndex
        axios({
          method:"POST",
          url:localStorage.api_url+"api/v1/users/updateuser",
          headers:({'Content-Type':'application/json', 'Authorization': `Bearer ${localStorage.token}`}),
          data:input_data
        }).then((function(response)
        {
          toast.success("Category updated successfully.")
          resetForm()
          LoadUserData()
        })).catch(function(error){
          if(error!=undefined && error!=null)
            {
                //   console.log(error)
              if(error.response.data.response_status=="1")
              {
                toast.error(error.response.data.Message,{autoClose:900})
                return
              }
            }
        }) 
      }
  }


  const HandleDeleteUser =(userId)=>{
    var userInfo = data.filter((x) => x.userId == userId);
    if (userInfo.length == 0) {
      toast.error("User Not Found!.");
      return;
    }
    toast.info(
      <div className="container">
        <p>Are you sure you want to proceed?</p>
        <button
          className="btn-danger mr-4"
          onClick={() => {HandleDeleteUserConfirm(userId);CancelToast()}}
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
    )
  }

  const HandleDeleteUserConfirm =(userId)=>{
    axios({
      method:"POST",
      url:localStorage.api_url+"api/v1/users/deleteprofile?userid="+userId,
      headers:({'Content-Type':'application/json', 'Authorization': `Bearer ${localStorage.token}`}),
      data:{}
    }).then((function(response)
    {
      toast.success("User Removed Successfully.")
      resetForm()
      LoadUserData()
    })).catch(function(error){
    //  console.log(error)
    if(error!=undefined && error!=null)
      {
        if(error.response.data.response_status=="1")
        {
            toast.error(error.response.data.Message,{autoClose:900})
            return
        }
      }
    }) 
  } 

  const CancelToast =()=>{
    toast.dismiss();
  }

  const HandleEditUser =(userId,username,role,email)=>{
    setValues((p)=>({
      ...p,
      username:username,
      email:email,
      role:role,
      updateIndex:userId
    }))
  }


  return (
    <div>
      <Slidebar />
      <div className="container">
        <section id="blog" className="blog section">
        <h2>Blog User Page</h2>
          <div className="row">
         
            <div className="col-sm-4">
                  <form
                    onSubmit={handleSubmit}
                    className="add-product-form"
                  >
                    <Row>
                      <Col sm="12">
                        <FormGroup>
                          <Label for="username">Username</Label>
                          <Input
                            type="text"
                            name="username"
                            id="username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Please enter username"
                          />
                            {errors.username && touched.username ? (
                            <div className="text-danger">{errors.username}</div>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col sm="12">
                        <FormGroup>
                          <Label for="email">Email</Label>
                          <Input
                            type="email"
                            name="email"
                            id="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Please enter email"
                          />
                          {errors.email && touched.email ? (
                            <div className="text-danger">{errors.email}</div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="12">
                        <FormGroup>
                          <Label for="role">Role</Label>
                          <Input
                            type="select"
                            name="role"
                            id="role"
                            value={values.role}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Please select user role"
                          >
                          {roles.map((role) => (
                              <option key={role.value} value={role.value}>
                                {role.label}
                              </option>
                          ))}
                          </Input>
                          <p>{errors.role && touched.role ? (
                              <div className="text-danger">{errors.role}</div>
                            ) : null}</p>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                          {
                          values.updateIndex==-1?
                          <>
                              <input type="submit" value="Add" defaultValue="add the product"   name="add_product" className="btn" />  
                          </>
                          :
                          <>
                            <input type="submit" value="Update" defaultValue="add the product"   name="add_product" className="btn" /> 
                          </>
                        }
                      </Col>
                      <Col sm="6">
                        {/* <button type="button" onClick={()=>{resetForm()}} className="btn btn-danger"> Clear </button> */}
                      </Col>
                    </Row>
                  </form>
                  
                </div>
                <div className="col-sm-8">
                <div className="table-responsive">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">SN</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        data && data.map((x,i)=>(
                          <tr key={x.userId}>
                            <th scope="row">{i+1}</th>
                            <td>{x.userName}</td>
                            <td>{x.email}</td>
                            <td>{x.role_name}</td>
                            <td>
                              <button className="btn-primary m-1" onClick={()=>{HandleEditUser(x.userId,x.userName,x.role,x.email)}}>Edit</button>
                              <button className="btn-danger m-1" onClick={()=>{HandleDeleteUser(x.userId)}}>Delete</button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Admin;
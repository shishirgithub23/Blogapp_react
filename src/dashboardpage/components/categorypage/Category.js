import React, { useEffect, useState } from "react";
import { Table, Button, Form, FormGroup, Label, Input, Col, Row } from "reactstrap";
import Slidebar from "../Slidebar";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialValues={
  category:"",
  updateIndex:-1
}

function Category() {
  const [data,setData] = useState([])

  const LoadCategories =()=>{
    axios({
      method:"GET",
      url:localStorage.api_url+"api/v1/category/getallcategories",
      headers:({'Content-Type':'application/json', 'Authorization': `Bearer ${localStorage.token}`}),
      data:{}
    }).then((function(response)
    {
      setData(response.data)
    })).catch(function(error){
      if(error!=undefined && error!=null)
      {
        if(error.response.data.response_status=="1")
          {
            toast.error(error.response.data.Message,{autoClose:900})
            return
          }
      }
    //  console.log(error)
      
    }) 
  }

  useEffect(()=>{
    LoadCategories()
  },[])

  const CategorySchema=Yup.object({
    category: Yup.string()
      .required("Please enter category name.")
      .min(3,"Category name should atleast contain 3 characters.").max(100,"Category name should not exceed more than 100 characters.")
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
    validationSchema: CategorySchema,
    onSubmit: (values, action) => {
      HandleSubmit(values, action);
    },
  });

  const HandleSubmit =(values,action)=>{
      var input_data={
        'CategoryName':values.category
      }
      if(values.updateIndex==-1)
      {
        axios({
          method:"POST",
          url:localStorage.api_url+"api/v1/category/createcategory",
          headers:({'Content-Type':'application/json', 'Authorization': `Bearer ${localStorage.token}`}),
          data:input_data
        }).then((function(response)
        {
          toast.success("Category created successfully.")
          resetForm()
          LoadCategories()
        })).catch(function(error){
          if(error!=undefined && error!=null)
            {
                //  console.log(error)
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
        input_data.CategoryId=values.updateIndex
        axios({
          method:"POST",
          url:localStorage.api_url+"api/v1/category/updatecategory",
          headers:({'Content-Type':'application/json', 'Authorization': `Bearer ${localStorage.token}`}),
          data:input_data
        }).then((function(response)
        {
          toast.success("Category updated successfully.")
          resetForm()
          LoadCategories()
        })).catch(function(error){
          if(error!=undefined && error!=null)
            {
               //  console.log(error)
            if(error.response.data.response_status=="1")
            {
              toast.error(error.response.data.Message,{autoClose:900})
              return
            }
            }
       
        }) 
      }
     
  }

  const handleEditClick = (categoryId,categoryName) => {
    setValues((p)=>({
      ...p,
      category:categoryName,
      updateIndex:categoryId
    }))
  };


  const DeleteConfirm =(categoryId)=>{
    var categoryInfo = data.filter((x) => x.categoryId == categoryId);
    if (categoryInfo.length == 0) {
      toast.error("Data Not Found!.");
      return;
    }
    toast.info(
      <div className="container">
        <p>Are you sure you want to proceed?</p>
        <button
          className="btn-danger mr-4"
          onClick={() => {DeleteCategory(categoryId);CancelToast()}}
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

  const DeleteCategory=(categoryId)=>{
    axios({
      method:"POST",
      url:localStorage.api_url+"api/v1/category/deletecategory?categoryId="+categoryId,
      headers:({'Content-Type':'application/json', 'Authorization': `Bearer ${localStorage.token}`}),
      data:{}
    }).then((function(response)
    {
      toast.success("Category Removed Successfully.")
      resetForm()
      LoadCategories()
    })).catch(function(error){
      if(error!=undefined && error!=null)
        {
             // console.log(error)
          if(error.response.data.response_status=="1")
            {
              toast.error(error.response.data.Message,{autoClose:900})
              return
            }
        }
    }) 
  }

  const CancelToast = () => {
    toast.dismiss();
  };

  return (
    <div>
      <Slidebar />
       
      <div className="container">
      <section id="blog" className="blog section">
        <div className="row">
          <div className="col-sm-4">
            <div className={`display-product-table section`}>
              <form
                onSubmit={handleSubmit}
                className="add-product-form"
              >
                <Row>
                  <Col sm="12">
                    <FormGroup>
                      <Label for="category">Category Name</Label>
                      <Input
                        type="text"
                        name="category"
                        id="category"
                        value={values.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter category name"
                      />
                    {errors.category && touched.category ? (
                      <div className="text-danger">{errors.category}</div>
                    ) : null}
                    </FormGroup>
                  </Col>
                </Row>
                {
                  values.updateIndex==-1?
                  <>
                    <button
                        type="submit"
                        defaultValue="add the category"
                        name="add_category"
                        className="btn"
                      > Add </button>
                  </>
                  :
                  <>
                      <button
                        type="submit"
                        defaultValue="add the category"
                        name="add_category"
                        className="btn"
                      > Update </button>
                  </>
                }
              
              </form>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">SN</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  data && data.map((x,i)=>(
                    <tr key={x.categoryId}>
                      <th scope="row">{i+1}</th>
                      <td>{x.categoryName}</td>
                      <td>
                        <button className="btn-primary m-1" onClick={() => handleEditClick(x.categoryId,x.categoryName)}>Edit</button>
                        <button className="btn-danger m-1" onClick={()=>{DeleteConfirm(x.categoryId)}}>Delete</button>
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
        {/* <div className={`display-product-table section`}>
          <table>
            <thead>
              <tr>
                <th>SN</th>
                <th>Category Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((category,index) => (
                <tr key={category.categoryId}>
                  <td>{index+1}</td>
                  <td>{category.categoryName}</td>
                  <td>
                  <Row>
                    <Col sm="6">
                     <button className="option-btn" onClick={() => handleEditClick(category.categoryId,category.categoryName)}>Edit</button>
                    </Col>
                    <Col sm="6">
                      <button className="delete-btn"
                        onClick={() => {
                          DeleteConfirm(category.categoryId)
                        }}
                      >
                        Delete
                      </button>
                    </Col>
                  </Row>
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
        {/* {editCategory && (
          <div className="modal fade show " style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Category</h5>
                  <button
                    type="button"
                    className="close "
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={handleEditFormCancel}
                  >
                    <span aria-hidden="true" >&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form
                    onSubmit={handleEditFormSubmit}
                    action
                    method="post"
                    encType="multipart/form-data"
                  >
                    <Row>
                      <Col sm="6">
                        <FormGroup>
                          <Label for="categoryName">Category Name</Label>
                          <Input
                            type="text"
                            name="categoryName"
                            id="categoryName"
                            defaultValue={editCategory.categoryName}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <input
                      type="submit"
                      defaultValue="update the category"
                      name="update_category"
                      className="btn"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default Category;
import React, { useState,useEffect } from "react";
import Slidebar from '../Slidebar'
import "../admin.css";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const initialValues = {
  title: "",
  description:"",
  category:null,
  image:null,
  imageName:""
};

function Blog() {
  const navigate = useNavigate();

  const location=useLocation();
  const blogId=location.state ;

  const [ddl, setDDL] = useState({
    ddlCategory: []
  });


  const  ClearInputField=()=>{
    setValues(
      initialValues
    )
  }

  const LoadDDL =()=>{
    axios({
      method:"GET",
      url:localStorage.api_url+'api/v1/Blog/getCategoryddl',
      headers:({'Content-Type':'application/json', 'Authorization': `Bearer ${localStorage.token}`}),
      data:{}
    }).then((function(response)
    {
      setDDL((p) => ({
        ...p,
        ddlCategory: response.data.categories || [],
      }))
    })).catch(function(error){
       // console.log(error)
    })
  }


  useEffect(() => {
    LoadDDL();
  }, []);

  useEffect(()=>{
    if(parseInt(blogId || 0)>0)
    {
      axios({
        method:"GET",
        url:localStorage.api_url+"api/v1/blog/getblogbyid?blogId="+blogId,
        headers:({'Content-Type':'application/json', 'Authorization': `Bearer ${localStorage.token}`}),
        data:{}
      }).then((function(response)
      {
        var data= response.data[0];
       
        setValues((p)=>({
          ...p,
          title: data.blogTitle,
          description:data.blogContent,
          category:data.categoryId,
          image:data.image,
          imageName:data.image,
        }))
      })).catch(function(error){
         // console.log(error)
      }) 
    }
  },[blogId])


  const BlogSchema=Yup.object({
    title: Yup.string()
      .required("Please enter blog title."),

    description:Yup.string()
    .required("Please enter blog description."),

    category: Yup.number()
      .oneOf(ddl.ddlCategory.map((option) => option.value))
      .required("Please selectblog category"),

    imageName:Yup.string().required("Please Select Image")
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
    validationSchema: BlogSchema,
    onSubmit: (values, action) => {
      HandleSubmit(values, action);
    },
  });

  const HandleSubmit = (data, action) => {
    const input_data = new FormData();
    input_data.append("BlogTitle",  data.title || "");
    input_data.append("BlogContent",  data.description || "");
    input_data.append("CategoryId",  data.category || 0);
    input_data.append("Image",  data.image || null);
    if(parseInt(blogId || 0)==0)
    {
      axios({
        method:"POST",
        url:localStorage.api_url+"api/v1/blog/createblogpost",
        headers:({'Content-Type':'multipart/form-data', 'Authorization': `Bearer ${localStorage.token}`}),
        data:input_data
      }).then((function(response)
      {
        toast.success("Blog Created Successfully.")
        resetForm()
        ClearInputField()
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
    else
    {
      input_data.append("BlogId",  parseInt(blogId || 0))
     // input_data.append("ImageName",data.imageName)
      axios({
        method:"POST",
        url:localStorage.api_url+"api/v1/blog/updateblog",
        headers:({'Content-Type':'multipart/form-data', 'Authorization': `Bearer ${localStorage.token}`}),
        data:input_data
      }).then((function(response)
      {
        toast.success("Blog Updated Successfully.")
        navigate('/ShowBlog')
      })).catch(function(error){
        if(error!=undefined && error!=null)
        {
          if(error.response.data.response_status=="1")
          {
            toast.error(error.response.data.Message,{autoClose:2000})
            return
          }
        }
        //console.log(error)   
      }) 
    }
    
  };


  const handleFileChange = (event, fieldName) => {
    const file = event.currentTarget.files[0];
    setFieldValue(fieldName, file);
  };


  return (
    <div>
        <Slidebar />
        <div className="container">
          <section className="playlist-form">
            <h1 className="heading">Create Blog</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <p>Blog title <span>*</span></p>
                <input type="text" 
                  name="title" 
                  maxLength={100} 
                  required 
                  placeholder="Enter Blog Title"
                  className="box" 
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                  {errors.title && touched.title ? (
                    <div className="text-danger">{errors.title}</div>
                  ) : null}
              </div>
              <div>
                <p> Blog description <span>*</span></p>
                <textarea
                  name="description" 
                  className="box" 
                  required 
                  placeholder="Enter Blog Description" 
                  maxLength={1000}
                  cols={30} 
                  rows={10}
                  defaultValue={""} 
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.description && touched.description ? (
                    <div className="text-danger">{errors.description}</div>
                  ) : null}
              </div>

              <div>
                <select 
                  name="category" 
                  className="box" 
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.category}
                >
                  <option value="" selected disabled>-- Select Category --</option>
                  {ddl.ddlCategory.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.category && touched.category ? (
                    <div className="text-danger">{errors.category}</div>
                  ) : null}
              </div>
              <div>
                <input 
                    type="file" 
                    name="image" 
                    className="box"
                  // id="image"
                    accept="image/*" 
                  //  required 
                    //value={values.image}
                    onChange={(event) =>
                      {
                        setFieldValue('image', event.currentTarget.files[0])
                        setFieldValue('imageName',event.currentTarget?.files[0]?.name)
                      }
                    }
                    onBlur={handleBlur}
                  />
                  <span>{values.imageName || ''}</span>

                  {errors.imageName && touched.imageName ? (
                    <div className="text-danger">{errors.imageName}</div>
                  ) : null}
              </div>
              {
                parseInt(blogId || 0)==0?<>
                  <div>
                    <button type="submit"  name="submit" className="btn">Create</button>
                  </div>
                </>
                :
                <>
                  <div>
                    <button type="submit"  name="submit" className="btn">Update</button>
                  </div>
                </>
              }
            
            </form>
          </section>
        </div>
    </div>
  )
}

export default Blog

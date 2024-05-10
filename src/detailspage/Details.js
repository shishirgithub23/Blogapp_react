import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
// import { useParams } from "react-router-dom";
import React, { useState, useEffect ,useRef} from "react";
import NavBar from "../components/layout/Navbar";
import "./details.css";
import icecream from "../image/bg.avif";
import { BiLike, BiDislike, BiComment } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { GetDateTime } from "../Library/Common";
import { useFormik } from "formik";
import * as Yup from "yup";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
const CommentSchema=Yup.object({
  // name:Yup.string().required("Please Enter Your Name."),
  // email:Yup.string().required("Please Enter Email").email("Please Enter Valid Email"),
  comment:Yup.string().required("Please Enter Comment")
});

const Details = () => {

  var navigate = useNavigate()

  const initialValues={
    comment:''
  }

  const location=useLocation();
  const [blogId,setBlogId]=useState(location.state || 0)
  
  const [posts,setPosts]=useState([])

  const [categories,setCategories]=useState([])
  const [recentPosts,setRecentPosts]=useState([])
  const [recentPostsBackup,setRecentPostsBackup]=useState([])

  //Ref
  const ref_comment=useRef();
  
  useEffect(()=>{
    LoadBlogCountBycategoryData()
    LoadRecentBlogPostData()
  },[])


  const LoadRecentBlogPostData =()=>{
    
      axios({
        method:"GET",
        url:localStorage.api_url+"api/v1/blog/GetRecentBlogPost",
        headers:({'Content-Type':'application/json', 'Authorization': `Bearer ${localStorage.token}`}),
        data:{}
      }).then((function(response)
      {
        setRecentPosts(response.data)
        setRecentPostsBackup(response.data)
      })).catch(function(error){
         // console.log(error)
      })
  }

  const LoadBlogCountBycategoryData =()=>{
    axios({
      method:"GET",
      url: localStorage.api_url+"api/v1/blog/GetBlogInfoByCategory",
      headers:({'Content-Type':'application/json', 'Authorization': `Bearer ${localStorage.token}`}),
      data:{}
    }).then((function(response)
    {
      // console.log(response.data)
      setCategories(response.data)
    })).catch(function(error){
        //console.log(error)
    }) 
  }


  const LoadBlogData=(blogId)=>{
    if((blogId || 0) >0)
    {
      axios({
        method:"GET",
        url:localStorage.api_url+"api/v1/blog/getBlogbyid?blogId="+blogId,
        headers:({'Content-Type':'application/json', 'Authorization': `Bearer ${localStorage.token}`}),
        data:{}
      }).then((function(response)
      {
        setPosts(response.data)
      })).catch(function(error){
          //console.log(error)
      }) 
    }
  }

  useEffect(()=>{
    LoadBlogData(blogId)
  },[blogId])


  const [commentNumber, setCommentNumber] = useState(0);
  const [likeStatus, setLikeStatus] = useState(null);
  const [likeNumber, setLikeNumber] = useState(0);
  const [dislikeNumber, setDislikeNumber] = useState(0);

  
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
    validationSchema: CommentSchema,
    onSubmit: (values, action) => {
      HandleSubmit(values, action);
    },
  });

  const HandleSubmit =(data, action)=>{
     const input_data={
        'blogId':blogId,
        'CommentText':data.comment || ''
     }
     axios({
      method:"POST",
      url:localStorage.api_url+"api/v1/comments/postcomment",
      headers:({'Content-Type':'application/json', 'Authorization': `Bearer ${localStorage.token}`}),
      data:input_data
    }).then((function(response)
    {
      toast.success("Blog comment success!!",{autoClose:2000})
      resetForm()
      LoadBlogData(blogId)
    })).catch(function(error){
       // console.log(error)
    }) 
  }

  //To Put Focus On Comment When Comment Icon is Clicked.
 const  CommentClicked =()=>{
   ref_comment?.current?.focus();
 }

 const HandleLikeDislike=(val,blogId)=>
  {
    if(val=="like")
    {
      axios({
        method:"POST",
        url:localStorage.api_url+"api/v1/blog/UpVoteBlog?blogId="+blogId,
        headers:({'Content-Type':'application/json','Authorization': `Bearer ${localStorage.token}`}),
        data:{}
      }).then((function(response)
      {
        LoadBlogData(blogId)
      })).catch(function(error){
        if(error.response!=undefined)
          {
            if(error.response?.status==401)
              {
               // navigate("/login")
              }
              //console.log(error)
          }
      }) 
    }
    else
    {
      axios({
        method:"POST",
        url:localStorage.api_url+"api/v1/blog/DownVoteBlog?blogId="+blogId,
        headers:({'Content-Type':'application/json','Authorization': `Bearer ${localStorage.token}`}),
        data:{}
      }).then((function(response)
      {
         LoadBlogData(blogId)
        // console.log(response.data)
      })).catch(function(error){
        if(error.response!=undefined)
        {
          if(error.response?.status==401)
            {
             // navigate("/login")
            }
          //  console.log(error)
        }
      })
    }
  }

  const HandleCommentLikeDislike =(commentid,click)=>{
    if(click=="like")
    {
      axios({
        method:"POST",
        url:localStorage.api_url+"api/v1/blog/UpVoteBlogcomment?commentid="+commentid,
        headers:({'Content-Type':'application/json','Authorization': `Bearer ${localStorage.token}`}),
        data:{}
      }).then((function(response)
      {
        LoadBlogData(blogId)
      })).catch(function(error){
        if(error.response!=undefined)
          {
            if(error.response?.status==401)
              {
               // navigate("/login")
              }
          }
      }) 
    }
    else
    {
      axios({
        method:"POST",
        url:localStorage.api_url+"api/v1/blog/DownVoteBlogComment?commentid="+commentid,
        headers:({'Content-Type':'application/json','Authorization': `Bearer ${localStorage.token}`}),
        data:{}
      }).then((function(response)
      {
         LoadBlogData(blogId)
        // console.log(response.data)
      })).catch(function(error){
        if(error.response!=undefined)
        {
          if(error.response?.status==401)
            {
             // navigate("/login")
            }
        }
      })
    }
  }

  function demo(blogId){
    setBlogId(blogId || 0)
    LoadBlogData(blogId)
  }

  const FilterRecentPostByCategoryId=(categoryid)=>{
    if(parseInt(categoryid || 0)>0)
    {
      setRecentPosts(recentPostsBackup.filter(x=>parseInt(x.CategoryId)==parseInt(categoryid)))
    }
  }

  return (
    <div>
      <NavBar />
      <main id="main">
        {/* ======= Breadcrumbs ======= */}
        <div
          className="breadcrumbs d-flex align-items-center"
          style={{ backgroundImage: `url(${icecream})` }}
        >
          <div
            className="container position-relative d-flex flex-column align-items-center"
            data-aos="fade"
          >
            <h2>Blog Details</h2>
            <ol>
              <li>
                <a onClick={()=>{navigate('/')}}>Home</a>
              </li>
              <li>Blog Details</li>
            </ol>
          </div>
        </div>

        <section id="blog" className="blog">
          <div className="container" data-aos="fade-up" data-aos-delay={100}>
            {posts.map((post, index) => (
              <div className="row g-5">
                <div className="col-lg-8">
                  <article key={index} className="blog-details">
                    <div className="post-img">
                    <img src={localStorage.api_url+post.image} className="img-fluid"  alt={post.bogTitle}  style={{ width: "100%", objectFit: "contain" }}/>
                    </div>
                    <h2 className="title">{post.blogTitle}</h2>
                    <div className="content">
                      <p>{post.blogContent}</p>
                    </div>
                  </article>
                  <div className="comments">
                    <hr />
                    <div className="reaction d-flex justify-content-evenly align-items-center" style={{fontSize:"15px"}}>
                      <h4 className="comments-count">
                        <a onClick={()=>{CommentClicked()}}><BiComment className="me-2" />{post.comment_count || 0}</a>  
                      </h4>
                      <h4 className="comments-count">
                        <BiLike 
                          onClick={()=>{HandleLikeDislike("like",post.blogId)}}
                          className="me-2"
                         /> {post.blog_like}
                      </h4>
                      <h4 className="comments-count">
                        <BiDislike 
                          className="ms-2" 
                          onClick={()=>{HandleLikeDislike("dislike",post.blogId)}}
                        />
                         {post.blog_dislike}
                      </h4>
                    </div>
                    {post.comments && post.comments.map((comment) => (
                      <div
                        key={comment.commentId}
                        id={`comment-${comment.commentId}`}
                        className="comment post-author"
                      >
                         <div className="d-flex align-items-end justify-content-end" style={{fontSize:"15px"}}>
                          <div className="like">
                            <BiLike
                              className="me-2"
                              onClick={() => {
                                HandleCommentLikeDislike(comment.commentId,"like")
                                // Handle like button click
                              }}
                            />
                            <span className="ms-2">{comment.commentLike}</span>
                          </div>
                          <div className="dislike ms-3">
                            <BiDislike
                              className="ms-2"
                              onClick={() => {
                                HandleCommentLikeDislike(comment.commentId,"dislike")
                                // Handle dislike button click
                              }}
                            />
                            <span className="ms-2">
                              {comment.commnetDislike}
                            </span>
                          </div>
                        </div>
                        <div className="d-flex">
                          <div>
                            <strong style={{ fontSize: "x-large" }}>
                              {comment.comment_UserName}
                            </strong>

                            <time dateTime={comment.date}>{GetDateTime(comment.commentCreatedAt)}</time>
                            <p>{comment.commentText}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* End comment #1 */}

                    <div className="reply-form">
                      <h4>Leave a comment</h4>
                      <p>
                        {/* Your email address will not be published. */}
                        Required fields are marked *{" "}
                      </p>
                      <form onSubmit={handleSubmit}>
                        {/* <div className="row">
                          <div className="col-md-6 form-group">
                            <input
                              name="name"
                              type="text"
                              className="form-control"
                              placeholder="Your Name*"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="col-md-6 form-group">
                            <input
                              name="email"
                              type="text"
                              className="form-control"
                              placeholder="Your Email*"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div> */}

                        <div className="row">
                          <div className="col form-group">
                            <textarea
                              ref={ref_comment}
                              name="comment"
                              className="form-control"
                              placeholder="Your Comment*"
                              defaultValue={""}
                              value={values.comment}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Post Comment
                        </button>
                      </form>
                    </div>
                  </div>
                  {/* End blog comments */}
                </div>
                <div className="col-lg-4">
                  <div className="sidebar">
                    <div className="sidebar-item categories">
                      <h3 className="sidebar-title">Filter Post {">>"}  Categories</h3>
                      <ul className="mt-3">
                        {categories.map((category, index) => (
                          <li key={index}>
                            <a onClick={()=>{FilterRecentPostByCategoryId(category.categoryId)}}>
                              {category.name}{" "}
                              <span>({category.postNumber})</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="sidebar-item recent-posts">
                      <h3 className="sidebar-title">Recent Posts</h3>
                      {recentPosts.map((recentPosts) => (

                      <div className="mt-3">
                        
                      <a onClick={()=>{demo(recentPosts.BlogId)}}>
                        <div className="post-item mt-3">
                          <img src={localStorage.api_url+recentPosts.image} className="img-fluid" alt={"Blog Image"}/>
                          {/* <img src={recentPosts.image} alt /> */}
                          <div>
                            <h4>
                              {recentPosts.title}
                            </h4>
                            <time dateTime={recentPosts.date}> {GetDateTime(recentPosts.date)}</time>
                          </div>
                        </div>
                      </a>
                        
                      </div>
                     ))}

                    </div>
                    {/* End sidebar recent posts*/}
                  </div>
                  {/* End Blog Sidebar */}
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* End Blog Details Section */}
      </main>
    </div>
  );
};

export default Details;

import React, { useEffect, useState } from "react";
import NavBar from "../components/layout/Navbar";
import "./blog.css";

import { BiLike, BiDislike } from "react-icons/bi";
import icecream from "../image/bg.avif";
import { BiComment } from "react-icons/bi"; // Import BiComment component
import { Link } from "react-router-dom"; // Import the Link component from react-router-dom
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { GetDateTime } from "../Library/Common";

function Blog() {

  const navigate = useNavigate();

  const [posts,setPosts]=useState([])


  const LoadBlog =()=>{
    axios({
      method:"GET",
      url:localStorage.api_url+"api/v1/blog/getblogs",
      headers:({'Content-Type':'application/json'}),
      data:{}
    }).then((function(response)
    {
      // console.log(response.data)
      setPosts(response.data)
    })).catch(function(error){
      //  console.log(error)
    }) 
  }

  useEffect(()=>{
     LoadBlog()
  },[])

 
  const [likeStatus, setLikeStatus] = useState(null);
  const [likeNumber, setLikeNumber] = useState(0); // Initialize likeNumber to 0
  const [dislikeNumber, setDislikeNumber] = useState(0); // Initialize dislikeNumber to 0
  
  const [CommentNumber, setCommentNumber] = useState(0); // Initialize commentNumber to 0


  const ReadMore =(blogId)=>{
    navigate("/details",{state:blogId})
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
          LoadBlog()
          // console.log(response.data)
        })).catch(function(error){
          if(error!=undefined && error!=null)
            {
              if(error.response?.status==401)
                {
                  navigate("/login")
                }
               // console.log(error)
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
          LoadBlog()
          // console.log(response.data)
        })).catch(function(error){
          if(error!=undefined && error!=null)
            {
              if(error.response?.status==401)
                {
                  navigate("/login")
                }
            }
          //console.log(error)
        })
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
            <h2>Blog</h2>
            <ol>
              <li>
                <a onClick={()=>{navigate('/')}}>Home</a>
              </li>
              <li>Blog</li>
            </ol>
          </div>
        </div>
        {/* End Breadcrumbs */}
      </main>
      <section id="blog" className="blog">
          <div className="container" data-aos="fade-up" data-aos-delay={100}>
            <div className="row gy-4 posts-list">
              {posts
                .map((post, index) => (
                  <div className="col-xl-4 col-md-6" key={post.blogId}>
                    <div className="post-item position-relative h-100">
                      <div className="post-img position-relative overflow-hidden">
                        <img src={localStorage.api_url+post.image} className="img-fluid" alt="Blog Image" />
                        <span className="post-date">{GetDateTime(post.createdAt)}</span>
                      </div>
                      <hr />
                      <div className="post_like">
                        <div className="like">
                          <span className="me-2">{post.blog_like}</span>{" "}
                          <BiLike
                            className="me-2"
                            onClick={() =>
                              HandleLikeDislike("like",post.blogId)
                            }
                          />
                          {likeStatus === "like" && (
                            <span className="text-primary">Liked</span>
                          )}
                          {/* add like number */}
                        </div>
                        <div className="dislike">
                          <span className="ms-2">{post.blog_dislike}</span>{" "}
                          <BiDislike
                            className="ms-2"
                            onClick={() =>
                              HandleLikeDislike("dislike",post.blogId)
                            }
                          />
                          {likeStatus === "dislike" && (
                            <span className="text-danger">Disliked</span>
                          )}
                          {/* add dislike number */}
                        </div>
                        {/* <div className="comment">
                          <span className="ms-2">{post.commentText}</span>{" "}
                          <BiComment className="ms-2" />
                        </div> */}
                      </div>
                      <hr />
                      <div className="post-content d-flex flex-column">
                        <h3 className="post-title">{post.blogTitle} </h3>

                        <div className="meta d-flex align-items-center">
                          <div className="d-flex align-items-center">
                            <i className="bi bi-person" />{" "}
                            <span className="ps-2">{post.userName}</span>
                          </div>
                          <span className="px-3 text-black-50">/</span>
                          <div className="d-flex align-items-center">
                            <i className="bi bi-folder2" />{" "}
                            <span className="ps-2">{post.categoryName}</span>
                          </div>
                        </div>
                        <p>
                          {post.blogContent}
                        </p>
                        <hr />
                        
                        <a className="nav-link scrollto" onClick={()=>ReadMore(post.blogId)}>Read more</a>
                         
                        {/* <Link to="/details">
                          
                        </Link> */}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
    </div>
  );
}

export default Blog;

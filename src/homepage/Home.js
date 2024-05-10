import React, { useEffect, useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import NavBar from "../components/layout/Navbar";
import icecream from "../image/bg.avif";
import "./home.css";
import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";
import { BiComment } from "react-icons/bi"; // Import BiComment component
import { BiLike, BiDislike } from "react-icons/bi";
import axios from "axios";
import { GetDateTime } from "../Library/Common";
import { useNavigate } from 'react-router-dom';
import { width } from "@fortawesome/free-solid-svg-icons/fa0";


const Home = () => {

  const navigate = useNavigate();

  const [likeStatus, setLikeStatus] = useState(null);
  const [likeNumber, setLikeNumber] = useState(0); // Initialize likeNumber to 0
  const [dislikeNumber, setDislikeNumber] = useState(0); // Initialize dislikeNumber to 0
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  //  const [category, setCategory] = useState("all");
  const [CommentNumber, setCommentNumber] = useState(0); // Initialize commentNumber to 0

  const [categories, setCategory] = useState([]);
  const [categoriesBackup, setCategoryBackup] = useState([]);

  const [filterByCategoryId,setFilerByCategoryId]=useState(0)
  const [posts,setPosts]=useState([])
  const [filteredPost,setFilteredPost]=useState([])

  const LoadAllBlogs=()=>{
    axios({
      method:"GET",
      url:localStorage.api_url+"api/v1/blog/getblogs",
      headers:({'Content-Type':'application/json'}),
      data:{}
    }).then((function(response)
    {
      setPosts(response.data)
      setFilteredPost(response.data)
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
  
  const LoadAllCategory=()=>{
    axios
      .get(localStorage.api_url+"api/v1/Category/getallcategorieshome")
      .then(function (response) {
        setCategory(response.data || []);
        setCategoryBackup(response.data || []);
      })
      .catch(function (error) {
        
        if(error.response?.status==401)
          {
            navigate("/login")
          }
      //  console.log(error);
      })
      .finally(function () {
      });
  }

  useEffect(() => {
    LoadAllBlogs()
    LoadAllCategory()
  }, []);

  const handleCategoryClick = (categoryId) => {
    setFilerByCategoryId(categoryId)

    setFilteredPost(posts.filter(x=>x.categoryId==categoryId))
  };


  const ReadMore =(blogId)=>{
    navigate("/details",{state:blogId})
  }

  const HandleLikeDislike=(val,blogId)=>
  {

    // setLikeStatus((prevStatus) =>
    //   prevStatus === val? null : val
    // )

    if(val=="like")
    {
      axios({
        method:"POST",
        url:localStorage.api_url+"api/v1/blog/UpVoteBlog?blogId="+blogId,
        headers:({'Content-Type':'application/json','Authorization': `Bearer ${localStorage.token}`}),
        data:{}
      }).then((function(response)
      {
        LoadAllBlogs()
        // console.log(response.data)
      })).catch(function(error){
        if(error.response?.status==401)
        {
          navigate("/login")
        }
          //console.log(error)
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
        LoadAllBlogs()
        // console.log(response.data)
      })).catch(function(error){
        if(error.response?.status==401)
        {
          navigate("/login")
        }
       // console.log(error)
      })
    }
  }

  return (
    <div>
      <NavBar />
      <section id="hero" className="hero">
        <div className="info d-flex align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center">
                <h2 data-aos="fade-down">
                  Welcome to <span> OUR BLOG</span>
                </h2>
                <p data-aos="fade-up">
                  {" "}
                  our passion is to deliver engaging and thought-provoking
                  content that resonates with your curiosity.
                </p>
                <Link to="/blog">
                  <a
                    data-aos="fade-up"
                    data-aos-delay={200}
                    className="btn-get-started"
                  >
                    OUR BLOG
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          id="hero-carousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval={5000}
        >
          <div
            className="carousel-item active"
            style={{ backgroundImage: `url(${icecream})` }}
          />
        </div>
      </section>

      <div className="gallery">
        <ul className="controls">
          {categories && categories.map((cat, index) => (
              <li
                className={`buttons ${
                  filterByCategoryId == cat.categoryId ? "active" : ""
                }`}
                key={index}
                onClick={() => handleCategoryClick(cat.categoryId)}
              >
                <p>{cat.categoryName}</p>
              </li>
            ))}
        </ul>
        <div id="blog" className="blog">
          <div className="container" data-aos="fade-up" data-aos-delay={100}>
            <div className="row gy-4 posts-list">
              {filteredPost && filteredPost.map((post, index) => (
                  <div className="col-xl-4 col-md-6" key={post.blogId}>
                    <div className="post-item position-relative h-100">
                      <div className="post-img position-relative overflow-hidden">
                      <img src={localStorage.api_url+post.image} className="img-fluid" alt="Blog Image" />
                        {/* <img src={post.image} className="img-fluid" alt /> */}
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
                              // setLikeStatus((prevStatus) =>
                              //   prevStatus === "like" ? null : "like"
                              // )
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
                              // setLikeStatus((prevStatus) =>
                              //   prevStatus === "dislike" ? null : "dislike"
                              // )
                            }
                          />
                          {likeStatus === "dislike" && (
                            <span className="text-danger">Disliked</span>
                          )}
                          {/* add dislike number */}
                        </div>
                        {/* <div className="comment">
                          <span className="ms-2">{post.comments}</span>{" "}
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
                        <p>{post.blogContent}</p>
                        <hr />

                        <a className="nav-link scrollto" onClick={()=>ReadMore(post.blogId)}>Read more</a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import NavBar from "../components/layout/Navbar";
import "./details.css";
import icecream from "../image/bg.avif";
import { BiLike, BiDislike, BiComment } from "react-icons/bi";

const Details = () => {
  const posts = [
    {
      title: "Blog Title 1",
      details: "Blog Details 1",
      image: icecream,
      category: "ice-cream",
      likes: 0,
      dislikes: 0,
      comments: 0,
      blogger: "Blogger Name",
      date: "2022-01-01",
    },
  ];
  const comments = [
    {
      id: 1,
      date: "2022-01-01",
      text: "Et rerum totam nisi. Molestiae vel quam dolorum vel voluptatem et et. Est ad aut sapiente quis molestiae est qui cum soluta. Vero aut rerum vel. Rerum quos laboriosam placeat ex qui. Sint qui facilis et.",
      likeNumber: 10,
      dislikeNumber: 5,
      username: "Suman",
    },
    // Add more comments as needed
  ];
  const categories = [
    { name: "General", postNumber: 25 },
    { name: "Lifestyle", postNumber: 12 },
    { name: "Travel", postNumber: 5 },
    { name: "Design", postNumber: 22 },
    { name: "Creative", postNumber: 8 },
    { name: "Education", postNumber: 14 },
  ];
  const recentPosts = [
    {
 
      title: "Nihil blanditiis at in nihil autem",
      image: icecream,
      date: "2020-01-01"
    },
    {
  
      title: "Quidem autem et impedit",
      image: icecream,
      date: "2020-01-01"
    },
    {
 
      title: "Id quia et et ut maxime similique occaecati ut",
      image: icecream,
      date: "2020-01-01"
    },
    {

      title: "Laborum corporis quo dara net para",
      image: icecream,
      date: "2020-01-01"
    },
    {

      title: "Et dolores corrupti quae illo quod dolor",
      image: icecream,
      date: "2020-01-01"
    }
  ];

  const [commentNumber, setCommentNumber] = useState(0);
  const [likeStatus, setLikeStatus] = useState(null);
  const [likeNumber, setLikeNumber] = useState(0);
  const [dislikeNumber, setDislikeNumber] = useState(0);

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
                <a href="index.html">Home</a>
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
                      <img
                        src={post.image}
                        alt={post.title}
                        className="img-fluid"
                        style={{ width: "100%", objectFit: "contain" }}
                      />
                    </div>
                    <h2 className="title">{post.title}</h2>
                    <div className="content">
                      <p>{post.details}</p>
                    </div>
                  </article>

                  <div className="comments">
                    <hr />
                    <div className="reaction d-flex justify-content-evenly align-items-center">
                      <h4 className="comments-count">
                        <BiComment className="me-2" /> {post.comments}
                      </h4>
                      <h4 className="comments-count">
                        <BiLike className="me-2" /> {post.likes}
                      </h4>
                      <h4 className="comments-count">
                        <BiDislike className="ms-2" /> {post.dislikes}
                      </h4>
                    </div>

                    {comments.map((comment) => (
                      <div
                        key={comment.id}
                        id={`comment-${comment.id}`}
                        className="comment post-author"
                      >
                        <div className="d-flex align-items-end justify-content-end">
                          <div className="like">
                            <BiLike
                              className="me-2"
                              onClick={() => {
                                // Handle like button click
                              }}
                            />
                            <span className="ms-2">{comment.likeNumber}</span>
                          </div>
                          <div className="dislike ms-3">
                            <BiDislike
                              className="ms-2"
                              onClick={() => {
                                // Handle dislike button click
                              }}
                            />
                            <span className="ms-2">
                              {comment.dislikeNumber}
                            </span>
                          </div>
                        </div>
                        <div className="d-flex">
                          <div>
                            <strong style={{ fontSize: "x-large" }}>
                              {comment.username}
                            </strong>

                            <time dateTime={comment.date}>{comment.date}</time>
                            <p>{comment.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* End comment #1 */}

                    <div className="reply-form">
                      <h4>Leave a comment</h4>
                      <p>
                        Your email address will not be published. Required
                        fields are marked *{" "}
                      </p>
                      <form action>
                        <div className="row">
                          <div className="col-md-6 form-group">
                            <input
                              name="name"
                              type="text"
                              className="form-control"
                              placeholder="Your Name*"
                            />
                          </div>
                          <div className="col-md-6 form-group">
                            <input
                              name="email"
                              type="text"
                              className="form-control"
                              placeholder="Your Email*"
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col form-group">
                            <textarea
                              name="comment"
                              className="form-control"
                              placeholder="Your Comment*"
                              defaultValue={""}
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
                      <h3 className="sidebar-title">Categories</h3>
                      <ul className="mt-3">
                        {categories.map((category, index) => (
                          <li key={index}>
                            <a href="#">
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
             
                        <div className="post-item mt-3">
                          <img src={recentPosts.image} alt />
                          <div>
                            <h4>
                              {recentPosts.title}
                            </h4>
                            <time dateTime="2020-01-01"> {recentPosts.date}</time>
                          </div>
                        </div>
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

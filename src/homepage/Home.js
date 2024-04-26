import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import NavBar from "../components/layout/Navbar";
import icecream from "../image/bg.avif";
import "./home.css";
import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";
import { BiComment } from "react-icons/bi"; // Import BiComment component
import { BiLike, BiDislike } from "react-icons/bi";

const Home = () => {
  const [likeStatus, setLikeStatus] = useState(null);
  const [likeNumber, setLikeNumber] = useState(0); // Initialize likeNumber to 0
  const [dislikeNumber, setDislikeNumber] = useState(0); // Initialize dislikeNumber to 0

  const [CommentNumber, setCommentNumber] = useState(0); // Initialize commentNumber to 0
  const categories = [
    "all",
    "ice-cream",
    "chocolate",
    "cake",
    "juice",
    "sandwich",
  ];

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
    {
      title: "hero",
      details: "Blog Details 2",
      image: icecream,
      category: "chocolate",
      likes: 1,
      dislikes: 3,
      comments: 4,
      blogger: "Blogger Name",
      date: "2022-01-01",
    },
   
    // Add more posts here
  ];

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [category, setCategory] = useState("all");

  const handleCategoryClick = (cat) => {
    setCategory(cat === "" ? "" : cat);
  };

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
          {categories.map((cat, index) => (
            <li
              className={`buttons ${cat === category ? "active" : ""}`}
              data-filter={cat}
              key={index}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
        <div id="blog" className="blog">
          <div className="container" data-aos="fade-up" data-aos-delay={100}>
            <div className="row gy-4 posts-list">
              {posts
                .filter(
                  (post) => category === "all" || post.category === category
                )
                .map((post, index) => (
                  <div className="col-xl-4 col-md-6" key={index}>
                    <div className="post-item position-relative h-100">
                      <div className="post-img position-relative overflow-hidden">
                        <img src={post.image} className="img-fluid" alt />
                        <span className="post-date">{post.date}</span>
                      </div>
                      <hr />
                      <div className="post_like">
                        <div className="like">
                          <span className="me-2">{post.likes}</span>{" "}
                          <BiLike
                            className="me-2"
                            onClick={() =>
                              setLikeStatus((prevStatus) =>
                                prevStatus === "like" ? null : "like"
                              )
                            }
                          />
                          {likeStatus === "like" && (
                            <span className="text-primary">Liked</span>
                          )}
                          {/* add like number */}
                        </div>
                        <div className="dislike">
                          <span className="ms-2">{post.dislikes}</span>{" "}
                          <BiDislike
                            className="ms-2"
                            onClick={() =>
                              setLikeStatus((prevStatus) =>
                                prevStatus === "dislike" ? null : "dislike"
                              )
                            }
                          />
                          {likeStatus === "dislike" && (
                            <span className="text-danger">Disliked</span>
                          )}
                          {/* add dislike number */}
                        </div>
                        <div className="comment">
                          <span className="ms-2">{post.comments}</span>{" "}
                          <BiComment className="ms-2" />
                        </div>
                      </div>
                      <hr />
                      <div className="post-content d-flex flex-column">
                        <h3 className="post-title">{post.title} </h3>

                        <div className="meta d-flex align-items-center">
                          <div className="d-flex align-items-center">
                            <i className="bi bi-person" />{" "}
                            <span className="ps-2">{post.blogger}</span>
                          </div>
                          <span className="px-3 text-black-50">/</span>
                          <div className="d-flex align-items-center">
                            <i className="bi bi-folder2" />{" "}
                            <span className="ps-2">{post.category}</span>
                          </div>
                        </div>
                        <p>
                        {post.details}
                        </p>
                        <hr />

                        <Link to="/details">
                          <a className="nav-link scrollto">Read more</a>
                        </Link>
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

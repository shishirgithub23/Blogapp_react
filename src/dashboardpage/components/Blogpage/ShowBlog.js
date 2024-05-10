import React, { useEffect, useState } from "react";
import Slidebar from '../Slidebar'
import icecream from "../../../image/bg.avif";
import { BiLike, BiDislike } from "react-icons/bi";
import { BiComment } from "react-icons/bi"; // Import BiComment component
import { Link } from "react-router-dom"; // Import the Link component from react-router-dom
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {GetDateTime} from "../../../Library/Common";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ShowBlog() {

    const navigate = useNavigate();
    const [likeStatus, setLikeStatus] = useState(null);
    const [likeNumber, setLikeNumber] = useState(0); // Initialize likeNumber to 0
    const [dislikeNumber, setDislikeNumber] = useState(0); // Initialize dislikeNumber to 0
    
    const [CommentNumber, setCommentNumber] = useState(0); // Initialize commentNumber to 0




    // const posts = [
    //     {
    //       title: "Blog Title 1",
    //       details: "Blog Details 1",
    //       image: icecream,
    //       category: "ice-cream",
    //       likes: 0,
    //       dislikes: 0,
    //       comments: 0,
    //       blogger: "Blogger Name",
    //       date: "2022-01-01",
    //     },
    //     {
    //       title: "Blog Title 1",
    //       details: "Blog Details 1",
    //       image: icecream,
    //       category: "ice-cream",
    //       likes: 0,
    //       dislikes: 0,
    //       comments: 0,
    //       blogger: "Blogger Name",
    //       date: "2022-01-01",
    //     },
    //     {
    //       title: "hero",
    //       details: "Blog Details 2",
    //       image: icecream,
    //       category: "chocolate",
    //       likes: 1,
    //       dislikes: 3,
    //       comments: 4,
    //       blogger: "Blogger Name",
    //       date: "2022-01-01",
    //     },
       
    //     // Add more posts here
    //   ];

  const [posts,setPosts]=useState([])

  useEffect(()=>{
    LoadAllBlogs();
  },[])

  const LoadAllBlogs=()=>{
    axios({
      method:"GET",
      url:localStorage.api_url+"api/v1/blog/getblogs",
      headers:({'Content-Type':'application/json','Authorization': `Bearer ${localStorage.token}`}),
      data:{}
    }).then((function(response)
    {
      setPosts(response.data)

    })).catch(function(error){
      //  console.log(error)  
    }) 
  }

  // const ReadMore =(blogId)=>{
  //   navigate("/details",{state:blogId})
  // }

  const HandleEdit=(blogId)=>{
    navigate("/AddBlog",{state:blogId})
  }
  
  const HandleDelete=(blogId)=>{
    var subject_info = posts.filter((x) => x.blogId == blogId);
    if (subject_info.length == 0) {
      toast.error("Data Not Found!.");
      return;
    }
    toast.info(
      <div className="container">
        <p>Are you sure you want to proceed?</p>
        <button
          className="btn-danger mr-4"
          onClick={() => ConfirmDelete(blogId)}
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
    );
  }

  const ConfirmDelete =(blogId)=>{

    CancelToast()
    axios({
      method:"POST",
      url:localStorage.api_url+"api/v1/blog/deleteBlog?blogId="+parseInt(blogId || 0),
      headers:({'Content-Type':'application/json', 'Authorization': `Bearer ${localStorage.token}`}),
      data:{}
    }).then((function(response)
    {
      toast.success("Data deleted successfully.")
      LoadAllBlogs()
    })).catch(function(error){
      //  console.log(error)
    }) 
  }


  const CancelToast = () => {
    toast.dismiss();
  };

  return (
    <div>
        <Slidebar />
        <section id="blog" className="blog section">
          <Link to="/AddBlog">
            <a className= "nav-link scrollto btn" id="add">
              <i className="fas fa-home" />
              <span>AddBlog</span>
            </a>
          </Link>
          <div className="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">SN</th>
                    <th scope="col">Title</th>
                    <th scope="col">Category</th>
                    <th scope="col">Created By</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Like</th>
                    <th scope="col">Dislike</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    posts.map((x,i)=>(
                      <tr key={x.blogId}>
                        <th scope="row">{i+1}</th>
                        <td>{x.blogTitle}</td>
                        <td>{x.categoryName}</td>
                        <td>{x.userName}</td>
                        <td>{GetDateTime(x.createdAt)}</td>
                        <td>{x.blog_like}</td>
                        <td>{x.blog_dislike}</td>
                        <td>
                          <button className="btn-primary m-1" onClick={()=>{HandleEdit(x.blogId)}}>Edit</button>
                          <button className="btn-danger m-1" onClick={()=>{HandleDelete(x.blogId)}}>Delete</button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
          </div>
        </section>
    </div>
  )
}

export default ShowBlog

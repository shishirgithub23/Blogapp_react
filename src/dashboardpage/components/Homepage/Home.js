import React, { useEffect, useState } from 'react'
import Slidebar from '../Slidebar'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { GetDateTime } from '../../../Library/Common';
import { useNavigate } from 'react-router-dom';
import Header from '../../../Layout/AdminLayout/Header';

function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('')

  const [dashboardData,setDashboardData]=useState({
    'username':'',
    'total_blogs':'',
    'total_comments':'',
    'total_like':'',
    'total_dislike':'',
    'blogData':[]
 })
  
 useEffect(()=>{
    axios({
      method:"GET",
      url:localStorage.api_url+"api/v1/dashboard/GetDashboardData",
      headers:({'Content-Type':'application/json','Authorization': `Bearer ${localStorage.token}`}),
      data:{}
    }).then((function(response)
    {
      setDashboardData(response.data)
    })).catch(function(error){
      if(error!=undefined && error!=null)
      {
        if(error.response?.status==403)
          {
            navigate('/unauthorized')
          }
         // console.log(error) 
      }
    }) 
 },[])

 const filteredBlogs = 
   (dashboardData.blogData || [] ).filter(blog =>
     blog.BlogTitle.toLowerCase().includes(searchTerm.toLowerCase())
   )
   
  return (
    <div className='body'>
      <Slidebar />
      <section className="dashboard section p-l-6">
        <h1 className="heading">dashboard</h1>
        <div className="box-container">
          <div className="box">
            <h3>welcome!</h3>
            <p>{dashboardData.username || ''}</p>
    
          </div>
         
          <div className="box">
            <h3>{dashboardData.total_blogs || 0}</h3>
            <p>Total Blog</p>
          </div>
          <div className="box">
            <h3>{dashboardData.total_comments || 0}</h3>
            <p>Total comment</p>
         
          </div>
          <div className="box">
            <h3>{dashboardData.total_like || 0}</h3>
            <p>Total like</p>
         
          </div>
          <div className="box">
            <h3>{dashboardData.total_dislike || 0}</h3>
            <p>Total dislike</p>
         
          </div>
        </div>

        <h1 className="heading text-center">Blog posts</h1>
        <input className="text-end form-control m-4 "
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        /> 

        <div className="display-product-table">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Title</th>
                <th>Created At</th>
                <th>Total Like</th>
                <th>Total Dislike</th>
                {/* <th></th> */}
              </tr>
            </thead>
            <tbody>
              {(filteredBlogs || []).map((blog) => (
                <tr key={blog.BlogId}>
                  <td>{blog.BlogTitle}</td>
                  <td>{GetDateTime(blog.createdAt)}</td>
                  <td>{blog.blog_like}</td>
                  <td>{blog.blog_dislike}</td>
               
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default Home
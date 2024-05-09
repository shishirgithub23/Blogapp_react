import React, { useState } from "react";
import Slidebar from '../Slidebar'
import "../admin.css";
function UpdateBlog() {

  return (
    <div>
    <Slidebar />
      <section className="playlist-form ">
        <form action method="post" encType="multipart/form-data">
        <h1 className="heading color-black">Update  Blog</h1>

      
          <p>Blog title <span>*</span></p>
          <input type="text" name="title" maxLength={100} required placeholder="enter Blog title" className="box" />
          <p> Blog description <span>*</span></p>
          <textarea name="description" className="box" required placeholder="write description" maxLength={1000} cols={30} rows={10} defaultValue={""} />

          <select name="category_name" className="box" required>
            <option value="" selected disabled>-- Select Category --</option>
            <option value="Technology">Technology</option>
            <option value="Fashion">Fashion</option>
            <option value="Travel">Travel</option>
      
          </select>
          <input type="file" name="image" accept="image/*" required className="box" />
          <input type="submit" defaultValue="create playlist" name="submit" className="btn" />
        </form>
      </section>
    </div>
  )
}
export default UpdateBlog

import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const { data } = await axios.get("http://localhost:5000/api/blogs");
    setBlogs(data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/blogs/${id}`);
    fetchBlogs();
  };

  return (
    <div className="p-10">
      <h2>Manage Blogs</h2>
      {blogs.map((blog) => (
        <div key={blog._id} className="flex justify-between border p-4">
          <span>{blog.title}</span>
          <button onClick={() => handleDelete(blog._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ManageBlogs;
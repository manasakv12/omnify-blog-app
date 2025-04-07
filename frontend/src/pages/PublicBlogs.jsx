import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";

const PublicBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/blogs?page=${page}`);
        setBlogs(res.data.blogs);
        setTotalPages(res.data.totalPages);

        console.log("📦 Blogs fetched:", res.data.blogs.length);
        console.log("📄 Total pages:", res.data.totalPages);
      } catch (err) {
        console.error("❌ Failed to fetch blogs:", err);
      }
    };

    fetchBlogs();
  }, [page, API_BASE_URL]);

  // ⬇️ Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  console.log("🧭 Current Page:", page);

  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold mb-4">📚 Explore Blogs</h1>
      {blogs.length === 0 ? (
        <p className="text-xl text-gray-600">No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white p-4 m-4 border rounded shadow-md max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-700">{blog.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              ✍️ By {blog.author?.email}
            </p>
          </div>
        ))
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => {
              console.log("➡️ Changing page to:", value);
              setPage(value);
            }}
            color="primary"
          />
        </div>
      )}
    </div>
  );
};

export default PublicBlogs;

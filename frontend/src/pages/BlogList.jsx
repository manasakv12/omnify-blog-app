// src/pages/BlogList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Pagination,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs?page=${page}`);
        console.log("📦 Blog Response:", res.data);

        // Defensive check
        if (res.data && Array.isArray(res.data.blogs)) {
          setBlogs(res.data.blogs);
          setTotalPages(res.data.totalPages || 1);
        } else {
          console.warn("⚠️ Unexpected response structure");
          setBlogs([]);
          setTotalPages(1);
        }
      } catch (err) {
        console.error("❌ Failed to fetch blogs", err);
        setBlogs([]);
        setTotalPages(1);
        // Optional: Show toast error here
      }
    };

    fetchBlogs();
  }, [page]);

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4, px: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        📝 All Blogs
      </Typography>

      <Grid container spacing={3}>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" sx={{ my: 1 }} color="text.secondary">
                    {blog.content?.slice(0, 80)}...
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/blogs/${blog._id}`)}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography align="center" color="text.secondary" mt={4}>
              No blogs available.
            </Typography>
          </Grid>
        )}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default BlogList;

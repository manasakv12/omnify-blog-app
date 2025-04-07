import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        if (!toast.isActive("fetch-error")) {
          toast.error("Failed to load blog", { toastId: "fetch-error" });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Blog deleted successfully!");
      navigate("/blogs");
    } catch (err) {
      console.error("Error deleting blog", err);
      toast.error("Failed to delete blog");
    }
  };

  if (loading) {
    return (
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!blog) {
    return (
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h5" color="error">
          Blog not found.
        </Typography>
        <Button variant="contained" component={Link} to="/blogs" sx={{ mt: 2 }}>
          Back to Blog List
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4">{blog.title}</Typography>
      <Typography variant="body1" sx={{ my: 2 }}>
        {blog.content}
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/edit/${blog._id}`}
        >
          Edit
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="outlined" component={Link} to="/blogs">
          Back to Blog List
        </Button>
      </Stack>
    </Box>
  );
};

export default BlogDetails;

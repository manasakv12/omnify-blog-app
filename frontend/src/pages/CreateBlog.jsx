import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateBlog() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must be logged in to create a blog.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/blogs",
        {
          title: formData.title,
          content: formData.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Blog created successfully!");
      navigate("/blogs");
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error(error.response?.data?.message || "Failed to create blog");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>Create Blog</Typography>

      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Content"
        name="content"
        value={formData.content}
        onChange={handleChange}
        multiline
        rows={6}
        fullWidth
        margin="normal"
        required
      />

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
}

export default CreateBlog;

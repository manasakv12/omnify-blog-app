import React, { useState } from "react";
import { TextField, Button, Typography, Box, Stack } from "@mui/material";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";


function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/signup", formData);

      if (res.status === 201) {
        toast.success("Signup successful! 🎉");
        navigate("/login");
      } else {
        toast.error("Signup failed. Try again.");
      }
    } catch (err) {
      toast.error("Error: " + (err.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 6 }}>
      <Typography variant="h4" gutterBottom>Signup</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          fullWidth
          margin="normal"
          required
        />
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button type="submit" variant="contained">
            Signup
          </Button>
          <Button
            variant="outlined"
            component={Link}
            to="/login"
          >
            Already registered? Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default Signup;

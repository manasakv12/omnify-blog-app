import React, { useState } from "react";
import { TextField, Button, Box, Typography, Stack } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
  
      const { token } = response.data;
  
      if (token) {
        localStorage.setItem("token", token); // ✅ Store token
        toast.success("Login successful!");
        navigate("/blogs");
      } else {
        toast.error("Token not received from server.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 6 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
          <Button
            variant="outlined"
            component={Link}
            to="/signup"
          >
            Not registered? Sign up
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default Login;

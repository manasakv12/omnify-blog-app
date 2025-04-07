// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Navbar";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateBlog from "./pages/CreateBlog";
import BlogList from "./pages/BlogList";
import BlogDetails from "./pages/BlogDetails";
import HomePage from "./pages/HomePage";
import EditBlog from "./pages/EditBlog"; // 👈 Import the EditBlog page
import PublicBlogs from "./pages/PublicBlogs";

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-center" autoClose={3000} />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          📝 Omnify Blog App
        </Typography>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/edit/:id" element={<EditBlog />} /> {/* ✅ Added */}
          <Route path="/explore" element={<PublicBlogs />} />

        </Routes>
      </Container>
    </Router>
  );
}

export default App;

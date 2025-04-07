import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "#fff" }}
        >
          Blogify
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ ml: 2 }}
          >
            Home
          </Button>
          {token ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/blogs"
                sx={{ ml: 2 }}
              >
                Blogs
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/create"
                sx={{ ml: 2 }}
              >
                Create Blog
              </Button>
              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{ ml: 2 }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{ ml: 2 }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/signup"
                sx={{ ml: 2 }}
              >
                Signup
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

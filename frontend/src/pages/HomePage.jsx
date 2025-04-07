import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Box textAlign="center" mt={6} px={{ xs: 2, md: 0 }}>
      <Typography variant="h3" gutterBottom fontSize={{ xs: '2rem', sm: '3rem' }}>
        📝 Welcome to Omnify Blog App
      </Typography>
      <Typography variant="h6" gutterBottom fontSize={{ xs: '1rem', sm: '1.25rem' }}>
        Read, write, and share amazing blogs.
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" mt={4}>
        <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
          Login
        </Button>
        <Button variant="outlined" color="primary" onClick={() => navigate('/signup')}>
          Signup
        </Button>
        {isLoggedIn && (
          <Button variant="outlined" color="secondary" onClick={() => navigate('/create')}>
            Create Blog
          </Button>
        )}
        <Button variant="contained" color="success" onClick={() => navigate('/explore')}>
          Explore Blogs
        </Button>
      </Stack>
    </Box>
  );
};

export default HomePage;

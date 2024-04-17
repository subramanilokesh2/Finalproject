import React, { useState } from 'react';
import { Container, Grid, Button, TextField, Typography } from '@mui/material';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ReceiverLogin = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/Rlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: state.email, password: state.password }),
      });
  
      if (response.ok) {
        const userData = await response.json();
        console.log('User data:', userData);
        toast.success('Login successful');
        // Check if the user data contains a receiver object
        if (userData.receiver) {
          // If yes, set the entire userData object in the cookie
          Cookies.set('user', JSON.stringify(userData));
        } else {
          // If not, set only the receiver object in the cookie
          Cookies.set('user', JSON.stringify({ receiver: userData }));
        }
        navigate('/receiverdashboard');
      } else {
        toast.error("Enter the valid Credentials");
        throw new Error('Failed to log in');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error("Error in Loging Try after Some Time");
    }
  };
  

  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <div className="text-center mt-4">
            <Typography variant="h4">Receiver Login</Typography>
          </div>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              variant="outlined"
              margin="normal"
              name="email"
              required
              value={state.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: <FaEnvelope style={{ marginRight: '8px', color: '#757575' }} />,
              }}
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              margin="normal"
              name="password"
              required
              value={state.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: <FaLock style={{ marginRight: '8px', color: '#757575' }} />,
              }}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReceiverLogin;

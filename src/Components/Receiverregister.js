import React, { useState } from 'react';
import { Container, Grid, Button, TextField, Typography } from '@mui/material';
import { FaMobile, FaLock, FaUser, FaEnvelope, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ReceiverRegister = () => {
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    
    // Destructure state
    const { username, email, password, confirmPassword, mobile } = state;

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Prepare user data
    const userData = {
      username,
      email,
      password,
      mobile,
    };

    try {
      // Send POST request to backend for registration
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        toast.success('Receiver registered successfully');
        // Optionally redirect to login page after successful registration
        navigate('/receiverlogin');
      } else {
        throw new Error('Failed to register');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      toast.error('Error registering user. Please try again.');
    }
  };

  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <div className="text-center mt-4">
            <Typography variant="h4">Welcome to Receiver Registration</Typography>
          </div>
          <form onSubmit={registerUser}>
            {/* Input fields */}
            {/* Username */}
            <TextField
              fullWidth
              type="text"
              label="Enter Username"
              variant="outlined"
              margin="normal"
              name="username"
              required
              value={state.username}
              onChange={handleChange}
              InputProps={{
                startAdornment: <FaUser style={{ marginRight: '8px', color: '#757575' }} />,
              }}
            />

            {/* Email */}
            <TextField
              fullWidth
              type="email"
              label="Enter Email"
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

            {/* Password */}
            <TextField
              fullWidth
              type="password"
              label="Enter Password"
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

            {/* Confirm Password */}
            <TextField
              fullWidth
              type="password"
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              name="confirmPassword"
              required
              value={state.confirmPassword}
              onChange={handleChange}
              InputProps={{
                startAdornment: <FaCheck style={{ marginRight: '8px', color: '#757575' }} />,
              }}
            />

            {/* Mobile Number */}
            <TextField
              fullWidth
              type="text"
              label="Enter Mobile Number"
              variant="outlined"
              margin="normal"
              name="mobile"
              required
              value={state.mobile}
              onChange={handleChange}
              InputProps={{
                startAdornment: <FaMobile style={{ marginRight: '8px', color: '#757575' }} />,
              }}
            />

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="info" fullWidth>
              Register
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReceiverRegister;

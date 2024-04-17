import React, { useState } from 'react';
import { Container, Grid, Button, TextField, Typography } from '@mui/material';
import { FaUser, FaEnvelope, FaLock, FaCheck, FaMobile } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Supplierregister = () => {
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

  const handleSubmit = async () => {
    const { username, email, password, confirmPassword, mobile } = state;
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/sregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          mobile,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      const data = await response.json();
      console.log(data, 'Data inserted in MongoDB');
      toast.success('User registered successfully');
      navigate('/slogin');
    } catch (error) {
      console.error('Error registering user:', error);
      toast.error('Error registering user. Please try again.');
    }
  };

  const login = () => {
    navigate('/slogin');
  };

  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <div className="text-center mt-4">
            <Typography variant="h4">Welcome to Supplier Registration</Typography>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <TextField
              fullWidth
              type="text"
              label="Enter Username"
              variant="outlined"
              margin="normal"
              name="username"
              required
              onChange={handleChange}
              InputProps={{
                startAdornment: <FaUser style={{ marginRight: '8px', color: '#757575' }} />,
              }}
            />

            <TextField
              fullWidth
              type="email"
              label="Enter Email"
              variant="outlined"
              margin="normal"
              name="email"
              required
              onChange={handleChange}
              InputProps={{
                startAdornment: <FaEnvelope style={{ marginRight: '8px', color: '#757575' }} />,
              }}
            />

            <TextField
              fullWidth
              type="password"
              label="Enter Password"
              variant="outlined"
              margin="normal"
              name="password"
              required
              onChange={handleChange}
              InputProps={{
                startAdornment: <FaLock style={{ marginRight: '8px', color: '#757575' }} />,
              }}
            />

            <TextField
              fullWidth
              type="password"
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              name="confirmPassword"
              required
              onChange={handleChange}
              InputProps={{
                startAdornment: <FaCheck style={{ marginRight: '8px', color: '#757575' }} />,
              }}
            />

            <TextField
              fullWidth
              type="text"
              label="Enter Mobile Number"
              variant="outlined"
              margin="normal"
              name="mobile"
              required
              onChange={handleChange}
              InputProps={{
                startAdornment: <FaMobile style={{ marginRight: '8px', color: '#757575' }} />,
              }}
            />

            <Button type="submit" variant="contained" color="info" fullWidth>
              Register
            </Button>
          </form>

          <Typography variant="body2" className="mt-3">
            Already have an account?{' '}
            <Button color="primary" onClick={login}>
              Login
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Supplierregister;

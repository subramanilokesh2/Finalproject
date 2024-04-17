import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Paper, Grid } from '@mui/material';
import './Styles/SupplierProfile.css';

const SupplierProfile = () => {
  const initialFormData = {
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
  };

  const [user, setUser] = useState(initialFormData);
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formData);
  };

  useEffect(() => {
    // Retrieve user information from cookie when component mounts
    const cookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('user='));
    console.log('Cookie:', cookie);
    if (cookie) {
      const userData = JSON.parse(cookie.split('=')[1]);
      console.log('User data:', userData);
      setUser(userData);
    }
  }, []);

  return (
    <Container maxWidth="md" className="supplier-profile-container">
      <Paper elevation={3} className="profile-form-container">
        <Typography variant="h4" align="center" gutterBottom>
          Supplier Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Name"
              fullWidth
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Phone Number"
              fullWidth
              variant="outlined"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Address"
              fullWidth
              variant="outlined"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={handleSubmit} className="update-button">
          Update Profile
        </Button>
      </Paper>
      <Paper elevation={3} className="profile-details-container">
        <Typography variant="h5" gutterBottom>
          Your Profile Details:
        </Typography>
        <Typography variant="body1">
          <strong>Name:</strong> {user.name}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography variant="body1">
          <strong>Phone Number:</strong> {user.phoneNumber}
        </Typography>
        <Typography variant="body1">
          <strong>Address:</strong> {user.address}
        </Typography>
      </Paper>
    </Container>
  );
};

export default SupplierProfile;

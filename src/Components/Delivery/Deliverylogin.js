import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Deliverylogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/dlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login response:', data);
        const authToken = data.token; // Extract the authentication token from the response
        console.log('Auth token:', authToken); // Log the authentication token
        localStorage.setItem('authToken', authToken);
      
        
 
        document.cookie = `user=${JSON.stringify(data.user)}`;
        
        toast.success("Login successful");
        navigate('/ddashboard');
      } else {
        throw new Error('Failed to log in');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Error logging in. Please try again.');
    }
  };

  return (
    <Container className="login-container">
      <h1 className="text-center mb-4">Delivery Person Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="contained" color="primary" type="submit" className="btn-block">
          Login
        </Button>
      </Form>
      <Typography variant="body2" className="mt-3">
        Don't have an account? Sign up <a href="/Deliveryregistration">here</a>.
      </Typography>
    </Container>
  );
};

export default Deliverylogin;

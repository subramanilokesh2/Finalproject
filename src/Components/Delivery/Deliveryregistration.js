import React, { useState } from 'react';
import { Container, Form, Button, Toast } from 'react-bootstrap';
import '../Styles/Deliveryregistration.css';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DeliveryPersonRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    vehicleType: '',
    vehicleNumber: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
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
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/deliveryRegister', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('Registration successful:', data);
          toast.success('User registered successfully');
          navigate('/Deliverylogin');
        } else {
          const errorData = await response.json();
          console.error('Registration failed:', errorData.error);
          
        }
      } catch (error) {
        console.error('Error registering delivery person:', error);
        // Handle network error or other exceptions
      }
  
      // Reset form fields and errors after successful registration
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        vehicleType: '',
        vehicleNumber: '',
        password: ''
      });
      setErrors({});
    }
  };
  

  const validateForm = () => {
    let valid = true;
    let errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
      valid = false;
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
      valid = false;
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
      valid = false;
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Invalid phone number';
      valid = false;
    }

    if (!formData.address.trim()) {
      errors.address = 'Address is required';
      valid = false;
    }

    if (!formData.vehicleType.trim()) {
      errors.vehicleType = 'Vehicle type is required';
      valid = false;
    }

    if (!formData.vehicleNumber.trim()) {
      errors.vehicleNumber = 'Vehicle number is required';
      valid = false;
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const login = () => {
    navigate('/Deliverylogin');
  };

  return (
    <Container className="registration-container">
      <h1 className="text-center mb-4">Welcome to Delivery Person Registration</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </Form.Group>
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
          {errors.email && <span className="error-message">{errors.email}</span>}
        </Form.Group>
        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter phone number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </Form.Group>
        <Form.Group controlId="vehicleType">
          <Form.Label>Vehicle Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter vehicle type"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            required
          />
          {errors.vehicleType && <span className="error-message">{errors.vehicleType}</span>}
        </Form.Group>
        <Form.Group controlId="vehicleNumber">
          <Form.Label>Vehicle Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter vehicle number"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            required
          />
          {errors.vehicleNumber && <span className="error-message">{errors.vehicleNumber}</span>}
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
          {errors.password && <span className="error-message">{errors.password}</span>}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Typography variant="body2" className="mt-3">
          Already have an account?{' '}
          <Button color="primary" onClick={login}>
            Login
          </Button>
        </Typography>
      </Form>
    </Container>
  );
};

export default DeliveryPersonRegistration;

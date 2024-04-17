import React, { useState } from 'react';
import { Container, Grid, Button, TextField, Typography } from '@mui/material';
import { FaHotel, FaMapMarkerAlt, FaStar, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddFood = () => {
  const [state, setState] = useState({
    Hotel_Name: '',
    Current_Location: '',
    Rating: 5, // Default value set to 5
    Yesterday_Food_Wastage: '',
    Day_Before_Food_Wastage: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleGetCurrentLocation = () => {
    // Check if geolocation is supported
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Fetch the address using reverse geocoding
          fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBrEjHDfN0TgmWmc-9H35jWnl4o8QjVGdE`)
            .then((response) => response.json())
            .then((data) => {
              const address = data.results[0].formatted_address;
              setState((prevState) => ({
                ...prevState,
                Current_Location: address
              }));
            })
            .catch((error) => console.error('Error fetching address:', error));
        },
        (error) => console.error('Error getting location:', error)
      );
    } else {
      console.error('Geolocation is not supported');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { Hotel_Name, Current_Location, Rating, Yesterday_Food_Wastage, Day_Before_Food_Wastage } = state;

    // Prepare food data
    const foodData = {
      Hotel_Name,
      Current_Location,
      Rating,
      Yesterday_Food_Wastage,
      Day_Before_Food_Wastage
    };

    try {
      // Send POST request to backend to add food data
      const response = await fetch('http://localhost:5000/addfood', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(foodData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Food data added successfully:', data);
        toast.success('Food data added successfully');
        // Optionally redirect to another page after successful submission
        navigate('/');
      } else {
        throw new Error('Failed to add food data');
      }
    } catch (error) {
      console.error('Error adding food data:', error);
      toast.error('Error adding food data. Please try again.');
    }
  };

  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <div className="text-center mt-4">
            <Typography variant="h4">Add Food Data</Typography>
          </div>
          <form onSubmit={handleSubmit}>
            {/* Input fields */}
            {/* Hotel Name */}
            <TextField
              fullWidth
              type="text"
              label="Hotel Name"
              variant="outlined"
              margin="normal"
              name="Hotel_Name"
              required
              value={state.Hotel_Name}
              onChange={handleChange}
              InputProps={{
                startAdornment: <FaHotel style={{ marginRight: '8px', color: '#757575' }} />
              }}
            />

            {/* Current Location */}
            <TextField
              fullWidth
              type="text"
              label="Current Location"
              variant="outlined"
              margin="normal"
              name="Current_Location"
              required
              value={state.Current_Location}
              onChange={handleChange}
              InputProps={{
                startAdornment: <FaMapMarkerAlt style={{ marginRight: '8px', color: '#757575' }} />
              }}
            />
            <Button variant="contained" color="primary" onClick={handleGetCurrentLocation}>Get Current Location</Button>

            {/* Rating */}
            <TextField
              fullWidth
              type="number"
              label="Rating"
              variant="outlined"
              margin="normal"
              name="Rating"
              required
              value={state.Rating}
              onChange={handleChange}
              InputProps={{
                startAdornment: <FaStar style={{ marginRight: '8px', color: '#757575' }} />
              }}
            />

            {/* Yesterday's Food Wastage */}
            <TextField
              fullWidth
              type="text"
              label="Yesterday's Food Wastage"
              variant="outlined"
              margin="normal"
              name="Yesterday_Food_Wastage"
              required
              value={state.Yesterday_Food_Wastage}
              onChange={handleChange}
              InputProps={{
                startAdornment: <FaTrash style={{ marginRight: '8px', color: '#757575' }} />
              }}
            />

            {/* Day Before's Food Wastage */}
            <TextField
              fullWidth
              type="text"
              label="Day Before's Food Wastage"
              variant="outlined"
              margin="normal"
              name="Day_Before_Food_Wastage"
              required
              value={state.Day_Before_Food_Wastage}
              onChange={handleChange}
              InputProps={{
                startAdornment: <FaTrash style={{ marginRight: '8px', color: '#757575' }} />
              }}
            />

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Food Data
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddFood;

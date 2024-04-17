import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Styles/Recommend.css';


const RecommendationComponent = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [displayedLocation, setDisplayedLocation] = useState(null);
  const [displayedLocationCoords, setDisplayedLocationCoords] = useState(null);
  const [distance, setDistance] = useState(null);
  const [travelTime, setTravelTime] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load Google Maps for current location
    loadCurrentLocationMap();

    // Load Google Maps for displayed location
    if (displayedLocation) {
      loadDisplayedLocationMap();
    }

    // Calculate distance if both locations are available
    if (currentLocation && displayedLocation) {
      calculateDistance();
    }
  }, [currentLocation, displayedLocation]);

  useEffect(() => {
    // Calculate travel time if distance is available
    if (distance !== null) {
      calculateTravelTime();
    }
  }, [distance]);

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const currentCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(currentCoords);
          setDisplayedLocationCoords(currentCoords); // Set coordinates for display
        },
        error => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const loadCurrentLocationMap = () => {
    if (currentLocation) {
      // Initialize Google Maps for current location
      const currentLocationMap = new window.google.maps.Map(document.getElementById('currentLocationMap'), {
        center: currentLocation,
        zoom: 12
      });

      // Add marker for current location
      new window.google.maps.Marker({
        position: currentLocation,
        map: currentLocationMap,
        title: 'Current Location'
      });
    }
  };

  const loadDisplayedLocationMap = () => {
    if (displayedLocation) {
      // Initialize Google Maps for displayed location
      const displayedLocationMap = new window.google.maps.Map(document.getElementById('displayedLocationMap'), {
        center: displayedLocation,
        zoom: 12
      });

      // Add marker for displayed location
      new window.google.maps.Marker({
        position: displayedLocation,
        map: displayedLocationMap,
        title: 'Displayed Location'
      });
    }
  };

  const calculateDistance = () => {
    const R = 6371; // Radius of the Earth in km
    const lat1 = currentLocation.lat;
    const lon1 = currentLocation.lng;
    const lat2 = displayedLocation.lat;
    const lon2 = displayedLocation.lng;

    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    setDistance(distance);
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const calculateTravelTime = () => {
    // For simplicity, let's assume an average driving speed of 60 km/h
    const averageDrivingSpeed = 60; // in km/h
    const travelTimeHours = distance / averageDrivingSpeed;
    // Set travel time in hours
    setTravelTime(travelTimeHours);
  };

  const handleDisplayLocationOnMap = () => {
    // Assuming the displayed location is provided in the component state
    // You can set it as needed
    const displayedLocation = { lat: 13.0827, lng: 80.2707 };
    setDisplayedLocation(displayedLocation);
  };

  const foodRecommendation = Cookies.get('recommendationDetails');
  let recommendationData = null;

  if (foodRecommendation) {
    try {
      recommendationData = JSON.parse(foodRecommendation);
    } catch (error) {
      console.error('Error parsing recommendation data:', error);
    }
  }

  const recommendationString = JSON.stringify(recommendationData, null, 2);

  const drawRouteOnMap = () => {
    if (currentLocation && displayedLocation) {
      const directionsService = new window.google.maps.DirectionsService();
      const routeMap = new window.google.maps.Map(document.getElementById('routeMap'), {
        center: currentLocation,
        zoom: 12
      });
      const directionsRenderer = new window.google.maps.DirectionsRenderer({
        map: routeMap,
        polylineOptions: {
          strokeColor: "blue" 
        }
      });

      const request = {
        origin: currentLocation,
        destination: displayedLocation,
        travelMode: 'DRIVING'
      };

      directionsService.route(request, (response, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);
        } else {
          console.error('Directions request failed due to ' + status);
        }
      });
    }
  };

  useEffect(() => {
    drawRouteOnMap();
  }, [currentLocation, displayedLocation]);
  
  const handlePlaceOrder = async () => { // Add 'async' keyword here
    try {
      console.log('Sending request to place order:', {
      currentLocation,
      displayedLocation,
      distance,
      travelTime
    });
      const response = await fetch('http://localhost:5000/lokesh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentLocation,
          displayedLocation,
          distance,
          travelTime,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to place order');
      }
  
      const data = await response.json();
      console.log(data, 'Order placed successfully');
      toast.success('Order placed successfully');
      navigate('/Delivery'); 
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Error placing order. Please try again.');
    }
  };
  

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Hotel Recommendation</h1>
      <Card>
        <Card.Body>
          <Card.Text>
            <pre>{recommendationString}</pre>
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Display buttons to get current location and display location */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button variant="primary" onClick={handleGetCurrentLocation}>Get Current Location</Button>
        <Button variant="success" onClick={handleDisplayLocationOnMap} style={{ marginLeft: '10px' }}>Display Location on Map</Button>
      </div>

      {/* Display maps */}
      <div style={{ marginTop: '20px' }}>
        <h3>Current Location Map</h3>
        <div id="currentLocationMap" style={{ height: '400px' }}></div>
        {currentLocation && (
          <div>
            <p>Latitude: {currentLocation.lat}</p>
            <p>Longitude: {currentLocation.lng}</p>
          </div>
        )}
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>Destination Location Map</h3>
        <div id="displayedLocationMap" style={{ height: '400px' }}></div>
        {displayedLocationCoords && (
          <div style={{ marginTop: '10px' }}>
            <p>Latitude: {displayedLocationCoords.lat}</p>
            <p>Longitude: {displayedLocationCoords.lng}</p>
          </div>
        )}
      </div>

      {/* Display distance if available */}
      {distance !== null && (
        <div style={{ marginTop: '20px' }}>
          <h3>Distance</h3>
          <p>{distance.toFixed(2)} km</p>
        </div>
      )}

      {/* Display travel time if available */}
      {travelTime !== null && (
        <div style={{ marginTop: '20px' }}>
          <h3>Travel Time</h3>
          <p>{travelTime.toFixed(2)} hours</p>
        </div>
      )}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button variant="contained" color="primary" onClick={handlePlaceOrder}>Place an Order</Button>
      </div>

      {/* Display the route map */}
      <div style={{ marginTop: '20px' }}>
        <h3>Route Map</h3>
        <div id="routeMap" style={{ height: '400px' }}></div>
      </div>
    </Container>
  );
};

export default RecommendationComponent;

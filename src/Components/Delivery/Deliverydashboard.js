import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Card, CardContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  userInfo: {
    marginBottom: '20px',
  },
  orderInfo: {
    marginTop: '20px',
  },
  tableContainer: {
    marginTop: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  table: {
    minWidth: '700px',
  },
  tableCell: {
    fontSize: '1rem',
    padding: '16px',
    borderBottom: '1px solid #f0f0f0',
  },
  updateButton: {
    marginTop: '20px',
  },
});

const DeliveryDashboard = () => {
  const classes = useStyles();

  const getCookie = (name) => {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(name))
      ?.split('=')[1];
    return cookieValue ? JSON.parse(decodeURIComponent(cookieValue)) : null;
  };

  const userData = getCookie('user');
  console.log('User data:', userData);

  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:5000/bookings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Error fetching orders: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('All Bookings:', data.bookings);
      
      const filteredOrders = data.bookings.filter(order => order.deliveryPerson === userData?._id);
      setOrders(filteredOrders);
      console.log('All Booking Details:', filteredOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleEditProfile = () => {
    navigate('/editprofile');
  };

  const handleAddProfilePhoto = () => {
    console.log('Add profile photo clicked');
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleChangeStatus = (orderId, event) => {
    const updatedOrders = orders.map(order => {
      if (order._id === orderId) {
        return { ...order, status: event.target.value };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  const handleUpdateOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/updateOrders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orders),
      });

      if (!response.ok) {
        throw new Error(`Error updating orders: ${response.statusText}`);
      }

      console.log('Orders updated successfully');
      // Optionally, you can fetch orders again to refresh the data
      // fetchOrders();
    } catch (error) {
      console.error('Error updating orders:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to Delivery Dashboard
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Card variant="outlined">
            <CardContent className={classes.userInfo}>
              {userData ? (
                <div>
                  <Typography variant="h6" gutterBottom>User Information:</Typography>
                  <Typography variant="body1"><strong>First Name:</strong> {userData.firstName}</Typography>
                  <Typography variant="body1"><strong>Last Name:</strong> {userData.lastName}</Typography>
                  <Typography variant="body1"><strong>Email:</strong> {userData.email}</Typography>
                  <Typography variant="body1"><strong>Phone Number:</strong> {userData.phoneNumber}</Typography>
                  <Typography variant="body1"><strong>Address:</strong> {userData.address}</Typography>
                  <Typography variant="body1"><strong>Vehicle Type:</strong> {userData.vehicleType}</Typography>
                  <Typography variant="body1"><strong>Vehicle Number:</strong> {userData.vehicleNumber}</Typography>
                  <Button variant="contained" onClick={handleEditProfile} sx={{ mr: 1 }}>
                    Edit
                  </Button>
                  <Button variant="contained" onClick={handleAddProfilePhoto} sx={{ mr: 1 }}>
                    Add Profile Photo
                  </Button>
                  <Button variant="contained" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <Typography variant="body1">No user information found</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Typography variant="h5" align="center" className={classes.orderInfo} gutterBottom>
        Your Orders
      </Typography>
      {orders.length > 0 ? (
        <>
          <TableContainer component={Card} className={classes.tableContainer}>
            <Table aria-label="Orders table" className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>User Location</TableCell>
                  <TableCell>Destination Location</TableCell>
                  <TableCell>Distance</TableCell>
                  <TableCell>Travel Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Recommendation Data</TableCell>
                  <TableCell>Update The Status</TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map(order => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{JSON.stringify(order.currentLocation)}</TableCell>
                    <TableCell>{JSON.stringify(order.displayedLocation)}</TableCell>
                    <TableCell>{order.distance}</TableCell>
                    <TableCell>{order.travelTime}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{JSON.stringify(order.recommendationData)}</TableCell>
                    <TableCell>
                      {order.status !== 'Task completed' && (
                        <Select value={order.status} onChange={(event) => handleChangeStatus(order._id, event)}>
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="Taken">Taken</MenuItem>
                          <MenuItem value="Delivered">Delivered</MenuItem>
                        </Select>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" onClick={handleUpdateOrders} className={classes.updateButton}>
            Update Orders
          </Button>
        </>
      ) : (
        <Typography variant="body1" align="center">No orders found</Typography>
      )}
    </Container>
  );
};

export default DeliveryDashboard;

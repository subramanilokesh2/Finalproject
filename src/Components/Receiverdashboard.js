import React from 'react';
import { Container, Typography } from '@mui/material';
import { FaHome, FaUser, FaClipboardList, FaHistory, FaQuestionCircle } from 'react-icons/fa';
import './Styles/Reciverdashbaord.css';

const ReceiverDashboard = ({ userData }) => {

  const logout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/receiverlogin';
  };

  const recentActivity = [
    { id: 1, action: 'Donated 10kg of food', timestamp: '2 hours ago' },
    { id: 2, action: 'Attended food waste reduction workshop', timestamp: '1 day ago' },
  ];

  const featuredCauses = [
    { id: 1, name: 'Food Rescue Organization', mission: 'Rescuing surplus food and delivering it to those in need.' },
    { id: 2, name: 'Zero Food Waste Campaign', mission: 'Educating the community on reducing food wastage.' },
  ];

  return (
    <Container className="dashboard-container">
      <nav className="nav-bar">
        <ul className="nav-list">
          <li className="nav-item">
            <span className="dashboard-title">RECEIVER DASHBOARD</span>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link"><FaHome className="nav-icon" /> HOME</a>
          </li>
          <li className="nav-item">
            <a href="/profile" className="nav-link"><FaUser className="nav-icon" /> PROFILE</a>
          </li>
          <li className="nav-item">
            <a href="/order" className="nav-link"><FaClipboardList className="nav-icon" /> ORDERS</a>
          </li>
          <li className="nav-item">
            <a href="/Rhistory" className="nav-link"><FaHistory className="nav-icon" /> HISTORY</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link"><FaQuestionCircle className="nav-icon" /> HELP</a>
          </li>
          <li className="nav-item">
            <a href="#" className="logout" onClick={logout}>LOG OUT</a>
          </li>
        </ul>
      </nav>
      <div className="content-container">
        <Typography variant="h3" className="content-heading">Week Wastage Food</Typography>
        {userData && (
          <div className='user-details'>
            <Typography variant="h4">User Details:</Typography>
            <Typography variant="body1">Name: {userData.username}</Typography>
            <Typography variant="body1">Email: {userData.email}</Typography>
            <Typography variant="body1">Mobile Number: {userData.mobile}</Typography>
          </div>
        )}

        <div className="section">
          <Typography variant="h4">Recent Activity</Typography>
          <ul>
            {recentActivity.map(activity => (
              <li key={activity.id}>{activity.action} - {activity.timestamp}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <Typography variant="h4">Featured Causes</Typography>
          {featuredCauses.map(cause => (
            <div key={cause.id}>
              <Typography variant="h5">{cause.name}</Typography>
              <Typography variant="body1">{cause.mission}</Typography>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ReceiverDashboard;

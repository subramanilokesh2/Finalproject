import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Rhistory = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const cookieData = Cookies.get('user');
    if (cookieData) {
      try {
        const parsedData = JSON.parse(cookieData);
        setUserData(parsedData);
      } catch (error) {
        console.error('Error parsing user data from cookie:', error);
      }
    }
  }, []);

  return (
    <div>
      <h1>Welcome to NGO History</h1>
      {userData && (
        <div>
          <h2>User Information</h2>
          <p>ID: {userData.receiver._id}</p>
          <p>Username: {userData.receiver.username}</p>
          <p>Email: {userData.receiver.email}</p>
          <p>Mobile: {userData.receiver.mobile}</p>
        </div>
      )}
    </div>
  );
};

export default Rhistory;

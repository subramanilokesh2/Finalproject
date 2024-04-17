import React, { useState } from 'react';
import './Styles/Supplierdashboard.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SupplierDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Perform search operation based on the searchQuery
  };

  const handleFilter = (e) => {
    setFilterCriteria(e.target.value);
    // Perform filtering operation based on the selected criteria
  };

  const logout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'GET',
        credentials: 'include' 
      });
      if (response.ok) {
        toast.success("Logged out Successfully!!");
        localStorage.removeItem('token');
        navigate('/slogin');
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error("Logout failed. Please try again later.");
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDropdownItemClick = (path) => {
    navigate(path);
    setShowDropdown(false);
  };

  return (
    <div className="dashboard-container">
      <nav className="nav-bar">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="#" className="nav-link">
              <span className="dashboard-title">SUPPLIER DASHBOARD</span>
            </a>
          </li>
          <li className="nav-item">
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery} 
              onChange={handleSearch} 
            />
          </li>
          <li className="nav-item">
            <select value={filterCriteria} onChange={handleFilter}>
              <option value="">Filter By...</option>
              <option value="date">Date</option>
              <option value="category">Category</option>
              {/* Add more filter criteria as needed */}
            </select>
          </li>
          <li className="nav-item dropdown">
            <a href="#" className="nav-link" onClick={toggleDropdown}>
              MENU
            </a>
            {showDropdown && (
              <ul className="dropdown-menu">
                <li onClick={() => handleDropdownItemClick("/home")}>HOME</li>
                <li onClick={() => handleDropdownItemClick("/Sprofile")}>PROFILE</li>
                <li onClick={() => handleDropdownItemClick("/saddfood")}>ADD THE FOOD</li>
                <li onClick={() => handleDropdownItemClick("/supdatefood")}>UPDATE THE FOOD</li>
                <li onClick={() => handleDropdownItemClick("/shistory")}>HISTORY</li>
                <li onClick={() => handleDropdownItemClick("/help")}>HELP</li>
              </ul>
            )}
          </li>
          <li className="nav-item">
            <a href="#" className="logout" onClick={logout}>LOG OUT</a>
          </li>
        </ul>
      </nav>
      <div className="content-container">
        <h1 className="content-heading">Week Wastage Food</h1>
        <div className="main-skills">
          {/* Add interactive charts, graphs, or progress bars here */}
        </div>
      </div>
    </div>
  );
}

export default SupplierDashboard;

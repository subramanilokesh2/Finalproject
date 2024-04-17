import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/Rorder.css';

const Rorders = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remainingQuantity, setRemainingQuantity] = useState(0);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handlePredictClick = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: selectedLocation,
          quantity: quantity,
        }),
      });
      const data = await response.json();
      setRestaurants(data.Restaurants);
      setRemainingQuantity(data.remainingQuantity);
    } catch (error) {
      console.error('Error predicting food wastage:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="text-center mb-4">Welcome to Food Prediction Page</h2>
              <select className="form-select mb-3" value={selectedLocation} onChange={handleLocationChange}>
              <option value="">Select an option</option>
                <option value="Makati City">Makati City</option>
                <option value="Mandaluyong City">Mandaluyong City</option>
                <option value="Pasay City">Pasay City</option>
                <option value="Pasig City">Pasig City</option>
                <option value="Quezon City">Quezon City</option>
                <option value="San Juan City">San Juan City</option>
                <option value="Santa Rosa">Santa Rosa</option>
                <option value="Tagaytay City">Tagaytay City</option>
                <option value="Taguig City">Taguig City</option>
                <option value="Brasília">Brasília</option>
                <option value="Rio de Janeiro">Rio de Janeiro</option>
                <option value="São Paulo">São Paulo</option>
                <option value="Albany">Albany</option>
                <option value="Armidale">Armidale</option>
                <option value="Athens">Athens</option>
                <option value="Augusta">Augusta</option>
                <option value="Balingup">Balingup</option>
                <option value="Beechworth">Beechworth</option>
                <option value="Boise">Boise</option>
                <option value="Cedar Rapids/Iowa City">Cedar Rapids/Iowa City</option>
                <option value="Chatham-Kent">Chatham-Kent</option>
                <option value="Clatskanie">Clatskanie</option>
                <option value="Cochrane">Cochrane</option>
                <option value="Columbus">Columbus</option>
                <option value="Consort">Consort</option>
                <option value="Dalton">Dalton</option>
                <option value="Davenport">Davenport</option>
                <option value="Des Moines">Des Moines</option>
                <option value="Dicky Beach">Dicky Beach</option>
                <option value="Dubuque">Dubuque</option>
                <option value="East Ballina">East Ballina</option>
                <option value="Fernley">Fernley</option>
                <option value="Flaxton">Flaxton</option>
                <option value="Forrest">Forrest</option>
                <option value="Gainesville">Gainesville</option>
                <option value="Hepburn Springs">Hepburn Springs</option>
                <option value="Huskisson">Huskisson</option>
                <option value="Inverloch">Inverloch</option>
                <option value="Lakes Entrance">Lakes Entrance</option>
                <option value="Lakeview">Lakeview</option>
                <option value="Lincoln">Lincoln</option>
                <option value="Lorn">Lorn</option>
                <option value="Macedon">Macedon</option>
                <option value="Macon">Macon</option>
                <option value="Mayfield">Mayfield</option>
                <option value="Mc Millan">Mc Millan</option>
                <option value="Middleton Beach">Middleton Beach</option>
                <option value="Miller">Miller</option>
                <option value="Monroe">Monroe</option>
                <option value="Montville">Montville</option>
                <option value="Ojo Caliente">Ojo Caliente</option>
                <option value="Orlando">Orlando</option>
                <option value="Palm Cove">Palm Cove</option>
                <option value="Paynesville">Paynesville</option>
                <option value="Penola">Penola</option>
                <option value="Pensacola">Pensacola</option>
                <option value="Phillip Island">Phillip Island</option>
                <option value="Pocatello">Pocatello</option>
                <option value="Potrero">Potrero</option>
                <option value="Princeton">Princeton</option>
                <option value="Rest of Hawaii">Rest of Hawaii</option>
                <option value="Savannah">Savannah</option>
                <option value="Singapore">Singapore</option>
                <option value="Sioux City">Sioux City</option>
                <option value="Tampa Bay">Tampa Bay</option>
                <option value="Tanunda">Tanunda</option>
                <option value="Trentham East">Trentham East</option>
                <option value="Valdosta">Valdosta</option>
                <option value="Vernonia">Vernonia</option>
                <option value="Victor Harbor">Victor Harbor</option>
                <option value="Vineland Station">Vineland Station</option>
                <option value="Waterloo">Waterloo</option>
                <option value="Weirton">Weirton</option>
                <option value="Winchester Bay">Winchester Bay</option>
                <option value="Yorkton">Yorkton</option>
                <option value="Abu Dhabi">Abu Dhabi</option>
                <option value="Dubai">Dubai</option>
                <option value="Sharjah">Sharjah</option>
                <option value="Agra">Agra</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Allahabad">Allahabad</option>
                <option value="Amritsar">Amritsar</option>
                <option value="Aurangabad">Aurangabad</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Bhubaneshwar">Bhubaneshwar</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Chennai">Chennai</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Dehradun">Dehradun</option>
                <option value="Faridabad">Faridabad</option>
                <option value="Goa">Goa</option>
                <option value="Gurgaon">Gurgaon</option>
              </select>
              <input
                type="number"
                className="form-control mb-3"
                placeholder="Enter quantity"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <button className="btn btn-primary btn-block" onClick={handlePredictClick} disabled={!selectedLocation || !quantity || loading}>
                {loading ? 'Predicting...' : 'Predict Food Wastage'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          <h3 className="text-center mb-3">Prediction Results</h3>
          <table className="table" border='5'>
            <thead>
              <tr>
                <th>Restaurant ID</th>
                <th>Restaurant Name</th>
                <th>City</th>
                <th>Address</th>
                <th>Food Wastage Tomorrow</th>
                <th>Food Wastage Day After Tomorrow</th>
                <th>Match</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant, index) => (
                <tr key={index}>
                  <td>{restaurant['Restaurant ID']}</td>
                  <td>{restaurant['Restaurant Name']}</td>
                  <td>{restaurant['City']}</td>
                  <td>{restaurant['Address']}</td>
                  <td>{restaurant['Predicted Food Wastage for Tomorrow']}</td>
                  <td>{restaurant['Predicted Food Wastage for Day After Tomorrow']}</td>
                  <td>{restaurant['Match']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Rorders;

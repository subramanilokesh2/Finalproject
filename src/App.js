import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import About from "./Components/About";
import Work from "./Components/Work";
import Testimonial from "./Components/Testimonial";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Slogin from "./Components/Supplierlogin.js";
import Supplierregister from "./Components/Supplierregister";
import Receiverregister from "./Components/Receiverregister";
import Supplierprofile from './Components/Supplierprofile.js';
import AddFood from './Components/AddFood.js'
import History from './Components/History.js';
import Updatefood from './Components/UpdateFood.js'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import Supplierdashboard from "./Components/Supplierdashboard";
import { Update } from "@mui/icons-material";
import Receiver from "./Components/Receiverlogin.js";
import Receiverdashboard from "./Components/Receiverdashboard.js";
import Rorders from "./Components/Rorders.js";
import RecommendationComponent from "./Components/RecommendationComponent.js";
import Delivery from "./Components/Delivery.js";
import Deliveryregistration from "./Components/Delivery/Deliveryregistration.js";
import Deliverylogin from "./Components/Delivery/Deliverylogin.js";
import Deliverydashboard from "./Components/Delivery/Deliverydashboard.js";
import Editprofile from "./Components/Delivery/Editprofile.js";
import Rhistory from "./Components/Rhistory.js";

function App() {
  return (
    <Router>
      <div className="App">
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/testimonials" element={<Testimonial />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/supplierregister" element={<Supplierregister/>}/>
          <Route path="/receiverregister" element={<Receiverregister/>}/>
          <Route path="/supplierdashboard" element={<Supplierdashboard/>}/>
          <Route path="/slogin" element={<Slogin/>}/>
          <Route path="/Sprofile" element={<Supplierprofile/>}/>
         < Route path="/saddfood" element={<AddFood/>}/>
          <Route path="/shistory" element={<History/>}/>
          <Route path="/supdatefood" element={<Updatefood/>}/>
          <Route path="/receiverlogin" element={<Receiver/>}/>
          <Route path="/receiverdashboard" element={<Receiverdashboard/>}/>
          <Route path="/order" element={<Rorders/>}/>
          <Route path="/HotelDetails" element={<RecommendationComponent/>}/>
          <Route path="/Delivery" element={<Delivery/>}/>
          <Route path="/Deliveryregistration" element={<Deliveryregistration/>}/>
          <Route path="/Deliverylogin" element={<Deliverylogin/>}/>
          <Route path="/ddashboard" element={<Deliverydashboard/>}/>
          <Route path="/editprofile" element={<Editprofile/>}/>
          <Route path="/Rhistory" element={<Rhistory/>}/>
        </Routes>
        <Footer />
        <ToastContainer theme='light' position='top-right' />
      </div>
    </Router>
  );
}

export default App;

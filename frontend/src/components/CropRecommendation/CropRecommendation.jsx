import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./CropRecommendation.css";
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

function CropRecommendation() {
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const [selectedState, setSelectedState] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted');
    navigate('/crop-recc-out');
  }
  return (
    <>
      <Navbar />
      <div className="content">
        <div className="crop-form">
          <h2 className="form-title">
            Smart Agri Crop Recommendation
          </h2>
          <input
            type="number"
            name=""
            min={0}
            placeholder="Potassium"
            id=""
            required
          />
          <input
            type="number"
            name=""
            min={0}
            placeholder="Nitrogen"
            id=""
            required
          />
          <input type="number" name="" id="" placeholder="Sodium" required />
          <select
            name=""
            id=""
            required
            className="sm-inline-flex"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="" disabled>
              Select a state
            </option>
            {indianStates.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
          
          <input
            type="number"
            min={0}
            name=""
            placeholder="Temperature"
            id=""
            required
          />
          <input
            type="number"
            min={0}
            name=""
            placeholder="Rainfall"
            id=""
            required
          />
          <input
            type="number"
            min={0}
            name=""
            placeholder="pH"
            id=""
            required
          />
          <input
            type="number"
            min={0}
            name=""
            placeholder="Humidity"
            id=""
            required
          />
          <button onClick={handleSubmit} type="submit" className="submitbtn">
            <span>Submit</span>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CropRecommendation;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CropRecommendation.css";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

function CropRecommendation() {
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const [selectedState, setSelectedState] = useState("");
  const [formData, setFormData] = useState({
    potassium: "",
    nitrogen: "",
    sodium: "",
    temperature: "",
    rainfall: "",
    ph: "",
    humidity: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Mock recommendations based on input values
  const generateMockRecommendations = (data, state) => {
    // Basic logic to determine crops based on input values
    const recommendations = [];
    
    // Check for rice conditions
    if (data.rainfall > 100 && data.temperature > 20 && data.humidity > 60) {
      recommendations.push({
        name: "Rice",
        reason: `High rainfall (${data.rainfall}cm) and humidity (${data.humidity}%) make ideal conditions for rice cultivation. The temperature of ${data.temperature}°C is within optimal range.`,
        fertilizer: "Urea, DAP, Potash",
        harvestDays: "120-150 days"
      });
    }

    // Check for wheat conditions
    if (data.temperature < 30 && data.ph >= 6.0 && data.ph <= 7.5) {
      recommendations.push({
        name: "Wheat",
        reason: `Moderate temperature (${data.temperature}°C) and optimal pH (${data.ph}) are suitable for wheat. The nitrogen level of ${data.nitrogen} mg/kg supports good growth.`,
        fertilizer: "NPK 20-20-20, Urea",
        harvestDays: "100-150 days"
      });
    }

    // Check for cotton conditions
    if (data.temperature > 25 && data.ph >= 5.5 && data.ph <= 8.5) {
      recommendations.push({
        name: "Cotton",
        reason: `Well-draining soil with pH ${data.ph} and warm temperature of ${data.temperature}°C provide good conditions for cotton. Potassium level of ${data.potassium} mg/kg supports fiber development.`,
        fertilizer: "NPK 15-15-15, DAP",
        harvestDays: "150-180 days"
      });
    }

    // Add pulses as a backup option
    if (recommendations.length < 3) {
      recommendations.push({
        name: "Green Gram (Moong)",
        reason: `Moderate nutrient requirements make it suitable for most conditions. Current nitrogen (${data.nitrogen} mg/kg) and pH (${data.ph}) levels are acceptable.`,
        fertilizer: "DAP, Single Super Phosphate",
        harvestDays: "60-65 days"
      });
    }

    // Ensure we have exactly 3 recommendations
    return recommendations.slice(0, 3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Instead of making the API call, use our local recommendation generator
      const recommendations = generateMockRecommendations(formData, selectedState);
      
      // Navigate with the recommendations
      navigate("/crop-recc-out", { 
        state: { 
          recommendations,
          formData,
          selectedState 
        }
      });
    } catch (error) {
      alert("Failed to generate recommendations. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="content">
        <div className="crop-form">
          <h2 className="form-title">Smart Agri Crop Recommendation</h2>
          <input 
            type="number" 
            name="potassium" 
            min={0} 
            placeholder="Potassium (mg/kg)" 
            required 
            onChange={handleChange}
            value={formData.potassium} 
          />
          <input 
            type="number" 
            name="nitrogen" 
            min={0} 
            placeholder="Nitrogen (mg/kg)" 
            required 
            onChange={handleChange}
            value={formData.nitrogen} 
          />
          <input 
            type="number" 
            name="sodium" 
            min={0} 
            placeholder="Sodium (mg/kg)" 
            required 
            onChange={handleChange}
            value={formData.sodium} 
          />
          <select 
            name="state" 
            required 
            value={selectedState} 
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="" disabled>Select a state</option>
            {indianStates.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
          </select>
          <input 
            type="number" 
            name="temperature" 
            min={0} 
            placeholder="Temperature (°C)" 
            required 
            onChange={handleChange}
            value={formData.temperature} 
          />
          <input 
            type="number" 
            name="rainfall" 
            min={0} 
            placeholder="Rainfall (cm/year)" 
            required 
            onChange={handleChange}
            value={formData.rainfall} 
          />
          <input 
            type="number" 
            name="ph" 
            min={0} 
            step="0.1" 
            placeholder="pH" 
            required 
            onChange={handleChange}
            value={formData.ph} 
          />
          <input 
            type="number" 
            name="humidity" 
            min={0} 
            placeholder="Humidity (%)" 
            required 
            onChange={handleChange}
            value={formData.humidity} 
          />
          <button 
            onClick={handleSubmit} 
            type="submit" 
            className="submitbtn"
            disabled={isLoading}
          >
            <span>{isLoading ? 'Processing...' : 'Get Recommendations'}</span>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CropRecommendation;
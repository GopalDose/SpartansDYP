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

  // Function to extract JSON from the response text
  const extractJSONFromText = (text) => {
    try {
      // Try to parse the entire text first
      return JSON.parse(text);
    } catch (e) {
      try {
        // If that fails, try to extract JSON array using regex
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
        throw new Error('No valid JSON array found in response');
      } catch (error) {
        console.error('Failed to parse response:', text);
        throw new Error('Failed to parse recommendations');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const prompt = {
        contents: [{
          parts: [{
            text: `Act as an agricultural expert and analyze these soil and climate parameters to recommend suitable crops. Return ONLY a JSON array with no markdown formatting or additional text.

Parameters:
- Potassium: ${formData.potassium} mg/kg
- Nitrogen: ${formData.nitrogen} mg/kg
- Sodium: ${formData.sodium} mg/kg
- pH: ${formData.ph}
- Temperature: ${formData.temperature}°C
- Annual Rainfall: ${formData.rainfall} cm/year
- Humidity: ${formData.humidity}%
- State: ${selectedState}

Return a JSON array of 3 most suitable crops in this exact format:
[
  {
    "name": "crop name",
    "reason": "scientific explanation of suitability based on given parameters",
    "fertilizer": "recommended fertilizers",
    "harvestDays": "time to harvest"
  }
]`
          }]
        }]
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: prompt.contents,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations from API');
      }

      const result = await response.json();
      
      if (!result.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error('Invalid API response format');
      }

      const textResponse = result.candidates[0].content.parts[0].text;
      const recommendations = extractJSONFromText(textResponse);

      if (!Array.isArray(recommendations) || recommendations.length === 0) {
        throw new Error('Invalid recommendations format received');
      }

      navigate("/crop-recc-out", { 
        state: { 
          recommendations,
          formData,
          selectedState 
        }
      });
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Failed to generate recommendations. Please try again.");
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
            max={14}
            step="0.1" 
            placeholder="pH (0-14)" 
            required 
            onChange={handleChange}
            value={formData.ph} 
          />
          <input 
            type="number" 
            name="humidity" 
            min={0}
            max={100}
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
            <span>{isLoading ? 'Getting Recommendations...' : 'Get Recommendations'}</span>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CropRecommendation;
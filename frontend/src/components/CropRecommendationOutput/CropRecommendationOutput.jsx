import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CropRecommendationOutput.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import cropIcon from '../../assets/images/crop.png';

const CropRecommendationOutput = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = useState(null);

    // Get data from navigation state
    const { recommendations = [], formData = {}, selectedState = '' } = location.state || {};

    // Redirect if no data
    if (!location.state || !recommendations.length) {
        navigate('/crop-recommendation');
        return null;
    }

    const toggleOpen = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Format input values for display
    const formatInputValue = (key, value) => {
        const units = {
            potassium: 'mg/kg',
            nitrogen: 'mg/kg',
            sodium: 'mg/kg',
            temperature: '°C',
            rainfall: 'cm/year',
            humidity: '%',
            ph: ''
        };
        return `${value}${units[key] ? ' ' + units[key] : ''}`;
    };

    return (
        <>
            <Navbar />
            <div className="outputblock">
                <div className="inner-container">
                    <h1>Crop Recommendations</h1>
                    
                    {/* Input Summary */}
                    <div className="input-summary">
                        <h2>Soil and Climate Conditions</h2>
                        <div className="conditions-grid">
                            {Object.entries(formData).map(([key, value]) => (
                                <div key={key} className="condition-item">
                                    <span className="condition-label">
                                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                                    </span>
                                    <span className="condition-value">
                                        {formatInputValue(key, value)}
                                    </span>
                                </div>
                            ))}
                            <div className="condition-item">
                                <span className="condition-label">State:</span>
                                <span className="condition-value">{selectedState}</span>
                            </div>
                        </div>
                    </div>

                    {/* Recommendations */}
                    <div className="list-container">
                        {recommendations.map((crop, index) => (
                            <div 
                                className={`crop-card ${openIndex === index ? 'open' : ''}`} 
                                key={index}
                            >
                                <div 
                                    className="crop-header" 
                                    onClick={() => toggleOpen(index)}
                                >
                                    <div className="crop-title">
                                        <img src={cropIcon} alt="Crop Icon" className="crop-icon" />
                                        <h3>{crop.name}</h3>
                                    </div>
                                    <span className="toggle-icon">
                                        {openIndex === index ? '−' : '+'}
                                    </span>
                                </div>
                                <div className="crop-details">
                                    <div className="detail-group">
                                        <h4>Why This Crop?</h4>
                                        <p>{crop.reason}</p>
                                    </div>
                                    <div className="detail-group">
                                        <h4>Recommended Fertilizers</h4>
                                        <p>{crop.fertilizer}</p>
                                    </div>
                                    <div className="detail-group">
                                        <h4>Time to Harvest</h4>
                                        <p>{crop.harvestDays}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        <button 
                            className="back-button"
                            onClick={() => navigate('/crop-recc')}
                        >
                            Try Another Analysis
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CropRecommendationOutput;
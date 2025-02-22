import React, { useState } from 'react';
import './CropRecommendationOutput.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import cropIcon from '../../assets/images/crop.png';

const recommendedCrops = [
    {
        name: "Wheat",
        reason: "Chosen due to moderate NPK levels, optimal temperature (10-25°C), and moderate rainfall (50-100 cm). Ideal for loamy soil with a pH range of 6.0-7.5. Prefers states like Punjab, Haryana, UP, and MP.",
        fertilizer: "Urea, DAP, MOP",
        harvestDays: "120-150 days"
    },
    {
        name: "Rice",
        reason: "Selected for high Nitrogen requirement, warm temperature (25-35°C), high humidity (above 70%), and heavy rainfall (100-200 cm). Grows best in clayey soil with a pH range of 5.5-7.0. Suitable for states like West Bengal, Odisha, Tamil Nadu, and Kerala.",
        fertilizer: "Nitrogen, Phosphorus, Potassium",
        harvestDays: "90-120 days"
    },
    {
        name: "Maize",
        reason: "Recommended due to moderate Nitrogen and high Phosphorus demand, warm temperature (18-30°C), and moderate rainfall (50-100 cm). Suitable for sandy loam soil with a pH range of 5.8-7.2. Ideal for states like Karnataka, Maharashtra, Bihar, and Andhra Pradesh.",
        fertilizer: "NPK 20-20-20, Zinc",
        harvestDays: "100-120 days"
    }
];

const CropRecommendationOutput = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleOpen = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <Navbar />
            <div className="outputblock">
                <div className="inner-container">
                    <h1>Crop Recommendation Output</h1>
                    <div className="list-container">
                        {recommendedCrops.map((crop, index) => (
                            <div 
                                className={`crop ${openIndex === index ? 'open' : ''}`} 
                                key={index}
                            >
                                <div className="name" onClick={() => toggleOpen(index)}>
                                    <img src={cropIcon} alt="Crop Icon" /> {crop.name}
                                </div>
                                <div className="data">
                                    <p><strong>Reason:</strong> {crop.reason}</p>
                                    <p><strong>Required Fertilizer:</strong> {crop.fertilizer}</p>
                                    <p><strong>Days to Harvest:</strong> {crop.harvestDays}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CropRecommendationOutput;

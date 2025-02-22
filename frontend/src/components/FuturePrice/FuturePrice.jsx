import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import './FuturePrice.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
  
const FuturePrice = () => {
    const [selectedCrop, setSelectedCrop] = useState("Wheat");

    const cropData = {
        Wheat: [
            { month: "Jan", price: 2200 },
            { month: "Feb", price: 2350 },
            { month: "Mar", price: 2550 },
            { month: "Apr", price: 2500 },
            { month: "May", price: 2100},
            { month: "Jun", price: 1900 },
            { month: "Jul", price: 2200 },
            { month: "Aug", price: 2300 },
            { month: "Sep", price: 2250 },
            { month: "Oct", price: 2350 },
            { month: "Nov", price: 2330 },
            { month: "Dec", price: 2100 }
        ],
        Rice: [
            { month: "Jan", price: 4809 },
            { month: "Feb", price: 5085 },
            { month: "Mar", price: 4000 },
            { month: "Apr", price: 4500 },
            { month: "May", price: 4130 },
            { month: "Jun", price: 5200 },
            { month: "Jul", price: 3300 },
            { month: "Aug", price: 5540 },
            { month: "Sep", price: 5250 },
            { month: "Oct", price: 5500 },
            { month: "Nov", price: 5770 },
            { month: "Dec", price: 4570 }
        ],
        Maize: [
            { month: "Jan", price: 150 },
            { month: "Feb", price: 155 },
            { month: "Mar", price: 160 },
            { month: "Apr", price: 170 },
            { month: "May", price: 180 },
            { month: "Jun", price: 190 },
            { month: "Jul", price: 200 },
            { month: "Aug", price: 210 },
            { month: "Sep", price: 220 },
            { month: "Oct", price: 230 },
            { month: "Nov", price: 240 },
            { month: "Dec", price: 250 }
        ],
        Barley: [
            { month: "Jan", price: 200 },
            { month: "Feb", price: 205 },
            { month: "Mar", price: 210 },
            { month: "Apr", price: 220 },
            { month: "May", price: 230 },
            { month: "Jun", price: 240 },
            { month: "Jul", price: 250 },
            { month: "Aug", price: 260 },
            { month: "Sep", price: 270 },
            { month: "Oct", price: 280 },
            { month: "Nov", price: 290 },
            { month: "Dec", price: 300 }
        ]
    };

    return (
        <>
            <Navbar />
            <div className="futurePrice">
                <div className="inner-container">
                    <h1>Future Price Prediction</h1>
                    <div className="select-crop">
                        <label>Select Crop</label>
                        <select value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)}>
                            <option value="Wheat">Wheat</option>
                            <option value="Rice">Rice</option>
                            <option value="Maize">Maize</option>
                            <option value="Barley">Barley</option>
                        </select>
                    </div>

                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={cropData[selectedCrop]}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Line type="monotone" dataKey="price" stroke="#4CAF50" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default FuturePrice;

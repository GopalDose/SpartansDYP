import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiPlant } from "react-icons/pi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import AddCrop from "../AddCrop/AddCrop";
import { RiDeleteBin7Fill } from "react-icons/ri";

const Dashboard = () => {
    const [showAddCrop, setShowAddCrop] = useState(false);
    const [crops, setCrops] = useState([]);

    // Function to show toast messages
    const handleToast = (message, type = "success") => {
        if (type === "success") {
            toast.success(message, { position: "top-right" });
        } else {
            toast.error(message, { position: "top-right" });
        }
    };

    // Fetch crops from API or local storage
    useEffect(() => {
        const fetchCrops = async () => {
            const userId = localStorage.getItem("userId"); // Get user ID from localStorage
            if (!userId) {
                handleToast("User ID not found. Please log in.", "error");
                return;
            }
    
            try {
                const response = await fetch(`http://localhost:4137/api/usercrop/${userId}`);
                // if (!response.ok) throw new Error("Failed to fetch crops");
    
                const data = await response.json();
                setCrops(data);
            } catch (error) {
                handleToast(error.message, "error");
            }
        };
    
        fetchCrops();
    }, []);
    

    return (
        <>
            <ToastContainer />
            <Navbar />
            <div className="dashboard">
                <div className="dashboard__container">
                    <div className="block">Good Morning</div>
                    <div className="title">Agricultural Dashboard</div>

                    {/* Display fetched crops */}
                    <div className="register-crops">
                        {crops.length > 0 ? (
                            crops.map((crop, index) => (
                                <Link to={`/yield/${crop._id}`} key={index} className="register-crop">
                                    <div className="data">
                                        <div className="title">{crop.name}</div>
                                        <div className="sowingdate">{crop.createdAt}</div>
                                        <div className="area">{crop.acres} acres</div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p>No crops found</p>
                        )}

                        {/* Add Crop Button */}
                        <div className="register-crop" onClick={() => setShowAddCrop(true)}>
                            <div className="addbtn">
                                <IoMdAddCircleOutline />
                                Add Crop
                            </div>
                        </div>
                    </div>

                    {/* Services Section */}
                    <div className="title">Our Services</div>
                    <div className="services-container">
                        <Link to="/crop-recc">
                            <div className="services-card">
                                <PiPlant className="icon" />
                                <div className="service__title">Crop Prediction</div>
                                <p>AI-powered insights for optimal crop selection and yield forecasting</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {showAddCrop && <AddCrop close={() => setShowAddCrop(false)} showToast={handleToast} />}
            <Footer />
        </>
    );
};

export default Dashboard;

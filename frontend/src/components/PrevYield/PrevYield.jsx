import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const PrevYield = () => {
    const [crops, setCrops] = useState([]);

    const handleToast = (message, type = "success") => {
        if (type === "success") {
            toast.success(message, { position: "top-right" });
        } else {
            toast.error(message, { position: "top-right" });
        }
    };

    useEffect(() => {
        const fetchCrops = async () => {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                handleToast("User ID not found. Please log in.", "error");
                return;
            }
            try {
                const response = await fetch(`http://localhost:4137/api/usercrop/${userId}`);
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
                    <div className="title">Previous Yields</div>

                    <div className="register-crops">
                        {crops.length > 0 ? (
                            crops
                                .filter(crop => !crop.state) // Only show crops with state: false
                                .map((crop, index) => (
                                    <Link to={`/yield/${crop._id}`} key={index} className="register-crop">
                                        <div className="data">
                                            <div className="title">{crop.name}</div>
                                            <div className="sowingdate">{crop.createdAt}</div>
                                            <div className="area">{crop.acres} acres</div>
                                        </div>
                                    </Link>
                                ))
                        ) : (
                            <p>No previous yields found</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PrevYield;
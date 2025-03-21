import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./AddCrop.css";

const AddCrop = ({ close, showToast }) => {
    const [formData, setFormData] = useState({ name: "", acres: "" });
    const userid = localStorage.getItem("userId");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userid) {
            showToast("User not logged in!", "error");
            return;
        }

        const payload = { ...formData, userid };

        try {
            const response = await fetch("http://localhost:4137/api/usercrop", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                showToast("Crop added successfully!", "success");
                close();
                setTimeout(()=>window.location.reload(),200);
            } else {
                showToast(data.message || "Failed to add crop.", "error");
            }
        } catch (error) {
            console.error("Error:", error);
            showToast("Server error, please try again later.", "error");
        }
    };

    return (
        <div className="content floating">
            <form className="form" onSubmit={handleSubmit}>
                <div className="flex-column">
                    <h2 className="card-title">Add Crop</h2>
                </div>
                <div className="flex-column">
                    <label>Crop Name</label>
                </div>
                <div className="inputForm">
                    <input
                        type="text"
                        className="input"
                        name="name"
                        placeholder="Enter Crop Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex-column">
                    <label>Acres</label>
                </div>
                <div className="inputForm">
                    <input
                        type="number"
                        className="input"
                        name="acres"
                        placeholder="Enter Acres"
                        value={formData.acres}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="button-submit">
                    Add Crop
                </button>
                <button type="button" onClick={close} className="light-submit">
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default AddCrop;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTask = ({ close, refreshTasks }) => { // Accept refreshTasks as prop
    const { id } = useParams();
    const [formData, setFormData] = useState({
        type: "",
        name: "",
        summary: "",
        price: "",
        quantity: "",
        companyname: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userid = localStorage.getItem("userId");
        if (!userid) {
            toast.error("User not logged in!");
            return;
        }

        if (!formData.price) {
            toast.error("Price is required!");
            return;
        }

        const payload = {
            ...formData,
            price: Number(formData.price), // Ensure price is a number
            quantity: formData.quantity ? Number(formData.quantity) : undefined,
            id,
            userid,
        };

        try {
            console.log("Payload:", payload);
            
            const response = await fetch(`http://localhost:4137/api/tasks/${id}`, { // Fixed URL interpolation
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Task added successfully!");
                refreshTasks(); // Refresh the task list after adding a task
                close(); // Close form
            } else {
                toast.error(data.message || "Failed to add task.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Server error, please try again later.");
        }
    };

    return (
        <div className="content floating">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="card-title">Add Task</h2>

                {/* Type Dropdown */}
                <div className="inputForm">
                    <label>Type</label>
                    <select
                        name="type"
                        className="input"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="Sowing">Sowing</option>
                        <option value="Fertilizer">Fertilizer</option>
                        <option value="Pesticides">Pesticides</option>
                        <option value="Harvesting">Harvesting</option>
                        <option value="Irrigation">Irrigation</option>
                        <option value="Cultivation">Cultivation</option>
                    </select>
                </div>

                {/* Name Field */}
                <div className="inputForm">
                    <label>Name</label>
                    <input
                        type="text"
                        className="input"
                        name="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Summary Field */}
                <div className="inputForm">
                    <label>Summary</label>
                    <input
                        type="text"
                        className="input"
                        name="summary"
                        placeholder="Enter Summary"
                        value={formData.summary}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Price Field (Now Required for All Types) */}
                <div className="inputForm">
                    <label>Price</label>
                    <input
                        type="number"
                        className="input"
                        name="price"
                        placeholder="Enter Price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Show only if Fertilizer or Pesticides selected */}
                {["Fertilizer", "Pesticides"].includes(formData.type) && (
                    <>
                        <div className="inputForm">
                            <label>Company Name</label>
                            <input
                                type="text"
                                className="input"
                                name="companyname"
                                placeholder="Enter Company Name"
                                value={formData.companyname}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="inputForm">
                            <label>Quantity</label>
                            <input
                                type="number"
                                className="input"
                                name="quantity"
                                placeholder="Enter Quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </>
                )}

                {/* Submit & Cancel Buttons */}
                <button type="submit" className="button-submit">Add Task</button>
                <button type="button" onClick={close} className="light-submit">Cancel</button>
            </form>
        </div>
    );
};

export default AddTask;

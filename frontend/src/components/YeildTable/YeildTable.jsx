import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './YeildTable.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import StatsCards from '../StatsCards/StatsCards'; 
import { FaLeaf, FaTree, FaCloudSun, FaSun } from 'react-icons/fa';
import { RiDeleteBin7Fill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const YeildTable = () => {
  const { id } = useParams(); // Get the crop ID from URL
  const navigate = useNavigate();
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch crop details from backend
  useEffect(() => {
    const fetchCropDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4137/api/usercrop/crops/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch crop details");
        }
        const data = await response.json();
        setCrop(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCropDetails();
  }, [id]);

  // Function to delete the crop
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this crop?")) return;

    try {
      const response = await fetch(`http://localhost:4137/api/usercrop/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete crop");
      }

      toast.success("Crop deleted successfully!");

      setTimeout(() => {
        navigate("/dashboard"); // Navigate back to dashboard after deletion
      }, 1500);
    } catch (error) {
      toast.error("Error deleting crop");
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="yeild">
        {loading ? (
          <p>Loading crop details...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <>
            <h1>
              {crop?.name} 
              <RiDeleteBin7Fill 
                onClick={handleDelete} 
                className='dlt-btn' 
              />
            </h1>
            <div className="data">Created Date: {new Date(crop?.createdAt).toLocaleDateString()}</div>
            <StatsCards /> 

            <div className="newentry">+ Add New Entry</div>

            <table className="table">
              <tbody>
                <tr className="data-row">
                  <td className="icon-cell">
                    <FaLeaf size={24} color="#4CAF50" />
                  </td>
                  <td>
                    <div className="main-text">Sowing</div>
                    <div className="sub-text">Wheat seeds planted in Field A</div>
                  </td>
                  <td className="time">2h ago</td>
                </tr>

                <tr className="data-row">
                  <td className="icon-cell">
                    <FaTree size={24} color="#4CAF50" />
                  </td>
                  <td>
                    <div className="main-text">Fertilization</div>
                    <div className="sub-text">Applied organic fertilizer to Field B</div>
                  </td>
                  <td className="time">5h ago</td>
                </tr>

                <tr className="data-row">
                  <td className="icon-cell">
                    <FaCloudSun size={24} color="#2196F3" />
                  </td>
                  <td>
                    <div className="main-text">Irrigation</div>
                    <div className="sub-text">Scheduled irrigation for Field C</div>
                  </td>
                  <td className="time">1d ago</td>
                </tr>

                <tr className="data-row">
                  <td className="icon-cell">
                    <FaSun size={24} color="#FFC107" />
                  </td>
                  <td>
                    <div className="main-text">Harvesting</div>
                    <div className="sub-text">Harvested crops from Field D</div>
                  </td>
                  <td className="time">3d ago</td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default YeildTable;

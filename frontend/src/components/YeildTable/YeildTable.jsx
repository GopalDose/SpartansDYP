import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './YeildTable.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import StatsCards from '../StatsCards/StatsCards';
import { FaLeaf, FaTree, FaCloudSun, FaSun, FaBug, FaTractor } from 'react-icons/fa';
import { RiDeleteBin7Fill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddTask from '../AddTask/AddTask';

const YeildTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crop, setCrop] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchCropDetails();
    fetchTasks();
  }, [id]);

  // Fetch crop details
  const fetchCropDetails = async () => {
    try {
      const response = await fetch(`http://localhost:4137/api/usercrop/crops/${id}`);
      if (!response.ok) throw new Error("Failed to fetch crop details");
      const data = await response.json();
      setCrop(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks associated with this crop
  const fetchTasks = async () => {
    try {
      const response = await fetch(`http://localhost:4137/api/tasks/t/${id}`);
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();

      setTasks(data);
      setTotalTasks(data.length);

      // Calculate total expense
      const totalCost = data.reduce((sum, task) => sum + (task.price || 0), 0);
      setTotalExpense(totalCost);
    } catch (error) {
      toast.error("Error fetching tasks");
    }
  };

  // Function to delete a task
  const handleDeleteTask = async () => {
    if (!selectedTask) return;

    try {
      const response = await fetch(`http://localhost:4137/api/tasks/${selectedTask._id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete task");

      toast.success("Task deleted successfully!");
      setSelectedTask(null);
      fetchTasks(); // Refresh tasks list
    } catch (error) {
      toast.error("Error deleting task");
    }
  };

  const handleDeleteYield = async () => {
    try {
      const response = await fetch(`http://localhost:4137/api/usercrop/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete crop");

      toast.success("Crop deleted successfully!");
      navigate("/dashboard"); // Redirect to dashboard after successful deletion
    } catch (error) {
      toast.error("Error deleting crop");
    }
  };

  const handleCompleteYield = async () => {
    const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage

    if (!userId) {
      toast.error("User not found. Please log in again.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4137/api/usercrop/deactivate/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }), // Send userId in request body
      });

      if (!response.ok) throw new Error("Failed to complete crop");

      toast.success("Crop marked as completed!");
      fetchCropDetails(); // Refresh data after marking as complete
    } catch (error) {
      toast.error("Error completing crop");
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
              <RiDeleteBin7Fill onClick={() => handleDeleteYield()} className='dlt-btn' />
              <div className="completed">
                <button onClick={handleCompleteYield}>Completed</button>
              </div>
            </h1>
            <div className="data">Created Date: {new Date(crop?.createdAt).toLocaleDateString()}</div>

            <StatsCards totalTasks={totalTasks} totalExpense={totalExpense} status={crop.state} />

            <div className="newentry" onClick={() => setShowForm(true)} style={{ cursor: "pointer" }}>
              + Add New Entry
            </div>

            <table className="table">
              <tbody>
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <tr key={task._id} className="data-row" onClick={() => setSelectedTask(task)}>
                      <td className="icon-cell">
                        {task.type === "Sowing" && <FaLeaf size={24} color="#4CAF50" />}
                        {task.type === "Fertilizer" && <FaTree size={24} color="#4CAF50" />}
                        {task.type === "Irrigation" && <FaCloudSun size={24} color="#2196F3" />}
                        {task.type === "Harvesting" && <FaSun size={24} color="#FFC107" />}
                        {task.type === "Pesticides" && <FaBug size={24} color="#FF5722" />}
                        {task.type === "Cultivation" && <FaTractor size={24} color="#8B4513" />}
                      </td>
                      <td>
                        <div className="main-text">{task.type}</div>
                        <div className="sub-text">{task.name}</div>
                      </td>
                      <td className="time">{new Date(task.createdAt).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No tasks added yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* Show AddTask form */}
      {showForm && <AddTask close={() => setShowForm(false)} refreshTasks={fetchTasks} />}

      {/* Popup for task deletion */}
      {selectedTask && (
        <div className="popup">
          <div className="popup-content">
            <h3>Delete Task?</h3>
            <p>Are you sure you want to delete <b>{selectedTask.name}</b>?</p>
            <div className="popup-buttons">
              <button onClick={handleDeleteTask} className="delete-btn">Delete</button>
              <button onClick={() => setSelectedTask(null)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default YeildTable;

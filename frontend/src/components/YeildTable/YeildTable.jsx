import React, { useState, useEffect } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import "./YeildTable.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import StatsCards from "../StatsCards/StatsCards";
import AddTask from "../AddTask/AddTask"; // Re-added this import
import {
  FaLeaf,
  FaTree,
  FaCloudSun,
  FaSun,
  FaBug,
  FaTractor,
} from "react-icons/fa";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiMicrophoneOn } from "react-icons/ci";

// Replace these with your actual Gemini Pro API endpoint and API key
const GEMINI_API_KEY = import.meta.env.VITE_API_KEY;
const GEMINI_PRO_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
const TASKS_API_URL = "http://localhost:4137/api/tasks"; // Your backend tasks endpoint

const YieldTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crop, setCrop] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchCropDetails();
    fetchTasks();
  }, [id]);

  const fetchCropDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:4137/api/usercrop/crops/${id}`
      );
      if (!response.ok) throw new Error("Failed to fetch crop details");
      const data = await response.json();
      setCrop(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(`http://localhost:4137/api/tasks/t/${id}`);
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTasks(data);
      setTotalTasks(data.length);
      setTotalExpense(data.reduce((sum, task) => sum + (task.price || 0), 0));
    } catch (error) {
      toast.error("Error fetching tasks");
    }
  };

  // Delete a task
  const handleDeleteTask = async () => {
    if (!selectedTask) return;
    try {
      const response = await fetch(
        `http://localhost:4137/api/tasks/${selectedTask._id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete task");
      toast.success("Task deleted successfully!");
      setSelectedTask(null);
      fetchTasks();
    } catch (error) {
      toast.error("Error deleting task");
    }
  };

  // Delete a yield
  const handleDeleteYield = async () => {
    if (!window.confirm("Are you sure you want to delete this yield?")) return;
    try {
      const response = await fetch(`http://localhost:4137/api/usercrop/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete yield");
      toast.success("Yield deleted successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Error deleting yield");
    }
  };

  // Mark yield as completed
  const handleCompleteYield = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User not found. Please log in again.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:4137/api/usercrop/deactivate/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }
      );
      if (!response.ok) throw new Error("Failed to mark yield as completed");
      toast.success("Yield marked as completed!");
      fetchCropDetails();
    } catch (error) {
      toast.error("Error completing yield");
    }
  };

  // Function to parse the response text dynamically
  const parseResponse = (text) => {
    const parsedData = {};

    // Extract key-value pairs using regex
    const regex = /(\w+):\s*([^\n]+)/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      let key = match[1].trim();
      let value = match[2].trim();

      // Convert "None" to appropriate defaults
      if (value === "None") {
        value = key === "price" ? 0 : key === "quantity" ? "N/A" : "";
      } else if (!isNaN(value) && key === "price") {
        value = parseFloat(value); // Ensure price is a number
      }

      parsedData[key] = value;
    }

    // Ensure default values if missing
    return {
      type: parsedData.type || "Cultivation",
      name: parsedData.name || "Untitled Task",
      summary: parsedData.summary || transcript,
      price: parsedData.price ?? 0,
      quantity: parsedData.quantity ?? "N/A",
      companyname: parsedData.companyname ?? "",
    };
  };
  // Process the speech transcript by calling Gemini Pro API directly
  // Process the speech transcript by calling Gemini Pro API directly
  const handleSpeechTranscript = async (transcript) => {
    try {
      console.log("Sending transcript to Gemini Pro API:", transcript);

      // Construct payload according to Gemini Pro API format
      const geminiPayload = {
        contents: [
          {
            parts: [
              {
                text: `Parse this agricultural task description and extract the following fields and just give the output dont add something like json or something like that:
                 type (must be one of: Sowing, Fertilizer, Irrigation, Harvesting, Pesticides, Cultivation),
                 name (a descriptive name for the task),
                 summary (detailed explanation),
                 price (numerical value if mentioned),
                 quantity (numerical value if mentioned),
                 companyname (if any company or brand is mentioned).
                 
                 Task description: ${transcript}`,
              },
            ],
          },
        ],
      };

      // Call Gemini Pro API
      const geminiResponse = await fetch(GEMINI_PRO_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(geminiPayload),
      });

      if (!geminiResponse.ok) {
        const errorData = await geminiResponse.json();
        console.error("Gemini Pro API error details:", errorData);
        throw new Error("Gemini Pro API error");
      }

      const geminiData = await geminiResponse.json();
      console.log("Raw Gemini Response:", geminiData);

      // Extract the response text
      const responseText = geminiData.candidates[0].content.parts[0].text;
      // Parse the response text into structured data matching the Mongoose model

      // Function to parse the response text dynamically
      const parseResponse = (text) => {
        const parsedData = {};

        // Extract key-value pairs using regex
        const regex = /(\w+):\s*([^\n]+)/g;
        let match;

        while ((match = regex.exec(text)) !== null) {
          let key = match[1].trim();
          let value = match[2].trim();

          // Convert "None" to appropriate defaults
          if (value === "None") {
            value = key === "price" ? 0 : key === "quantity" ? "N/A" : "";
          } else if (!isNaN(value) && key === "price") {
            value = parseFloat(value); // Ensure price is a number
          }

          parsedData[key] = value;
        }

        // Ensure default values if missing
        return {
          type: parsedData.type || "Cultivation",
          name: parsedData.name || "Untitled Task",
          summary: parsedData.summary || transcript,
          price: parsedData.price ?? 0,
          quantity: parsedData.quantity ?? "N/A",
          companyname: parsedData.companyname ?? "",
        };
      };

      const parsedData = parseResponse(responseText);
      console.log(parsedData);
      

      // Build the payload matching your Mongoose model exactly
      const taskPayload = {
        ...parsedData,
        cropid: id, // Using the cropid from params
      };
      console.log(taskPayload);
      
      // Log the task payload for debugging
      console.log("Sending task payload to backend:", taskPayload);

      // Send to your backend
      const taskResponse = await fetch(`${TASKS_API_URL + "/" + id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskPayload),
      });

      if (!taskResponse.ok) {
        const errorData = await taskResponse.text();
        console.error("Backend error details:", errorData);
        throw new Error("Failed to add task from speech");
      }

      toast.success("Task added via speech!");
      fetchTasks();
    } catch (error) {
      console.error("Error processing speech task:", error);
      toast.error("Failed to add task from speech. Please try again.");
    }
  };

  // Setup Speech Recognition
  useEffect(() => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      toast.error("Your browser does not support Speech Recognition.");
      return;
    }
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = "en-US";

    recognitionInstance.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Recognized Text:", transcript);
      // Directly process the transcript with Gemini Pro API
      handleSpeechTranscript(transcript);
    };

    recognitionInstance.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      toast.error("Speech recognition error. Try again.");
      setIsRecording(false);
    };

    recognitionInstance.onend = () => {
      setIsRecording(false);
    };

    setRecognition(recognitionInstance);
  }, []);

  const toggleRecording = () => {
    if (!recognition) {
      toast.error("Speech recognition not available.");
      return;
    }
    if (isRecording) {
      recognition.stop();
    } else {
      recognition.start();
      toast.info("Recording started. Speak now...");
    }
    setIsRecording(!isRecording);
  };

  return (
    <>
      <Navbar />
      <ToastContainer />

      <div className="yield">
        {loading ? (
          <p>Loading crop details...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <>
            <div className="back-btn-container">
              <button
                className="nav-button"
                onClick={() => navigate("/dashboard")}
              >
                Back
              </button>
            </div>

            <h1>
              {crop?.name}
              <RiDeleteBin7Fill
                onClick={handleDeleteYield}
                className="dlt-btn"
              />
              {crop.state && (
                <div className="completed">
                  <button onClick={handleCompleteYield}>Completed</button>
                  <button
                    className="nav-button finance-button"
                    onClick={() => navigate(`/finance/${id}`)}
                  >
                    Financial Planning
                  </button>
                </div>
              )}
            </h1>
            <div className="data">
              Created Date: {new Date(crop?.createdAt).toLocaleDateString()}
            </div>

            <StatsCards
              totalTasks={totalTasks}
              totalExpense={totalExpense}
              status={crop.state}
            />

            {crop.state && (
              <>
                <div
                  className="newentry"
                  onClick={() => setShowForm(true)}
                  style={{ cursor: "pointer" }}
                >
                  + Add New Entry
                </div>
                <div
                  className="newentry audio"
                  onClick={toggleRecording}
                  style={{ cursor: "pointer" }}
                >
                  <CiMicrophoneOn size={24} />
                  {isRecording ? " Stop Recording" : " Start Recording"}
                </div>
              </>
            )}

            <table className="table">
              <tbody>
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <tr
                      key={task._id}
                      className="data-row"
                      onClick={() => setSelectedTask(task)}
                    >
                      <td className="icon-cell">
                        {task.type === "Sowing" && (
                          <FaLeaf size={24} color="#4CAF50" />
                        )}
                        {task.type === "Fertilizer" && (
                          <FaTree size={24} color="#4CAF50" />
                        )}
                        {task.type === "Irrigation" && (
                          <FaCloudSun size={24} color="#2196F3" />
                        )}
                        {task.type === "Harvesting" && (
                          <FaSun size={24} color="#FFC107" />
                        )}
                        {task.type === "Pesticides" && (
                          <FaBug size={24} color="#FF5722" />
                        )}
                        {task.type === "Cultivation" && (
                          <FaTractor size={24} color="#8B4513" />
                        )}
                      </td>
                      <td>
                        <div className="main-text">{task.type}</div>
                        <div className="sub-text">{task.name}</div>
                      </td>
                      <td className="time">
                        {new Date(task.createdAt).toLocaleString()}
                      </td>
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

      {/* Show AddTask form if needed */}
      {showForm && (
        <AddTask close={() => setShowForm(false)} refreshTasks={fetchTasks} />
      )}

      {/* Popup for task deletion */}
      {selectedTask && (
        <div className="popup">
          <div className="popup-content">
            <h3>Delete Task?</h3>
            <p>
              Are you sure you want to delete <b>{selectedTask.name}</b>?
            </p>
            <div className="popup-buttons">
              <button onClick={handleDeleteTask} className="delete-btn">
                Delete
              </button>
              <button
                onClick={() => setSelectedTask(null)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default YieldTable;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './FinancialPlanning.css';
import { FaTable, FaChartPie, FaChartLine, FaLightbulb } from 'react-icons/fa';  // Use FaChartLine here

const FinancialPlanning = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [futureExpenses, setFutureExpenses] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [geminiLoading, setGeminiLoading] = useState(false);

  const GEMINI_API_KEY = 'AIzaSyDgsrTya7QBVnWkiZxn5564ZwmVJYMeKX8';
  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  useEffect(() => {
    fetchTasks();
  }, [id]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`http://localhost:4137/api/tasks/t/${id}`);
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      toast.error("Error fetching tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tasks.length > 0) {
      fetchGeminiPredictions();
      fetchGeminiSuggestions();
    }
  }, [tasks]);

  const prepareExpenseData = () => {
    // Group expenses by month
    const monthlyExpenses = {};
    tasks.forEach(task => {
      const date = new Date(task.createdAt);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      if (!monthlyExpenses[monthKey]) {
        monthlyExpenses[monthKey] = { total: 0, expenses: [] };
      }
      monthlyExpenses[monthKey].total += task.price || 0;
      monthlyExpenses[monthKey].expenses.push({
        type: task.type,
        amount: task.price || 0,
        name: task.name
      });
    });
    return monthlyExpenses;
  };

  const fetchGeminiPredictions = async () => {
    setGeminiLoading(true);
    try {
      const monthlyExpenses = prepareExpenseData();

      const prompt = {
        contents: [{
          parts: [{
            text: `Given the following monthly expense data: ${JSON.stringify(monthlyExpenses)}
                   Please provide predictions for the next 6 months of expenses.
                   Consider seasonal trends, expense patterns, and inflation.
                   Format your response as a JSON array of objects, each with 'month' and 'predictedExpense' properties.
                   Base months on the sequence: Jan, Feb, Mar, Apr, May, Jun.
                   Only respond with the JSON array, no additional text.`
          }]
        }]
      };

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prompt)
      });

      if (!response.ok) throw new Error("Prediction request failed");
      
      const data = await response.json();
      const predictionsText = data.candidates[0].content.parts[0].text;
      
      // Parse the response and validate
      let predictions = JSON.parse(predictionsText);
      if (!Array.isArray(predictions)) throw new Error("Invalid predictions format");
      
      predictions = predictions.map(pred => ({
        month: pred.month,
        predictedExpense: Number(pred.predictedExpense)
      }));

      setFutureExpenses(predictions);
    } catch (error) {
      console.error("Gemini prediction error:", error);
      toast.error("Error generating expense predictions");
      // Fallback to empty predictions
      setFutureExpenses([]);
    } finally {
      setGeminiLoading(false);
    }
  };

  const fetchGeminiSuggestions = async () => {
    try {
      const monthlyExpenses = prepareExpenseData();

      const prompt = {
        contents: [{
          parts: [{
            text: `Based on this expense data: ${JSON.stringify(monthlyExpenses)}
                   Provide 5 specific financial suggestions for the next season.
                   Consider:
                   - Spending patterns and trends
                   - Areas of high expense
                   - Potential cost savings
                   - Seasonal factors
                   - Budget optimization
                   Format your response as a JSON array of suggestion strings.
                   Only respond with the JSON array, no additional text.`
          }]
        }]
      };

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prompt)
      });

      if (!response.ok) throw new Error("Suggestions request failed");
      
      const data = await response.json();
      const suggestionsText = data.candidates[0].content.parts[0].text;
      
      // Parse and validate suggestions
      let parsedSuggestions = JSON.parse(suggestionsText);
      if (!Array.isArray(parsedSuggestions)) throw new Error("Invalid suggestions format");

      setSuggestions(parsedSuggestions);
    } catch (error) {
      console.error("Gemini suggestions error:", error);
      toast.error("Error generating financial suggestions");
      // Fallback to empty suggestions
      setSuggestions([]);
    }
  };

  const aggregateExpensesByType = () => {
    const aggregate = {};
    tasks.forEach(task => {
      const type = task.type;
      if (!aggregate[type]) aggregate[type] = 0;
      aggregate[type] += task.price || 0;
    });
    return Object.keys(aggregate).map(type => ({
      name: type,
      value: aggregate[type]
    }));
  };

  const pieData = aggregateExpensesByType();
  const COLORS = ['#4CAF50', '#FFC107', '#FF5722', '#2196F3', '#8B4513', '#9C27B0'];

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="financial-container">
        {/* Back Button above the name */}
        <div className="back-btn-container">
              <button className="nav-button" onClick={() => navigate("/dashboard")}>
                Back
              </button>
            </div>
        <h1>Financial Planning</h1>
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <>
            <h2>Expense Records</h2>
            <table className="financial-table">
              <thead>
                <tr>
                  <th>Task Type</th>
                  <th>Task Name</th>
                  <th>Expense</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length > 0 ? (
                  tasks.map(task => (
                    <tr key={task._id}>
                      <td>{task.type}</td>
                      <td>{task.name}</td>
                      <td>${(task.price || 0).toLocaleString()}</td>
                      <td>{new Date(task.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No expense records found.</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="chart-section">
              <h2>Expense Distribution by Type</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-section">
              <h2>Future Expense Prediction</h2>
              {geminiLoading ? (
                <p>Generating predictions...</p>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={futureExpenses} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Line type="monotone" dataKey="predictedExpense" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="suggestions-section">
              <h2>AI-Powered Financial Suggestions</h2>
              {suggestions.length > 0 ? (
                <ul className="suggestions-list">
                  {suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              ) : (
                <p>Generating suggestions...</p>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default FinancialPlanning;

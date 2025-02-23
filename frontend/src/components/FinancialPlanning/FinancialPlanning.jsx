import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './FinancialPlanning.css';
import _ from 'lodash';

// Constants for crop stages and calculations
const CROP_STAGES = {
  SOWING: 'sowing',
  GROWING: 'growing',
  MAINTENANCE: 'maintenance',
  HARVEST: 'harvest'
};

const TYPICAL_STAGE_DURATIONS = {
  [CROP_STAGES.SOWING]: 1,
  [CROP_STAGES.GROWING]: 2,
  [CROP_STAGES.MAINTENANCE]: 2,
  [CROP_STAGES.HARVEST]: 1
};

const SEASONAL_FACTORS = {
  'Dec': 1.2, 'Jan': 1.2, 'Feb': 1.2,  // Winter
  'Mar': 1.1, 'Apr': 1.1, 'May': 1.1,  // Spring
  'Jun': 1.0, 'Jul': 1.0, 'Aug': 1.0,  // Summer
  'Sep': 1.15, 'Oct': 1.15, 'Nov': 1.15 // Fall
};

const EXPENSE_CATEGORIES = {
  SOWING: ['seeds', 'land preparation', 'initial fertilizer'],
  GROWING: ['fertilizer', 'pesticides', 'irrigation'],
  MAINTENANCE: ['labor', 'equipment', 'monitoring'],
  HARVEST: ['harvesting equipment', 'labor', 'storage']
};

const FinancialPlanning = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [predictions, setPredictions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [sowingDate, setSowingDate] = useState(null);
  const [currentStage, setCurrentStage] = useState(null);
  const [predictionError, setPredictionError] = useState(null);
  const GROQ_API_KEY = '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';
  const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
  const GEMINI_API_KEY = 'AIzaSyDgsrTya7QBVnWkiZxn5564ZwmVJYMeKX8'; // Replace with your API key
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

      // Find sowing date and set current stage
      const sowingTask = data.find(task => task.type.toLowerCase() === CROP_STAGES.SOWING);
      if (sowingTask) {
        const sowingDateObj = new Date(sowingTask.createdAt);
        setSowingDate(sowingDateObj);
        setCurrentStage(determineCurrentStage(sowingDateObj));
      }
    } catch (error) {
      toast.error("Error fetching tasks");
    } finally {
      setLoading(false);
    }
  };

  const determineCurrentStage = (startDate) => {
    const monthsSinceSowing = (new Date() - startDate) / (30 * 24 * 60 * 60 * 1000);
    let accumulatedMonths = 0;

    for (const [stage, duration] of Object.entries(TYPICAL_STAGE_DURATIONS)) {
      accumulatedMonths += duration;
      if (monthsSinceSowing <= accumulatedMonths) return stage;
    }
    return CROP_STAGES.HARVEST;
  };

  const prepareHistoricalData = () => {
    if (!sowingDate) return {};

    const monthlyData = {};
    const sixMonthsAgo = new Date(sowingDate);
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    tasks.forEach(task => {
      const taskDate = new Date(task.createdAt);
      if (taskDate >= sixMonthsAgo) {
        const monthKey = `${taskDate.getFullYear()}-${String(taskDate.getMonth() + 1).padStart(2, '0')}`;
        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = {
            expenses: [],
            total: 0,
            stage: determineCurrentStage(taskDate)
          };
        }
        monthlyData[monthKey].expenses.push({
          type: task.type,
          amount: task.price || 0,
          name: task.name,
          date: taskDate
        });
        monthlyData[monthKey].total += task.price || 0;
      }
    });

    return monthlyData;
  };

  const calculateBaselinePredictions = () => {
    const historicalData = prepareHistoricalData();
    const stageAverages = calculateStageAverages(historicalData);
    const months = generateNextSixMonths();

    return months.map(monthData => {
      const stage = determineStageForDate(monthData.date);
      const baseExpense = stageAverages[stage] || 0;
      const seasonalFactor = SEASONAL_FACTORS[monthData.month.split(' ')[0]] || 1.0;

      return {
        month: monthData.month,
        predictedExpense: Math.round(baseExpense * seasonalFactor),
        confidence: 0.7,
        majorExpenseTypes: EXPENSE_CATEGORIES[stage] || [],
        stage: stage,
        isEstimate: true
      };
    });
  };

  const calculateStageAverages = (historicalData) => {
    const stageExpenses = {};
    Object.values(historicalData).forEach(monthData => {
      if (!stageExpenses[monthData.stage]) {
        stageExpenses[monthData.stage] = {
          total: 0,
          count: 0
        };
      }
      stageExpenses[monthData.stage].total += monthData.total;
      stageExpenses[monthData.stage].count++;
    });

    return Object.entries(stageExpenses).reduce((acc, [stage, data]) => {
      acc[stage] = data.total / data.count;
      return acc;
    }, {});
  };

  const generateNextSixMonths = () => {
    const months = [];
    let currentDate = new Date(sowingDate);

    for (let i = 0; i < 6; i++) {
      months.push({
        month: currentDate.toLocaleString('default', { month: 'short', year: 'numeric' }),
        date: new Date(currentDate)
      });
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return months;
  };

  const determineStageForDate = (date) => {
    const monthsSinceSowing = (date - sowingDate) / (30 * 24 * 60 * 60 * 1000);
    let accumulatedMonths = 0;

    for (const [stage, duration] of Object.entries(TYPICAL_STAGE_DURATIONS)) {
      accumulatedMonths += duration;
      if (monthsSinceSowing <= accumulatedMonths) return stage;
    }
    return CROP_STAGES.HARVEST;
  };

  // Expense prediction using Groq
  const fetchGroqPredictions = async () => {
    try {
      const historicalData = prepareHistoricalData();

      const messages = [
        {
          role: "system",
          content: "You are a financial analysis expert specializing in agricultural expense predictions. Analyze the provided data and generate detailed expense predictions."
        },
        {
          role: "user",
          content: `Analyze this agricultural expense data and predict future expenses:
            Historical Data: ${JSON.stringify(historicalData)}
            Sowing Date: ${sowingDate.toISOString()}
            Current Stage: ${currentStage}
            
            Consider:
            1. Crop growth stages and typical expenses
            2. Seasonal factors (${JSON.stringify(SEASONAL_FACTORS)})
            3. Historical expense patterns
            4. Stage-specific expenses (${JSON.stringify(EXPENSE_CATEGORIES)})
            5. Risk factors and contingencies
            
            Provide a JSON array of 6-month predictions with this structure:
            [
              {
                "month": "MMM YYYY",
                "predictedExpense": number,
                "confidence": number (0-1),
                "majorExpenseTypes": string[],
                "riskFactors": string[],
                "stage": string
              }
            ]
            
            Ensure the response is valid JSON only, with no additional text.`
        }
      ];

      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "mixtral-8x7b-32768",
          messages: messages,
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      if (!response.ok) throw new Error('Groq API request failed');

      const data = await response.json();
      return JSON.parse(data.choices[0].message.content.trim());
    } catch (error) {
      console.error('Groq prediction error:', error);
      throw error;
    }
  };
  // const fetchGeminiPredictions = async () => {
  //   try {
  //     const historicalData = prepareHistoricalData();

  //     const prompt = {
  //       contents: [{
  //         parts: [{
  //           text: `Analyze agricultural expense data and predict future expenses:
  //                  Historical Data: ${JSON.stringify(historicalData)}
  //                  Sowing Date: ${sowingDate.toISOString()}
  //                  Current Stage: ${currentStage}

  //                  Consider:
  //                  1. Crop growth stages and typical expenses
  //                  2. Seasonal factors (${JSON.stringify(SEASONAL_FACTORS)})
  //                  3. Historical expense patterns
  //                  4. Stage-specific expenses (${JSON.stringify(EXPENSE_CATEGORIES)})
  //                  5. Risk factors and contingencies

  //                  Provide 6-month expense predictions with:
  //                  - Monthly expense amounts
  //                  - Confidence levels
  //                  - Major expense categories
  //                  - Risk factors

  //                  Format as JSON array with:
  //                  {
  //                    month: "MMM YYYY",
  //                    predictedExpense: number,
  //                    confidence: number (0-1),
  //                    majorExpenseTypes: string[],
  //                    riskFactors: string[],
  //                    stage: string
  //                  }`
  //         }]
  //       }]
  //     };

  //     const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(prompt)
  //     });

  //     if (!response.ok) throw new Error('Gemini API request failed');

  //     const data = await response.json();
  //     return JSON.parse(data.candidates[0].content.parts[0].text);
  //   } catch (error) {
  //     console.error('Gemini prediction error:', error);
  //     throw error;
  //   }
  // };

  const generateFinancialSuggestions = async () => {
    try {
      const historicalData = prepareHistoricalData();
      const currentPredictions = predictions;

      const prompt = {
        contents: [{
          parts: [{
            text: `Based on:
                   Historical Data: ${JSON.stringify(historicalData)}
                   Current Predictions: ${JSON.stringify(currentPredictions)}
                   Current Stage: ${currentStage}
                   
                   Provide 5 actionable financial suggestions considering:
                   1. Cost optimization opportunities
                   2. Risk management strategies
                   3. Stage-specific requirements
                   4. Seasonal factors
                   5. Resource allocation
                   
                   Format as JSON array with:
                   {
                     suggestion: string,
                     priority: "High"|"Medium"|"Low",
                     rationale: string,
                     estimatedSavings: string,
                     implementationTime: string
                   }`
          }]
        }]
      };

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prompt)
      });

      if (!response.ok) throw new Error('Failed to generate suggestions');

      const data = await response.json();
      return JSON.parse(data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error('Error generating suggestions:', error);
      throw error;
    }
  };

  useEffect(() => {
    const updatePredictions = async () => {
      if (!sowingDate || !tasks.length) return;

      try {
        setPredictionError(null);
        // Use Groq for expense predictions
        const groqPredictions = await fetchGroqPredictions();
        setPredictions(groqPredictions);
      } catch (error) {
        console.warn('Falling back to baseline predictions:', error);
        // Fallback to baseline predictions
        const baselinePredictions = calculateBaselinePredictions();
        setPredictions(baselinePredictions);
        setPredictionError('Using estimated predictions due to API error');
      }

      try {
        // Use Gemini for financial suggestions
        const newSuggestions = await generateFinancialSuggestions();
        setSuggestions(newSuggestions);
      } catch (error) {
        console.error('Failed to generate suggestions:', error);
        setSuggestions([]);
      }
    };

    updatePredictions();
  }, [sowingDate, tasks]);

  const aggregateExpensesByType = () => {
    const aggregate = {};
    tasks.forEach(task => {
      const type = task.type;
      if (!aggregate[type]) aggregate[type] = 0;
      aggregate[type] += task.price || 0;
    });
    return Object.entries(aggregate).map(([name, value]) => ({ name, value }));
  };

  const COLORS = ['#4CAF50', '#FFC107', '#FF5722', '#2196F3', '#8B4513', '#9C27B0'];
  const pieData = aggregateExpensesByType();

  return (
    <div className="financial-planning-container">
      <div className="header-section">
        <button className="back-button" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
        <h1>Financial Planning</h1>
        {sowingDate && (
          <div className="crop-info">
            <p>Sowing Date: {sowingDate.toLocaleDateString()}</p>
            <p>Current Stage: {currentStage}</p>
          </div>
        )}
      </div>

      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : !sowingDate ? (
        <div className="no-data-message">
          <p>No sowing date found. Please add a sowing task first.</p>
        </div>
      ) : (
        <div className="content-grid">
          <div className="expense-records section-card">
            <h2>Expense Records</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Task Type</th>
                    <th>Name</th>
                    <th>Expense</th>
                    <th>Date</th>
                    <th>Stage</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map(task => (
                    <tr key={task._id}>
                      <td>{task.type}</td>
                      <td>{task.name}</td>
                      <td>${(task.price || 0).toLocaleString()}</td>
                      <td>{new Date(task.createdAt).toLocaleDateString()}</td>
                      <td>{determineStageForDate(new Date(task.createdAt))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="expense-distribution section-card">
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

          <div className="predictions-section section-card">
            <h2>6-Month Expense Predictions</h2>
            {predictionError && (
              <div className="prediction-error-banner">
                {predictionError}
              </div>
            )}
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={predictions}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="custom-tooltip">
                          <p className="tooltip-month">{data.month}</p>
                          <p className="tooltip-expense">
                            Predicted: ${data.predictedExpense.toLocaleString()}
                          </p>
                          <p className="tooltip-confidence">
                            Confidence: {(data.confidence * 100).toFixed(1)}%
                          </p>
                          <p className="tooltip-stage">Stage: {data.stage}</p>
                          <div className="tooltip-expenses">
                            <p>Major Expenses:</p>
                            <ul>
                              {data.majorExpenseTypes.map((type, i) => (
                                <li key={i}>{type}</li>
                              ))}
                            </ul>
                          </div>
                          {data.riskFactors && (
                            <div className="tooltip-risks">
                              <p>Risk Factors:</p>
                              <ul>
                                {data.riskFactors.map((risk, i) => (
                                  <li key={i}>{risk}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="predictedExpense"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="suggestions-section section-card">
            <h2>Financial Suggestions</h2>
            {suggestions.length > 0 ? (
              <div className="suggestions-grid">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`suggestion-card priority-${suggestion.priority.toLowerCase()}`}
                  >
                    <h3>{suggestion.suggestion}</h3>
                    <div className="suggestion-details">
                      <p className="priority">Priority: {suggestion.priority}</p>
                      <p className="rationale">{suggestion.rationale}</p>
                      <p className="savings">
                        Estimated Savings: {suggestion.estimatedSavings}
                      </p>
                      <p className="implementation">
                        Implementation: {suggestion.implementationTime}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-suggestions">Generating suggestions...</p>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default FinancialPlanning;

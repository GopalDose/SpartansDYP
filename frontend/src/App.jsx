import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Registration from './components/Registration/Registration';
import Dashboard from './components/Dashboard/Dashboard';
import loaderGif from './assets/images/loader.gif';
import Home from './pages/Home';
import CropRecommendation from './components/CropRecommendation/CropRecommendation';
import CropRecommendationOutput from './components/CropRecommendationOutput/CropRecommendationOutput';
import FuturePrice from './components/FuturePrice/FuturePrice';
import { SiChatbot } from "react-icons/si";
import YeildTable from './components/YeildTable/YeildTable';
import { useParams } from "react-router-dom";

// Optional: Import the translation hook if you need direct access to translation functions
import { useTranslation } from './contexts/TranslationContext';
import PrevYield from './components/PrevYield/PrevYield';
import FinancialPlanning from './components/FinancialPlanning/FinancialPlanning';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // We don't need to wrap the Router in TranslationProvider here since it's already in main.jsx

  return (
    <Router>
      {loading ? (
        <div className="loader-container">
          <img src={loaderGif} alt="Loading..." className="loader-gif" />
        </div>
      ) : (
        <>
          {/* Adding a hidden translation element for mobile responsiveness */}
          <div 
            id="google_translate_element_mobile" 
            style={{ 
              position: 'fixed', 
              bottom: '60px', // Position above chatbot
              right: '20px',
              zIndex: 1000,
              display: 'none', // Hidden by default, can be shown via media query
            }} 
          />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/crop-recc" element={<CropRecommendation />} />
            <Route path="/crop-recc-out" element={<CropRecommendationOutput />} />
            <Route path="/price" element={<FuturePrice />} />
            <Route path="/yield/:id" element={<YeildTable />} />
            <Route path="/prevyield" element={<PrevYield />} />
            <Route path="/finance/:id" element={<FinancialPlanning />} />
          </Routes>

          <div className="chatbot">
            <SiChatbot />
          </div>
        </>
      )}
    </Router>
  );
};

export default App;
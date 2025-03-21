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
import YeildTable from './components/YeildTable/YeildTable';
import Chatbot from "./components/Chatbot/Chatbot";
import PrevYield from './components/PrevYield/PrevYield';
import FinancialPlanning from './components/FinancialPlanning/FinancialPlanning';
import Finance from './components/Finance/Finance';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import CropIntelligence from './components/MarketPrice/CropIntelligence';
import LeaseMarket from '../../../kkwagh/frontend/src/components/LeaseMarket/LeaseMarket';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Registration />} /> 

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/crop-recc" element={<CropRecommendation />} />
              <Route path="/crop-recc-out" element={<CropRecommendationOutput />} />
              <Route path="/price" element={<FuturePrice />} />
              <Route path="/yield/:id" element={<YeildTable />} />
              <Route path="/prevyield" element={<PrevYield />} />
              <Route path="/finance/:id" element={<FinancialPlanning />} />
              <Route path="/lease-market" element={<LeaseMarket />} />
              <Route path="/finance" element={<Finance />} />
              <Route path='/cropintelligence' element={<CropIntelligence/>} />
            </Route>
          </Routes>

          {/* Chatbot component */}
          <Chatbot />
        </>
      )}
    </Router>
  );
};

export default App;

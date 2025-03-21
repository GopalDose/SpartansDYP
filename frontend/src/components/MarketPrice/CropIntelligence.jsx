import React, { useState } from 'react';
import './CropIntelligence.css';

const CropIntelligence = () => {
  // State for dropdown selections
  const [city, setCity] = useState('Buldhana');
  const [crop, setCrop] = useState('Soybeans');
  
  // State for dynamically generated data
  const [marketData, setMarketData] = useState(null);
  
  // State for loading and error handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // List of cities in Maharashtra
  const cities = [
    "Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Amravati", "Kolhapur", "Sangli", "Buldhana",
    "Thane", "Navi Mumbai", "Kalyan", "Dombivli", "Vasai", "Virar", "Pimpri-Chinchpad", "Jalgaon", "Dhule", "Nanded",
    "Akola", "Latur", "Chandrapur", "Parbhani", "Ichalkaranji", "Jalna", "Bhusawal", "Beed", "Gondia", "Satara",
    "Yavatmal", "Wardha", "Ahmednagar", "Malegaon", "Baramati", "Osmanabad", "Nandurbar", "Ratnagiri", "Chiplun",
    "Hingoli", "Washim", "Sindhudurg", "Bhandara", "Gadchiroli", "Raigad", "Alibag", "Palghar", "Udgir", "Karad",
  ];

  // Comprehensive list of crops in India
  const crops = [
    "Rice", "Wheat", "Maize", "Jowar", "Bajra", "Ragi", "Millets", "Barley", "Oats",
    "Gram", "Tur (Arhar)", "Moong", "Urad", "Masur", "Peas", "Lentils", "Chickpeas",
    "Groundnut", "Mustard", "Soybean", "Sunflower", "Sesame", "Safflower", "Niger", "Castor", "Linseed", "Rapeseed",
    "Sugarcane", "Cotton", "Jute", "Tobacco",
    "Tea", "Coffee", "Rubber", "Coconut", "Arecanut",
    "Pepper", "Cardamom", "Turmeric", "Ginger", "Chillies", "Nutmeg", "Cinnamon", "Clove",
    "Mango", "Banana", "Orange", "Apple", "Guava", "Papaya", "Pineapple", "Pomegranate", "Grapes",
    "Potato", "Tomato", "Onion", "Cucumber", "Bitter Gourd", "Pumpkin", "Ridged Gourd", "Watermelon", "Muskmelon",
    "Jatropha", "Jojoba",
  ];

  // Function to dynamically generate data based on city and crop
  const generateCropData = (selectedCity, selectedCrop) => {
    // Base values (similar to the static data in the image)
    let basePrice = 5500; // ₹5,500/quintal
    let priceChange = 2.5; // +2.5%
    let qualityMetrics = { premium: 60, standard: 35, substandard: 5 }; // Percentages
    let priceForecast = { nextWeek: 5600, nextMonth: 5800, confidence: 90 }; // ₹/quintal and %
    let marketSentiment = { supplyTrend: 'Moderate', marketVolatility: 'Low', tradingSignal: 'Buy' };

    // Adjust values based on city and crop
    // We'll use a simple formula to vary the data: use the length of the city and crop names to create variation
    const cityFactor = selectedCity.length % 5; // 0 to 4
    const cropFactor = selectedCrop.length % 5; // 0 to 4
    const variationFactor = (cityFactor + cropFactor) / 8; // Normalize to 0 to 1

    // Adjust Current Price
    basePrice = Math.round(basePrice + (variationFactor * 1000)); // Vary between 5500 and 6500
    priceChange = 2.5 + (variationFactor * 2); // Vary between 2.5% and 4.5%

    // Adjust Quality Metrics
    qualityMetrics.premium = Math.round(60 - (variationFactor * 10)); // Vary between 50% and 60%
    qualityMetrics.standard = Math.round(35 + (variationFactor * 5)); // Vary between 35% and 40%
    qualityMetrics.substandard = 100 - qualityMetrics.premium - qualityMetrics.standard; // Ensure total is 100%

    // Adjust Price Forecast
    priceForecast.nextWeek = Math.round(basePrice + 100 + (variationFactor * 500)); // Vary between basePrice+100 and basePrice+600
    priceForecast.nextMonth = Math.round(basePrice + 300 + (variationFactor * 700)); // Vary between basePrice+300 and basePrice+1000
    priceForecast.confidence = Math.round(90 - (variationFactor * 10)); // Vary between 80% and 90%

    // Adjust Market Sentiment
    marketSentiment.supplyTrend = variationFactor < 0.3 ? 'Low' : variationFactor < 0.7 ? 'Moderate' : 'High';
    marketSentiment.marketVolatility = variationFactor < 0.3 ? 'Low' : variationFactor < 0.7 ? 'Medium' : 'High';
    marketSentiment.tradingSignal = variationFactor < 0.5 ? 'Buy' : 'Hold';

    // Format the data to match the static structure
    return {
      currentPrice: `₹${basePrice.toLocaleString()}/quintal`,
      priceChange: `+${priceChange.toFixed(1)}%`,
      qualityMetrics: {
        premium: `${qualityMetrics.premium}%`,
        standard: `${qualityMetrics.standard}%`,
        substandard: `${qualityMetrics.substandard}%`,
      },
      priceForecast: {
        nextWeek: `₹${priceForecast.nextWeek.toLocaleString()}/quintal`,
        nextMonth: `₹${priceForecast.nextMonth.toLocaleString()}/quintal`,
        confidence: `${priceForecast.confidence}%`,
      },
      marketSentiment: {
        supplyTrend: marketSentiment.supplyTrend,
        marketVolatility: marketSentiment.marketVolatility,
        tradingSignal: marketSentiment.tradingSignal,
      },
    };
  };

  // Handle Analyze button click
  const handleAnalyze = () => {
    setLoading(true);
    setError(null);
    setMarketData(null); // Reset market data before generating new data

    // Simulate a delay to mimic API call
    setTimeout(() => {
      try {
        const generatedData = generateCropData(city, crop);
        setMarketData(generatedData);
      } catch (err) {
        setError('Failed to generate crop data. Please try again.');
        console.error('Error generating crop data:', err);
      } finally {
        setLoading(false);
      }
    }, 1000); // 1-second delay
  };

  return (
    <div className="crop-intelligence-container">
      {/* Header */}
      <div className="header">
        <h1>Maharashtra Crop Intelligence</h1>
        <p>Advanced agricultural insights and predictive analytics for Maharashtra</p>
      </div>

      {/* Dropdowns */}
      <div className="dropdowns">
        <div className="dropdown">
          <label>City</label>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            {cities.map((cityOption) => (
              <option key={cityOption} value={cityOption}>
                {cityOption}
              </option>
            ))}
          </select>
        </div>
        <div className="dropdown">
          <label>Crop</label>
          <select value={crop} onChange={(e) => setCrop(e.target.value)}>
            {crops.map((cropOption) => (
              <option key={cropOption} value={cropOption}>
                {cropOption}
              </option>
            ))}
          </select>
        </div>
        <button className="analyze-btn" onClick={handleAnalyze} disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze Crop Data'}
        </button>
      </div>

      {/* Loading and Error States */}
      {loading && <p className="loading">Loading data...</p>}
      {error && <p className="error">{error}</p>}

      {/* Cards Section - Only shown if marketData exists */}
      {marketData && (
        <>
          <div className="cards">
            {/* Market Overview Card */}
            <div className="card">
              <div className="card-header">
                <span className="icon">📊</span>
                <h3>Market Overview</h3>
              </div>
              <div className="card-content">
                <p>Current Price</p>
                <h4>{marketData.currentPrice}</h4>
                <p>Price Change</p>
                <h4 className="price-change">{marketData.priceChange}</h4>
              </div>
            </div>

            {/* Quality Metrics Card */}
            <div className="card">
              <div className="card-header">
                <span className="icon">⚖️</span>
                <h3>Quality Metrics</h3>
              </div>
              <div className="card-content">
                <p>Premium</p>
                <h4>{marketData.qualityMetrics.premium}</h4>
                <p>Standard</p>
                <h4>{marketData.qualityMetrics.standard}</h4>
                <p>Substandard</p>
                <h4>{marketData.qualityMetrics.substandard}</h4>
              </div>
            </div>

            {/* Price Forecast Card */}
            <div className="card">
              <div className="card-header">
                <span className="icon">📈</span>
                <h3>Price Forecast</h3>
              </div>
              <div className="card-content">
                <p>Next Week</p>
                <h4>{marketData.priceForecast.nextWeek}</h4>
                <p>Next Month</p>
                <h4>{marketData.priceForecast.nextMonth}</h4>
                <p>AI Confidence: {marketData.priceForecast.confidence}</p>
                <small>Forecast generated by GEMINI 2.0 ADVANCED</small>
              </div>
            </div>
          </div>

          {/* Real-Time Market Sentiment */}
          <div className="sentiment-card">
            <div className="card-header">
              <span className="icon">📡</span>
              <h3>Real-Time Market Sentiment</h3>
              <span className="live-updates">LIVE UPDATES</span>
            </div>
            <div className="sentiment-content">
              <div className="sentiment-item">
                <p>Supply Trend</p>
                <h4>{marketData.marketSentiment.supplyTrend}</h4>
              </div>
              <div className="sentiment-item">
                <p>Market Volatility</p>
                <h4>{marketData.marketSentiment.marketVolatility}</h4>
              </div>
              <div className="sentiment-item">
                <p>Trading Signal</p>
                <h4 className="buy-signal">{marketData.marketSentiment.tradingSignal}</h4>
              </div>
            </div>
            <small className="refresh-info">Data refreshes automatically every 5 minutes</small>
          </div>
        </>
      )}
    </div>
  );
};

export default CropIntelligence;
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TranslationProvider } from './contexts/TranslationContext';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TranslationProvider>
      <App />
    </TranslationProvider>
  </StrictMode>
);
// src/contexts/TranslationContext.jsx
import { createContext, useContext, useEffect } from 'react';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  useEffect(() => {
    // Ensure Google Translate has initialized
    const checkGoogleTranslate = setInterval(() => {
      if (window.google && window.google.translate) {
        clearInterval(checkGoogleTranslate);
      }
    }, 100);

    return () => clearInterval(checkGoogleTranslate);
  }, []);

  return (
    <TranslationContext.Provider value={{}}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
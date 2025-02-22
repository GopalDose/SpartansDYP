import React, { useEffect } from 'react';

const GoogleTranslateWrapper = () => {
  useEffect(() => {
    // Add Google Translate Script
    const addScript = () => {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    // Initialize Google Translate with only Indian languages
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,hi,mr,gu,te,ta,kn,ml,pa,bn,or,as,sd,ur', // Indian languages
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      }, 'google_translate_element');
    };

    addScript();

    // Cleanup
    return () => {
      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <div className="google-translate-container">
      <div id="google_translate_element"></div>
      <style>{`
        .google-translate-container {
          display: inline-block;
        }

        /* Style the Google Translate dropdown */
        .goog-te-gadget {
          font-family: inherit !important;
          font-size: 14px !important;
        }

        .goog-te-gadget-simple {
          background-color: transparent !important;
          border: none !important;
          padding: 0 !important;
          line-height: 2em !important;
          cursor: pointer !important;
        }

        .goog-te-menu-value {
          color: #374151 !important;
          text-decoration: none !important;
        }

        .goog-te-menu-value span {
          text-decoration: none !important;
          color: #374151 !important;
        }

        /* Hide unnecessary elements */
        .goog-te-gadget-icon,
        .goog-te-menu-value span:not(:first-child) {
          display: none !important;
        }

        /* Hide Google Translate attribution */
        .goog-te-gadget > span {
          display: none !important;
        }

        /* Style Google Translate dropdown */
        .goog-te-menu2 {
          border: 1px solid rgba(0, 0, 0, 0.1) !important;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default GoogleTranslateWrapper;
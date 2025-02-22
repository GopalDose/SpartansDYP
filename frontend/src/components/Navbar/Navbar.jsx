import React, { useState } from 'react';
import { IoMdHome } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { Globe, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'mr', name: 'मराठी' },
    { code: 'gu', name: 'ગુજરાતી' }
  ];

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language.name);
    setIsLanguageOpen(false);
    // Here you can add your language change logic
    // For example, using i18n or your preferred translation method
  };

  return (
    <div className="w-full bg-gray-50">
      <header className="flex justify-between items-center px-24 py-2">
        <div className="flex items-center gap-2">
          <img src="/api/placeholder/40/40" alt="Logo" className="w-10" />
          <span className="text-xl font-bold text-primary">ShetNiyojan</span>
        </div>
        
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <a href="#" className="text-primary font-semibold uppercase hover:opacity-80">
                <IoMdHome size={24} />
              </a>
            </li>
            <li>
              <a href="#" className="text-primary font-semibold uppercase hover:opacity-80">
                <FaUser size={24} />
              </a>
            </li>
            <li className="relative">
              <button 
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center gap-2 text-primary hover:opacity-80 focus:outline-none"
              >
                <Globe size={24} />
                <span className="font-semibold">{selectedLanguage}</span>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`}
                />
              </button>
              
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {language.name}
                    </button>
                  ))}
                </div>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
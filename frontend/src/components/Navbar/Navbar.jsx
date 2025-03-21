// import React from 'react';
// import './Navbar.css';
// import logo from '../../assets/images/logo.png';
// import { FaUser } from "react-icons/fa";
// import { IoMdHome } from "react-icons/io";
// import { Globe } from 'lucide-react';

// const Navbar = () => {
//   return (
//     <header>
//       <div className="logo">
//         <img src={logo} alt="" />
//         ShetNiyojan
//       </div>
//       <nav className="links">
//         <ul>
//           <li>
//             <a href="#"><IoMdHome /></a>
//           </li>
//           <li>
//             <a href="#"><FaUser /></a>
//           </li>
//           <li className="translate-wrapper">
//             <Globe size={30} />
//             <div id="google_translate_element" />
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default Navbar;




import React, { useState } from 'react';
import { IoMdHome } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { Globe, ChevronDown, Link } from 'lucide-react';
import logo from '../../assets/images/logo.png';

const Navbar = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [siteTitle, setSiteTitle] = useState('ShetNiyojan');

  return (
    <header className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <span>{siteTitle}</span>
      </div>

      <nav className="links">
        <ul>
          <li>
          <a href="/cropintelligence"><IoMdHome className=''/>Crop Intelligence</a>
          </li>
          <li>
            <a href="#"><IoMdHome className='icon' /></a>
          </li>
          <li>
            <a href="#"><FaUser className='icon' /></a>
          </li>
        </ul>
      </nav>

      <style>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 6rem;
          background-color: rgb(249, 250, 251);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--first, #374151);
        }

        .logo img {
          width: 40px;
          height: 40px;
        }

        .links ul {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
          margin-top: 1rem;
        }

        .links a {
          color: var(--first, #374151);
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          font-size: 1.25rem;
        }

        .links a:hover {
          opacity: 0.8;
        }

        .language-selector {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--first, #374151);
        }

        .lang-button {
          display: flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--first, #374151);
          font-weight: 600;
          padding: 0;
        }

        .chevron {
          transition: transform 0.2s ease;
        }

        .chevron.rotate {
          transform: rotate(180deg);
        }

        .language-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 8px;
          background: white;
          border-radius: 6px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(0, 0, 0, 0.1);
          min-width: 120px;
          z-index: 1000;
        }

        .lang-option {
          display: block;
          width: 100%;
          text-align: left;
          padding: 8px 16px;
          border: none;
          background: none;
          cursor: pointer;
          color: #374151;
          font-size: 14px;
        }
        @media (max-width: 768px) {
          .navbar {
            padding: 0.5rem 1rem;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;



// import React, { useState } from 'react';
// import './Navbar.css';
// import logo from '../../assets/images/logo.png';
// import { FaUser } from "react-icons/fa";
// import { IoMdHome } from "react-icons/io";
// import { Globe, ChevronDown } from 'lucide-react';

// const Navbar = () => {
//   const [isLanguageOpen, setIsLanguageOpen] = useState(false);
//   const [currentLanguage, setCurrentLanguage] = useState('English');
//   const [siteTitle, setSiteTitle] = useState('ShetNiyojan');

//   const languages = [
//     { code: 'en', name: 'English', title: 'ShetNiyojan' },
//     { code: 'hi', name: 'हिंदी', title: 'शेतनियोजन' },
//     { code: 'mr', name: 'मराठी', title: 'शेतनियोजन' },
//     { code: 'gu', name: 'ગુજરાતી', title: 'ખેતનિયોજન' }
//   ];

//   const handleLanguageChange = (language) => {
//     setCurrentLanguage(language.name);
//     setSiteTitle(language.title);
//     setIsLanguageOpen(false);
//   };

//   return (
//     <header>
//       <div className="logo">
//         <img src={logo} alt="" />
//         {siteTitle}
//       </div>
//       <nav className="links">
//         <ul>
//           <li>
//             <a href="#"><IoMdHome /></a>
//           </li>
//           <li>
//             <a href="#"><FaUser /></a>
//           </li>
//           <li className="translate-wrapper">
//             <div className="language-selector">
//               <Globe size={30} />
//               <button 
//                 onClick={() => setIsLanguageOpen(!isLanguageOpen)} 
//                 className="lang-button"
//               >
//                 {currentLanguage}
//                 <ChevronDown 
//                   size={16} 
//                   className={isLanguageOpen ? 'chevron rotate' : 'chevron'} 
//                 />
//               </button>

//               {isLanguageOpen && (
//                 <div className="language-dropdown">
//                   {languages.map((lang) => (
//                     <button
//                       key={lang.code}
//                       className="lang-option"
//                       onClick={() => handleLanguageChange(lang)}
//                     >
//                       {lang.name}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </li>
//         </ul>
//       </nav>

//       <style>{`
//         .language-selector {
//           position: relative;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }

//         .lang-button {
//           display: flex;
//           align-items: center;
//           gap: 4px;
//           background: none;
//           border: none;
//           cursor: pointer;
//           color: var(--first);
//           font-weight: 600;
//           padding: 0;
//         }

//         .chevron {
//           transition: transform 0.2s ease;
//         }

//         .chevron.rotate {
//           transform: rotate(180deg);
//         }

//         .language-dropdown {
//           position: absolute;
//           top: 100%;
//           right: 0;
//           margin-top: 8px;
//           background: white;
//           border-radius: 6px;
//           box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//           border: 1px solid rgba(0, 0, 0, 0.1);
//           min-width: 120px;
//           z-index: 1000;
//         }

//         .lang-option {
//           display: block;
//           width: 100%;
//           text-align: left;
//           padding: 8px 16px;
//           border: none;
//           background: none;
//           cursor: pointer;
//           color: #374151;
//           font-size: 14px;
//         }

//         .lang-option:hover {
//           background-color: #F3F4F6;
//         }
//       `}</style>
//     </header>
//   );
// };

// export default Navbar;
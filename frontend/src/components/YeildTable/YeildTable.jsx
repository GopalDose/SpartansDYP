import React from 'react';
import './YeildTable.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import StatsCards from '../StatsCards/StatsCards'; // Import the new component
import { FaLeaf, FaTree, FaCloudSun, FaSun } from 'react-icons/fa';

const YeildTable = () => {
  return (
    <>
      <Navbar />
      <div className="yeild">
        
      <h1>Wheat</h1>
        <div className="data">Created Date: 10/01/2021</div>
        <StatsCards /> {/* Add the StatsCards component here */}

        <div className="newentry">+ Add New Entry</div>

        <table className="table">
          <tbody>
            <tr className="data-row">
              <td className="icon-cell">
                <FaLeaf size={24} color="#4CAF50" />
              </td>
              <td>
                <div className="main-text">Sowing</div>
                <div className="sub-text">Wheat seeds planted in Field A</div>
              </td>
              <td className="time">2h ago</td>
            </tr>

            <tr className="data-row">
              <td className="icon-cell">
                <FaTree size={24} color="#4CAF50" />
              </td>
              <td>
                <div className="main-text">Fertilization</div>
                <div className="sub-text">Applied organic fertilizer to Field B</div>
              </td>
              <td className="time">5h ago</td>
            </tr>

            <tr className="data-row">
              <td className="icon-cell">
                <FaCloudSun size={24} color="#2196F3" />
              </td>
              <td>
                <div className="main-text">Irrigation</div>
                <div className="sub-text">Scheduled irrigation for Field C</div>
              </td>
              <td className="time">1d ago</td>
            </tr>

            <tr className="data-row">
              <td className="icon-cell">
                <FaSun size={24} color="#FFC107" />
              </td>
              <td>
                <div className="main-text">Harvesting</div>
                <div className="sub-text">Harvested crops from Field D</div>
              </td>
              <td className="time">3d ago</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default YeildTable;

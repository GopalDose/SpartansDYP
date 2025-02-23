import React from "react";
import { FaLeaf, FaDollarSign, FaCalendarCheck, FaTractor } from "react-icons/fa";
import "./StatsCards.css";

const StatsCards = ({ totalTasks, totalExpense, status }) => {
  const stats = [
    { title: "Days remain", value: "12", subtitle: "Active cultivation", icon: <FaLeaf size={20} color="green" /> },
    { title: "Expense", value: totalExpense, subtitle: "This Yield", icon: <FaDollarSign size={20} color="purple" /> },
    { title: "Activities", value: totalTasks, subtitle: "This Yield", icon: <FaCalendarCheck size={20} color="green" /> },
    { title: "Status", value: status ? "Active" : "Inactive", subtitle: "Yield", icon: <FaTractor size={20} color="purple" /> }
  ];

  console.log(totalTasks, totalExpense, status);

  return (
    <div className="stats-container">
      {stats.map((stat, index) => (
        <div className="stats-card" key={index}>
          <div className="stats-header">
            <span>{stat.icon}</span>
            <h3>{stat.title}</h3>
          </div>
          <h2>{stat.value}</h2>
          <p>{stat.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;

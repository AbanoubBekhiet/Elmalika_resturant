import React from "react";
import { FaClipboardCheck } from "react-icons/fa";

const StatisticsCard = ({ title, value, icon: Icon, bgColor }) => {
  return (
    <div className="bg-white shadow-sm rounded-xl py-6 px-12 flex items-center justify-between ">
      {/* Text Section */}
      <div className="text-right">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-lg font-bold text-gray-800">{value}</p>
      </div>

      {/* Icon Section */}
      <div
        className={`p-3 rounded-lg flex items-center justify-center`}
        style={{ backgroundColor: bgColor || "#FEF9C3" }} // Default light yellow
      >
        {Icon ? <Icon className="text-yellow-500 text-4xl" /> : <FaClipboardCheck className="text-yellow-500 text-xl" />}
      </div>
    </div>
  );
};

export default StatisticsCard;
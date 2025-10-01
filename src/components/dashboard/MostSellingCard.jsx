import React from "react";
import { FaStar } from "react-icons/fa";

const MostSellingCard = ({ image, title, price, oldPrice, sold }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
      {/* Image */}
      <img src={image} alt={title} className="w-full h-32 object-cover" />

      {/* Content */}
      <div className="p-3 text-right">
        {/* Rating */}
        <div className="flex items-center justify-end gap-1 text-yellow-500 text-xs mb-1">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>

        {/* Title */}
        <h3 className="font-medium text-gray-800">{title}</h3>

        {/* Prices */}
        <div className="flex items-center justify-between text-xs mt-2">
          <span className="text-gray-500 line-through">{oldPrice} جنيه</span>
          <span className="text-green-600 font-bold">{price} جنيه مصري</span>
        </div>

        {/* Sold */}
        <p className="text-xs text-gray-400 mt-1">{sold} مبيعة</p>
      </div>
    </div>
  );
};

export default MostSellingCard;
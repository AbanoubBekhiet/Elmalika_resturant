import React from "react";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ 
  title, 
  image, 
  price, 
  oldPrice, 
  status,   // e.g. "SOLD OUT"
  discount, // e.g. "-17%"
  rating    // e.g. 4 or 5
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden relative">
      
      {/* Status Badge */}
      {status && (
        <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
          {status}
        </span>
      )}

      {/* Discount Badge */}
      {discount && (
        <span className="absolute top-2 right-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded">
          {discount}
        </span>
      )}

      {/* Image */}
      <img src={image} alt={title} className="w-full h-40 object-cover" />

      {/* Info */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-sm font-bold truncate">{title}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-400 text-xs">
          {[...Array(5)].map((_, i) => (
            <FaStar 
              key={i} 
              className={i < Math.floor(rating) ? "fill-current" : "text-gray-300"} 
            />
          ))}
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-2 text-sm">
          <span className="font-bold text-green-600">{price} ج.م</span>
          {oldPrice && (
            <span className="line-through text-gray-400 text-xs">{oldPrice} ج.م</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
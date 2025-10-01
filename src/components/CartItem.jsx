import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FiTrash2 } from "react-icons/fi";
import DefaultImage from "../assets/product.jpg";

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    updateQuantity(item.id, item.quantity - 1);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div
      className="flex items-center gap-4 p-4 bg-white border-b border-gray-100 relative shadow-2xl m-4"
      dir="rtl"
    >
      {/* Trash icon - Top left */}
      <button
        onClick={handleRemove}
        className="absolute top-2 left-2 w-6 h-6 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
        title="حذف العنصر"
      >
        <FiTrash2 size={20} />
      </button>

      {/* Product Image */}
      <div className="flex-shrink-0">
        <img
          src={item.product.imageUrl ?? DefaultImage}
          alt={item.product.name}
          className="w-20 h-16 object-cover rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 text-right pr-2">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          {item.product.name} ({item.size?.name})
        </h3>
        <div className="text-sm text-gray-500 mb-2 leading-relaxed">
          {item.product.description}
        </div>
        <div className="text-lg font-bold text-gray-900">
          {item.itemTotal} <span className="text-sm font-normal">EGP</span>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={handleDecrease}
          disabled={item.quantity <= 1}
          className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed text-gray-600 font-bold transition-colors rounded-sm"
        >
          -
        </button>

        <div className="w-8 h-8 flex items-center justify-center font-bold text-sm rounded-sm">
          {item.quantity}
        </div>

        <button
          onClick={handleIncrease}
          className="w-8 h-8 flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-white font-bold transition-colors rounded-sm"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default CartItem;

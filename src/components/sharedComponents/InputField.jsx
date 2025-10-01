import React from "react";

function InputField({ label, value, placeholder, type = "text", onChange }) {
  return (
    <div className="flex flex-col text-right w-full">
      <label className="text-sm text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-yellow-400 outline-none"
      />
    </div>
  );
}

export default InputField;
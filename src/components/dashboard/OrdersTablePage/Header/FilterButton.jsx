import React from "react";
const FilterButton = () => (
  <button className="border rounded-lg px-4 py-2 flex items-center gap-2 text-gray-600 hover:bg-gray-100">
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 4h18M4 12h16M6 20h12"
      />
    </svg>
    <span>تصفية</span>
  </button>
);
export default FilterButton;
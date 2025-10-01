import React from "react";

function Taps({ tabs, selectedTab, onTabChange }) {
  return (
    <div>
      <div className="flex gap-4 mb-6 border border-gray-200 rounded-2xl px-2 py-1 bg-gray-50 text-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-1 rounded-full flex-1 transition ${
              selectedTab === tab.id
                ? "bg-yellow-100 text-yellow-600 font-bold"
                : "text-gray-600 hover:text-yellow-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Taps;
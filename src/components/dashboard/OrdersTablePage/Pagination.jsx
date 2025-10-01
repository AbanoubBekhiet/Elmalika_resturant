import React from "react";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {/* Previous Button */}
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-full ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-100 text-gray-700 hover:bg-yellow-400 hover:text-white"
        }`}
      >
        السابق
      </button>

      {/* Next Button */}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-full ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-yellow-200 text-gray-700 hover:bg-yellow-400 hover:text-white"
        }`}
      >
        التالي
      </button>
    </div>
  );
};

export default Pagination;

import React from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { HiMiniArrowLeft } from "react-icons/hi2";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
	return (
		<div className="flex justify-center gap-2 mt-4">
			{/* Next Button */}
			<button
				onClick={() => setCurrentPage(currentPage + 1)}
				disabled={currentPage === totalPages}
				className={`p-3 rounded-full ${
					currentPage === totalPages
						? "bg-gray-200 text-gray-400 cursor-not-allowed"
						: "bg-yellow-400 text-gray-700 hover:bg-yellow-200 hover:text-black"
				}`}
			>
				<HiMiniArrowLeft />
			</button>

			{/* Previous Button */}
			<button
				onClick={() => setCurrentPage(currentPage - 1)}
				disabled={currentPage === 1}
				className={`p-3 rounded-full ${
					currentPage === 1
						? "bg-gray-100 text-gray-400 cursor-not-allowed"
						: "bg-yellow-400 text-gray-700 hover:bg-yellow-200 hover:text-black"
				}`}
			>
				<HiOutlineArrowRight />
			</button>
		</div>
	);
};

export default Pagination;

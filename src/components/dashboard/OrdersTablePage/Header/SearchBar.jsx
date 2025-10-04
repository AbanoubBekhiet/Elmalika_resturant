import React, { memo } from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => (
	<div className="flex items-center border rounded-lg px-2 sm:px-3 py-2 bg-gray-50 w-full max-w-md">
		<input
			type="text"
			value={searchTerm}
			onChange={(e) => setSearchTerm(e.target.value)}
			placeholder="بحث برقم الطلب، اسم العميل، حالة الدفع، طريقة الدفع..."
			className="flex-1 bg-transparent outline-none text-xs sm:text-sm md:text-base text-gray-700 placeholder-gray-400 w-full"
		/>
		<svg
			className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.15 13.65z"
			/>
		</svg>
	</div>
);

export default memo (SearchBar);

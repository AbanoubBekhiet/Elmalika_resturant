import React from "react";
import { FaFilter } from "react-icons/fa";
import { Navigate } from "react-router-dom";

const PageHeader = ({
	// tabs,
	buttonText,
	inputPlaceholder,
	setShowForm,
	searchTerm,
	setSearchTerm, 
}) => {
	// const [selectedTab, setSelectedTab] = useState("all");

	return (
		<div className="bg-white shadow rounded-lg p-4 mb-6">
			{/* Top row */}
			<div className="flex flex-wrap items-center justify-between gap-4 mb-4">
				{/* Left side (buttons) */}
				<div className="flex items-center gap-3">
					<button
						onClick={() => setShowForm(true)}
						className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded font-bold flex items-center gap-2"
					>
						+ {buttonText}
					</button>

					<button className="border border-gray-200 rounded px-3 py-2 flex items-center gap-2 text-sm hover:bg-gray-50">
						<FaFilter />
						تصفية
					</button>
				</div>

				{/* Right side (search bar) */}
				<div
					className="flex flex-row-reverse items-center border border-gray-200 
                rounded-lg px-3 py-2 bg-gray-50 w-full sm:max-w-xs md:max-w-md lg:max-w-lg"
				>
					<input
						type="text"
						placeholder={inputPlaceholder}
						value={searchTerm} // ✅ controlled input
						onChange={(e) => setSearchTerm(e.target.value)}
						className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 text-right"
					/>
					<svg
						className="w-5 h-5 text-gray-500 mr-2"
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
			</div>

			{/* Tabs row */}
			{/* <div className="flex gap-4 border border-gray-200 rounded-2xl px-2 py-1 bg-gray-50 text-sm">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => setSelectedTab(tab.id)}
						className={`px-4 py-1 rounded-full flex-1 transition ${
							selectedTab === tab.id
								? "bg-yellow-100 text-yellow-600 font-bold"
								: "text-gray-600 hover:text-yellow-600"
						}`}
					>
						{tab.label} ({tab.count})
					</button>
				))}
			</div> */}
		</div>
	);
};

export default PageHeader;

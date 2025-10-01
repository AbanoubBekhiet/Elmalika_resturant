import React from "react";
import { GoKebabHorizontal } from "react-icons/go";

const StatCard = ({ icon, value, label }) => {
	return (
		<div className="flex flex-col items-end justify-center text-center w-full h-full bg-white shadow rounded-2xl p-12">
			<div className="flex flex-row-reverse justify-between w-full">
				<div className="text-yellow-500 text-3xl mb-2">{icon}</div>
				<GoKebabHorizontal size={30}/>
			</div>
			<h2 className="text-2xl font-bold text-blue-900">{value}</h2>
			<p className="text-gray-600 text-sm">{label}</p>
		</div>
	);
};

export default StatCard;

import React from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	Cell,
} from "recharts";

const NumberOfOrdersStatistics = ({data}) => {
	// const data = [
	// 	{ day: "الخميس", value: 60 },
	// 	{ day: "الأربعاء", value: 220 },
	// 	{ day: "الثلاثاء", value: 120 },
	// 	{ day: "الاثنين", value: 230 },
	// 	{ day: "الأحد", value: 160 },
	// 	{ day: "السبت", value: 90 },
	// 	{ day: "الجمعة", value: 70 },
	// ];


	// Custom tooltip
	const CustomTooltip = ({ active, payload }) => {
		if (active && payload && payload.length) {
			return (
				<div className="bg-black text-white px-3 py-1 rounded-lg shadow text-xs">
					<p>{`${payload[0].value} طلب`}</p>
				</div>
			);
		}
		return null;
	};

	return (
		<div className="bg-white rounded-lg shadow-md p-6 w-full h-full">
			{/* Header */}
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-lg font-semibold text-gray-800">عدد الطلبات</h2>
				<button className="text-blue-500 text-sm hover:underline flex items-center gap-1">
					اسبوعي
					<svg
						className="w-4 h-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</button>
			</div>

			{/* Chart */}
			<div className="h-80 w-full">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						data={data}
						margin={{
							top: 20,
							right: 20,
							left: 10,
							bottom: 20,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
						<XAxis
							dataKey="day"
							tick={{ fontSize: 12, fill: "#6b7280" }}
							axisLine={false}
							tickLine={false}
						/>
						<YAxis
							tick={{ fontSize: 12, fill: "#6b7280" }}
							axisLine={false}
							tickLine={false}
							domain={[0, 100]}
							ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
						/>
						<Tooltip
							content={<CustomTooltip />}
							cursor={{ fill: "transparent" }}
						/>

						<Bar
							dataKey="value"
							radius={[6, 6, 0, 0]}
							barSize={40}
							// Default light yellow
						>
							{data.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={"#facc15"} />
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default NumberOfOrdersStatistics;

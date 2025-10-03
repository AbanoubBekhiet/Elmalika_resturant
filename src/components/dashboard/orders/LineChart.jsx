import React from "react";
import {
	LineChart as ReLineChart,
	Line,
	Bar,
	BarChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
	ComposedChart,
} from "recharts";



const LineChart = ({data}) => {
	return (
		<div className="bg-white p-6 rounded-lg shadow h-full">
			<h3 className="mb-4 font-bold text-center">عرض الطلبات</h3>
			<ResponsiveContainer width="100%" height={300}>
				<ComposedChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="month" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar
						dataKey="ordersNum"
						barSize={30}
						fill="#FACC15"
						radius={[10, 10, 0, 0]}
					/>
					<Line type="monotone" dataKey="trend" stroke="#F59E0B" strokeWidth={3} />
				</ComposedChart>
			</ResponsiveContainer>
		</div>
	);
};

export default LineChart;

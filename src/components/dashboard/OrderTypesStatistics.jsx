import React from "react";

const OrderTypesStatistics = ({ data }) => {
	const maxValue = Math.max(...data.map((item) => item.value));

	return (
		<div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm h-full">
			{/* Header */}
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-lg font-semibold text-gray-800">انواع الطلبات</h2>
			</div>

			{/* Statistics List */}
			<div className="space-y-5">
				{data.map((item, index) => (
					<div key={index} className="space-y-2">
						{/* Value, Percentage and Progress Bar Row */}
						<div className="flex items-center gap-3">
							{/* Value */}
							<span className="text-lg font-bold text-gray-800 w-8">
								{item.value}
							</span>

							{/* Progress Bar Container */}
							<div className="flex-1 relative">
								{/* Background Bar */}
								<div className="bg-gray-200 rounded-full h-8 overflow-hidden">
									{/* Filled Bar */}
									<div
										className={`h-full bg-yellow-400 rounded-full transition-all duration-500 relative`}
										style={{ width: `${(item.value / maxValue) * 100}%` }}
									>
										{/* Percentage Text Inside Bar */}
										<span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs font-medium">
											%{item.percentage}
										</span>
									</div>
								</div>
							</div>
						</div>

						{/* Label */}
						<div className="flex items-center">
							<span className="text-sm text-gray-600 mr-12">
								{item.foodType}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default OrderTypesStatistics;

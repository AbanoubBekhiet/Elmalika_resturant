import React from "react";
import BubbleChart from "../../components/dashboard/orders/BubbleChart";
import LineChart from "../../components/dashboard/orders/LineChart";
import StatsGrid from "../../components/dashboard/orders/StatsGrid";
import OrdersTablePage from "../../components/dashboard/OrdersTablePage";

function Orders() {
	return (
		<>
			<div className="p-6  grid grid-cols-1 lg:grid-cols-3 gap-6 ">
				<div className="lg:col-span-1 ">
					<StatsGrid />
				</div>

				<div className="lg:col-span-1">
					<LineChart />
				</div>

				<div className="lg:col-span-1 ">
					<BubbleChart />
				</div>
			</div>
			<OrdersTablePage />
		</>
	);
}

export default Orders;

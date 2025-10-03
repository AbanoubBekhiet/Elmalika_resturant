import React, { useEffect, useState } from "react";
import BubbleChart from "../../components/dashboard/orders/BubbleChart";
import LineChart from "../../components/dashboard/orders/LineChart";
import StatsGrid from "../../components/dashboard/orders/StatsGrid";
import OrdersTablePage from "../../components/dashboard/OrdersTablePage";
import axios from "axios";
import Loader from "../../loaders/Loader";
const API_URL = `https://api.queen.kitchen/admin/stats`;

function Orders() {
	const [stats, setStats] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const { data } = await axios.get(API_URL, { withCredentials: true });
				setStats(data);
			} catch (err) {
				setError("فشل في تحميل البيانات");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		fetchStats();
	}, []);

	if (loading) return <Loader/>;
	if (error) return <p className="p-5 text-red-500">{error}</p>;
	return (
		<>
			<div className="p-6  grid grid-cols-1 lg:grid-cols-3 gap-6 ">
				<div className="lg:col-span-1 ">
					<StatsGrid />
				</div>

				<div className="lg:col-span-1">
					<LineChart data={stats.charts.revenueByMonth}/>
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

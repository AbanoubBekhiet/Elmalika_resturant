import React, { useEffect, useState } from "react";
import axios from "axios";
import OrdersTablePage from "../../components/dashboard/OrdersTablePage";
import MostSellingNavBar from "../../components/dashboard/MostSellingNavBar";
import StatisticsCards from "../../components/dashboard/StatisticsCards";
import MostSellingStatistics from "../../components/dashboard/MostSellingStatistics";
import OrderTypesStatistics from "../../components/dashboard/OrderTypesStatistics";
import TotalIncome from "../../components/dashboard/TotalIncome";
import NumberOfOrdersStatistics from "../../components/dashboard/NumberOfOrdersStatistics";
import Loader from "../../loaders/Loader";

const API_URL = `https://api.queen.kitchen/admin/stats`; // 🔑 غير VITE_BASE_URL حسب إعدادك

function Dashboard() {
	const [stats, setStats] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const { data } = await axios.get(API_URL, { withCredentials: true });
				setStats(data);
				console.log(data)
			} catch (err) {
				setError("فشل في تحميل البيانات");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		fetchStats();
	}, []);

	if (loading) return <Loader/>
	if (error) return <p className="p-5 text-red-500">{error}</p>;

	return (
		<>
			<div
				className="p-5 grid gap-6 mb-8
              grid-cols-1 
              md:grid-cols-6 md:grid-rows-none 
              lg:grid-cols-11 lg:grid-rows-21"
				dir="ltr"
			>
				{/* 📌 Sidebar - Most Selling */}
				<div className="md:col-span-2 lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-21">
					<MostSellingNavBar />
				</div>

				{/* 📌 Top Statistics Cards */}
				<div className="md:col-span-4 lg:col-start-3 lg:col-end-12 lg:row-start-1 lg:row-end-4">
					<StatisticsCards kpis={stats.kpis} />
				</div>

				{/* 📌 Total Income Chart  لسة*/} 
				<div className="md:col-span-3 lg:col-start-3 lg:col-end-9 lg:row-start-4 lg:row-end-12">
					<TotalIncome data={stats.charts.revenueByMonth} />
				</div>

				{/* 📌 Number of Orders Statistics */}
				<div className="md:col-span-3 lg:col-start-3 lg:col-end-9 lg:row-start-12 lg:row-end-21">
					<NumberOfOrdersStatistics data={stats.charts.ordersByWeekday} />
				</div>

				{/* 📌 Most Selling Statistics (Donut Chart) */}
				<div className="md:col-span-3 lg:col-start-9 lg:col-end-12 lg:row-start-4 lg:row-end-14">
					<MostSellingStatistics data={stats.charts.categories} />
				</div>

				{/* 📌 Order Types Statistics */}
				<div className="md:col-span-3 lg:col-start-9 lg:col-end-12 lg:row-start-14 lg:row-end-21">
					<OrderTypesStatistics data={stats.charts.categories} />
				</div>
			</div>

			{/* Orders Table */}
			<OrdersTablePage />
		</>
	);
}

export default Dashboard;

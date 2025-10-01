import React, { useEffect, useState, useContext } from "react";
import OrdersTable from "./OrdersTable";
import FilterButton from "./OrdersTablePage/Header/FilterButton";
import SearchBar from "./OrdersTablePage/Header/SearchBar";
import OrdersTabs from "./OrdersTablePage/OrdersTabs";
import Pagination from "./OrdersTablePage/Pagination";
import axios from "axios";
import { UserContext } from "../../context/AuthContext";
import Loader from "../../loaders/Loader.jsx";

const OrdersTablePage = () => {
	const [orders, setOrders] = useState([]);
	const [filteredOrders, setFilteredOrders] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [activeTab, setActiveTab] = useState("all");

	const { accessToken } = useContext(UserContext);
	const API_BASE_URL = "https://api.queen.kitchen";
	const ordersPerPage = 20;

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				setLoading(true);
				const res = await axios.get(`${API_BASE_URL}/orders/admin/all`, {
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
						...(accessToken && { Authorization: `Bearer ${accessToken}` }),
					},
				});

				let ordersData = [];

				if (Array.isArray(res.data)) {
					ordersData = res.data;
				} else if (res.data?.data && Array.isArray(res.data.data)) {
					ordersData = res.data.data;
				} else if (res.data?.orders && Array.isArray(res.data.orders)) {
					ordersData = res.data.orders;
				} else if (res.data?.items && Array.isArray(res.data.items)) {
					ordersData = res.data.items;
				}

				setOrders(ordersData);
				setFilteredOrders(ordersData);
			} catch (error) {
				console.error("Error fetching admin orders:", error);
				setOrders([]);
				setFilteredOrders([]);
			} finally {
				setLoading(false);
			}
		};

		if (accessToken) {
			fetchOrders();
		}
	}, [accessToken]);

	// 🔍 filter logic
	useEffect(() => {
		let tempOrders = [...orders];

		// filter by tab
		if (activeTab !== "all") {
			tempOrders = tempOrders.filter((o) => {
				if (activeTab === "PAID" || activeTab === "UNPAID") {
					return o.paymentStatus === activeTab;
				}
				return o.status === activeTab;
			});
		}

		// filter by search input
		if (searchTerm.trim() !== "") {
			const term = searchTerm.toLowerCase();
			tempOrders = tempOrders.filter(
				(o) =>
					o.id?.toString().includes(term) ||
					o.user.name?.toLowerCase().includes(term) ||
					o.paymentMethod?.toLowerCase().includes(term) ||
					o.paymentStatus?.toLowerCase().includes(term) ||
					o.status?.toLowerCase().includes(term)
			);
		}

		setFilteredOrders(tempOrders);
		setCurrentPage(1);
	}, [orders, searchTerm, activeTab]);

	const indexOfLastOrder = currentPage * ordersPerPage;
	const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
	const currentOrders = Array.isArray(filteredOrders)
		? filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
		: [];
	const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	return (
		<div
			className="p-6 bg-gray-50 min-h-screen shadow-2xl m-6 rounded-2xl"
			dir="rtl"
		>
			{/* Header */}
			<div className="flex justify-between items-center mb-4">
				<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			</div>

			{/* Tabs */}
			<OrdersTabs activeTab={activeTab} setActiveTab={setActiveTab} />

			{/* Table */}
			{loading ? <Loader /> : <OrdersTable orders={currentOrders} />}

			{/* Pagination */}
			{totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					setCurrentPage={handlePageChange}
					totalPages={totalPages}
				/>
			)}
		</div>
	);
};

export default OrdersTablePage;

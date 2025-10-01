import React, { useEffect, useState, useContext } from "react";
import ProfileCard from "./card/ProfileCard.jsx";
import axios from "axios";
import { UserContext } from "../context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./../loaders/Loader.jsx";
import defaultImage from "./../assets/product.jpg";

export default function ProfileBottom({ tap }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [favourits, setFavourits] = useState([]);
	const [orders, setOrders] = useState([]);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [loading, setLoading] = useState(false);
	const [ordersLoading, setOrdersLoading] = useState(false);
	const [ordersCurrentPage, setOrdersCurrentPage] = useState(1);
	const { accessToken } = useContext(UserContext);

	const API_BASE_URL = "https://api.queen.kitchen";

	// Fetch favourites
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				const res = await axios.get(`${API_BASE_URL}/favorites`, {
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
						...(accessToken && { Authorization: `Bearer ${accessToken}` }),
					},
				});

				let favoritesData = [];

				if (Array.isArray(res.data)) {
					favoritesData = res.data;
				} else if (res.data?.data && Array.isArray(res.data.data)) {
					favoritesData = res.data.data;
				} else if (res.data?.favorites && Array.isArray(res.data.favorites)) {
					favoritesData = res.data.favorites;
				} else if (res.data?.items && Array.isArray(res.data.items)) {
					favoritesData = res.data.items;
				}

				setFavourits(favoritesData);
			} catch (error) {
				console.error("Error fetching favorites:", error);
				setFavourits([]);
			} finally {
				setLoading(false);
			}
		};

		if (accessToken) {
			fetchProducts();
		} else {
			setLoading(false);
		}
	}, [accessToken]);

	// Fetch orders
	useEffect(() => {
		const fetchOrders = async () => {
			try {
				setOrdersLoading(true);
				const res = await axios.get(`${API_BASE_URL}/orders/my`, {
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
				}

				setOrders(ordersData);

				if (ordersData.length > 0) {
					setSelectedOrder(ordersData[0]);
				}
			} catch (error) {
				console.error("Error fetching orders:", error);
				setOrders([]);
			} finally {
				setOrdersLoading(false);
			}
		};

		if (accessToken && tap === 1) {
			fetchOrders();
		}
	}, [accessToken, tap]);

	const handleRemoveFavorite = (removedId) => {
		setFavourits((prevFavorites) =>
			Array.isArray(prevFavorites)
				? prevFavorites.filter((item) => item.id !== removedId)
				: []
		);
	};

	const handleOrderClick = (order) => {
		if (!order) return;
		setSelectedOrder(order);
	};

	// Get status color
	const getStatusColor = (status) => {
		const statusLower = status?.toLowerCase();
		if (
			statusLower?.includes("cancel") ||
			statusLower?.includes("الغاء") ||
			statusLower?.includes("ملغي")
		) {
			return "bg-red-500 text-white";
		} else if (
			statusLower?.includes("deliver") ||
			statusLower?.includes("توصيل") ||
			statusLower?.includes("تم")
		) {
			return "bg-green-500 text-white";
		} else if (
			statusLower?.includes("pending") ||
			statusLower?.includes("جاري") ||
			statusLower?.includes("التجهيز")
		) {
			return "bg-yellow-500 text-white";
		}
		return "bg-gray-500 text-white";
	};

	// Format date
	const formatDate = (dateString) => {
		if (!dateString) return "";
		const date = new Date(dateString);
		return date.toLocaleDateString("ar-EG", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	// Pagination for favorites
	const safeFavourits = Array.isArray(favourits) ? favourits : [];
	const itemsPerPage = 10;
	const numOfPages = Math.ceil(safeFavourits.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const currenFavourits = safeFavourits.slice(
		startIndex,
		startIndex + itemsPerPage
	);

	// Pagination for orders
	const ordersPerPage = 10;
	const ordersNumOfPages = Math.ceil(orders.length / ordersPerPage);
	const ordersStartIndex = (ordersCurrentPage - 1) * ordersPerPage;
	const currentOrders = orders.slice(
		ordersStartIndex,
		ordersStartIndex + ordersPerPage
	);

	useEffect(() => {
		setCurrentPage(1);
	}, []);

	return (
		<>
			{tap === 1 ? (
				<div className="flex gap-4 p-6 bg-gray-100 flex-col">
					<p className="text-2xl text-end">الطلبات السابقة</p>

					{ordersLoading ? (
						<Loader />
					) : orders.length === 0 ? (
						<div className="text-center py-10 bg-white rounded-lg shadow">
							<p className="text-gray-500">لا توجد طلبات سابقة</p>
						</div>
					) : (
						<div className="flex gap-4">
							{/* Left Section - Order Details */}
							<div className="flex-1 bg-white rounded-lg shadow p-6">
								{selectedOrder ? (
									<>
										<div className="flex justify-between items-center mb-6">
											<h2 className="text-xl font-semibold">تفاصيل الطلب</h2>
											<div className="text-gray-600">
												<p>
													#{selectedOrder?.merchantOrderId || selectedOrder?.id}
												</p>
												<p className="text-sm">
													{formatDate(selectedOrder?.createdAt)}
												</p>
											</div>
										</div>

										<div className="space-y-4">
											{selectedOrder?.orderItems?.map((item, i) => (
												<ProfileCard
													key={i}
													i={i}
													name={item?.product?.name || "منتج"}
													desc={
														item?.product?.description ||
														item?.description ||
														""
													}
													price={item?.product?.price}
													qty={item?.quantity}
													img={item?.product?.imageUrl || defaultImage}
												/>
											))}
										</div>

										<div className="mt-6 border-t pt-4">
											<div className="flex justify-between items-center">
												<span className="text-gray-600">المجموع الفرعي:</span>
												<span>
													{(selectedOrder?.totalPrice || 0) -
														(selectedOrder?.deliveryFee || 0)}{" "}
													جنيه
												</span>
											</div>
											{(selectedOrder?.deliveryFee || 0) > 0 && (
												<div className="flex justify-between items-center mt-2">
													<span className="text-gray-600">رسوم التوصيل:</span>
													<span>{selectedOrder?.deliveryFee} جنيه</span>
												</div>
											)}
											<div className="flex justify-between items-center mt-2 text-xl font-bold">
												<span>المجموع الكلي:</span>
												<span>{selectedOrder?.totalPrice || 0} جنيه</span>
											</div>
										</div>

										{selectedOrder?.deliveryInstructions && (
											<div className="mt-4 p-3 bg-gray-50 rounded">
												<p className="text-sm text-gray-600">
													ملاحظات التوصيل:
												</p>
												<p className="mt-1">
													{selectedOrder?.deliveryInstructions}
												</p>
											</div>
										)}
									</>
								) : (
									<div className="text-center py-10">
										<p className="text-gray-500">اختر طلباً لعرض التفاصيل</p>
									</div>
								)}
							</div>

							{/* Right Section - Orders List */}
							<div className="w-80 bg-white rounded-lg shadow p-6">
								<h2 className="text-xl font-semibold mb-4">طلباتك</h2>
								<div className="space-y-3">
									{currentOrders.map((order) => (
										<div
											key={order?.id}
											className={`flex justify-between items-center border-b pb-2 cursor-pointer hover:bg-gray-50 p-2 rounded ${
												selectedOrder?.id === order?.id ? "bg-gray-100" : ""
											}`}
											onClick={() => handleOrderClick(order)}
										>
											<div className="text-right">
												<p
													className={`font-medium px-2 py-1 rounded text-sm ${getStatusColor(
														order?.status
													)}`}
												>
													{order?.status}
												</p>
												<p className="text-gray-500 text-sm mt-1">
													{formatDate(order?.createdAt)}
												</p>
											</div>
											<div className="text-left">
												<p className="font-bold">
													#{order?.merchantOrderId || order?.id}
												</p>
												<p className="text-gray-500">
													{order?.totalPrice} جنيه
												</p>
												<p className="text-xs text-gray-400">
													{order?.orderItems?.length || 0} عناصر
												</p>
											</div>
										</div>
									))}
								</div>

								{/* Pagination - Orders */}
								{ordersNumOfPages > 1 && (
									<div className="flex justify-center items-center gap-4 mt-6">
										<button
											className={`px-4 py-2 rounded-full ${
												ordersCurrentPage === 1
													? "bg-gray-200 text-gray-500 cursor-not-allowed"
													: "bg-[#FFC222] text-white hover:bg-[#e0a800]"
											}`}
											disabled={ordersCurrentPage === 1}
											onClick={() =>
												setOrdersCurrentPage((prev) =>
												 Math.max(prev - 1, 1)
												)
											}
										>
											السابق
										</button>

										<button
											className={`px-4 py-2 rounded-full ${
												ordersCurrentPage === ordersNumOfPages
													? "bg-gray-200 text-gray-500 cursor-not-allowed"
													: "bg-[#FFC222] text-white hover:bg-[#e0a800]"
											}`}
											disabled={ordersCurrentPage === ordersNumOfPages}
											onClick={() =>
												setOrdersCurrentPage((prev) =>
												 Math.min(prev + 1, ordersNumOfPages)
												)
											}
										>
											التالي
										</button>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			) : (
				<div className="flex-col gap-4 p-6 bg-gray-100 ">
					<p className="text-2xl mb-5 text-end">المفضل</p>
					<div className="flex-1 bg-white rounded-lg shadow p-6 ">
						{loading ? (
							<Loader />
						) : currenFavourits.length === 0 ? (
							<div className="text-center py-10">
								<p className="text-gray-500">لا توجد عناصر في المفضلة</p>
							</div>
						) : (
							<>
								<div className="space-y-4">
									{currenFavourits.map((item, i) => (
										<ProfileCard
											key={item?.id || i}
											i={i}
											name={item?.name}
											desc={item?.desc || item?.description}
											price={item?.price}
											img={item?.img || item?.image}
											id={item?.id}
											categoryId={item?.categoryId}
											onRemove={handleRemoveFavorite}
										/>
									))}
								</div>
								{/* Pagination - Favourites */}
								{numOfPages > 1 && (
									<div className="flex justify-center items-center gap-4 mt-8">
										<button
											className={`px-4 py-2 rounded-full ${
												currentPage === 1
													? "bg-gray-200 text-gray-500 cursor-not-allowed"
													: "bg-[#FFC222] text-white hover:bg-[#e0a800]"
											}`}
											disabled={currentPage === 1}
											onClick={() =>
												setCurrentPage((prev) => Math.max(prev - 1, 1))
											}
										>
											السابق
										</button>

										<button
											className={`px-4 py-2 rounded-full ${
												currentPage === numOfPages
													? "bg-gray-200 text-gray-500 cursor-not-allowed"
													: "bg-[#FFC222] text-white hover:bg-[#e0a800]"
											}`}
											disabled={currentPage === numOfPages}
											onClick={() =>
												setCurrentPage((prev) =>
													Math.min(prev + 1, numOfPages)
												)
											}
										>
											التالي
										</button>
									</div>
								)}
							</>
						)}
					</div>
					<ToastContainer
						rtl
						position="top-right"
						autoClose={3000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						pauseOnFocusLoss
						draggable
						pauseOnHover
					/>
				</div>
			)}
		</>
	);
}

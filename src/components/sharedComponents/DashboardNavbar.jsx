import React, { useContext, useState } from "react";
import { FaCog, FaBell, FaSearch, FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import defaultPerson from "./../../assets/person.jpg";
import { UserContext } from "../../context/AuthContext";
const DashboardNavbar = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const location = useLocation();
	const { user } = useContext(UserContext);
	// Remove "/dashboard" from path
	const pathnames = location.pathname
		.replace(/^\/dashboard/, "")
		.split("/")
		.filter((x) => x);

	// Add translations for routes
	const arabicNames = {
		catigories: "التصنيفات",
		products: "المنتجات",
		orders: "الطلبات",
		"dish-of-the-day": "طبق اليوم",
		options: "الاعدادات",
		"add-product": "إضافة منتج",
	};

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<>
			{/* Navbar */}
			<div
				className="w-full bg-white shadow-sm px-4 lg:px-6 py-3 flex items-center justify-between"
				dir="rtl"
			>
				{/* ===== Right Side (Breadcrumbs) ===== */}
				<div className="hidden lg:flex flex-col text-right">
					<h2 className="text-lg font-semibold text-gray-800">
						{pathnames.length > 0
							? arabicNames[pathnames[pathnames.length - 1]] || "التصنيفات"
							: "لوحة التحكم"}
					</h2>

					<p className="text-xs text-gray-500 flex items-center gap-1">
						<Link to="/dashboard" className="hover:text-yellow-500">
							الرئيسية
						</Link>

						{pathnames.length > 0 && <span className="mx-1">›</span>}

						{pathnames.map((name, index) => {
							const routeTo =
								"/dashboard/" + pathnames.slice(0, index + 1).join("/");
							const isLast = index === pathnames.length - 1;

							const arabicLabel = arabicNames[name] || name;

							return isLast ? (
								<span key={name} className="text-yellow-500 font-medium">
									{arabicLabel}
								</span>
							) : (
								<span key={name} className="flex items-center gap-1">
									<Link to={routeTo} className="hover:text-yellow-500">
										{arabicLabel}
									</Link>
									<span className="mx-1">›</span>
								</span>
							);
						})}
					</p>
				</div>

				{/* ===== Left Side (Desktop only) ===== */}
				<div className="hidden lg:flex items-center gap-4">
					{/* User Info */}
					<div className="flex items-center gap-2">
						<img
							src={defaultPerson}
							alt="profile"
							className="w-10 h-10 rounded-md shadow-sm"
						/>
						<div className="text-right">
							<p className="text-sm font-medium text-gray-800">
								{user?.email.split("@")[0]}
							</p>
							<p className="text-xs text-gray-500">مسؤول</p>
						</div>
					</div>

					{/* Icons */}
					<Link to="dashboard/options">
						{" "}
						<FaCog className="text-gray-600 cursor-pointer hover:text-gray-800" />
					</Link>
					<FaBell className="text-yellow-500 cursor-pointer hover:text-yellow-600" />
				</div>

				{/* ===== Mobile Menu Button ===== */}
				<button
					className="lg:hidden text-gray-600 text-xl ml-3"
					onClick={toggleSidebar}
				>
					<FaBars />
				</button>
			</div>

			{/* ===== Sidebar for Mobile ===== */}
			<div
				className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
					sidebarOpen ? "translate-x-0" : "translate-x-full"
				} lg:hidden`}
			>
				<Sidebar />
			</div>

			{/* ===== Overlay (click to close) ===== */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 bg-opacity-30 z-40 lg:hidden"
					onClick={toggleSidebar}
				/>
			)}
		</>
	);
};

export default DashboardNavbar;

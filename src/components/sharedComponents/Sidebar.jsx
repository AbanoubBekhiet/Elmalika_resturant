import React, { useContext } from "react";
import Logo from "./../../assets/queen.jpeg";
import {
	FaClipboardList,
	FaBoxOpen,
	FaStar,
	FaThLarge,
	FaCog,
	FaQuestionCircle,
	FaSignOutAlt,
} from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

import SidebarLink from "./SidebarLink";
import { UserContext } from "../../context/AuthContext";
const navLinks = [
	{ to: "/dashboard", label: "الرئيسية", icon: FaThLarge },
	{ to: "/dashboard/orders", label: "الطلبات", icon: FaClipboardList },
	{ to: "/dashboard/add-product", label: "إضافة منتج", icon: IoMdAdd },
	{ to: "/dashboard/products", label: "المنتجات", icon: FaBoxOpen },
	{ to: "/dashboard/dish-of-the-day", label: "طبق اليوم", icon: FaStar },
	{ to: "/dashboard/catigories", label: "التصنيفات", icon: FaThLarge },
	{ to: "/dashboard/options", label: "الاعدادات", icon: FaCog },
];

const Sidebar = () => {
	const { logout } = useContext(UserContext);
	function handleLogout() {
		logout();
	}
	return (
		<div className="h-full  lg:h-screen w-60 bg-white shadow-lg rounded-b-xl p-4 flex flex-col justify-between overflow-y-auto">
			{/* Top Section */}
			<div>
				{/* Logo */}
				<div className="flex flex-col items-center mt-2">
					<img src={Logo} alt="logo" className="w-30 mb-2" />
				</div>

				{/* Menu Items */}
				<div className="mt-4 space-y-2">
					<div className="flex flex-col space-y-2">
						{navLinks.map((link) => (
							<SidebarLink key={link.to} {...link} />
						))}
					</div>
				</div>
			</div>

			{/* Bottom Section */}
			<div className="space-y-3">
				<SidebarLink
					key="/help"
					to="/help"
					label="المساعدة"
					icon={FaQuestionCircle}
				/>
				<div
					onClick={handleLogout}
					className="flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer transition text-gray-700 hover:text-yellow-600"
				>
					<span className="font-medium">تسجيل خروج</span>
					<FaSignOutAlt />
				</div>
			</div>
		</div>
	);
};

export default Sidebar;

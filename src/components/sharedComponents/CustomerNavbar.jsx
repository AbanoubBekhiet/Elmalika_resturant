// src/components/Navbar.jsx
import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../context/CartContext";
import Cart from "../Cart";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "./../../assets/queen.jpeg";
export default function CustomerNavbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const { cart } = useContext(CartContext);

	const navItems = [
		{ name: "الملف الشخصي", to: "/profile" },
		{ name: "طبق اليوم", to: "/dish-of-the-day" },
		{ name: "جاهز للطبخ", to: "/ready-to-Cook" },
		{ name: "جاهز للأكل", to: "/ready-to-eat" },
		{ name: "الرئيسية", to: "/" },
	];

	return (
		<header className="bg-white shadow-md fixed z-50 w-full ">
			{/* ---------- Desktop ---------- */}
			<div className="container mx-auto px-4 hidden md:grid grid-cols-3 items-center ">
				{/* يسار (تواصل معنا + السلة) */}
				<div className="flex items-center gap-4">
					<Link
						to="/contact"
						className="bg-[#FFC222] text-white px-5 py-2 rounded-lg text-sm hover:opacity-90 transition"
					>
						تواصل معنا
					</Link>

					<div className="relative">
						<FaShoppingCart
							size={30}
							className="text-xl text-gray-800 cursor-pointer"
							onClick={() => setIsCartOpen(!isCartOpen)}
						/>
						<span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
							{cart.itemsCount}
						</span>
					</div>
				</div>

				{/* وسط (روابط التصفح) */}
				<nav className="flex justify-center gap-5">
					{navItems.map((item) => (
						<NavLink
							key={item.name}
							to={item.to}
							className={({ isActive }) =>
								`relative pb-1 text-[20px] transition ${
									isActive
										? "text-black after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#FFC222]"
										: "text-gray-700 hover:text-[#FFC222]"
								}`
							}
						>
							{item.name}
						</NavLink>
					))}
				</nav>

				{/* يمين (اللوجو) */}
				<div className="flex justify-end">
					<Link
						to="/"
						className="text-red-600 text-xl font-bold flex items-center gap-1"
					>
						<img src={logo} alt="مطبخ الملكة" className="w-20"/>
					</Link>
				</div>
			</div>

			{/* ---------- Mobile ---------- */}
			<div className="md:hidden px-4 py-3 flex justify-between items-center">
				{/* لوجو صغير */}
				<Link
					to="/"
					className="text-red-600 text-lg font-bold flex items-center gap-1"
				>
					<img src={logo} alt="مطبخ الملكة" className="w-20"/>
				</Link>

				{/* أيقونات يسار */}
				<div className="flex items-center gap-4 relative">
					{/* Cart Icon */}
					<div className="relative">
						<FaShoppingCart
							className="text-xl text-gray-800 cursor-pointer"
							onClick={() => setIsCartOpen(!isCartOpen)}
						/>
						{cart.length > 0 && (
							<span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
								{cart.length}
							</span>
						)}
					</div>

					{/* Burger Menu */}
					<button onClick={() => setIsMenuOpen(!isMenuOpen)}>
						<GiHamburgerMenu />
					</button>
				</div>
			</div>

			{/* قائمة الجوال المنسدلة */}
			{isMenuOpen && (
				<div className="md:hidden bg-white px-6 pb-4 space-y-3">
					{navItems.map((item) => (
						<NavLink
							key={item.name}
							to={item.to}
							onClick={() => setIsMenuOpen(false)}
							className={({ isActive }) =>
								`block py-1 font-medium ${
									isActive ? "text-primary font-bold" : "text-gray-700"
								}`
							}
						>
							{item.name}
						</NavLink>
					))}

					{/* زر تواصل معنا في الأسفل */}
					<Link
						to="/contact"
						onClick={() => setIsMenuOpen(false)}
						className="inline-block w-full text-center bg-[#FFC222] text-white py-2 rounded-lg text-sm hover:opacity-90 transition"
					>
						تواصل معنا
					</Link>
				</div>
			)}

			{/* ✅ Separate Cart Component */}
			{isCartOpen && <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />}
		</header>
	);
}

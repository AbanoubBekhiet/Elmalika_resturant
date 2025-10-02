// src/components/HomeProducts.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../card/Card";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://api.queen.kitchen/admin/stats/best-sellers";

export default function HomeProducts() {
	const [index, setIndex] = useState(0);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				const res = await axios.get(API_URL);
				setProducts(res.data || []);
			} catch (err) {
				console.error("Error fetching best-sellers:", err);
				toast.error("فشل في تحميل المنتجات، حاول مرة أخرى لاحقاً");
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);

	const visibleItems = 4;

	const getVisibleProducts = () => {
		if (products.length <= visibleItems) {
			return products;
		}

		const wrapped = [...products, ...products];
		return wrapped.slice(index, index + visibleItems);
	};

	const prevSlide = () => {
		setIndex((prev) =>
			prev === 0
				? products.length - 1
				: (prev - 1 + products.length) % products.length
		);
	};

	const nextSlide = () => {
		setIndex((prev) => (prev + 1) % products.length);
	};

	return (
		<section dir="rtl" className="px-6 py-10 md:mx-[50px]">
			<ToastContainer position="top-center" autoClose={3000} />

			<div className="flex items-center justify-between mb-6">
				<h2 className="text-2xl font-bold">الأكثر مبيعا</h2>

				<div className="flex items-center space-x-3">
					<button
						onClick={prevSlide}
						className="p-3 rounded-full shadow-md bg-white hover:bg-gray-100 cursor-pointer"
					>
						<FaChevronRight className="text-xl text-[#FFC222]" />
					</button>
					<button
						onClick={nextSlide}
						className="p-3 rounded-full shadow-md bg-white hover:bg-gray-100 cursor-pointer"
					>
						<FaChevronLeft className="text-xl text-[#FFC222]" />
					</button>
				</div>
			</div>

			{/* Grid of cards */}
			{loading ? (
				<p className="text-center text-gray-500">جارٍ التحميل...</p>
			) : products.length === 0 ? (
				<p className="text-center text-gray-500">لا يوجد منتجات للعرض</p>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{getVisibleProducts().map((p) => (
						<Card key={p.id} product={p} />
					))}
				</div>
			)}
		</section>
	);
}

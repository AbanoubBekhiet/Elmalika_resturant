// src/components/products/ReadyForCook.jsx
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import Loader from "../../loaders/Loader.jsx";
import ProductCard from "./../../components/card/Card";
import { ToastContainer } from "react-toastify";
import { HiOutlineArrowRight } from "react-icons/hi";
import { HiMiniArrowLeft } from "react-icons/hi2";
import { Helmet } from "react-helmet";

const API_BASE_URL = "https://api.queen.kitchen";

const foodTypes = [
	{ id: 0, ar: "الكل", en: "all" },
	{ id: 1, ar: "مشويات", en: "GRILLED" },
	{ id: 2, ar: "مشروبات", en: "JUICES" },
	{ id: 3, ar: "حلويات", en: "DESSERTS" },
	{ id: 4, ar: "أطباق بحرية", en: "SEAFOOD" },
	{ id: 5, ar: "مكرونات", en: "PASTA" },
	{ id: 6, ar: "اخري", en: "OTHERS" },
];

export default function ReadyForCook() {
	const [activeFoodType, setActiveFoodType] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 12;
	const totalPages = Math.ceil(products.length / itemsPerPage);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				const res = await axios.get(`${API_BASE_URL}/products?categoryId=1`, {
					withCredentials: true,
					headers: { "Content-Type": "application/json" },
				});
				setProducts(res.data || []);
			} catch (error) {
				setProducts([]);
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	// 🔹 filter products based on foodType + searchTerm
	const filteredProducts = products.filter((p) => {
		const matchesFoodType =
			activeFoodType === 0 ||
			p.foodType?.toUpperCase() === foodTypes[activeFoodType].en;

		const matchesSearch = p.name
			?.toLowerCase()
			.includes(searchTerm.toLowerCase());

		return matchesFoodType && matchesSearch;
	});

	// 🔹 calculate pagination
	const numOfPages = Math.ceil(filteredProducts.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const currentProducts = filteredProducts.slice(
		startIndex,
		startIndex + itemsPerPage
	);

	// reset to first page when filter or search changes
	useEffect(() => {
		setCurrentPage(1);
	}, [activeFoodType, searchTerm]);

	return (
		<div>
			{loading ? (
				<Loader />
			) : (
				<div dir="rtl" className="px-6 py-28 md:mx-[50px]">
					<Helmet>
						<meta
							name="description"
							content="Browse all our ready-to-eat products at Queen Kitchen. تصفّح كل منتجاتنا الجاهزة للأكل في مطبخ الملكة."
						/>
					</Helmet>

					{/* Header */}
					<div className="flex flex-col md:flex-row items-center justify-between mb-6">
						<div>
							<h3 className="text-2xl mb-2 font-bold">جاهز للأكل</h3>
							<p className="text-sm text-gray-500">
								جميع الوجبات الجاهزة للأكل في مطعمنا
							</p>
						</div>
						<div className="flex items-center w-full max-w-full sm:max-w-lg gap-2">
							<input
								type="search"
								placeholder="ابحث عن طعام ...."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full flex-1 text-base sm:text-lg p-2 sm:p-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
							/>
							<button
								type="button"
								className="p-2 sm:p-3 rounded-2xl bg-yellow-400 hover:bg-yellow-500 text-white flex items-center justify-center flex-shrink-0"
							>
								<FiSearch size={20} />
							</button>
						</div>
					</div>

					{/* Tabs */}
					<div className="overflow-x-auto mb-8">
						<div className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-3 py-2">
							{foodTypes.map((cat) => (
								<button
									key={cat.id}
									onClick={() => setActiveFoodType(cat.id)}
									className={`text-sm whitespace-nowrap px-4 py-2 rounded-full transition ${
										activeFoodType === cat.id
											? "bg-white text-gray-900 shadow"
											: "text-gray-600 hover:text-gray-800"
									}`}
								>
									{cat.ar}
								</button>
							))}
						</div>
					</div>

					{/* Product Grid */}
					{currentProducts.length === 0 ? (
						<p className="text-center text-gray-500 col-span-full">
							لا توجد منتجات مطابقة لبحثك
						</p>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
							{currentProducts.map((product) => (
								<ProductCard key={product.id} product={product} />
							))}
						</div>
					)}

					{/* Pagination (السابق / التالي) */}
					{numOfPages > 1 && (
						<div className="flex items-center justify-center space-x-4 mt-8">
							<button
								disabled={currentPage === 1}
								className={`p-3 rounded-full ${
									currentPage === 1
										? "bg-gray-100 text-gray-400 cursor-not-allowed"
										: "bg-yellow-400 text-gray-700 hover:bg-yellow-200 hover:text-black"
								}`}
								onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
							>
								<HiOutlineArrowRight />{" "}
							</button>

							<button
								disabled={currentPage === totalPages}
								className={`p-3 rounded-full ${
									currentPage === totalPages
										? "bg-gray-200 text-gray-400 cursor-not-allowed"
										: "bg-yellow-400 text-gray-700 hover:bg-yellow-200 hover:text-black"
								}`}
								onClick={() =>
									setCurrentPage((prev) => Math.min(prev + 1, numOfPages))
								}
							>
								<HiMiniArrowLeft />{" "}
							</button>
						</div>
					)}
				</div>
			)}
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
	);
}

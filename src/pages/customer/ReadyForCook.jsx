// src/pages/ReadyForCook.jsx
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import axios from "axios";
import Loader from "../../loaders/Loader.jsx";
import ProductCard from "../../components/card/Card.jsx";
import { ToastContainer } from "react-toastify";

const API_BASE_URL = "https://api.queen.kitchen";

// ✅ Tabs for food types
const foodTypes = [
	{ id: 0, ar: "الكل", en: "ALL" },
	{ id: 1, ar: "مشويات", en: "GRILLED" },
	{ id: 2, ar: "مشروبات", en: "JUICES" },
	{ id: 3, ar: "حلويات", en: "DESSERTS" },
	{ id: 4, ar: "أطباق بحرية", en: "SEAFOOD" },
	{ id: 5, ar: "مكرونات", en: "PASTA" },
	{ id: 6, ar: "اخري", en: "OTHERS" },
];

export default function ReadyForCook() {
	const [activeFoodType, setActiveFoodType] = useState(0);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	// ✅ frontend pagination states
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 20;

	// ✅ search state
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				const res = await axios.get(`${API_BASE_URL}/products?categoryId=2`, {
					withCredentials: true,
					headers: { "Content-Type": "application/json" },
				});
				if (!res) throw new Error("failed to fetch products");
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

	// ✅ filter by foodType
	const filteredByType =
		activeFoodType === 0
			? products
			: products.filter(
					(p) => p.foodType?.toUpperCase() === foodTypes[activeFoodType].en
			  );

	// ✅ filter by search
	const filteredBySearch = filteredByType.filter((p) =>
		p.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// ✅ pagination after filtering
	const numOfPages = Math.ceil(filteredBySearch.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const currentProducts = filteredBySearch.slice(
		startIndex,
		startIndex + itemsPerPage
	);

	// reset page when filter/search changes
	useEffect(() => {
		setCurrentPage(1);
	}, [activeFoodType, searchQuery]);

	return (
		<div>
			{loading ? (
				<Loader />
			) : (
				<div dir="rtl" className="px-6 py-28 md:mx-[50px]">
					{/* Header */}
					<div className="flex flex-col md:flex-row items-center justify-between mb-6">
						<div>
							<h3 className="text-2xl mb-2 font-bold">جاهز للطبخ</h3>
							<p className="text-sm text-gray-500">
								جميع الوجبات الجاهزة للطبخ في مطعمنا
							</p>
						</div>
						<div className="flex items-center space-x-2">
							<input
								type="search"
								placeholder="ابحث عن طعام ...."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="text-lg p-2 rounded-2xl border border-gray-300"
							/>
							<FiSearch size={18} />
						</div>
					</div>

					{/* Tabs */}
					<div className="overflow-x-auto mb-8">
						<div className="inline-flex items-center space-x-3 bg-gray-100 border border-gray-200 rounded-full px-3 py-2">
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
							لا توجد منتجات متاحة لهذا التصنيف
						</p>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
							{currentProducts.map((product) => (
								<ProductCard key={product.id} product={product} />
							))}
						</div>
					)}

					{/* Pagination (arrows only) */}
					{numOfPages > 1 && (
						<div className="flex items-center justify-center space-x-4 mt-8">
							<button
								className="p-3 rounded-full bg-white shadow hover:bg-gray-100 disabled:opacity-50"
								disabled={currentPage === 1}
								onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
							>
								<IoChevronForward size={20} />
							</button>

							<span className="text-gray-600">
								الصفحة {currentPage} من {numOfPages}
							</span>

							<button
								className="p-3 rounded-full bg-white shadow hover:bg-gray-100 disabled:opacity-50"
								disabled={currentPage === numOfPages}
								onClick={() =>
									setCurrentPage((prev) => Math.min(prev + 1, numOfPages))
								}
							>
								<IoChevronBack size={20} />
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

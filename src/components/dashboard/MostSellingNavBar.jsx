import React, { useEffect, useState } from "react";
import MostSellingCard from "./MostSellingCard";
import axios from "axios";

const API_URL = "https://api.queen.kitchen/admin/stats/best-sellers";

const MostSellingNavBar = () => {
	const [items, setItems] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 3;

	useEffect(() => {
		const fetchBestSellers = async () => {
			try {
				const res = await axios.get(API_URL);
				setItems(res.data || []);
			} catch (err) {
				console.error("Error fetching best sellers:", err);
			}
		};
		fetchBestSellers();
	}, []);

	// حساب بداية ونهاية الصفحة الحالية
	const startIndex = currentPage * itemsPerPage;
	const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

	const handleNext = () => {
		if ((currentPage + 1) * itemsPerPage < items.length) {
			setCurrentPage((prev) => prev + 1);
		}
	};

	const handlePrev = () => {
		if (currentPage > 0) {
			setCurrentPage((prev) => prev - 1);
		}
	};

	return (
		<div className="bg-white rounded-xl shadow-md p-4 w-full max-w-sm mx-auto h-full">
			{/* Header */}
			<div className="flex items-center justify-between mb-4">
				<h2 className="font-bold text-gray-800">الأكثر مبيعاً</h2>
			</div>

			{/* Cards List */}
			{currentItems.length > 0 ? (
				currentItems.map((item, index) => (
					<MostSellingCard
						key={item.id || index}
						image={item.imageUrl}
						title={item.name}
						price={item.price}
						oldPrice={item.price+40}
						sold={item.qty}
					/>
				))
			) : (
				<p className="text-gray-500 text-center">لا توجد بيانات</p>
			)}

			{/* Pagination */}
			<div className="flex items-center justify-between mt-4 text-sm">
				<button
					onClick={handlePrev}
					disabled={currentPage === 0}
					className={`px-3 py-1 rounded-md ${
						currentPage === 0
							? "bg-gray-200 text-gray-500 cursor-not-allowed"
							: "bg-yellow-400 text-white hover:bg-yellow-500"
					}`}
				>
					السابق
				</button>
				<button
					onClick={handleNext}
					disabled={(currentPage + 1) * itemsPerPage >= items.length}
					className={`px-3 py-1 rounded-md ${
						(currentPage + 1) * itemsPerPage >= items.length
							? "bg-gray-200 text-gray-500 cursor-not-allowed"
							: "bg-yellow-400 text-white hover:bg-yellow-500"
					}`}
				>
					التالي
				</button>
			</div>
		</div>
	);
};

export default MostSellingNavBar;

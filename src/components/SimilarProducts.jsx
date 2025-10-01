import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import Card from "./card/Card";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./../loaders/Loader"; // ✅ make sure you have a Loader component
import defaultImage from "./../assets/product.jpg";
export default function SimilarProducts({ categoryId = 1 }) {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true); // ✅ loading state
	const [start, setStart] = useState(0);
	const end = start + 4;

	// Fetch products with category filter
	useEffect(() => {
		setLoading(true); // start loading
		axios
			.get(`https://api.queen.kitchen/products?categoryId=${categoryId}`)
			.then((res) => {
				if (res.data.length === 0) {
					toast.info("لا توجد منتجات مشابهه في هذا القسم");
					setProducts([]);
				} else {
					const filtered = res.data.slice(0, 12);

					const safeProducts = filtered.map((p) => ({
						...p,
						imageUrl: p.imageUrl || defaultImage,
					}));

					setProducts(safeProducts);
				}
			})
			.catch((err) => {
				console.error("Error fetching products:", err);
				toast.error("فشل تحميل المنتجات");
			})
			.finally(() => setLoading(false)); // stop loading
	}, [categoryId]);

	// Circular navigation
	const handlePrev = () => {
		setStart((prev) =>
			prev === 0 ? Math.max(products.length - 4, 0) : prev - 1
		);
	};

	const handleNext = () => {
		setStart((prev) => (end >= products.length ? 0 : prev + 1));
	};

	return (
		<div className="m-8">
			<h2 className="text-xl font-bold mb-4 text-right">منتجات مشابهه</h2>

			{loading ? (
				<div className="flex justify-center items-center py-10">
					<Loader /> {/* ✅ show loader while fetching */}
				</div>
			) : (
				<div className="relative">
					{/* Arrows for mobile - top aligned */}
					<div className="flex justify-between items-center mb-4 md:hidden">
						<button
							className="bg-white shadow-md p-2 rounded-full"
							onClick={handlePrev}
						>
							<IoChevronBack />
						</button>
						<button
							className="bg-white shadow-md p-2 rounded-full"
							onClick={handleNext}
						>
							<IoChevronForward />
						</button>
					</div>

					{/* Products Grid */}
					<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
						{products.slice(start, end).map((p) => (
							<Card key={p.id} product={p} />
						))}
					</div>

					{/* Arrows for desktop - centered vertically */}
					{products.length > 4 && (
						<>
							<button
								className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full"
								onClick={handlePrev}
							>
								<IoChevronBack />
							</button>
							<button
								className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full"
								onClick={handleNext}
							>
								<IoChevronForward />
							</button>
						</>
					)}
				</div>
			)}
		</div>
	);
}

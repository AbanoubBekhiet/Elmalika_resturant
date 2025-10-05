// src/components/card/ProductCard.jsx
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useState, useContext, useEffect } from "react";
import React from "react";
import defaultFood from "./../../assets/defaultFood.webp"
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../context/AuthContext";

const API_BASE_URL = "https://api.queen.kitchen";

export default function ProductCard({ product }) {
	const { accessToken } = useContext(UserContext);
	const [favorite, setFavorite] = useState(false);
		useEffect(() => {
		if (!accessToken) return;
		const fetchFavorites = async () => {
			try {
				const { data } = await axios.get(`${API_BASE_URL}/favorites`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					withCredentials: true,
				});

				const isFav = data.some((fav) => fav.id === product.id);
				setFavorite(isFav);
			} catch (err) {
				console.error("Error fetching favorites:", err);
			}
		};

		fetchFavorites();
	}, [accessToken, product.id]);

	// ✅ Toggle favorite
	const toggleFavorite = async () => {
		if (!accessToken) {
			toast.warning("يجب ان تسجل الدخول اولا لتضيف المنتج للمفضل");
			return;
		}

		try {
			await axios.post(
				`${API_BASE_URL}/favorites/toggle`,
				{ productId: product.id },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					withCredentials: true,
				}
			);

			setFavorite((prev) => !prev);

			if (!favorite) {
				toast.success("تمت إضافة المنتج إلى المفضلة");
			} else {
				toast.info("تم إزالة المنتج من المفضلة");
			}
		} catch (err) {
			console.error("Error toggling favorite:", err);
			toast.error("فشل في تحديث المفضلة");
		}
	};

	const rating = product?.ratingAverage ?? 0;
	const maxStars = 5;
	const ratingCount = product?.ratingCount ?? 0;
	return (
		<div className="bg-white rounded-2xl shadow-md overflow-hidden relative">
			{/* Image */}
			<div className="relative w-full aspect-[4/3] bg-gray-100">
				<NavLink to={`/product/${product.id}/${product.categoryId}`}>
					<img
						src={product.imageUrl || defaultFood}
						alt={product.name}
						loading="lazy"
						className="w-full h-full object-cover rounded-t-2xl transition-transform duration-300 hover:scale-105"
						onError={(e) => (e.currentTarget.src = defaultFood)}
					/>
				</NavLink>
			</div>

			{/* Content */}
			<div className="p-3 space-y-2">
				<div className="flex justify-between items-center">
					{/* Dynamic Rating */}
					<div className="flex items-center text-yellow-500 text-sm">
						{[...Array(maxStars)].map((_, i) => (
							<AiFillStar
								key={i}
								className={
									i < Math.round(rating) ? "text-yellow-500" : "text-gray-300"
								}
							/>
						))}
						<span className="hidden sm:inline ml-1 text-gray-600 text-xs">
							({ratingCount} من التقيمات)
						</span>
					</div>

					{/* Favorite button */}
					<button onClick={toggleFavorite} className="text-xl text-red-500">
						{favorite ? <AiFillHeart /> : <AiOutlineHeart />}
					</button>
				</div>

				{/* Name */}
				<h3 className="text-gray-800 font-medium truncate">{product.name}</h3>

				{/* Prices */}
				<div className="flex items-center gap-2">
					<span className="text-[#FFC222] font-semibold">
						{/* {product?.sizes[0]?.price} جنيه مصري */}
					</span>
					{
						<span className="text-gray-400 text-sm line-through">
							{/* {product?.sizes[0]?.price + 50} */}
						</span>
					}
				</div>

				{/* Add to cart */}
				<Link to={`/product/${product.id}/${product.categoryId}`}>
					<button className="mt-2 flex items-center gap-1 bg-gray-100 hover:bg-[#FFC222] hover:text-white transition px-3 py-1 rounded-full text-gray-600 text-sm">
						<HiOutlineShoppingCart />
						إضافة للسلة
					</button>
				</Link>
			</div>
		</div>
	);
}

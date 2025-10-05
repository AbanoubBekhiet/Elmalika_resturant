import React, { useContext, useState } from "react";
import defaultFood from "./../../assets/defaultFood.webp";
import { UserContext } from "../../context/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";

const API_BASE_URL = "https://api.queen.kitchen";

function ProfileCard({
	name,
	desc,
	price,
	qty,
	img,
	id,
	onRemove,
	categoryId,
}) {
	const [loading, setLoading] = useState(false);
	const { accessToken } = useContext(UserContext);
	const handleRemoveFavourite = async () => {
		if (!id) {
			toast.error("لا يمكن حذف هذا العنصر");
			return;
		}

		if (!accessToken) {
			toast.error("يجب تسجيل الدخول أولاً");
			return;
		}

		try {
			setLoading(true);

			const res = await axios.delete(`${API_BASE_URL}/favorites/${id}`, {
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			});

			toast.success("تم إزالة العنصر من المفضلة بنجاح");

			if (onRemove) {
				onRemove(id);
			}
		} catch (error) {
			console.error("Error removing favorite:", error);

			if (error.response?.status === 401) {
				toast.error("يجب تسجيل الدخول مرة أخرى");
			} else if (error.response?.status === 404) {
				toast.error("العنصر غير موجود في المفضلة");
			} else {
				toast.error("حدث خطأ أثناء إزالة العنصر من المفضلة");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-row items-center gap-4 rounded-lg p-4 shadow-xl shadow-gray-100 hover:shadow-gray-200 transition-shadow w-full">
			{qty ? (
				<div className="flex-1 text-right w-full">
					<h3 className="font-semibold text-base sm:text-lg">{name}</h3>
					<p className="text-gray-500 text-xs sm:text-sm lg:text-base break-words line-clamp-2">
						{desc}
					</p>
					<div className="flex justify-between mt-2 text-sm sm:text-base">
						<span className="text-gray-500">الكمية: {qty}</span>
						<span className="font-bold">{price} جنيه</span>
					</div>
				</div>
			) : (
				<>
					<button
						className={`text-gray-400 hover:text-red-500 transition-colors ${
							loading ? "opacity-50 cursor-not-allowed" : ""
						}`}
						onClick={handleRemoveFavourite}
						disabled={loading}
						title="إزالة من المفضلة"
					>
						{loading ? (
							<svg
								className="animate-spin h-5 w-5"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								/>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								/>
							</svg>
						)}
					</button>
					<div className="flex-1 text-right w-full">
						<NavLink to={`/product/${id}/${categoryId}`} className="block">
							<h3 className="font-semibold text-base sm:text-lg lg:text-xl break-words line-clamp-2">
								{name}
							</h3>
							<p className="text-gray-500 text-xs sm:text-sm lg:text-base mt-1 whitespace-normal break-words">
								{desc}
							</p>
							<div className="mt-2">
								<span className="font-bold text-sm sm:text-base lg:text-lg">
									{price} جنيه
								</span>
							</div>
						</NavLink>
					</div>
				</>
			)}

			<img
				src={img ? `${API_BASE_URL}/${img}` : defaultFood}
				alt={name}
				loading="lazy"
				className="w-24 h-20 sm:w-28 sm:h-24 lg:w-36 lg:h-32 rounded-lg object-cover flex-shrink-0"
				onError={(e) => (e.currentTarget.src = defaultFood)}
			/>
		</div>
	);
}

export default ProfileCard;

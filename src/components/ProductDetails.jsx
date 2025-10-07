// src/pages/ProductDetails.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";
import Loader from "./../loaders/Loader.jsx";
import { FaShare } from "react-icons/fa";
import defaultFood from "./../assets/defaultFood.webp";
import SimilarProducts from "./SimilarProducts.jsx";
import Rating from "./Rating.jsx";
import { ToastContainer, toast } from "react-toastify";
import { CartContext } from "../context/CartContext"; // ✅ استدعاء الكونتكست
import { UserContext } from "../context/AuthContext.jsx";

// 🔹 baseURL هنا
const API_BASE_URL = "https://api.queen.kitchen";

export default function ProductDetails() {
	const { productId, categoryId } = useParams();
	const [product, setProduct] = useState(null);
	const [similarProducts, setsimilarProducts] = useState([]);
	const [qty, setQty] = useState(1);
	// const [notes, setNotes] = useState("");
	const [ItemSize, setItemSize] = useState(null);
	const [loading, setLoading] = useState(true);
	const [addonIds, setAdds] = useState([]);
	const [isFavourite, setIsfavourite] = useState(false);
	const { addToCart, isAuthenticated } = useContext(CartContext);
	const { accessToken } = useContext(UserContext);
	useEffect(() => {
		setLoading(true);
		axios
			.get(`${API_BASE_URL}/products/${productId}`, {
				withCredentials: true,
				headers: { "Content-Type": "application/json" },
			})
			.then((res) => {
				setProduct(res?.data || null);

				if (res?.data?.sizes?.length > 0) {
					setItemSize(res.data.sizes[0]);
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [productId]);

	useEffect(() => {
		if (isAuthenticated) {
			setLoading(true);
			axios
				.get(`${API_BASE_URL}/favorites/${productId}`, {
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				})
				.then((res) => {
					setIsfavourite(res?.data?.isFavorite);
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [productId, isAuthenticated, accessToken]);

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

			setIsfavourite((prev) => !prev);

			if (!isFavourite) {
				toast.success("تمت إضافة المنتج إلى المفضلة");
			} else {
				toast.info("تم إزالة المنتج من المفضلة");
			}
		} catch (err) {
			console.error("Error toggling favorite:", err);
			toast.error("فشل في تحديث المفضلة");
		}
	};
	const copyUrl = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			toast.success("تم نسخ الرابط ");
		} catch (err) {
			toast.alert("يوجد مشكلة في نسخ الرابط");
		}
	};
	// جلب منتجات مشابهة
	useEffect(() => {
		let isMounted2 = true;
		setLoading(true);

		axios
			.get(`${API_BASE_URL}/products?categoryId=${categoryId}`, {
				withCredentials: true,
				headers: { "Content-Type": "application/json" },
			})
			.then((res) => {
				if (isMounted2) {
					setsimilarProducts(res?.data?.data || []);
				}
			})
			.catch(() => {
				setProduct([]);
			})
			.finally(() => {
				if (isMounted2) setLoading(false);
			});

		return () => {
			isMounted2 = false;
		};
	}, [categoryId]);
	function handleAddAddition(add) {
		setAdds((prevAdds) => {
			if (prevAdds.includes(add.id)) {
				return prevAdds.filter((a) => a !== add.id);
			} else {
				return [...prevAdds, add.id];
			}
		});
	}

	// ✅ التحقق والإضافة للعربة
	function handleAddToCart() {
		if (!isAuthenticated) {
			toast.error("يجب تسجيل الدخول أولاً لإضافة منتجات إلى السلة");
			return;
		}

		if (!ItemSize) {
			toast.error("الرجاء اختيار الحجم");
			return;
		}

		if (qty < 1) {
			toast.error("الكمية يجب أن تكون 1 على الأقل");
			return;
		}
		addToCart(product, ItemSize.id, qty, addonIds);
		toast.success("تمت إضافة المنتج إلى السلة بنجاح 🎉");
		setAdds([]);
		setQty(1);
	}

	return (
		<div>
			{loading ? (
				<Loader />
			) : (
				<>
					<div
						dir="rtl"
						className="px-6 pt-28 pb-8 max-w-6xl mx-auto space-y-8"
					>
						{/* Breadcrumb */}
						<nav className="text-sm text-gray-500 text-right">
							<Link to="/" className="hover:underline">
								الرئيسية
							</Link>
							<span className="px-2">/</span>
							<Link to="/ready-to-eat" className="hover:underline">
								جاهز للأكل
							</Link>
							<span className="px-2">/</span>
							<span className="text-gray-700">{product?.name || ""}</span>
						</nav>

						<div className="grid md:grid-cols-2 gap-50 items-start">
							{/* Product Gallery */}
							<div>
								<div className="relative">
									<div className="absolute  top-1/4 -left-20 transform -translate-y-1/2 flex flex-col space-y-3 z-10">
										<div
											className="bg-gray-200 p-2 rounded-lg"
											onClick={copyUrl}
										>
											<FaShare size={30} className="text-yellow-500 " />
										</div>
										<div
											className="bg-gray-200 p-2 rounded-lg"
											onClick={toggleFavorite}
										>
											{isFavourite ? (
												<AiFillHeart size={30} className="text-red-500" />
											) : (
												<AiOutlineHeart size={30} className="text-red-500" />
											)}
										</div>
									</div>

									<div className="w-full h-[700px] contain-content overflow-hidden rounded-lg">
										<img
											src={product?.imageUrl || defaultFood}
											alt={product?.name || "مطبخ الملكة"}
											loading="lazy"
											onError={(e) => (e.currentTarget.src = defaultFood)}
											className="w-full h-full object-cover"
										/>
									</div>
								</div>
								<div className="flex justify-around mt-10">
									{similarProducts.slice(0, 5).map((e, i) => (
										<img
											key={i}
											src={e.imageUrl || defaultFood}
											loading="lazy"
											onError={(e) => (e.currentTarget.src = defaultFood)}
											alt="مطبخ الملكة"
											className="w-20 h-25 rounded-2xl"
										/>
									))}
								</div>
							</div>

							{/* Product Details */}
							<div className="space-y-6">
								<h1 className="text-3xl font-bold">{product?.name || ""}</h1>
								<div className="flex justify-between w-5xs border-b border-dashed border-gray-400 p-5">
									<div className="flex items-baseline space-x-4">
										<span className="text-2xl font-bold">
											{ItemSize?.price ? `${ItemSize.price} جنية` : ""}
										</span>
									</div>
									<div className="flex items-center space-x-3">
										<div className="flex text-yellow-500">
											{Array.from({ length: 5 }).map((_, i) => (
												<AiFillStar
													key={i}
													className={
														i < Math.round(product?.ratingAverage || 0)
															? "text-yellow-500"
															: "text-gray-300"
													}
												/>
											))}
										</div>
										<span className="ml-2 text-sm text-gray-600">
											{product?.ratingCount > 0
												? `(${product.ratingCount} تقييم)`
												: "لا توجد تقييمات"}
										</span>
									</div>
								</div>

								<div className="flex flex-col">
									<h3>الوصف</h3>
									<p className="text-gray-600 text-sm leading-relaxed">
										{product?.description || "لا توجد تفاصيل متاحة"}
									</p>
								</div>

								{/* Sizes */}
								<div className="space-y-2">
									<label className="block text-sm font-medium text-gray-700">
										الأحجام:
									</label>
									<div className="flex space-x-2">
										{product?.sizes.map((size) => (
											<button
												onClick={() => setItemSize(size)}
												key={size?.id}
												className={`px-4 py-2 rounded-full border ${
													ItemSize?.id === size?.id
														? "border-[#FFC222] text-[#FFC222]"
														: "border-gray-300 text-gray-700"
												}`}
											>
												{size?.name}({size?.price})
											</button>
										))}
									</div>
								</div>

								{/* Extras */}
								<div className="space-y-2">
									<label className="block text-sm font-medium text-gray-700">
										الإضافات:
									</label>
									<div className="flex space-x-2">
										{product?.addons?.map((extra) => (
											<button
												onClick={() => handleAddAddition(extra)}
												key={extra.id}
												className={`px-4 py-2 rounded-full border ${
													addonIds.includes(extra.id)
														? "border-[#FFC222] text-[#FFC222]"
														: "border-gray-300 text-gray-700"
												}`}
											>
												{extra.name}({extra.price})
											</button>
										))}
									</div>
								</div>

								{/* Quantity */}
								<div className="space-y-2">
									<label className="block text-sm font-medium text-gray-700">
										الكمية:
									</label>
									<div className="flex items-center space-x-2">
										<button
											onClick={() => qty > 1 && setQty(qty - 1)}
											className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full"
										>
											–
										</button>
										<span className="min-w-[32px] text-center">{qty}</span>
										<button
											onClick={() => setQty(qty + 1)}
											className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full"
										>
											+
										</button>
									</div>
								</div>

								{/* Notes */}
								{/* <div className="space-y-2">
									<label className="block text-sm font-medium text-gray-700">
										ملاحظات:
									</label>
									<textarea
										value={notes}
										onChange={(e) => setNotes(e.target.value)}
										rows={4}
										className="w-full border border-gray-300 rounded-lg p-3 text-sm placeholder-gray-400"
										placeholder="أضف ملاحظاتك على الطلب، مثال: بدون زيتون..."
									/>
								</div> */}

								{/* Action Buttons */}
								<div className="flex space-x-4">
									<button
										onClick={handleAddToCart}
										className="flex-1 border border-[#FFC222] text-[#FFC222] py-3 rounded-full font-semibold hover:bg-[#FFF5E1] transition"
									>
										إضافة إلى السلة
									</button>
								</div>
							</div>
						</div>
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
					{product && (
						<>
							<SimilarProducts categoryId={categoryId} />
							<Rating productId={productId} />
						</>
					)}
				</>
			)}
		</div>
	);
}

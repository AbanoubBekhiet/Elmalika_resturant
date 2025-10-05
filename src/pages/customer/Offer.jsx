import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import axios from "axios";
import defaultFood from "./../../assets/defaultFood.webp";
import Loader from "./../../loaders/Loader";
import { Link } from "react-router-dom";
const API_BASE_URL = "https://api.queen.kitchen";

export default function Offer() {
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				setLoading(true);
				const res = await axios.get(`${API_BASE_URL}/products?categoryId=3`, {
					withCredentials: true,
					headers: { "Content-Type": "application/json" },
				});

				if (!res || !res.data) throw new Error("failed to fetch product");
				let data = res.data;
				if (Array.isArray(data)) {
					if (data.length > 0) {
						setProduct(data[0]);
					}
				} else if (typeof data === "object") {
					setProduct(data);
				}
			} catch (error) {
				console.error("Error fetching product:", error);
				setProduct(null);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, []);

	if (loading) {
		return <Loader />;
	}

	if (!product) {
		return (
			<section className="py-12 bg-white mx-[50px] text-center">
				<p>لا يوجد عرض للأسبوع حاليا</p>
			</section>
		);
	}

	return (
		<section className="py-12 bg-white mx-[50px]">
			{/* عنوان السكشن */}
			<div className="relative text-center mb-12">
				<h2 className="inline-block text-3xl font-bold">طبق اليوم</h2>
				<div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 w-36 rounded-full h-1 bg-[#FFD40D]"></div>
			</div>

			<div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
				{/* الصورة */}
				<div className="w-full lg:w-1/2 mb-8 lg:mb-0">
					<img
						src={product.imageUrl || defaultFood}
						alt={product.name}
						onError={(e) => (e.currentTarget.src = defaultFood)}
						loading="lazy"
						className="w-full h-auto object-cover rounded-lg"
					/>
				</div>

				{/* المحتوى */}
				<div className="w-full lg:w-1/2 text-right lg:pl-12 space-y-6">
					{/* بادج الخصم */}
					<div className="flex justify-end items-center">
						<p className="bg-[#FFD40D] text-black w-1/3 text-center text-lg font-medium rounded-full px-2 py-1">
							% خصم يصل حتى 25
						</p>
					</div>

					{/* اسم المنتج */}
					<h3 className="text-black text-md font-semibold md:text-[40px]">
						{product.name}
					</h3>

					{/* وصف المنتج */}
					<p className="text-[#555555] text-lg">{product.description}</p>

					{/* قائمة النقاط (ثابتة زي ما هي) */}
					<ul className="grid grid-cols-2 gap-4 text-[#555555] justify-items-end">
						{[
							"وجبه صحيه متكامله",
							"مزاق ممتاز بلمسه شرقيه",
							"عناصر طبيعيه ممتازه",
							"اضافات وصوصات جذابه",
						].map((txt, idx) => (
							<li
								key={idx}
								className="flex items-center text-[20px] justify-end"
							>
								{txt}
								<FaCheck className="ml-2 text-green-500" />
							</li>
						))}
					</ul>

					<div className="flex gap-12 items-center justify-end">
						{/* زر الإضافة */}
						<Link to={`/product/${product?.id}/${product?.categoryId}`}>
							<button className="bg-[#FFD40D] border-3 border-[#FFC222] text-white font-bold py-2 px-6 rounded-md transition">
								أضف إلى السلة
							</button>
						</Link>

						{/* السعر */}
						<div className="flex items-baseline justify-end gap-4">
							<span className="line-through text-gray-400">
								{product?.sizes[0]?.price + 50} جنيه
							</span>
							<span className="text-3xl font-bold">
								<span className="text-lg font-normal">جنيه مصري</span>{" "}
								{product?.sizes[0]?.price}
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

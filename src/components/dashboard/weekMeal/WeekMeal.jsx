import React, { useContext, useState } from "react";
import fallbackImage from "./../../../assets/product.jpg";
import { UserContext } from "../../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import defaultFood from "./../../../assets/defaultFood.webp";
import UpdateProductForm from "../products/UpdateProductForm"; // 

const WeekMeal = ({ dish: initialDish }) => {
	const { user } = useContext(UserContext);
	const [dish, setDish] = useState(initialDish);
	const [showEditForm, setShowEditForm] = useState(false);

	if (!dish) return null;

	const handleUpdateSuccess = (updatedDish) => {
		setDish(updatedDish);
		setShowEditForm(false);
		toast.success("تم تحديث المنتج بنجاح!");
	};

	return (
		<div
			className="w-full mx-auto bg-white font-sans shadow-md rounded-lg overflow-hidden"
			dir="rtl"
		>
			{/* Header */}
			<div className="text-start mb-6 mt-20 mr-10">
				<h2 className="text-4xl font-bold text-gray-800 inline-block pb-3 border-b-4 border-yellow-400 mt-6">
					طبق اليوم
				</h2>
			</div>

			{/* Product Image */}
			<div className="relative w-full p-6">
				<img
					src={dish.imageUrl || defaultFood}
					alt={dish.name}
					loading="lazy"
					className="w-full h-96 object-cover rounded-2xl"
					onError={(e) => (e.currentTarget.src = fallbackImage)}
				/>
			</div>

			{/* Product Content */}
			<div className="px-5 py-4">
				<div className="flex flex-col items-start">
					{/* Discount Badge */}
					{dish.discount && (
						<div className="text-center mb-2 font-bold">
							<span className="bg-yellow-400 text-black px-3 py-1 rounded-md">
								خصم يصل حتى %{dish.discount}
							</span>
						</div>
					)}

					{/* Title */}
					<h2 className="text-3xl font-bold text-gray-900 text-center mb-3">
						{dish.name}
					</h2>

					{/* Description */}
					{dish.description && (
						<p className="text-gray-600 text-lg leading-relaxed mb-5">
							{dish.description}
						</p>
					)}

					{/* Features */}
					<div className="grid grid-cols-3 gap-3 text-1xl text-gray-700 mb-6">
						{[
							"متوفر طيلة أيام الأسبوع",
							"وجبة صحية متكاملة",
							"مكونات طبيعية طازجة",
							"اطباق ومشروبات متنوعة",
							"طعام ممتاز وصحي",
							"إضافات ومقبلات جانبية",
						].map((feature, index) => (
							<div
								key={index}
								className="flex items-center justify-center"
							>
								<span className="text-green-600">✓</span>
								<span className="ml-1">{feature}</span>
							</div>
						))}
					</div>

					{/* Pricing */}
					<div className="text-center mb-6 Fredoka">
						<div className="flex items-center justify-center gap-2">
							<span className="text-2xl font-bold text-black">
								{dish?.sizes?.[0]?.price}
							</span>
							<span className="text-sm text-yellow-500 font-medium">
								جنيه مصري
							</span>
							{dish?.sizes?.[0]?.price && (
								<>
									<span className="text-lg text-gray-400 line-through">
										{dish?.sizes?.[0]?.price + 50}
									</span>
									<span className="text-sm text-gray-500">جنيه</span>
								</>
							)}
						</div>
					</div>
				</div>

				{/* Action Buttons */}
				{user?.role === "ADMIN" ? (
					<div className="flex gap-3">
						<button
							onClick={() => setShowEditForm(true)}
							className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-4 rounded-md text-sm"
						>
							تعديل
						</button>
					</div>
				) : (
					<NavLink to={`/product/${dish.id}/${dish.categoryId}`}>
						<div className="flex gap-3">
							<button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-4 rounded-md text-sm">
								إضافة إلي السلة
							</button>
						</div>
					</NavLink>
				)}
			</div>

			{/* ✅ Use the existing UpdateProductForm component as modal */}
			{showEditForm && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-lg w-[600px] max-h-[90vh] overflow-y-auto relative">
						<button
							onClick={() => setShowEditForm(false)}
							className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
						>
							<IoMdClose size={24} />
						</button>

						<UpdateProductForm
							product={dish}
							onClose={() => setShowEditForm(false)}
							onSuccess={(updated) => handleUpdateSuccess(updated)}
						/>
					</div>
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
};

export default WeekMeal;

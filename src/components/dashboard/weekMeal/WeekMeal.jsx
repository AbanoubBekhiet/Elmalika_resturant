import React, { useContext, useState } from "react";
import fallbackImage from "./../../../assets/product.jpg";
import { UserContext } from "../../../context/AuthContext";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";

const FOOD_TYPES = [
	{ value: "GRILLED", label: "مشويات" },
	{ value: "DESSERTS", label: "حلويات" },
	{ value: "JUICES", label: "عصائر" },
	{ value: "PASTA", label: "مكرونة" },
	{ value: "SEAFOOD", label: "مأكولات بحرية" },
	{ value: "OTHERS", label: "أخرى" },
];

const WeekMeal = ({ dish: initialDish }) => {
	const { user, accessToken } = useContext(UserContext);

	const [dish, setDish] = useState(initialDish);
	const [showEditForm, setShowEditForm] = useState(false);
	const [formData, setFormData] = useState({
		name: initialDish?.name || "",
		description: initialDish?.description || "",
		price: initialDish?.price || "",
		categoryId: initialDish?.categoryId || "",
		foodType: initialDish?.foodType || "",
		file: null,
	});

	if (!dish) return null;

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		if (name === "file") {
			setFormData({ ...formData, file: files[0] });
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const data = new FormData();
			data.append("name", formData.name);
			data.append("description", formData.description);
			data.append("price", formData.price);
			// keep categoryId but don’t allow editing
			data.append("categoryId", dish.categoryId);
			data.append("foodType", formData.foodType);
			if (formData.file) {
				data.append("file", formData.file);
			}

			const res = await axios.patch(
				`https://api.queen.kitchen/products/${dish.id}`,
				data,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						...(accessToken && { Authorization: `Bearer ${accessToken}` }),
					},
				}
			);

			setDish(res.data);
			setFormData({
				name: res.data.name,
				description: res.data.description,
				price: res.data.price,
				categoryId: res.data.categoryId,
				foodType: res.data.foodType,
				file: null,
			});
			toast.success("تم تحديث المنتج بنجاح ");
			setShowEditForm(false);
		} catch (error) {
			console.error("Error updating product:", error);
			toast.error("حدث خطأ أثناء تحديث المنتج ");
		}
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
					src={dish.imageUrl || fallbackImage}
					alt={dish.name}
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
						<div className="flex items-center justify-center">
							<span className="text-green-600">✓</span>
							<span className="ml-1">متوفر طيلة أيام الأسبوع</span>
						</div>
						<div className="flex items-center justify-center">
							<span className="text-green-600">✓</span>
							<span className="ml-1">وجبة صحية متكاملة</span>
						</div>
						<div className="flex items-center justify-center">
							<span className="text-green-600">✓</span>
							<span className="ml-1">مكونات طبيعية طازجة</span>
						</div>
						<div className="flex items-center justify-center">
							<span className="text-green-600">✓</span>
							<span className="ml-1">اطباق ومشروبات متنوعة</span>
						</div>
						<div className="flex items-center justify-center">
							<span className="text-green-600">✓</span>
							<span className="ml-1">طعام ممتاز وصحي</span>
						</div>
						<div className="flex items-center justify-center">
							<span className="text-green-600">✓</span>
							<span className="ml-1">إضافات ومقبلات جانبية</span>
						</div>
					</div>

					{/* Pricing */}
					<div className="text-center mb-6 Fredoka">
						<div className="flex items-center justify-center gap-2">
							<span className="text-2xl font-bold text-black">
								{dish.price}
							</span>
							<span className="text-sm text-yellow-500 font-medium">
								جنيه مصري
							</span>
							{(dish.oldPrice || dish.price + 50) && (
								<>
									<span className="text-lg text-gray-400 line-through">
										{dish.oldPrice || dish.price + 50}
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

			{/* Edit Form Modal */}
			{showEditForm && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
					<div
						className="bg-white p-6 rounded-lg w-96 max-w-90vw max-h-90vh overflow-y-auto"
						dir="rtl"
					>
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-bold">تعديل المنتج</h2>
							<button
								onClick={() => setShowEditForm(false)}
								className="text-gray-500 hover:text-gray-700"
							>
								<IoMdClose size={24} />
							</button>
						</div>

						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<label className="block text-sm font-medium mb-2">الاسم</label>
								<input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleChange}
									className="w-full p-2 border rounded-md"
									required
								/>
							</div>

							<div className="mb-4">
								<label className="block text-sm font-medium mb-2">الوصف</label>
								<textarea
									name="description"
									value={formData.description}
									onChange={handleChange}
									className="w-full p-2 border rounded-md"
									rows="3"
								/>
							</div>

							<div className="mb-4">
								<label className="block text-sm font-medium mb-2">السعر</label>
								<input
									type="number"
									name="price"
									value={formData.price}
									onChange={handleChange}
									className="w-full p-2 border rounded-md"
									required
								/>
							</div>

							{/* Food Type Select */}
							<div className="mb-4">
								<label className="block text-sm font-medium mb-2">
									نوع الأكل
								</label>
								<select
									name="foodType"
									value={formData.foodType}
									onChange={handleChange}
									className="w-full p-2 border rounded-md"
									required
								>
									<option value="">اختر نوع الأكل</option>
									{FOOD_TYPES.map((type) => (
										<option key={type.value} value={type.value}>
											{type.label}
										</option>
									))}
								</select>
							</div>

							<div className="mb-4">
								<label className="block text-sm font-medium mb-2">الصورة</label>
								<input
									type="file"
									name="file"
									onChange={handleChange}
									className="w-full p-2 border rounded-md"
								/>
							</div>

							<div className="flex gap-2">
								<button
									type="submit"
									className="flex-1 bg-[#e6b700] text-white py-2 rounded-md hover:bg-[#fbfcc4] hover:text-black"
								>
									حفظ التعديلات
								</button>
								<button
									type="button"
									onClick={() => setShowEditForm(false)}
									className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
								>
									إلغاء
								</button>
							</div>
						</form>
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

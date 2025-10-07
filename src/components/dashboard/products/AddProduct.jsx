import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaCamera } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../../context/AuthContext";

const ProductDetailsPage = () => {
	// Form state
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		category: "",
		price: "",
		foodType: "",
	});

	const [categories, setCategories] = useState([]);
	const [image, setImage] = useState(null);
	const [sizes, setSizes] = useState([{ name: "", price: "" }]);
	const [addons, setAddons] = useState([{ name: "", price: "" }]);
	const { accessToken } = useContext(UserContext);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const res = await axios.get("https://api.queen.kitchen/categories", {
					withCredentials: true,
				});
				setCategories(res.data);
			} catch (error) {
				toast.error("فشل تحميل التصنيفات من الخادم");
				console.error("Error fetching categories:", error);
			}
		};
		fetchCategories();
	}, []);

	// Form handlers
	const handleFormChange = (field, value) => {
		setFormData({ ...formData, [field]: value });
	};

	const handleImageUpload = (file) => {
		if (!file) return;
		const allowed = ["image/png", "image/jpeg", "image/jpg"];
		if (!allowed.includes(file.type)) {
			toast.error("يجب أن تكون الصورة PNG أو JPG");
			return;
		}
		const max = 3 * 1024 * 1024; // 3 MB
		if (file.size > max) {
			toast.error("حجم الصورة يجب ألا يتجاوز 3 ميجابايت");
			return;
		}
		setImage(file);
	};

	// Sizes handlers
	const addSize = () => setSizes([...sizes, { name: "", price: "" }]);
	const updateSize = (index, field, value) => {
		const updated = [...sizes];
		updated[index][field] = value;
		setSizes(updated);
	};
	const removeSize = (index) => {
		setSizes(sizes.filter((_, i) => i !== index));
	};

	// Addons handlers
	const addAddon = () => setAddons([...addons, { name: "", price: "" }]);
	const updateAddon = (index, field, value) => {
		const updated = [...addons];
		updated[index][field] = value;
		setAddons(updated);
	};
	const removeAddon = (index) => {
		setAddons(addons.filter((_, i) => i !== index));
	};

	// Validation
	const validateForm = () => {
		if (!formData.name.trim()) {
			toast.error("الرجاء إدخال اسم المنتج");
			return false;
		}
		if (!formData.description.trim()) {
			toast.error("الرجاء إدخال وصف المنتج");
			return false;
		}
		if (
			!formData.price ||
			isNaN(formData.price) ||
			Number(formData.price) <= 0
		) {
			toast.error("الرجاء إدخال سعر أساسي صالح");
			return false;
		}
		if (!formData.foodType) {
			toast.error("الرجاء اختيار نوع الطعام");
			return false;
		}
		if (!formData.category) {
			toast.error("الرجاء اختيار التصنيف");
			return false;
		}
		if (!image) {
			toast.error("الرجاء رفع صورة للمنتج");
			return false;
		}
		const validSizes = sizes.filter((s) => s.name && s.price);
		if (validSizes.length === 0) {
			toast.error("أضف حجمًا وسعرًا واحدًا على الأقل");
			return false;
		}
		return true;
	};

	// Submit handler
	const handleSave = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;

		const data = new FormData();
		data.append("name", formData.name);
		data.append("description", formData.description);
		data.append("price", Number(formData.price));
		data.append("categoryId", formData.category);
		data.append("foodType", formData.foodType);
		data.append("file", image);

		data.append(
			"sizes",
			JSON.stringify(
				sizes
					.filter((s) => s.name && s.price)
					.map((s) => ({ name: s.name, price: Number(s.price) }))
			)
		);

		data.append(
			"addons",
			JSON.stringify(
				addons
					.filter((a) => a.name && a.price)
					.map((a) => ({ name: a.name, price: Number(a.price) }))
			)
		);


		try {
			const res = await axios.post("https://api.queen.kitchen/products", data, {
				withCredentials: true,
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${accessToken}`,
				},
			});
			toast.success("تم حفظ جميع البيانات بنجاح!");
			setFormData({
				name: "",
				description: "",
				category: "",
				price: "",
				foodType: "",
			});
		} catch (err) {
			console.error("❌ Error saving product:", err);
			const msg =
				err?.response?.data?.message ||
				"حدث خطأ أثناء حفظ المنتج. حاول مرة أخرى.";
			toast.error(msg);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-7xl mx-auto">
				<form onSubmit={handleSave}>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{/* LEFT - Image Upload */}
						<div className="bg-white rounded-lg shadow p-6 h-fit">
							<h3 className="font-bold mb-4 text-right">عرض المنتج</h3>
							<p className="text-sm text-gray-500 mb-6 text-right">
								يمكنك رفع صورة واحدة للمنتج (PNG) أو (JPG) بحد أقصى 3 ميجابايت
							</p>
							<div className="flex justify-center mb-6">
								<div
									className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer"
									onClick={() => {
										const input = document.createElement("input");
										input.type = "file";
										input.accept = "image/*";
										input.onchange = (e) =>
											handleImageUpload(e.target.files[0]);
										input.click();
									}}
								>
									{image ? (
										<img
											src={URL.createObjectURL(image)}
											alt="Product"
											className="w-full h-full object-cover rounded-lg"
										/>
									) : (
										<>
											<FaCamera className="text-yellow-400 text-lg mb-2" />
											<span className="text-sm text-gray-500">اختر صورة</span>
										</>
									)}
								</div>
							</div>
						</div>

						{/* RIGHT - Product Form */}
						<div className="bg-white rounded-lg shadow p-6">
							<h3 className="font-bold mb-6 text-right">تفاصيل المنتج</h3>
							<p className="text-sm text-gray-500 mb-6 text-right">
								يمكنك كتابة تفاصيل المنتج الذي تريد إضافته وبيعه للعملاء
							</p>

							<div className="space-y-6">
								{/* Name */}
								<div>
									<label className="block text-sm font-medium mb-2 text-right">
										اسم المنتج
									</label>
									<input
										type="text"
										value={formData.name}
										onChange={(e) => handleFormChange("name", e.target.value)}
										placeholder="مثال: بيتزا مارجريتا"
										className="w-full border border-gray-300 rounded-lg px-4 py-3 text-right focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
									/>
								</div>

								{/* Description */}
								<div>
									<label className="block text-sm font-medium mb-2 text-right">
										الوصف
									</label>
									<textarea
										value={formData.description}
										onChange={(e) =>
											handleFormChange("description", e.target.value)
										}
										placeholder="بيتزا لذيذة مع صلصة الطماطم، الجبن، والأوريجانو..."
										rows="4"
										className="w-full border border-gray-300 rounded-lg px-4 py-3 text-right focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
									/>
								</div>

								{/* Price */}
								<div>
									<label className="block text-sm font-medium mb-2 text-right">
										السعر الأساسي
									</label>
									<input
										type="number"
										value={formData.price}
										onChange={(e) => handleFormChange("price", e.target.value)}
										placeholder="100"
										className="w-full border border-gray-300 rounded-lg px-4 py-3 text-right focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
									/>
								</div>

								{/* Food Type */}
								<div>
									<label className="block text-sm font-medium mb-2 text-right">
										نوع الطعام
									</label>
									<select
										value={formData.foodType}
										onChange={(e) =>
											handleFormChange("foodType", e.target.value)
										}
										className="w-full border border-gray-300 rounded-lg px-4 py-3 text-right focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
									>
										<option value="">اختار النوع</option>
										<option value="GRILLED">مشويات</option>
										<option value="DESSERTS">حلويات</option>
										<option value="JUICES">عصائر</option>
										<option value="PASTA">مكرونة</option>
										<option value="SEAFOOD">مأكولات بحرية</option>
										<option value="OTHERS">أخرى</option>
									</select>
								</div>

								{/* Category */}
								<div>
									<label className="block text-sm font-medium mb-2 text-right">
										التصنيف
									</label>
									<select
										value={formData.category}
										onChange={(e) =>
											handleFormChange("category", e.target.value)
										}
										className="w-full border border-gray-300 rounded-lg px-4 py-3 text-right focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
									>
										<option value="">اختر التصنيف</option>
										{categories.map((cat) => (
											<option key={cat.id} value={cat.id}>
												{cat.name}
											</option>
										))}
									</select>
								</div>

								{/* Addons */}
								<div>
									<div className="flex items-center justify-between mb-4">
										<button
											type="button"
											onClick={addAddon}
											className="bg-yellow-100 text-yellow-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-200"
										>
											إضافة
										</button>
										<label className="text-sm font-medium text-right">
											الإضافات
										</label>
									</div>
									{addons.map((addon, index) => (
										<div key={index} className="grid grid-cols-2 gap-4 mb-3">
											<div>
												<label className="block text-sm font-medium mb-1 text-right">
													السعر
												</label>
												<div className="relative">
													<input
														type="number"
														value={addon.price}
														onChange={(e) =>
															updateAddon(index, "price", e.target.value)
														}
														placeholder="20"
														className="w-full border border-gray-300 rounded-lg px-4 py-3 text-right focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
													/>
													<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
														ج.م
													</span>
												</div>
											</div>
											<div>
												<div className="flex items-center justify-between mb-1">
													{addons.length > 1 && (
														<button
															type="button"
															onClick={() => removeAddon(index)}
															className="text-red-500 text-xs hover:text-red-700"
														>
															حذف
														</button>
													)}
													<label className="text-sm font-medium text-right">
														الإضافة
													</label>
												</div>
												<input
													type="text"
													value={addon.name}
													onChange={(e) =>
														updateAddon(index, "name", e.target.value)
													}
													placeholder="مثال: جبنة زيادة"
													className="w-full border border-gray-300 rounded-lg px-4 py-3 text-right focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
												/>
											</div>
										</div>
									))}
								</div>

								{/* Sizes */}
								<div>
									<div className="flex items-center justify-between mb-4">
										<button
											type="button"
											onClick={addSize}
											className="bg-yellow-100 text-yellow-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-200"
										>
											إضافة حجم
										</button>
										<label className="text-sm font-medium text-right">
											الأحجام والأسعار
										</label>
									</div>
									{sizes.map((size, index) => (
										<div key={index} className="grid grid-cols-2 gap-4 mb-3">
											<div>
												<label className="block text-sm font-medium mb-1 text-right">
													السعر
												</label>
												<div className="relative">
													<input
														type="number"
														value={size.price}
														onChange={(e) =>
															updateSize(index, "price", e.target.value)
														}
														placeholder="300"
														className="w-full border border-gray-300 rounded-lg px-4 py-3 text-right focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
													/>
													<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
														ج.م
													</span>
												</div>
											</div>
											<div>
												<div className="flex items-center justify-between mb-1">
													{sizes.length > 1 && (
														<button
															type="button"
															onClick={() => removeSize(index)}
															className="text-red-500 text-xs hover:text-red-700"
														>
															حذف
														</button>
													)}
													<label className="text-sm font-medium text-right">
														الاسم
													</label>
												</div>
												<input
													type="text"
													value={size.name}
													onChange={(e) =>
														updateSize(index, "name", e.target.value)
													}
													placeholder="وسط"
													className="w-full border border-gray-300 rounded-lg px-4 py-3 text-right focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
												/>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* SAVE BUTTON */}
					<div className="mt-8 text-center">
						<button
							type="submit"
							className="bg-yellow-400 hover:bg-yellow-500 text-white px-12 py-4 rounded-lg font-bold text-lg shadow-lg"
						>
							حفظ
						</button>
					</div>
				</form>
			</div>
			<ToastContainer position="top-center" autoClose={3000} />
		</div>
	);
};

export default ProductDetailsPage;

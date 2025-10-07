import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaCamera, FaPlus, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../../context/AuthContext";

const UpdateProductForm = ({ product, onClose, onSuccess }) => {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		category: "",
		price: "",
		foodType: "",
	});
	const [categories, setCategories] = useState([]);
	const [image, setImage] = useState(null);
	const [previewImage, setPreviewImage] = useState(null);
	const [sizes, setSizes] = useState([]);
	const [addons, setAddons] = useState([]);
	const { accessToken } = useContext(UserContext);

	// Load product data
	useEffect(() => {
		if (product) {
			setFormData({
				name: product.name || "",
				description: product.description || "",
				category: product.category?.id || "",
				price: product?.sizes?.[0]?.price || "",
				foodType: product.foodType || "",
			});
			setSizes(product.sizes || [{ name: "", price: "" }]);
			setAddons(product.addons || [{ name: "", price: "" }]);
			setPreviewImage(product.imageUrl || null);
		}
	}, [product]);

	// Fetch categories
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const res = await axios.get("https://api.queen.kitchen/categories", {
					withCredentials: true,
				});
				setCategories(res.data);
			} catch (error) {
				toast.error("فشل تحميل التصنيفات من الخادم");
			}
		};
		fetchCategories();
	}, []);

	// Helpers
	const handleFormChange = (field, value) =>
		setFormData({ ...formData, [field]: value });

	const handleImageUpload = (file) => {
		if (!file) return;
		const allowed = ["image/png", "image/jpeg", "image/jpg"];
		if (!allowed.includes(file.type))
			return toast.error("يجب أن تكون الصورة PNG أو JPG");
		if (file.size > 3 * 1024 * 1024)
			return toast.error("حجم الصورة يجب ألا يتجاوز 3 ميجابايت");
		setImage(file);
		setPreviewImage(URL.createObjectURL(file));
	};

	// Sizes handlers
	const addSize = () => setSizes([...sizes, { name: "", price: "" }]);
	const updateSize = (i, f, v) => {
		const updated = [...sizes];
		updated[i][f] = v;
		setSizes(updated);
	};
	const removeSize = (i) => setSizes(sizes.filter((_, x) => x !== i));

	// Addons handlers
	const addAddon = () => setAddons([...addons, { name: "", price: "" }]);
	const updateAddon = (i, f, v) => {
		const updated = [...addons];
		updated[i][f] = v;
		setAddons(updated);
	};
	const removeAddon = (i) => setAddons(addons.filter((_, x) => x !== i));

	const validateForm = () => {
		if (!formData.name.trim()) return toast.error("أدخل اسم المنتج"), false;
		if (!formData.description.trim())
			return toast.error("أدخل وصف المنتج"), false;
		if (!formData.price || isNaN(formData.price))
			return toast.error("السعر غير صالح"), false;
		if (!formData.foodType) return toast.error("اختر نوع الطعام"), false;
		if (!formData.category) return toast.error("اختر التصنيف"), false;
		return true;
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;

		const data = new FormData();
		data.append("name", formData.name);
		data.append("description", formData.description);
		data.append("price", Number(formData.price));
		data.append("categoryId", formData.category);
		data.append("foodType", formData.foodType);
		if (image) data.append("file", image);

		const cleanSizes = sizes
			.filter((s) => s.name && s.price !== "")
			.map((s) => ({
				name: s.name,
				price: Number(s.price),
			}));

		const cleanAddons = addons
			.filter((a) => a.name && a.price !== "")
			.map((a) => ({
				name: a.name,
				price: Number(a.price),
			}));

		data.append("sizes", JSON.stringify(cleanSizes));
		data.append("addons", JSON.stringify(cleanAddons));

		try {
			const res = await axios.patch(
				`https://api.queen.kitchen/products/${product.id}`,
				data,
				{
					withCredentials: true,
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			toast.success(" تم تحديث المنتج بنجاح!");
			setTimeout(() => {
				onSuccess?.({
					...res.data,
					imageUrl: `https://api.queen.kitchen${res?.data?.imageUrl}`,
				});
				onClose?.();
			}, 1500);
		} catch (err) {
			console.error("❌ Error updating product:", err);
			toast.error("حدث خطأ أثناء التحديث");
		}
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
			<div className="bg-white rounded-lg shadow-lg max-w-5xl w-full mx-4 overflow-y-auto max-h-[90vh] p-6">
				<div className="flex justify-between items-center mb-4">
					<h2 className="font-bold text-xl">تحديث المنتج</h2>
					<button
						onClick={onClose}
						className="text-gray-600 hover:text-red-500"
					>
						✕
					</button>
				</div>
				<form onSubmit={handleUpdate}>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{/* LEFT IMAGE */}
						<div className="bg-white rounded-lg shadow p-6 h-fit">
							<h3 className="font-bold mb-4 text-right">عرض المنتج</h3>
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
									{previewImage ? (
										<img
											src={previewImage}
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

							{/* Sizes */}
							<div className="mb-6">
								<div className="flex justify-between items-center mb-2">
									<h3 className="font-bold text-right">الأحجام</h3>
									<button
										type="button"
										onClick={addSize}
										className="bg-yellow-400 text-white px-3 py-1 rounded flex items-center gap-2"
									>
										<FaPlus /> إضافة
									</button>
								</div>
								{sizes.map((size, i) => (
									<div key={i} className="flex gap-2 mb-2">
										<input
											type="text"
											placeholder="اسم الحجم"
											value={size.name}
											onChange={(e) => updateSize(i, "name", e.target.value)}
											className="border px-3 py-2 rounded w-1/2"
										/>
										<input
											type="number"
											placeholder="السعر"
											value={size.price}
											onChange={(e) => updateSize(i, "price", e.target.value)}
											className="border px-3 py-2 rounded w-1/2"
										/>
										<button
											type="button"
											onClick={() => removeSize(i)}
											className="text-red-500"
										>
											<FaTrash />
										</button>
									</div>
								))}
							</div>

							{/* Addons */}
							<div>
								<div className="flex justify-between items-center mb-2">
									<h3 className="font-bold text-right">الإضافات</h3>
									<button
										type="button"
										onClick={addAddon}
										className="bg-yellow-400 text-white px-3 py-1 rounded flex items-center gap-2"
									>
										<FaPlus /> إضافة
									</button>
								</div>
								{addons.map((addon, i) => (
									<div key={i} className="flex gap-2 mb-2">
										<input
											type="text"
											placeholder="اسم الإضافة"
											value={addon.name}
											onChange={(e) => updateAddon(i, "name", e.target.value)}
											className="border px-3 py-2 rounded w-1/2"
										/>
										<input
											type="number"
											placeholder="السعر"
											value={addon.price}
											onChange={(e) => updateAddon(i, "price", e.target.value)}
											className="border px-3 py-2 rounded w-1/2"
										/>
										<button
											type="button"
											onClick={() => removeAddon(i)}
											className="text-red-500"
										>
											<FaTrash />
										</button>
									</div>
								))}
							</div>
						</div>

						{/* RIGHT FORM */}
						<div className="bg-white rounded-lg shadow p-6">
							<h3 className="font-bold mb-6 text-right">تفاصيل المنتج</h3>
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
										className="w-full border border-gray-300 rounded-lg px-4 py-3 text-right focus:ring-2 focus:ring-yellow-400"
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
										rows="4"
										className="w-full border border-gray-300 rounded-lg px-4 py-3 text-right focus:ring-2 focus:ring-yellow-400"
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
										className="w-full border border-gray-300 rounded-lg px-4 py-3 text-right focus:ring-2 focus:ring-yellow-400"
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
										className="w-full border border-gray-300 rounded-lg px-4 py-3 text-right focus:ring-2 focus:ring-yellow-400"
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
										className="w-full border border-gray-300 rounded-lg px-4 py-3 text-right focus:ring-2 focus:ring-yellow-400"
									>
										<option value="">اختر التصنيف</option>
										{categories.map((cat) => (
											<option key={cat.id} value={cat.id}>
												{cat.name}
											</option>
										))}
									</select>
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
							تحديث
						</button>
					</div>
				</form>
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
				/>{" "}
			</div>
		</div>
	);
};

export default UpdateProductForm;

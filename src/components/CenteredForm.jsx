import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/AuthContext";
function CenteredForm({
	onClose,
	setCategories,
	categories,
	formHeader,
	selectedCategory,
}) {
	const [name, setName] = useState("");
	const [file, setFile] = useState(null);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const fileInputRef = useRef(null);
	const { accessToken } = useContext(UserContext);
	// preload data if editing
	useEffect(() => {
		if (selectedCategory) {
			setName(selectedCategory.name || "");
		} else {
			setName("");
			setFile(null);
			if (fileInputRef.current) fileInputRef.current.value = "";
		}
	}, [selectedCategory]);

	async function handleSubmit(e) {
		e.preventDefault();
		if (!name.trim()) {
			setError("من فضلك أدخل الاسم");
			return;
		}

		const formData = new FormData();
		formData.append("name", name);
		if (file) formData.append("file", file);

		try {
			setLoading(true);
			let res;
			if (formHeader === "إضافة تصنيف") {
				// ADD
				res = await axios.post(
					"https://api.queen.kitchen/categories",
					formData,
					{
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: `Bearer ${accessToken}`,
						},
						withCredentials: true,
					}
				);
				setCategories([...categories, res.data]);
			} else {
				// UPDATE
				res = await axios.patch(
					`https://api.queen.kitchen/categories/${selectedCategory.id}`,
					formData,
					{
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: `Bearer ${accessToken}`,
						},
						withCredentials: true,
					}
				);

				// update state
				setCategories(
					categories.map((cat) =>
						cat.id === selectedCategory.id ? res.data : cat
					)
				);
			}

			setName("");
			setFile(null);
			if (fileInputRef.current) fileInputRef.current.value = "";
			setError("");
			onClose();
		} catch (err) {
			console.error(err);
			setError(err.response?.data?.message || "فشل العملية، حاول مرة أخرى");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
			<form
				onSubmit={handleSubmit}
				className="relative bg-gray-400 p-8 rounded-2xl shadow-lg space-y-6 w-96"
			>
				<button
					type="button"
					onClick={onClose}
					className="absolute top-3 right-3 text-white hover:bg-red-600 w-8 h-8 flex items-center justify-center rounded-full"
				>
					✕
				</button>

				<h2 className="text-2xl font-bold text-center text-white">
					{formHeader}
				</h2>

				{error && <p className="text-red-600 text-center">{error}</p>}

				<div>
					<label className="block text-gray-300 mb-2">الاسم</label>
					<input
						type="text"
						placeholder="اضف الاسم"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-[#fbfcc4] text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
					/>
				</div>

				<div>
					<label className="block text-gray-300 mb-2">الصورة</label>
					<input
						type="file"
						ref={fileInputRef}
						onChange={(e) => setFile(e.target.files[0])}
						className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 
                       file:rounded-lg file:border-0 
                       file:text-sm file:font-semibold
                       file:bg-yellow-400 file:text-black 
                       hover:file:bg-yellow-300"
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
					className="w-full py-2 rounded-lg bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition disabled:opacity-50"
				>
					{loading
						? formHeader === "إضافة تصنيف"
							? "جارٍ الإضافة..."
							: "جارٍ التحديث..."
						: formHeader === "إضافة تصنيف"
						? "إضافة"
						: "تحديث"}
				</button>
			</form>
		</div>
	);
}

export default CenteredForm;

import React, { useState } from "react";
import footerBG from "./../../assets/footerBG.jpg";
import queen from "./../../assets/queen.jpeg";
import { CiLock } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const BASE_URL = "https://api.queen.kitchen";

function NewPassword() {
	const navigate = useNavigate();

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!password || !confirmPassword) {
			toast.error("من فضلك أدخل كلمة المرور الجديدة وتأكيدها");
			return;
		}

		if (password !== confirmPassword) {
			toast.error("كلمتا المرور غير متطابقتين");
			return;
		}

		if (password.length<8) {
			toast.error("كلمة المرور يجب ان لا تقل عن 8 عناصر");
			return;
		}

		const resetPassword_t = Cookies.get("resetPassword_t");
		if (!resetPassword_t) {
			toast.error("رمز التحقق غير صالح، أعد العملية من البداية");
			setTimeout(() => navigate("/forget-password"), 2000);
			return;
		}

		try {
			setLoading(true);
			const resetPassword_t = Cookies.get("resetPassword_t");

			const response = await axios.post(
				`${BASE_URL}/auth/forgot-password/reset`,

				{
					newPassword: password,
				},
				{
					headers: {
						Authorization: `Bearer ${resetPassword_t}`,
					},
				}
			);

			toast.success(
				response.data.message || "تمت إعادة تعيين كلمة المرور بنجاح!"
			);
			Cookies.remove("resetPassword_t");

			setTimeout(() => navigate("/login"), 2000);
		} catch (error) {
			const msg =
				error.response?.data?.message ||
				"حدث خطأ أثناء إعادة تعيين كلمة المرور";
			toast.error(msg);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className="min-h-screen flex items-center justify-center bg-cover bg-center"
			style={{
				backgroundImage: `url(${footerBG})`,
			}}
		>
			<div className="bg-white bg-opacity-95 shadow-lg rounded-2xl p-8 w-full max-w-md">
				{/* Logo */}
				<div className="flex flex-col items-center">
					<img
						src={queen}
						alt="مطعم الملكة"
						className="w-20 h-20 object-contain"
					/>
					<h2 className="text-xl font-semibold mt-2">إنشاء كلمة مرور جديدة</h2>
				</div>

				{/* Description */}
				<div className="flex justify-center">
					<p className="font-thin mt-2 text-center text-gray-500 text-sm">
						قم بإنشاء كلمة مرور جديدة لحسابك
					</p>
				</div>

				{/* Form */}
				<form
					onSubmit={handleSubmit}
					className="mt-6 space-y-4 text-right"
					dir="rtl"
				>
					<div className="relative">
						<label className="block text-sm font-medium mb-1">
							كلمة المرور الجديدة
						</label>
						<CiLock className="absolute bottom-3 left-3 text-gray-500" />
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
							placeholder="كلمة المرور الجديدة"
						/>
					</div>

					<div className="relative">
						<label className="block text-sm font-medium mb-1">
							تأكيد كلمة المرور
						</label>
						<CiLock className="absolute bottom-3 left-3 text-gray-500" />
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
							placeholder="تأكيد كلمة المرور"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500 transition font-semibold disabled:opacity-70"
					>
						{loading ? "جارٍ المعالجة..." : "إعادة تعيين كلمة المرور"}
					</button>
				</form>

				<ToastContainer
					rtl
					position="top-right"
					autoClose={3000}
					hideProgressBar={false}
					closeOnClick
					pauseOnHover
				/>
			</div>
		</div>
	);
}

export default NewPassword;

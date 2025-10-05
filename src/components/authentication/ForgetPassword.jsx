import React, { useContext, useState } from "react";
import footerBG from "./../../assets/footerBG.jpg";
import queen from "./../../assets/queen.jpeg";
import { FaRegEnvelope } from "react-icons/fa";
import axios from "axios";
import { UserContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

const BASE_URL = "https://api.queen.kitchen";

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function Login() {
	const { accessToken } = useContext(UserContext);
	const navigate = useNavigate();
	const [email, setEmail] = useState("");

	async function sendOTP() {
		if (!email) {
			toast.error("قم بإدخال البريد الإلكتروني");
			return;
		}

		if (!emailRegex.test(email)) {
			toast.error("صيغة البريد الإلكتروني غير صحيحة");
			return;
		}

		try {
			const res = await axios.post(
				`${BASE_URL}/auth/forgot-password/otp-request`,
				{ email },
				{
					headers: { Authorization: `Bearer ${accessToken}` },
					withCredentials: true,
				}
			);
			console.log(res)
			toast.success("تم إرسال رمز التحقق إلى بريدك الإلكتروني");
			Cookies.set("otp_t", res.data.token, { expires: 0.0034722 });
			
			setTimeout(() => {
				navigate("/otp", { state: { email } });
			}, 1000);
		} catch (error) {
			console.error(error.response?.data || error.message);
			toast.error("حدث خطأ أثناء إرسال الرمز");
		}
	}

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
					<h2 className="text-xl font-semibold mt-2">نسيت كلمة المرور</h2>
				</div>
				<div className="flex justify-center">
					<h2 className="font-extralight mt-2">سنرسل تعليمات إعادة التعيين</h2>
				</div>

				{/* Form */}
				<div className="mt-6 space-y-4 text-right" dir="rtl">
					<div className="relative">
						<label className="block text-sm font-medium mb-1">الإيميل</label>
						<FaRegEnvelope className="absolute bottom-3 left-3 " />

						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
							placeholder="ma232424@gmail.com"
						/>
					</div>

					<button
						onClick={sendOTP}
						className="w-full bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500 transition font-semibold"
					>
						إعادة تعيين كلمة المرور
					</button>
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
	);
}

export default Login;

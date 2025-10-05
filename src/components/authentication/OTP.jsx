import React, { useState, useRef, useEffect } from "react";
import footerBG from "./../../assets/footerBG.jpg";
import queen from "./../../assets/queen.jpeg";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const BASE_URL = "https://api.queen.kitchen";

function OTP() {
	const location = useLocation();
	const { email } = location.state || {};
	const navigate = useNavigate();

	const [otp, setOtp] = useState(Array(6).fill(""));
	const inputsRef = useRef([]);
	// autofocus the first input
	useEffect(() => {
		inputsRef.current[0]?.focus();
	}, []);

	// handle change (single digit or paste multiple digits)
	const handleChange = (rawValue, index) => {
		// keep only digits
		const value = rawValue.replace(/\D/g, "");
		if (!value) {
			const newOtp = [...otp];
			newOtp[index] = "";
			setOtp(newOtp);
			return;
		}

		// if the user pasted multiple digits, distribute them
		if (value.length > 1) {
			const newOtp = [...otp];
			for (let i = 0; i < value.length && index + i < 6; i++) {
				newOtp[index + i] = value[i];
			}
			setOtp(newOtp);
			const nextIndex = Math.min(5, index + value.length);
			inputsRef.current[nextIndex]?.focus();
			return;
		}

		// single digit typed
		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);
		if (index < 5) inputsRef.current[index + 1]?.focus();
	};

	// handle navigation and backspace
	const handleKeyDown = (e, index) => {
		if (e.key === "Backspace") {
			e.preventDefault();
			// if current has value -> clear it
			if (otp[index]) {
				const newOtp = [...otp];
				newOtp[index] = "";
				setOtp(newOtp);
				return;
			}
			// if empty -> move to previous and clear it
			if (index > 0) {
				inputsRef.current[index - 1]?.focus();
				const newOtp = [...otp];
				newOtp[index - 1] = "";
				setOtp(newOtp);
			}
		} else if (e.key === "ArrowLeft" && index > 0) {
			inputsRef.current[index - 1]?.focus();
		} else if (e.key === "ArrowRight" && index < 5) {
			inputsRef.current[index + 1]?.focus();
		}
	};

	// submit
	const handleSubmit = async (e) => {
		e.preventDefault();

		const otp_t = Cookies.get("otp_t");
		const enteredOtp = otp.join("");
		if (enteredOtp.length < 6) {
			toast.error("من فضلك أدخل جميع الأرقام الستة");
			return;
		}

		if (!otp_t) {
			toast.error("أصبح الرمز غير صالح، أعد إدخال البريد الإلكتروني.");
			setTimeout(() => navigate("/forget-password"), 2000);
			return;
		}

		try {
			const response = await axios.post(
				`${BASE_URL}/auth/forgot-password/otp-verify`,
				{
					otp: enteredOtp,
				},
				{
					headers: {
						Authorization: `Bearer ${otp_t}`,
					},
				}
			);

			toast.success(response.data.message || "تم التحقق بنجاح!");
			Cookies.set("resetPassword_t", response.data.token, { expires: 0.0034722 });
			Cookies.remove('otp_t');
			navigate("/new-password");
		} catch (error) {
			const msg =
				error.response?.data?.message || "حدث خطأ أثناء التحقق من الرمز";
			toast.error(msg);
		}
	};

	return (
		<div
			className="min-h-screen flex items-center justify-center bg-cover bg-center"
			style={{ backgroundImage: `url(${footerBG})` }}
		>
			<div className="bg-white bg-opacity-95 shadow-lg rounded-2xl p-6 w-full max-w-sm">
				<div className="flex flex-col items-center">
					<img
						src={queen}
						alt="مطعم الملكة"
						className="w-16 h-16 object-contain"
					/>
					<h2 className="text-lg font-semibold mt-2">تحقق من الرمز</h2>
				</div>

				<div className="flex justify-center">
					<p className="font-thin mt-2 text-gray-400 text-center text-sm">
						أدخل الأرقام الستة المرسلة إلى بريدك الإلكتروني ({email})
					</p>
				</div>

				<form
					onSubmit={handleSubmit}
					className="mt-6 space-y-4 text-right"
					dir="rtl"
				>
					{/* Keep form RTL for labels/text but force LTR for input boxes */}
					<div className="flex justify-between" dir="ltr">
						{otp.map((value, index) => (
							<input
								key={index}
								type="tel"
								inputMode="numeric"
								pattern="\d*"
								maxLength={1}
								value={value}
								ref={(el) => (inputsRef.current[index] = el)}
								onChange={(e) => handleChange(e.target.value, index)}
								onKeyDown={(e) => handleKeyDown(e, index)}
								autoComplete={index === 0 ? "one-time-code" : "off"} // helps iOS autofill
								dir="ltr"
								className="w-10 h-10 sm:w-12 sm:h-12 focus:outline-amber-400 rounded-xl bg-gray-100 border border-gray-300 text-black text-center text-lg transition-all duration-150 focus:scale-105"
							/>
						))}
					</div>

					<button
						type="submit"
						className="w-full bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500 transition font-semibold"
					>
						تحقق
					</button>
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
				/>
			</div>
		</div>
	);
}

export default OTP;

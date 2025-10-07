// src/pages/auth/Login.jsx
import React, { useState, useContext } from "react";
import footerBG from "./../../assets/footerBG.jpg";
import google from "./../../assets/google.svg";
import facebook from "./../../assets/facebook.svg";
import queen from "./../../assets/queen.jpeg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../context/AuthContext";
import axios from "axios";
import Loader from "../../loaders/Loader";

axios.defaults.withCredentials = true;

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();
	const { setUser, loading, setAccessToken } = useContext(UserContext); // Add setAccessToken

	const from = location.state?.from?.pathname || "/";

	// Fix: Add return statement for loading state
	if (loading) {
		return <Loader />;
	}

	// if (user) {
	//   navigate(from, { replace: true });
	// }

	const login = async () => {
		if (isLoading) return;
		setIsLoading(true);

		try {
			const res = await axios.post(
				"/auth/login",
				{ email, password },
				{ withCredentials: true }
			);

			if (res.data?.user) {
				setUser(res.data.user);
				// Also set the access token if it's returned
				if (res.data.accessToken) {
					setAccessToken(res.data.accessToken);
				}
				toast.success("✅ تم تسجيل الدخول بنجاح!");
				if (res.data.user.role === "ADMIN") navigate("/dashboard");
				else navigate(from, { replace: true });
			} else {
				toast.error("❌ لم يتم استلام بيانات المستخدم!");
			}
		} catch (error) {
			if (error.response?.status === 401) {
				toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة!");
			} else {
				toast.error("فشل تسجيل الدخول! حاول مرة أخرى.");
			}
		} finally {
			setIsLoading(false);
		}
	};

	const handleLogin = (e) => {
		e.preventDefault();
		if (!email.trim()) return toast.error("يرجى إدخال الإيميل");
		if (!password.trim()) return toast.error("يرجى إدخال كلمة المرور");
		if (!/\S+@\S+\.\S+/.test(email))
			return toast.error("يرجى إدخال إيميل صحيح");
		login();
	};

	return (
		<div
			className="min-h-screen flex items-center justify-center bg-cover bg-center"
			style={{ backgroundImage: `url(${footerBG})` }}
		>
			<div className="bg-white bg-opacity-95 shadow-lg rounded-2xl p-8 w-full max-w-md">
				{/* Logo */}
				<div className="flex flex-col items-center">
					<img
						src={queen}
						alt="مطعم الملكة"
						className="w-20 h-20 object-contain"
					/>
					<h2 className="text-xl font-semibold mt-2">تسجيل الدخول</h2>
					{location.state?.from && (
						<p className="text-sm text-yellow-600 mt-2 text-center">
							يجب تسجيل الدخول للوصول إلى هذه الصفحة
						</p>
					)}
				</div>

				{/* Form */}
				<form
					className="mt-6 space-y-4 text-right"
					dir="rtl"
					onSubmit={handleLogin}
				>
					<div>
						<label className="block text-sm font-medium mb-1">الإيميل</label>
						<input
							type="email"
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
							placeholder="example@mail.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							disabled={isLoading}
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">
							كلمة المرور
						</label>
						<input
							type="password"
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
							placeholder="********"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							disabled={isLoading}
						/>
					</div>

					<div className="mt-5 mb-5 flex justify-end">
						<Link
							to="/forget-password"
							className="underline hover:text-yellow-500 transition"
						>
							هل نسيت كلمة المرور ؟
						</Link>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isLoading ? (
							<div className="flex items-center justify-center">
								<svg
									className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								جاري تسجيل الدخول...
							</div>
						) : (
							"تسجيل الدخول"
						)}
					</button>

					<div className="flex justify-center mt-10 mb-5">
						او التسجيل بواسطة
					</div>

					<div className="flex justify-center align-middle mb-10">
						<div className="py-3 px-5 rounded-2xl shadow-xl/20 ml-5 bg-white hover:shadow-lg transition cursor-pointer">
							<img className="w-7" src={facebook} alt="facebook" />
						</div>
						<div className="py-3 px-5 rounded-2xl shadow-xl/20 bg-white hover:shadow-lg transition cursor-pointer">
							<img className="w-7" src={google} alt="google" />
						</div>
					</div>

					<p className="text-center text-sm mt-4">
						لا تملك حساب{" "}
						<Link
							to="/signup"
							className="text-yellow-500 hover:underline font-medium"
						>
							إنشاء حساب جديد
						</Link>
					</p>
				</form>
			</div>

			<ToastContainer rtl position="top-right" autoClose={5000} />
		</div>
	);
}

export default Login;

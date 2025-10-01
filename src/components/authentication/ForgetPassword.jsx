import React from "react";
import footerBG from "./../../assets/footerBG.jpg";
import queen from "./../../assets/queen.jpeg";
import { Link } from "react-router-dom";
import { FaRegEnvelope } from "react-icons/fa";

function Login() {
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
					<h2 className="text-xl font-semibold mt-2"> نسيت كلمة المرور</h2>
				</div>
				<div className="flex  justify-center">
					<h2 className="font-extralight  mt-2"> سنرسل تعليمات إعادة التعين</h2>
				</div>

				{/* Form */}
				<form className="mt-6 space-y-4 text-right" dir="rtl">
					<div className="relative">
						<label className="block text-sm font-medium mb-1 ">الإيميل</label>
                        <FaRegEnvelope className="absolute bottom-3 left-3 "/>

						<input
							type="email"
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
							placeholder="ma232424@gmail.com"
						/>
					</div>



					<button
						type="submit"
						className="w-full bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500 transition font-semibold"
					>
						 إعادة تعين كلمة المرور
					</button>

	
				</form>
			</div>
		</div>
	);
}

export default Login;

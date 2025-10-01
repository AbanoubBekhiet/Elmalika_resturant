import React from "react";
import footerBG from "./../../assets/footerBG.jpg";
import queen from "./../../assets/queen.jpeg";
import { Link } from "react-router-dom";
import { CiLock } from "react-icons/ci";

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
					<h2 className="text-xl font-semibold mt-2"> إنشاء كلمة مرور جديدة</h2>
				</div>
				<div className="flex  justify-center">
					<h2 className="font-thin  mt-2 text-center text-gray-500">
						{" "}
						نحن نسمح للمستخدمين بإعادة تعين كلمة مرور جيدية لسحابهم بشكل امن
					</h2>
				</div>

				{/* Form */}
				<form className="mt-6 space-y-4 text-right" dir="rtl">
					<div className="relative">
						<label className="block text-sm font-medium mb-1 ">كلمة المرور</label>
						<CiLock className="absolute bottom-3 left-3 " />

						<input
							type="email"
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
							placeholder="كلمة المرور الجديدة"
						/>
					</div>
					<div className="relative">
						<label className="block text-sm font-medium mb-1 ">تأكيد كلمة المرور</label>
						<CiLock className="absolute bottom-3 left-3 " />

						<input
							type="email"
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
							placeholder="تأكيد كلمة المرور "
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

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
					<h2 className="text-xl font-semibold mt-2"> OTP تحقق </h2>
				</div>
				<div className="flex  justify-center">
					<h2 className="font-thin  mt-2 text-gray-400 text-center">
						
						الرجاء إدخال الأرقام الأربعة التي تم إرسالها إلى بريدك الإلكتروني
						ma232424@gmail.com
					</h2>
				</div>

				{/* Form */}
				<form className="mt-6 space-y-4 text-right" dir="rtl">
					<div className="flex justify-around">
						<input type="text" className="w-20 h-20 focus:outline-amber-300 rounded-2xl  bg-gray-200 border-0 text-black text-center"/>
						<input type="text" className="w-20 h-20 focus:outline-amber-300 rounded-2xl  bg-gray-200 border-0 text-black text-center"/>
						<input type="text" className="w-20 h-20 focus:outline-amber-300 rounded-2xl  bg-gray-200 border-0 text-black text-center"/>
						<input type="text" className="w-20 h-20 focus:outline-amber-300 rounded-2xl  bg-gray-200 border-0 text-black text-center"/>
					</div>

					<button
						type="submit"
						className="w-full bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500 transition font-semibold"
					>
						تحقق
					</button>
                    <div className="flex justify-center underline">
                        <Link>OTP إعادة إرسال </Link>
                    </div>
				</form>
			</div>
		</div>
	);
}

export default Login;

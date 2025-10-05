import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function PrivacyAndSafety() {
	const navigate = useNavigate();
	function handleNavigation() {
		navigate("/forget-password");
	}
	return (
		<div className="p-6 bg-white border rounded-lg shadow-sm" dir="rtl">
			<button
				onClick={handleNavigation}
				className=" w-full px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
			>
				تحديث كلمة المرور
			</button>
		</div>
	);
}

export default PrivacyAndSafety;

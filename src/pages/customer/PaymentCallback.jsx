import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/AuthContext";

const BASE_URL = "https://api.queen.kitchen"; // replace with your actual base url

function PaymentCallback() {
	const location = useLocation();
	const navigate = useNavigate();
	const [message, setMessage] = useState("جارٍ التحقق من الدفع...");
	const { accessToken } = useContext(UserContext);

	useEffect(() => {
		const params = new URLSearchParams(location.search);

		// Paymob usually sends txn_response_code (200 means success)
		const success = params.get("success");
		const orderId = params.get("merchant_order_id"); 
		const txnCode = params.get("txn_response_code");

		if (!orderId) {
			setMessage("لم يتم العثور على رقم الطلب.");
			return;
		}

		if (success === "true" && txnCode === "200") {
			axios
				.post(`${BASE_URL}/orders/${orderId}/payment-status`, {
					header: {
						Authorization: `Bearer ${accessToken}`,
					},
					status: "paid",
				})
				.then(() => {
					setMessage("✅ تم الدفع بنجاح! يتم تحويلك لصفحة الطلب...");
					setTimeout(() => navigate(`/orders/${orderId}`), 2000);
				})
				.catch(() => {
					setMessage("⚠️ حدث خطأ أثناء تحديث حالة الدفع.");
				});
		} else {
			// ❌ Payment failed
			setMessage("❌ فشلت عملية الدفع. حاول مرة أخرى.");
			setTimeout(() => navigate("/cart"), 2000);
		}
	}, [location, navigate, accessToken]);

	return (
		<div className="flex justify-center items-center min-h-screen">
			<p className="text-lg font-bold">{message}</p>
		</div>
	);
}

export default PaymentCallback;

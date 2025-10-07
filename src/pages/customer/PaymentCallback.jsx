import { useSearchParams } from "react-router-dom";
import React from "react";
function PaymentCallback() {
	const [params] = useSearchParams();
	const success = params.get("status");
	return (
		<div className="p-100 text-center">
			<h1>{success==="success" ? "✅ تم الدفع بنجاح " : "❌ لم يتم الدفع"}</h1>
		</div>
	);
}
export default PaymentCallback;

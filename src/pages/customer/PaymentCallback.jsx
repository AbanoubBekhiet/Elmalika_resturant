import { useSearchParams } from "react-router-dom";
import React from "react";
function PaymentCallback() {
	const [params] = useSearchParams();
	const success = params.get("status");
console.log(success)
	return (
		<div className="p-100 text-center">
			<h1>{success==="success" ? "✅ Payment Successful" : "❌ Payment Failed"}</h1>
		</div>
	);
}
export default PaymentCallback;

import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../context/AuthContext";

const TableRow = ({ order, onUpdate }) => {
	const [showModal, setShowModal] = useState(false);
	const [status, setStatus] = useState(order.status);
	const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus);
	const [loading, setLoading] = useState(false);

	const { accessToken } = useContext(UserContext);
	const API_BASE_URL = "https://api.queen.kitchen";

	const statusConfig = {
		DELIVERED: { bg: "bg-green-100", text: "text-green-700", border: "border-green-200" },
		CANCELLED: { bg: "bg-red-100", text: "text-red-700", border: "border-red-200" },
		ON_THE_WAY: { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200" },
		PENDING: { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-200" },
		PREPARING: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
	};

	const statusStyles = statusConfig[status] || {
		bg: "bg-gray-100",
		text: "text-gray-700",
		border: "border-gray-200",
	};

	const dateOfOrder = new Date(order.createdAt).toISOString().slice(0, 16).replace("T", " ");
	const [dateOfOrderPart, timeOfOrderPart] = dateOfOrder.split(" ");

	const headers = {
		"Content-Type": "application/json",
		...(accessToken && { Authorization: `Bearer ${accessToken}` }),
	};

	const handleSave = async () => {
		try {
			setLoading(true);

			// Update status
			await axios.patch(
				`${API_BASE_URL}/orders/${order.id}/status`,
				{ status },
				{ withCredentials: true, headers }
			);

			// Update payment status
			await axios.patch(
				`${API_BASE_URL}/orders/${order.id}/payment-status`,
				{ status: paymentStatus },
				{ withCredentials: true, headers }
			);

			toast.success(" تم تحديث الطلب بنجاح");

			if (onUpdate) {
				onUpdate({
					...order,
					status,
					paymentStatus,
				});
			}

			setShowModal(false);
		} catch (error) {
			console.error("Error updating order:", error);
			toast.error("❌ فشل تحديث الطلب");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<tr className="border-b border-gray-200 hover:bg-gray-50">
				{/* Order Details */}
				<td className="px-4 py-4 border-r border-gray-200">
					<div className="flex items-center gap-3">
						<span className="text-red-500">{order.orderItems.length}</span>
						<span>منتج</span>
					</div>
				</td>

				{/* Customer */}
				<td className="px-4 py-4 text-right border-r border-gray-200">
					<span className="text-sm text-gray-700">{order?.user?.name}</span>
				</td>

				{/* Price */}
				<td className="px-4 py-4 text-right border-r border-gray-200">
					<span className="text-sm font-medium text-gray-800">
						{order?.totalPrice} جنيه
					</span>
				</td>

				{/* Payment status */}
				<td className="px-4 py-4 text-right border-r border-gray-200">
					<span
						className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
							paymentStatus === "PAID"
								? "bg-green-100 text-green-700 border-green-200"
								: "bg-red-100 text-red-700 border-red-200"
						}`}
					>
						{paymentStatus}
					</span>
				</td>

				{/* Payment method */}
				<td className="px-4 py-4 text-right border-r border-gray-200">
					<span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-yellow-700 bg-yellow-100 border-yellow-200">
						{order?.paymentMethod}
					</span>
				</td>

				{/* Date */}
				<td className="px-4 py-4 text-right border-r border-gray-200">
					<div className="text-1xl text-gray-500">
						<p>{dateOfOrderPart}</p>
						<p>{timeOfOrderPart}</p>
					</div>
				</td>

				{/* Status */}
				<td className="px-4 py-4 text-right border-r border-gray-200">
					<span
						className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${statusStyles.bg} ${statusStyles.text} ${statusStyles.border}`}
					>
						{status}
					</span>
				</td>

				{/* Actions */}
				<td className="px-4 py-4 text-center border border-l border-gray-200">
					<div className="flex items-center gap-2 justify-center">
						<button
							className="text-yellow-400 hover:text-yellow-700 p-1"
							onClick={() => {
								// reset modal values to current order values when opening
								setStatus(order.status);
								setPaymentStatus(order.paymentStatus);
								setShowModal(true);
							}}
						>
							<FaRegEdit size={25} />
						</button>
					</div>
				</td>
			</tr>

			{/* ✅ Modal rendered via Portal (outside table) */}
			{showModal &&
				ReactDOM.createPortal(
					<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
						<div className="bg-white rounded-lg shadow-lg p-6 w-96">
							<h2 className="text-lg font-semibold mb-4">تحديث الطلب</h2>

							{/* Status select */}
							<label className="block mb-2 text-sm font-medium text-gray-700">
								الحالة
							</label>
							<select
								value={status}
								onChange={(e) => setStatus(e.target.value)}
								className="w-full mb-4 p-2 border rounded"
							>
								<option value="DELIVERED">تم التوصيل</option>
								<option value="ON_THE_WAY">جاري التوصيل</option>
								<option value="CANCELLED">ملغي</option>
								<option value="PREPARING">جاري التجهيز</option>
								<option value="PENDING">قيد الانتظار</option>
							</select>

							{/* Payment status select */}
							<label className="block mb-2 text-sm font-medium text-gray-700">
								حالة الدفع
							</label>
							<select
								value={paymentStatus}
								onChange={(e) => setPaymentStatus(e.target.value)}
								className="w-full mb-4 p-2 border rounded"
							>
								<option value="PAID">تم الدفع</option>
								<option value="UNPAID">لم يدفع</option>
							</select>

							<div className="flex justify-end gap-2">
								<button
									onClick={() => setShowModal(false)}
									className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
								>
									إلغاء
								</button>
								<button
									onClick={handleSave}
									disabled={loading}
									className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600 disabled:opacity-50"
								>
									{loading ? "جاري الحفظ..." : "حفظ"}
								</button>
							</div>
						</div>
					</div>,
					document.body
				)}
		</>
	);
};

export default TableRow;

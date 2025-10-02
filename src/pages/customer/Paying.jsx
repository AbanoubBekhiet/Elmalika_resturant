import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import axios from "axios";
import Loader from "./../../loaders/Loader";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://api.queen.kitchen";

export default function CheckoutPage() {
	const [paymentMethod, setPaymentMethod] = useState("CASH");
	const [userData, setUserData] = useState({});
	const [userAddresses, setUserAddresses] = useState([]);
	const [selectedAddressId, setSelectedAddressId] = useState(null);
	const [userAddress, setUserAddress] = useState({
		street: "",
		building: "",
		floor: "",
		apartment: "",
		city: "",
		note: "",
	});
	const navigate = useNavigate();
	const { accessToken } = useContext(UserContext);
	const { cart, clearCartLocally } = useContext(CartContext);
	const [isLoading, setIsLoading] = useState(false);
	// Fetch user data
	useEffect(() => {
		setIsLoading(true);
		const fetchUserData = async () => {
			try {
				const res = await axios.get(`${BASE_URL}/users/me`, {
					headers: { Authorization: `Bearer ${accessToken}` },
					withCredentials: true,
				});
				setUserData(res.data);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchUserData();
	}, [accessToken]);

	// Fetch addresses
	useEffect(() => {
		setIsLoading(true);
		const fetchUserAddresses = async () => {
			try {
				const res = await axios.get(`${BASE_URL}/addresses`, {
					headers: { Authorization: `Bearer ${accessToken}` },
					withCredentials: true,
				});
				const addresses = res.data || [];
				setUserAddresses(addresses);

				const defaultAddress =
					addresses.find((addr) => addr.isDefault) || addresses[0];
				if (defaultAddress) {
					setSelectedAddressId(defaultAddress.id);
					setUserAddress({ ...defaultAddress });
				}
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchUserAddresses();
	}, [accessToken]);

	// Update inputs when dropdown changes
	const handleAddressChangeDropdown = async (id) => {
		const numericId = typeof id === "string" ? parseInt(id) : id;
		setSelectedAddressId(numericId);
		const selectedAddr = userAddresses.find((addr) => addr.id === numericId);
		if (selectedAddr) setUserAddress({ ...selectedAddr });
		await handleMakeDefault(numericId); // mark default immediately
	};

	// Make an address default
	const handleMakeDefault = async (id) => {
		try {
			await axios.patch(
				`${BASE_URL}/addresses/${id}`,
				{ isDefault: true },
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			const updatedAddresses = userAddresses.map((addr) =>
				addr.id === id
					? { ...addr, isDefault: true }
					: { ...addr, isDefault: false }
			);
			setUserAddresses(updatedAddresses);
			const newDefault = updatedAddresses.find((addr) => addr.id === id);
			setUserAddress({ ...newDefault });
			toast.success("تم تعيين العنوان كافتراضي");
		} catch (error) {
			console.error("Error making default:", error);
			toast.error("فشل في تعيين العنوان كافتراضي");
		}
	};

	// Place order
	const handlePayment = async () => {
		try {
			if (!selectedAddressId) return toast.error("يرجى اختيار عنوان");
			if (cart.itemsCount === 0) return toast.error("لا يوجد منتجات في السلة");
			const orderData = {
				addressId: Number(selectedAddressId),
				paymentMethod: paymentMethod.toUpperCase(),
				deliveryInstructions: userAddress.note
					? String(userAddress.note).slice(0, 255)
					: "",
			};
			const res = await axios.post(`${BASE_URL}/orders`, orderData, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
				},
				withCredentials: true,
			});

			const orderId = res.data.id;

			if (paymentMethod === "CASH") {
				toast.success("تم اكتمال الطلب نقدًا!");
				clearCartLocally();

				setTimeout(() => {
					navigate("/");
				}, 2000);
			} else {
				const paymentRes = await axios.post(
					`${BASE_URL}/orders/${orderId}/pay`,
					{},
					{
						headers: { Authorization: `Bearer ${accessToken}` },
						withCredentials: true,
					}
				);
				if (paymentRes.data?.iframeUrl) {
					window.location.href = paymentRes.data.iframeUrl;
				}
				clearCartLocally();
			}
		} catch (error) {
			console.error(error);
			toast.error("فشل في إتمام الطلب");
		}
	};

	if (isLoading) return <Loader />;

	return (
		<div dir="rtl" className="p-4 py-20 sm:p-6 bg-white mb-20">
			<div className="flex justify-between mt-20">
				<h1 className="text-xl font-semibold mb-6">الدفع</h1>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Order Details */}
				<div className="border rounded-lg p-4 sm:p-6 space-y-4 h-fit shadow-sm">
					<h2 className="text-lg font-semibold">تفاصيل الطلب</h2>
					<div className="text-sm text-gray-700 space-y-1">
						<div className="flex justify-between">
							<span>عدد المنتجات</span>
							<span>{cart?.itemsCount || 0} منتجات</span>
						</div>
						<div className="flex justify-between">
							<span>إجمالى سعر المنتجات</span>
							<span>{cart?.totalPrice || 0} جنية</span>
						</div>
						<div className="flex justify-between">
							<span>قيمة التوصيل</span>
							<span>{cart?.shipping || 0} جنية</span>
						</div>
						<hr />
						<div className="flex justify-between font-bold">
							<span>الإجمالى</span>
							<span>{cart?.grandTotal || 0} جنية</span>
						</div>
					</div>
				</div>

				{/* Payment Form */}
				<div className="lg:col-span-2 border rounded-lg p-4 sm:p-6 space-y-6 shadow-sm">
					<h2 className="text-lg font-semibold mb-4">معلومات الدفع</h2>

					{/* Personal Info */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
						<label className="block">
							الإيميل
							<input
								type="email"
								className="w-full border-b border-gray-300 focus:outline-none pr-10 pb-2 mt-1"
								value={userData.email || ""}
								readOnly
							/>
						</label>
						<label className="block">
							الإسم
							<input
								type="text"
								className="w-full border-b border-gray-300 focus:outline-none pr-10 pb-2 mt-1"
								value={userData.name || ""}
								readOnly
							/>
						</label>
						<label className="block">
							رقم الهاتف
							<input
								type="tel"
								className="w-full border-b border-gray-300 focus:outline-none pr-10 pb-2 mt-1 text-right"
								value={userData.phone || ""}
								readOnly
							/>
						</label>
					</div>

					{/* Address Selection */}
					<label className="block my-10">
						اختر العنوان الافتراضي
						<select
							className="w-full border border-gray-300 rounded p-5 mt-3"
							value={selectedAddressId || ""}
							onChange={async (e) =>
								handleAddressChangeDropdown(e.target.value)
							}
						>
							{userAddresses.map((addr) => (
								<option key={addr.id} value={addr.id}>
									{`${addr.isDefault ? "⭐ " : ""}الشارع:${
										addr.street
									} المبنى:${addr.building} الطابق:${addr.floor} الشقة:${
										addr.apartment
									} المدينة:${addr.city} ملاحظات:${addr.note}`}
								</option>
							))}
						</select>
					</label>

					{/* Delivery Address */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{["street", "building", "floor", "apartment", "city", "note"].map(
							(field) => (
								<label key={field} className="block">
									{field === "street"
										? "الشارع"
										: field === "building"
										? "المبنى"
										: field === "floor"
										? "الطابق"
										: field === "apartment"
										? "الشقة"
										: field === "city"
										? "المدينة"
										: "ملاحظات"}
									<input
										type="text"
										className="w-full border-b border-gray-300 focus:outline-none pr-10 pb-2 mt-1"
										value={userAddress[field] || ""}
										readOnly
									/>
								</label>
							)
						)}
					</div>

					{/* Payment Method */}
					<span className="font-medium block mb-2">الدفع</span>
					<div className="flex flex-col sm:flex-row gap-4">
						{[
							{ id: "CREDIT_CARD", icon: "💳", label: "دفع إلكتروني" },
							{ id: "CASH", icon: "💵", label: "كاش" },
						].map((method) => (
							<button
								key={method.id}
								className={`flex-1 flex flex-col items-center gap-2 p-6 border rounded-3xl shadow-lg transition ${
									paymentMethod === method.id
										? "border-yellow-400 bg-yellow-50"
										: "border-gray-200 bg-gray-100"
								}`}
								onClick={() => setPaymentMethod(method.id)}
							>
								<span className="text-3xl">{method.icon}</span>
								<span className="font-medium">{method.label}</span>
							</button>
						))}
					</div>

					<button
						onClick={handlePayment}
						className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-3 rounded-lg font-medium mt-6"
					>
						اطلب الآن
					</button>
				</div>
			</div>
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
	);
}

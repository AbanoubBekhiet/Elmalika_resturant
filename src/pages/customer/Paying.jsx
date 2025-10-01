import { useState } from "react";
import { FiUser, FiMail, FiPhone, FiMapPin, FiTrash } from "react-icons/fi";
import { MdLocationCity } from "react-icons/md";
import React from "react";

export default function CheckoutPage() {
	const [paymentMethod, setPaymentMethod] = useState("cash");

	return (
		<div dir="rtl" className="p-4 py-20 sm:p-6 bg-white mb-20  ">
			{/* Top navigation */}
			<div className="flex justify-between mt-20">
				<h1 className="text-xl font-semibold mb-6">الدفع</h1>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Order Details */}
				<div className="border rounded-lg p-4 sm:p-6 space-y-4 h-fit shadow-sm">
					<div className="flex items-center justify-between flex-wrap">
						<h2 className="text-lg font-semibold">تفاصيل الطلب</h2>
						<button className="text-gray-500 hover:text-red-500">
							<FiTrash />
						</button>
					</div>

					<div className="flex gap-2 flex-wrap justify-center">
						<input
							type="text"
							placeholder="أضف كود الخصم"
							className="flex-1 border-b border-gray-300 focus:outline-none p-2 text-sm"
						/>
						<button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg">
							فعل
						</button>
					</div>

					<div className="text-sm text-gray-700 space-y-1">
						<div className="flex justify-between">
							<span>عدد المنتجات</span>
							<span>4 منتجات</span>
						</div>
						<div className="flex justify-between">
							<span>إجمالى السعر</span>
							<span>2750 جنيه</span>
						</div>
						<div className="flex justify-between">
							<span>الخصم</span>
							<span>0 جنيه</span>
						</div>
						<div className="flex justify-between">
							<span>قيمة التوصيل</span>
							<span>70 جنيه</span>
						</div>
						<hr />
						<div className="flex justify-between font-bold">
							<span>الإجمالى</span>
							<span>2820 جنيه</span>
						</div>
					</div>
				</div>

				{/* Payment Form */}
				<div className="lg:col-span-2 border rounded-lg p-4 sm:p-6 space-y-6 shadow-sm">
					<div>
						<h2 className="text-lg font-semibold mb-4">معلومات الدفع</h2>

						<div className="flex justify-between mb-2">
							<span className="font-medium">البيانات الشخصية</span>
							<button className="text-yellow-500 text-sm">تسجيل الدخول</button>
						</div>

						{/* Personal Info */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
							{[
								{ icon: FiMail, placeholder: "الإيميل", type: "email" },
								{ icon: FiUser, placeholder: "الإسم الأول", type: "text" },
								{ icon: FiUser, placeholder: "الإسم الأخير", type: "text" },
								{ icon: FiPhone, placeholder: "رقم الهاتف", type: "tel" },
							].map((field, idx) => (
								<div className="relative" key={idx}>
									<field.icon className="absolute top-3 right-3 text-gray-400" />
									<input
										type={field.type}
										placeholder={field.placeholder}
										className="w-full border-b border-gray-300 focus:outline-none pr-10 pb-2"
									/>
								</div>
							))}
						</div>

						{/* Delivery */}
						<span className="font-medium block mb-2">التوصيل</span>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
							<div className="relative">
								<FiMapPin className="absolute top-3 right-3 text-gray-400" />
								<select className="w-full border-b border-gray-300 focus:outline-none pr-10 pb-2 bg-transparent">
									<option>المحافظة</option>
								</select>
							</div>
							<div className="relative">
								<MdLocationCity className="absolute top-3 right-3 text-gray-400" />
								<input
									type="text"
									placeholder="المدينة"
									className="w-full border-b border-gray-300 focus:outline-none pr-10 pb-2"
								/>
							</div>
						</div>
						<div className="relative mb-4">
							<FiMapPin className="absolute top-3 right-3 text-gray-400" />
							<input
								type="text"
								placeholder="العنوان بالتفصيل"
								className="w-full border-b border-gray-300 focus:outline-none pr-10 pb-2"
							/>
						</div>

						{/* Payment Method */}
						<span className="font-medium block mb-2">الدفع</span>
						<div className="flex flex-col sm:flex-row gap-4">
							{[
								{ id: "electronic", icon: "💳", label: "دفع إلكتروني" },
								{ id: "cash", icon: "💵", label: "كاش" },
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

						{/* Submit Button */}
						<button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-3 rounded-lg font-medium mt-6">
							اطلب الآن
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

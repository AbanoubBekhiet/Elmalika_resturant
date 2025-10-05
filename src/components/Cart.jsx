import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem";
import { Link, useLocation } from "react-router-dom";

export default function Cart({ isOpen, setIsOpen }) {
	const { cart, loading, isAuthenticated } = useContext(CartContext);
	const location = useLocation();
	if (!isOpen) return null;

	// Wrapper for overlay + cart panel
	const CartWrapper = ({ children }) => (
		<div className="fixed inset-0 z-50 flex justify-center md:justify-start">
			{/* Overlay */}
			<div
				className="absolute inset-0 bg-black/40"
				onClick={() => setIsOpen(false)}
			></div>

			{/* Cart Panel */}
			<div
				className="
          relative bg-white shadow-lg overflow-y-auto
          w-full max-h-[90vh] 
          rounded-b-2xl
          animate-slideDown
          top-0 left-0

          md:w-1/3 md:h-full
          md:rounded-none
          md:animate-slideInLeft
          md:top-20 md:left-20
        "
			>
				{children}
			</div>
		</div>
	);

	// Not logged in → show login/signup
	if (!isAuthenticated) {
		return (
			<CartWrapper>
				<div className="flex justify-between items-center p-4 border-b border-gray-200">
					<h2 className="font-bold text-2xl">السلة</h2>
					<button onClick={() => setIsOpen(false)}>
						<span className="flex text-1xl">
							<IoClose size={25} className="hover:text-red-700" /> الخروج
						</span>
					</button>
				</div>

				<div className="p-8 text-center" dir="rtl">
					<div className="text-6xl mb-4">🔒</div>
					<h3 className="text-lg font-bold text-gray-800 mb-2">
						يجب تسجيل الدخول أولاً
					</h3>
					<p className="text-gray-600 mb-6">
						لإضافة العناصر إلى السلة والقيام بعملية الشراء
					</p>
					<div className="space-y-3">
						<Link
							to="/login"
							state={{ from: location }}
							className="block w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition font-semibold"
							onClick={() => setIsOpen(false)}
						>
							تسجيل الدخول
						</Link>
						<Link
							to="/signup"
							state={{ from: location }}
							className="block w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition"
							onClick={() => setIsOpen(false)}
						>
							إنشاء حساب جديد
						</Link>
					</div>
				</div>
			</CartWrapper>
		);
	}

	// Logged in → show cart
	return (
		<CartWrapper>
			<div className="flex justify-between items-center p-4 border-b border-gray-200">
				<h2 className="font-bold text-2xl">السلة</h2>
				<button onClick={() => setIsOpen(false)}>
					<span className="flex text-1xl">
						<IoClose size={25} className="hover:text-red-700" /> الخروج
					</span>
				</button>
			</div>

			<div className="max-h-72 md:max-h-[60vh] overflow-y-auto">
				{loading ? (
					<div className="p-8 text-center text-gray-500" dir="rtl">
						<div className="text-4xl mb-4">⏳</div>
						<p>جارٍ تحميل السلة...</p>
					</div>
				) : cart.items.length === 0 ? (
					<div className="p-8 text-center text-gray-500" dir="rtl">
						<div className="text-4xl mb-4">🛒</div>
						<p>السلة فارغة</p>
						<p className="text-sm mt-2">أضف بعض المنتجات لتبدأ!</p>
					</div>
				) : (
					cart.items.map((item) => <CartItem key={item.id} item={item} />)
				)}
			</div>

			{cart.items.length > 0 && !loading && (
				<div className="p-4 border-t border-gray-200">
					<div className="flex justify-between mb-2 font-bold">
						<span>إجمالي المنتجات</span>
						<span>{cart.totalPrice} جنيه</span>
					</div>
					<div className="flex justify-between mb-2">
						<span>الشحن</span>
						<span>{cart.shipping} جنيه</span>
					</div>
					<div className="flex justify-between font-bold text-lg">
						<span>الإجمالي الكلي</span>
						<span>{cart.grandTotal} جنيه</span>
					</div>
					<Link to="/paying">
						<button onClick={()=>setIsOpen(!isOpen)} className="w-full mt-3 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition">
							الدفع
						</button>
					</Link>
				</div>
			)}
		</CartWrapper>
	);
}

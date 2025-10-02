// src/context/CartContext.jsx
import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	useMemo,
} from "react";
import axios from "axios";
import { UserContext } from "../context/AuthContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
	const [cart, setCart] = useState({
		items: [],
		itemsCount: 0,
		totalPrice: 0,
		shipping: 0,
		grandTotal: 0,
	});
	const { user, accessToken } = useContext(UserContext);
	const [loading, setLoading] = useState(false);

	const isAuthenticated = user && ["ADMIN", "USER"].includes(user.role);

	// ✅ Axios instance with auth
	const api = axios.create({
		baseURL: "https://api.queen.kitchen",
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		withCredentials: true,
	});

	// ✅ helper to recalc totals
	const calculateTotals = (items, shipping = 0) => {
		const totalPrice = items.reduce(
			(sum, item) =>
				sum +
				(item.size?.price || item.sizePrice || item.price) * item.quantity,
			0
		);

		return {
			items,
			itemsCount: items.length, // count unique items
			totalPrice,
			shipping,
			grandTotal: totalPrice + shipping,
		};
	};

	// ✅ Fetch cart once when authenticated
	useEffect(() => {
		const fetchCart = async () => {
			if (!isAuthenticated) {
				setCart(calculateTotals([], 0));
				return;
			}

			try {
				setLoading(true);
				const res = await api.get("/cart");

				// Expecting API to return { items: [...], shipping: ... }
				setCart(calculateTotals(res.data.items || [], res.data.shipping || 0));
			} catch (err) {
				console.error("Failed to fetch cart:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchCart();
	}, [isAuthenticated, accessToken]);

	// ✅ Add to cart (always use backend ID if available)
	const addToCart = async (product, sizeId, quantity, addonIds = []) => {
		try {
			const res = await api.post("/cart", {
				productId: product.id,
				sizeId,
				quantity,
				addonIds,
			});

			// Adjust this based on your API response structure
			const backendItem = res.data.item || res.data;

			const newItem = {
				id: backendItem?.id ?? Date.now(), // ✅ backend ID first, fallback if missing
				productId: product.id,
				product,
				sizeId,
				addonIds,
				quantity: backendItem?.quantity ?? quantity,
				size: product.sizes?.find((s) => s.id === sizeId),
			};

			setCart((prev) => {
				const existingIndex = prev.items.findIndex(
					(it) =>
						it.productId === product.id &&
						it.sizeId === sizeId &&
						JSON.stringify(it.addonIds) === JSON.stringify(addonIds)
				);

				let updatedItems;
				if (existingIndex > -1) {
					updatedItems = prev.items.map((it, idx) =>
						idx === existingIndex
							? { ...it, quantity: it.quantity + quantity }
							: it
					);
				} else {
					updatedItems = [...prev.items, newItem];
				}

				return calculateTotals(updatedItems, prev.shipping);
			});
		} catch (err) {
			console.error("Error adding to cart:", err);
		}
	};

	// ✅ Update quantity (with backend id)
	const updateQuantity = async (itemId, newQuantity) => {
		if (newQuantity < 1) newQuantity = 1;

		setCart((prev) => {
			const updatedItems = prev.items.map((it) =>
				it.id === itemId ? { ...it, quantity: newQuantity } : it
			);
			return calculateTotals(updatedItems, prev.shipping);
		});

		try {
			await api.patch(`/cart/${itemId}`, { quantity: newQuantity });
		} catch (err) {
			console.error("Error updating cart:", err);
		}
	};

	// ✅ Remove item
	const removeFromCart = async (itemId) => {
		setCart((prev) => {
			const updatedItems = prev.items.filter((it) => it.id !== itemId);
			return calculateTotals(updatedItems, prev.shipping);
		});

		try {
			await api.delete(`/cart/${itemId}`);
		} catch (err) {
			console.error("Error removing from cart:", err);
		}
	};

	// ✅ Clear cart
	const clearCart = async () => {
		setCart(calculateTotals([], 0));
		try {
			await api.delete("/cart");
		} catch (err) {
			console.error("Error clearing cart:", err);
		}
	};
	function clearCartLocally() {
		setCart({
			items: [],
			itemsCount: 0,
			totalPrice: 0,
			shipping: 0,
			grandTotal: 0,
		});
	}

	// ✅ Memoize to avoid unnecessary rerenders
	const value = useMemo(
		() => ({
			cart,
			addToCart,
			updateQuantity,
			removeFromCart,
			clearCart,
			loading,
			isAuthenticated,
			clearCartLocally
		}),
		[cart, loading, isAuthenticated]
	);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
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
	const isAuthenticated =
		user && (user.role === "ADMIN" || user.role === "USER");

	// Prepare Authorization header
	const authConfig = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};
	useEffect(() => {
		const fetchCart = async () => {
			if (isAuthenticated) {
				try {
					setLoading(true);
					const res = await axios.get("https://api.queen.kitchen/cart", {
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
						withCredentials: true,
					});
					setCart(res.data); // ✅ Full cart object
				} catch (err) {
					console.error("Failed to fetch cart:", err);
				} finally {
					setLoading(false);
				}
			} else {
				setCart({
					items: [],
					itemsCount: 0,
					totalPrice: 0,
					shipping: 0,
					grandTotal: 0,
				});
			}
		};

		fetchCart();
	}, [isAuthenticated, accessToken, setCart]);

	// Add item to cart
	const addToCart = async (item) => {
		try {
			await axios.post(
				`/cart`,
				{
					productId: item.id,
					quantity: 1,
				},
				authConfig
			);

			setCart((prev) => {
				const updatedItems = [...prev.items, { ...item, quantity: 1 }];
				const totalPrice = updatedItems.reduce(
					(total, it) => total + (it.sizePrice || it.price) * it.quantity,
					0
				);
				return {
					...prev,
					items: updatedItems,
					itemsCount: updatedItems.length,
					totalPrice,
					grandTotal: totalPrice + prev.shipping,
				};
			});
		} catch (err) {
			console.error("Error adding to cart:", err);
		}
	};

	// Update quantity
	const updateQuantity = async (itemId, newQuantity) => {
		if (newQuantity < 1) newQuantity = 1;

		try {
			await axios.patch(
				`/cart/${itemId}`,
				{ quantity: newQuantity },
				authConfig
			);

			setCart((prev) => {
				const updatedItems = prev.items.map((item) =>
					item.id === itemId ? { ...item, quantity: newQuantity } : item
				);

				const totalPrice = updatedItems.reduce(
					(total, item) =>
						total + (item.sizePrice || item.price) * item.quantity,
					0
				);

				return {
					...prev,
					items: updatedItems,
					totalPrice,
					grandTotal: totalPrice + prev.shipping,
				};
			});
		} catch (err) {
			console.error("Error updating cart:", err);
		}
	};

	// Remove from cart
	const removeFromCart = async (itemId) => {
		try {
			await axios.delete(`/cart/${itemId}`, authConfig);

			setCart((prev) => {
				const updatedItems = prev.items.filter((item) => item.id !== itemId);
				const totalPrice = updatedItems.reduce(
					(total, item) =>
						total + (item.sizePrice || item.price) * item.quantity,
					0
				);
				return {
					...prev,
					items: updatedItems,
					itemsCount: updatedItems.length,
					totalPrice,
					grandTotal: totalPrice + prev.shipping,
				};
			});
      
		} catch (err) {
			console.error("Error removing from cart:", err);
		}
	};

	// Clear cart
	const clearCart = async () => {
		try {
			// Optional backend call:
			// await axios.delete("/cart", authConfig);

			setCart({
				items: [],
				itemsCount: 0,
				totalPrice: 0,
				shipping: 0,
				grandTotal: 0,
			});
		} catch (err) {
			console.error("Error clearing cart:", err);
		}
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				setCart,
				addToCart,
				updateQuantity,
				removeFromCart,
				clearCart,
				loading,
				isAuthenticated,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { UserProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	<UserProvider>
		<CartProvider>
			<ToastContainer position="top-center" autoClose={3000} />
			<App />
		</CartProvider>
	</UserProvider>
	// </React.StrictMode>
);

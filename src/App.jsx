import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/customer/Home";
import ReadyForEat from "./pages/customer/ReadyForEat";
import ProductDetails from "./components/ProductDetails";
import ReadyForCook from "./pages/customer/ReadyForCook";
import DishOfTheDay from "./pages/customer/DishOfTheDay";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/Login";
import ForgetPassword from "./components/authentication/ForgetPassword";
import NewPassword from "./components/authentication/NewPassword";
import OTP from "./components/authentication/OTP";
import Profile from "./pages/customer/Profile";
import Paying from "./pages/customer/Paying";
import Dashboard from "./pages/dashboard/Dashboard";
import Orders from "./pages/dashboard/Orders";
import Products from "./pages/dashboard/Products";
import AddProduct from "./components/dashboard/products/AddProduct";
import Catigories from "./pages/dashboard/Catigories";
import Options from "./pages/dashboard/Options";
import ProtectedAdminLayout from "./layouts/ProtectedAdminLayout";
import ProtectedUserLayout from "./layouts/ProtectedUserLayout";
import { ToastContainer } from "react-toastify";
import PaymentCallback from "./pages/customer/PaymentCallback";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route path="/forget-password" element={<ForgetPassword />} />
					<Route path="/otp" element={<OTP />} />
					<Route path="/new-password" element={<NewPassword />} />
					<Route element={<MainLayout />}>
						<Route element={<ProtectedUserLayout />}>
							<Route path="/profile" element={<Profile />} />
							<Route path="/paying" element={<Paying />} />
							<Route path="/paymob/callback" element={<PaymentCallback />} />
						</Route>
						<Route path="/" element={<Home />} />
						<Route path="/ready-to-eat" element={<ReadyForEat />} />
						<Route path="/ready-to-cook" element={<ReadyForCook />} />
						<Route path="/dish-of-the-day" element={<DishOfTheDay />} />
						<Route
							path="/product/:productId/:categoryId"
							element={<ProductDetails />}
						/>
					</Route>
					<Route element={<ProtectedAdminLayout />}>
						<Route element={<DashboardLayout />}>
							<Route path="dashboard" element={<Dashboard />} index />
							<Route path="dashboard/orders" element={<Orders />} />
							<Route path="dashboard/products" element={<Products />} />
							<Route path="dashboard/dish-of-the-day" element={<DishOfTheDay />} />
							<Route path="dashboard/catigories" element={<Catigories />} />
							<Route path="dashboard/options" element={<Options />} />
							<Route path="dashboard/add-product" element={<AddProduct />} />
						</Route>
					</Route>
					<Route path="*" element={"not found"} />
				</Routes>
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
				/>{" "}
			</BrowserRouter>
		</>
	);
}

export default App;

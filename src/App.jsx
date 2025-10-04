import React, { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import ProductDetails from "./components/ProductDetails";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/Login";
import ForgetPassword from "./components/authentication/ForgetPassword";
import NewPassword from "./components/authentication/NewPassword";
import OTP from "./components/authentication/OTP";
import AddProduct from "./components/dashboard/products/AddProduct";
import ProtectedAdminLayout from "./layouts/ProtectedAdminLayout";
import ProtectedUserLayout from "./layouts/ProtectedUserLayout";
import { ToastContainer } from "react-toastify";
import Loader from "./loaders/Loader";
const Home = lazy(() => import("./pages/customer/Home"));
const ReadyForEat = lazy(() => import("./pages/customer/ReadyForEat"));
const ReadyForCook = lazy(() => import("./pages/customer/ReadyForCook"));
const DishOfTheDay = lazy(() => import("./pages/customer/DishOfTheDay"));
const Profile = lazy(() => import("./pages/customer/Profile"));
const Paying = lazy(() => import("./pages/customer/Paying"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Orders = lazy(() => import("./pages/dashboard/Orders"));
const Products = lazy(() => import("./pages/dashboard/Products"));
const Catigories = lazy(() => import("./pages/dashboard/Catigories"));
const Options = lazy(() => import("./pages/dashboard/Options"));
const PaymentCallback = lazy(() => import("./pages/customer/PaymentCallback"));

function App() {
	return (
		<>
			<BrowserRouter>
				<Suspense fallback={<Loader />}>
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
								<Route
									path="dashboard/dish-of-the-day"
									element={<DishOfTheDay />}
								/>
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
				</Suspense>
			</BrowserRouter>
		</>
	);
}

export default App;

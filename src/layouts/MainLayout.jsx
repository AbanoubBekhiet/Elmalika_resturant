import { Outlet } from "react-router-dom";
import Footer from "../components/sharedComponents/Footer";
import React from "react";
import CustomerNavbar from "../components/sharedComponents/CustomerNavbar";
function MainLayout() {
	return (
		<div>
			<CustomerNavbar />
			<Outlet />
			<Footer />
		</div>
	);
}

export default MainLayout;

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sharedComponents/Sidebar";
import DashboardNavbar from "../components/sharedComponents/DashboardNavbar";

function Dashboard() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className="bg-[#fafaf0] min-h-dvh flex flex-col">
			{/* Navbar with toggle button */}
			<div>
				<DashboardNavbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
			</div>
			<div className="flex flex-1 flex-row-reverse">
				{/* Sidebar Desktop */}
				<div className="hidden lg:block ">
					<Sidebar />
				</div>

				{/* Sidebar Mobile */}
				{isSidebarOpen && (
					<div className="fixed top-0 right-0 h-full  bg-white shadow-lg z-50 lg:hidden">
						<Sidebar />
					</div>
				)}

				{/* Content */}
				<div className="flex-1 p-4 overflow-y-auto ">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;

import React, { useState } from "react";
import ProfileInfoCard from "../../components/dashboard/options/ProfileInfoCard";
import ContactDetailsCard from "../../components/dashboard/options/ContactDetailsCard";
import Taps from "./../../components/sharedComponents/Taps";
import PrivacyAndSafety from "../../components/dashboard/options/PrivacyAndSafety";
import { ToastContainer } from "react-toastify";

const tabs = [
	// { id: 1, label: "الحساب الشخصي" },
	{ id: 1, label: "الامان والخصوصية" },
	{ id: 2, label: "الاشعارات" },
];

function Options() {
	const [selectedTab, setSelectedTab] = useState(1);

	const renderContent = () => {
		switch (selectedTab) {
			// case 1:
			// 	return (
			// 		<>
			// 			<ProfileInfoCard />
			// 			<ContactDetailsCard />
			// 		</>
			// 	);
			case 1:
				return <PrivacyAndSafety />;
			case 2:
				return <div>اشعارات (Notifications Component Here)</div>;
			default:
				return null;
		}
	};

	return (
		<div dir="rtl">
			<Taps
				tabs={tabs}
				selectedTab={selectedTab}
				onTabChange={setSelectedTab}
			/>
			{renderContent()}
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

export default Options;

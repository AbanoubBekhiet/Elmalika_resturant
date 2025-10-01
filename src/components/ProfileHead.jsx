import { FaPhoneAlt } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import { VscFileSubmodule } from "react-icons/vsc";
import { ImProfile } from "react-icons/im";
import React, { useContext, useEffect, useState } from "react";
import defaultPerson from "./../assets/defaultPerson.jpg";
import Taps from "./sharedComponents/Taps";
import { UserContext } from "../context/AuthContext";
import axios from "axios";
import Loader from "../loaders/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiEdit } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

function ProfileHead({ setTap, tap }) {
	const tabs = [
		{ id: 1, label: "الطلبات السابقة" },
		{ id: 2, label: "المفضل" },
	];
	const { accessToken } = useContext(UserContext);
	const [loading, setLoading] = useState(false);
	const [userData, setUserData] = useState({});
	const [userAddresses, setUserAddresses] = useState([]);
	const [defaultAddress, setDefaultAddress] = useState({});
	const [showEditForm, setShowEditForm] = useState(false);
	const [showAddAddressForm, setShowAddAddressForm] = useState(false);
	const [editFormData, setEditFormData] = useState({
		name: "",
		phone: "",
		email: ""
	});
	const [addressFormData, setAddressFormData] = useState({
		city: "",
		street: "",
		building: "",
		floor: "",
		apartment: "",
		note: ""
	});
	const API_BASE_URL = "https://api.queen.kitchen";

	// ✅ Fetch user profile
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				setLoading(true);
				const res = await axios.get(`${API_BASE_URL}/users/me`, {
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
						...(accessToken && { Authorization: `Bearer ${accessToken}` }),
					},
				});
				setUserData(res.data);
				setEditFormData({
					name: res.data.name || "",
					phone: res.data.phone || "",
					email: res.data.email || ""
				});
			} catch (error) {
				console.error("Error fetching user data:", error);
				setUserData({});
				toast.error("فشل في تحميل بيانات المستخدم");
			} finally {
				setLoading(false);
			}
		};

		if (accessToken) {
			fetchUserData();
		}
	}, [accessToken]);

	// ✅ Fetch addresses
	useEffect(() => {
		const fetchUserAddresses = async () => {
			try {
				setLoading(true);
				const res = await axios.get(`${API_BASE_URL}/addresses`, {
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
						...(accessToken && { Authorization: `Bearer ${accessToken}` }),
					},
				});
				setUserAddresses(res.data);
			} catch (error) {
				console.error("Error fetching user addresses:", error);
				setUserAddresses([]);
				toast.error("فشل في تحميل العناوين");
			} finally {
				setLoading(false);
			}
		};

		if (accessToken) {
			fetchUserAddresses();
		}
	}, [accessToken]);

	// ✅ Set default address
	useEffect(() => {
		if (userAddresses.length > 0) {
			const def = userAddresses.find((address) => address.isDefault === true);
			setDefaultAddress(def || {});
		}
	}, [userAddresses]);

	// 🗑️ Delete address
	const handleDelete = async (id) => {
		try {
			const address = userAddresses.find((addr) => addr.id === id);
			if (address?.isDefault) {
				toast.error("لا يمكن حذف العنوان الافتراضي");
				return;
			}

			await axios.delete(`${API_BASE_URL}/addresses/${id}`, {
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
					...(accessToken && { Authorization: `Bearer ${accessToken}` }),
				},
			});
			setUserAddresses((prev) => prev.filter((addr) => addr.id !== id));
			toast.success("تم حذف العنوان بنجاح");
		} catch (error) {
			console.error("Error deleting address:", error);
			toast.error("فشل في حذف العنوان");
		}
	};

	// ⭐ Make default address
	const handleMakeDefault = async (id) => {
		try {
			await axios.patch(
				`${API_BASE_URL}/addresses/${id}`,
				{ isDefault: true },
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
						...(accessToken && { Authorization: `Bearer ${accessToken}` }),
					},
				}
			);
			setUserAddresses((prev) =>
				prev.map((addr) =>
					addr.id === id
						? { ...addr, isDefault: true }
						: { ...addr, isDefault: false }
				)
			);
			toast.success("تم تعيين العنوان كافتراضي");
		} catch (error) {
			console.error("Error making default:", error);
			toast.error("فشل في تعيين العنوان كافتراضي");
		}
	};

	// ✏️ Update user profile (FIXED ✅ sending JSON not FormData)
	const handleUpdateProfile = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const res = await axios.patch(
				`${API_BASE_URL}/users/me`,
				{
					name: editFormData.name,
					phone: editFormData.phone
				},
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
						...(accessToken && { Authorization: `Bearer ${accessToken}` }),
					},
				}
			);

			setUserData(res.data);
			setShowEditForm(false);
			toast.success("تم تحديث الملف الشخصي بنجاح");
		} catch (error) {
			console.error("Error updating profile:", error);
			toast.error("فشل في تحديث الملف الشخصي");
		} finally {
			setLoading(false);
		}
	};

	// ➕ Add new address
	const handleAddAddress = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const res = await axios.post(`${API_BASE_URL}/addresses`, addressFormData, {
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
					...(accessToken && { Authorization: `Bearer ${accessToken}` }),
				},
			});
			
			setUserAddresses((prev) => [...prev, res.data]);
			setShowAddAddressForm(false);
			setAddressFormData({
				city: "",
				street: "",
				building: "",
				floor: "",
				apartment: "",
				note: ""
			});
			toast.success("تم إضافة العنوان بنجاح");
		} catch (error) {
			console.error("Error adding address:", error);
			toast.error("فشل في إضافة العنوان");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="p-5 sm:p-10" dir="rtl">
					{/* Header */}
					<div className="flex justify-between flex-row-reverse mt-10 sm:mt-20">
						<span className="mr-4 sm:mr-10 text-lg sm:text-xl">
							الملف الشخصي
						</span>
					</div>

					{/* Profile Section */}
					<div className="relative flex flex-col md:flex-row m-5 p-5 sm:p-10 border-gray-300 border-dashed border-2 rounded-2xl justify-evenly items-center md:items-start md:justify-between gap-6">
						{/* Edit and Add Address Icons */}
						<div className="absolute top-2 left-2 flex gap-2 text-2xl sm:text-3xl">
							<div 
								className="cursor-pointer hover:text-[#f5c837] transition-colors p-2"
								onClick={() => setShowEditForm(true)}
							>
								<CiEdit />
							</div>
							<div 
								className="cursor-pointer hover:bg-[#fbfcc4] transition-colors text-2xl bg-[#f5c837] p-2 rounded-2xl"
								onClick={() => setShowAddAddressForm(true)}
							>
								اضف عنوان
							</div>
						</div>

						{/* Profile Image + Name */}
						<div className="flex flex-col w-28 sm:w-40 justify-center text-center">
							<img
								src={defaultPerson}
								alt="defaultPerson"
								className="w-full rounded-full"
							/>
							<span className="mt-2 text-sm sm:text-base">{userData.name}</span>
						</div>

						{/* Address Section */}
						<div className="flex flex-col text-sm sm:text-base w-full md:w-1/3">
							<span className="font-semibold mb-1">العنوان الافتراضي</span>
							<div className="space-y-1 text-gray-600">
								<div className="flex">
									<ImProfile className="mt-0.5 ml-2" />
									<span>الشارع: {defaultAddress?.street}</span>
								</div>
								<div className="flex">
									<VscFileSubmodule className="mt-0.5 ml-2" />
									<span>المحافظة: {defaultAddress?.city}</span>
								</div>
								<div className="ml-6">
									<div>المبني: {defaultAddress?.building}</div>
									<div>الطابق: {defaultAddress?.floor}</div>
									<div>الشقة: {defaultAddress?.apartment}</div>
								</div>
							</div>
						</div>

						{/* Phone */}
						<div className="flex flex-col text-sm sm:text-base">
							<span className="font-semibold">الهاتف</span>
							<p className="flex text-gray-400">
								<span className="ml-3">{userData.phone}</span>
								<FaPhoneAlt className="mt-0.5" />
							</p>
						</div>

						{/* Email + Addresses */}
						<div className="flex flex-col w-full md:w-1/3 text-sm sm:text-base">
							<div>
								<span className="font-semibold">البريد الالكتروني</span>
								<p className="flex text-gray-400">
									<span className="ml-3">{userData.email}</span>
									<FaRegEnvelope className="mt-0.5" />
								</p>
							</div>

							<div className="mt-3">
								<h3 className="text-end font-semibold">عناوينك</h3>
								<div className="my-2 h-40 overflow-y-auto p-2 rounded border">
									{userAddresses.map((address) => (
										<div
											key={address.id}
											className={`flex flex-col sm:flex-row sm:justify-between sm:items-center border p-2 my-2 rounded text-xs sm:text-sm ${
												address.isDefault ? "bg-yellow-100" : ""
											}`}
										>
											<span className="mb-2 sm:mb-0">
												{`${address.city}, ${address.street}, مبنى ${address.building}, شقة ${address.apartment}`}
												{address.isDefault && " ⭐ (افتراضي)"}
											</span>
											<div className="flex gap-2">
												{!address.isDefault && (
													<button
														onClick={() => handleMakeDefault(address.id)}
														className="px-2 py-1 bg-yellow-400 text-xs rounded"
													>
														اجعله افتراضي
													</button>
												)}
												{!address.isDefault && (
													<button
														onClick={() => handleDelete(address.id)}
														className="px-2 py-1 bg-red-500 text-white text-xs rounded"
													>
														حذف
													</button>
												)}
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Tabs */}
					<div className="flex flex-col align-top mt-5" dir="rtl">
						<Taps tabs={tabs} onTabChange={setTap} selectedTab={tap} />
					</div>

					{/* Edit Profile Modal */}
					{showEditForm && (
						<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
							<div className="bg-white p-6 rounded-lg w-96 max-w-90vw" dir="rtl">
								<div className="flex justify-between items-center mb-4">
									<h2 className="text-xl font-bold">تعديل الملف الشخصي</h2>
									<button
										onClick={() => setShowEditForm(false)}
										className="text-gray-500 hover:text-gray-700"
									>
										<IoMdClose size={24} />
									</button>
								</div>
								<form onSubmit={handleUpdateProfile}>
									<div className="mb-4">
										<label className="block text-sm font-medium mb-2">الاسم</label>
										<input
											type="text"
											value={editFormData.name}
											onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
											className="w-full p-2 border rounded-md"
											required
										/>
									</div>
									<div className="mb-4">
										<label className="block text-sm font-medium mb-2">الهاتف</label>
										<input
											type="tel"
											value={editFormData.phone}
											onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
											className="w-full p-2 border rounded-md"
											required
										/>
									</div>
									<div className="flex gap-2">
										<button
											type="submit"
											className="flex-1 bg-[#e6b700] text-white py-2 rounded-md hover:bg-[#fbfcc4] hover:text-black"
										>
											حفظ التغييرات
										</button>
										<button
											type="button"
											onClick={() => setShowEditForm(false)}
											className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
										>
											إلغاء
										</button>
									</div>
								</form>
							</div>
						</div>
					)}

					{/* Add Address Modal */}
					{showAddAddressForm && (
						<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
							<div className="bg-white p-6 rounded-lg w-96 max-w-90vw max-h-90vh overflow-y-auto" dir="rtl">
								<div className="flex justify-between items-center mb-4">
									<h2 className="text-xl font-bold">إضافة عنوان جديد</h2>
									<button
										onClick={() => setShowAddAddressForm(false)}
										className="text-gray-500 hover:text-gray-700"
									>
										<IoMdClose size={24} />
									</button>
								</div>
								<form onSubmit={handleAddAddress}>
									<div className="mb-4">
										<label className="block text-sm font-medium mb-2">المحافظة</label>
										<input
											type="text"
											value={addressFormData.city}
											onChange={(e) => setAddressFormData({...addressFormData, city: e.target.value})}
											className="w-full p-2 border rounded-md"
											required
										/>
									</div>
									<div className="mb-4">
										<label className="block text-sm font-medium mb-2">الشارع</label>
										<input
											type="text"
											value={addressFormData.street}
											onChange={(e) => setAddressFormData({...addressFormData, street: e.target.value})}
											className="w-full p-2 border rounded-md"
											required
										/>
									</div>
									<div className="mb-4">
										<label className="block text-sm font-medium mb-2">المبنى</label>
										<input
											type="text"
											value={addressFormData.building}
											onChange={(e) => setAddressFormData({...addressFormData, building: e.target.value})}
											className="w-full p-2 border rounded-md"
											required
										/>
									</div>
									<div className="mb-4">
										<label className="block text-sm font-medium mb-2">الطابق</label>
										<input
											type="text"
											value={addressFormData.floor}
											onChange={(e) => setAddressFormData({...addressFormData, floor: e.target.value})}
											className="w-full p-2 border rounded-md"
											required
										/>
									</div>
									<div className="mb-4">
										<label className="block text-sm font-medium mb-2">الشقة</label>
										<input
											type="text"
											value={addressFormData.apartment}
											onChange={(e) => setAddressFormData({...addressFormData, apartment: e.target.value})}
											className="w-full p-2 border rounded-md"
											required
										/>
									</div>
									<div className="mb-4">
										<label className="block text-sm font-medium mb-2">ملاحظات (اختياري)</label>
										<textarea
											value={addressFormData.note}
											onChange={(e) => setAddressFormData({...addressFormData, note: e.target.value})}
											className="w-full p-2 border rounded-md"
											rows="3"
										/>
									</div>
									<div className="flex gap-2">
										<button
											type="submit"
											className="flex-1 bg-[#e6b700] text-white py-2 rounded-md hover:bg-[#fbfcc4] hover:text-black"
										>
											إضافة العنوان
										</button>
										<button
											type="button"
											onClick={() => setShowAddAddressForm(false)}
											className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
										>
											إلغاء
										</button>
									</div>
								</form>
							</div>
						</div>
					)}
				</div>
			)}
		</>
	);
}

export default ProfileHead;

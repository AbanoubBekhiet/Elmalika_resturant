import React from "react";
import InputField from "./../../sharedComponents/InputField";
import image from "./../../../assets/product.jpg";
import { FaRegEdit } from "react-icons/fa";

function ProfileInfoCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      {/* Header with avatar & title */}
      <div className="flex flex-col mb-6 items-start">
        <h2 className="font-bold text-gray-800">معلومات الملف الشخصي</h2>
        <div className="flex  items-center">
          <img
            src={image}
            alt="profile"
            className="w-20 h-20 rounded-full border mb-2 ml-6 mt-2 object-cover"
          />
          <button className="border  text-sm rounded-md px-3 py-1 hover:bg-gray-100 flex">
            <span>تغيير الصورة</span><span className="pr-4"><FaRegEdit /></span>
          </button>
        </div>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-2 gap-4 text-right">
        <InputField label="الاسم الاول" placeholder="محمد" />
        <InputField label="الاسم الاخر" placeholder="كمال" />
        <InputField label="الايميل" placeholder="mas956x6@gmail.com" />
        <InputField label="تاريخ الميلاد" type="date" placeholder="2001-04-29" />
        <InputField label="Gender" placeholder="ذكر" />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-start gap-3 mt-6">
        <button className="px-4 py-2 rounded-md bg-yellow-400 text-white">
          تحديث
        </button>
        <button className="px-4 py-2 rounded-md bg-white text-yellow-400 border border-yellow-400">
          إلغاء
        </button>
      </div>
    </div>
  );
}

export default ProfileInfoCard;
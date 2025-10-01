import React from "react";
import InputField from "../../sharedComponents/InputField";
import { FaRegEdit } from "react-icons/fa";

function ContactDetailsCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-gray-800">تفاصيل الاتصال</h2>
        <button className=" border rounded-md px-3 py-1 text-sm hover:bg-gray-100 flex">
          <FaRegEdit /> <span className="pr-4">تعديل</span>
        </button>
      </div>

      {/* Form */}
      <div className="grid grid-cols-3 gap-4">
        <InputField label="رقم الهاتف" placeholder="+20 011000200190" />
        <InputField label="العنوان" placeholder="22 شارع محرم، حلوان" />
        <InputField label="المدينه" placeholder="القاهرة" />
      </div>
    </div>
  );
}

export default ContactDetailsCard;
import React from "react";

const OrdersTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: "all", label: "كل الطلبات" },
    { key: "DELIVERED", label: "تم التوصيل" },
    { key: "ON_THE_WAY", label: "جاري التوصيل" },
    { key: "PREPARING", label: "جاري التجهيز" },
    { key: "CANCELLED", label: "ملغي" },
    { key: "PENDING", label: "قيد الانتظار" },
    { key: "PAID", label: "تم الدفع" },
    { key: "UNPAID", label: "لم يدفع" },
  ];

  return (
    <div className="border rounded-lg bg-white flex overflow-hidden w-full mb-12">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`flex-1 text-center py-3 text-sm font-medium transition-all
            ${
              activeTab === tab.key
                ? "bg-yellow-50 text-yellow-600"
                : "text-gray-600 hover:bg-gray-50"
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default OrdersTabs;

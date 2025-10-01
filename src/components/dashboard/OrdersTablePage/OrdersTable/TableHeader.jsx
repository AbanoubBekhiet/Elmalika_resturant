import React from "react";

const TableHeader = () => {
  const headers = [
    { key: "products", label: "المنتجات" },
    { key: "customer", label: "العميل" },
    { key: "price", label: "السعر" },
    { key: "payment status", label: "حالة الدفع" },
    { key: "payment method", label: "طريقة الدفع" },
    { key: "date", label: "التاريخ" },
    { key: "status", label: "الحالة" },
    { key: "actions", label: "اجراء" },
  ];

  return (
    <thead className="bg-gray-100 text-gray-600 text-sm border-b border-gray-300">
      <tr>
        {headers.map((col) => (
          <th
            key={col.key}
            className={`px-4 py-3 text-right whitespace-nowrap font-medium  border-r border-gray-300`}
          >
            <div className="flex items-center justify-end gap-2">
              <span>{col.label}</span>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
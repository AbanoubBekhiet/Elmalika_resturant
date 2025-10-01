import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom'; // or use 'next/link' if using Next.js

const MostSellingStatistics = () => {
  const data = [
    { name: 'حاضر للأكل', value: 280, percentage: 62.5 },
    { name: 'حاضر للطبخ', value: 120, percentage: 25 },
    { name: 'طبخ اليوم', value: 60, percentage: 12.5 },
  ];

  const COLORS = ['#facc15', '#fde68a', '#111827'];
  const total = 460;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">الاقسام الاكثر طلبا</h2>
        <Link 
          to="/more" 
          className="text-blue-500 text-sm hover:underline flex items-center gap-1"
        >
          عرض المزيد
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      </div>

      {/* Donut Chart */}
      <div className="relative h-48 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              startAngle={90}
              endAngle={450}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-sm text-gray-500">اجمالي الطلبات</span>
          <span className="text-3xl font-bold text-gray-800">{total}</span>
        </div>
      </div>

      {/* Table Headers */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">القسم</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-500 font-medium">عدد الطلبات</span>
          <span className="text-xs text-gray-500 font-medium mr-1">النسبة</span>
        </div>
      </div>

      {/* Legend with data */}
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span 
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: COLORS[index] }}
              ></span>
              <span className="text-sm text-gray-700">{item.name}</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-gray-800 w-10 text-center">{item.value}</span>
              <span className="text-sm text-gray-600 w-12 text-left">%{item.percentage}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostSellingStatistics;
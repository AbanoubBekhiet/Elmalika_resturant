import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';

const TotalIncome = () => {
  const data = [
    { month: 'JAN', monthArabic: 'يناير', orders: 3, revenue: 2 },
    { month: 'FEB', monthArabic: 'فبراير', orders: 6, revenue: 4 },
    { month: 'MAR', monthArabic: 'مارس', orders: 5, revenue: 7 },
    { month: 'APR', monthArabic: 'أبريل', orders: 8, revenue: 6 },
    { month: 'MAY', monthArabic: 'مايو', orders: 10, revenue: 8 },
    { month: 'JUN', monthArabic: 'يونيو', orders: 7, revenue: 5 },
    { month: 'JUL', monthArabic: 'يوليو', orders: 6, revenue: 4 },
    { month: 'AUG', monthArabic: 'أغسطس', orders: 8, revenue: 6 },
    { month: 'SEP', monthArabic: 'سبتمبر', orders: 4, revenue: 3 },
    { month: 'OCT', monthArabic: 'أكتوبر', orders: 2, revenue: 4 },
    { month: 'NOV', monthArabic: 'نوفمبر', orders: 6, revenue: 7 },
    { month: 'DEC', monthArabic: 'ديسمبر', orders: 8, revenue: 9 },
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload.find(p => p.dataKey === 'orders');
      return (
        <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm relative">
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
          <p className="font-medium">{`${data?.value || 0}k`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">اجمالي الدخل</h2>
        <button className="text-blue-500 text-sm hover:underline flex items-center gap-1">
          اسبوعي
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 ">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <span className="text-sm text-gray-600">اجمالي الدخل</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-800"></div>
          <span className="text-sm text-gray-600">اجمالي الطلبات</span>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="yellowGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fef3c7" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="#fef3c7" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="grayGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f3f4f6" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="#f3f4f6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              interval={0}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              domain={[0, 12]}
              ticks={[0, 2, 4, 6, 8, 10, 12]}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Revenue Line (Yellow) with area fill */}
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#facc15"
              strokeWidth={3}
              dot={false}
              fill="url(#yellowGradient)"
              activeDot={{ 
                r: 6, 
                fill: '#facc15',
                stroke: '#fff',
                strokeWidth: 2
              }}
            />
            
            {/* Orders Line (Black/Gray) with area fill */}
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#374151"
              strokeWidth={3}
              dot={false}
              fill="url(#grayGradient)"
              activeDot={{ 
                r: 6, 
                fill: '#374151',
                stroke: '#fff',
                strokeWidth: 2
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TotalIncome;
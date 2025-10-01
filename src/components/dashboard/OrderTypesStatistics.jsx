import React from 'react';

const OrderTypesStatistics = () => {
  const data = [
    { 
      name: 'مشويات', 
      value: 70, 
      percentage: 45, 
      icon: '🍖',
      color: 'bg-yellow-400',
      bgColor: 'bg-yellow-50'
    },
    { 
      name: 'مقبلات', 
      value: 34, 
      percentage: 13, 
      icon: '🥗',
      color: 'bg-orange-400',
      bgColor: 'bg-orange-50'
    },
    { 
      name: 'مؤكولات بحريه', 
      value: 50, 
      percentage: 30, 
      icon: '🐟',
      color: 'bg-blue-400',
      bgColor: 'bg-blue-50'
    },
  ];

  // Find the maximum value for scaling the bars
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">انواع الطلبات</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Statistics List */}
      <div className="space-y-5">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            {/* Value, Percentage and Progress Bar Row */}
            <div className="flex items-center gap-3">
              {/* Value */}
              <span className="text-lg font-bold text-gray-800 w-8">{item.value}</span>
              
              {/* Progress Bar Container */}
              <div className="flex-1 relative">
                {/* Background Bar */}
                <div className="bg-gray-200 rounded-full h-8 overflow-hidden">
                  {/* Filled Bar */}
                  <div 
                    className={`h-full ${item.color} rounded-full transition-all duration-500 relative`}
                    style={{ width: `${(item.value / maxValue) * 100}%` }}
                  >
                    {/* Percentage Text Inside Bar */}
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs font-medium">
                      %{item.percentage}
                    </span>
                  </div>
                </div>
              </div>

              {/* Icon */}
              <div className={`w-10 h-10 rounded-lg ${item.bgColor} flex items-center justify-center flex-shrink-0`}>
                <span className="text-lg">{item.icon}</span>
              </div>
            </div>
            
            {/* Label */}
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-12">{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTypesStatistics;
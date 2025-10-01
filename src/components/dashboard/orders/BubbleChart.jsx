import React from "react";

const data = [
  { value: 50, label: "مكتملة", color: "#FACC15" },   // yellow
  { value: 30, label: "جاري التوصيل", color: "#374151" }, // dark gray
  { value: 20, label: "ملغية", color: "#D1D5DB" },     // light gray
];

const BubbleChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow text-center h-full flex flex-col items-center justify-center">
      <h3 className="mb-6 font-bold">عرض الطلبات</h3>

      {/* Bubble Container */}
      <div className="relative flex items-center justify-center w-[260px] h-[180px] mb-6">
        {/* Yellow Bubble */}
        <div
          className="absolute flex items-center justify-center rounded-full text-white font-bold"
          style={{
            backgroundColor: data[0].color,
            width: `${data[0].value * 3}px`,
            height: `${data[0].value * 3}px`,
            top: "0px",
            left: "70px",
          }}
        >
          {data[0].value}%
        </div>

        {/* Dark Gray Bubble */}
        <div
          className="absolute flex items-center justify-center rounded-full text-white font-bold"
          style={{
            backgroundColor: data[1].color,
            width: `${data[1].value * 3}px`,
            height: `${data[1].value * 3}px`,
            bottom: "0px",
            right: "40px",
          }}
        >
          {data[1].value}%
        </div>

        {/* Light Gray Bubble */}
        <div
          className="absolute flex items-center justify-center rounded-full text-black font-bold"
          style={{
            backgroundColor: data[2].color,
            width: `${data[2].value * 3}px`,
            height: `${data[2].value * 3}px`,
            bottom: "0px",
            left: "30px",
          }}
        >
          {data[2].value}%
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-6 justify-center text-sm">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: d.color }}
            ></span>
            <span>{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BubbleChart;
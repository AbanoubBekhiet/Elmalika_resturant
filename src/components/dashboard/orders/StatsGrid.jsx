import React from "react";
import StatCard from "./StatCard";
import { FaClipboardCheck, FaClipboardList, FaFileAlt, FaBox } from "react-icons/fa";

const StatsGrid = () => {
  return (
    <div className="bg-white  rounded-lg p-6 h-full shadow"> 
      {/* h-full here makes StatsGrid panel stretch like charts */}
      <div className="grid grid-cols-2 grid-rows-2 gap-6 h-full ">
        <StatCard icon={<FaClipboardList size={50}/>} value="460" label="إجمالي الطلبات" />
        <StatCard icon={<FaClipboardCheck size={50}/>} value="400" label="طلبات مكتملة" />
        <StatCard icon={<FaFileAlt size={50}/>} value="56" label="طلبات ملغية" />
        <StatCard icon={<FaBox size={50}/>} value="25" label="قيد التحضير" />
      </div>
    </div>
  );
};

export default StatsGrid;
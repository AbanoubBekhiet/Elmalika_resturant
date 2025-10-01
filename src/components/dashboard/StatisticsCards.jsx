import React from "react";
import StatisticsCard from "./StatisticsCard";
import { FaClipboardList } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";

function StatisticsCards({kpis}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatisticsCard
        title="عدد الطلبات"
        value={kpis.ordersCount}
        icon={FaClipboardList}
        bgColor="#FEF9C3"
      />
      <StatisticsCard
        title="عدد العملاء"
        value={kpis.customersCount}
        icon={IoPersonSharp}
        bgColor="#E0F2FE"
      />
      <StatisticsCard
        title="إجمالي الدخل"
        value={kpis.totalRevenue}
        icon={GiMoneyStack}
        bgColor="#DCFCE7"
      />
    </div>
  );
}

export default StatisticsCards;
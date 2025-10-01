import { NavLink } from "react-router-dom";
import React from "react";

function SidebarLink({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      end={to === "/dashboard"}   
      className={({ isActive }) =>
        `flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer transition ${
          isActive
            ? "bg-yellow-100 text-yellow-600 font-bold"
            : "text-gray-700 hover:text-yellow-600"
        }`
      }
    >
      <span className="font-medium">{label}</span>
      <Icon className="text-lg" />
    </NavLink>
  );
}

export default SidebarLink;
import React from "react";
import {
  FiHome,
  FiPieChart,
  FiDollarSign,
  FiBarChart,
  FiRefreshCcw,
  FiBarChart2,
} from "react-icons/fi";

export default function SideMenu() {
  const menuList = [
    {
      name: "Home",
      link: "/",
      icon: <FiHome />,
    },
    {
      name: "TVL",
      link: "/tvl",
      icon: <FiPieChart />,
    },
    {
      name: "Stablecoins",
      link: "/stablecoins",
      icon: <FiDollarSign />,
    },
    {
      name: "Yield",
      link: "/yield",
      icon: <FiBarChart />,
    },
    {
      name: "Bridges",
      link: "/bridges",
      icon: <FiRefreshCcw />,
    },
    {
      name: "Fees",
      link: "/fees",
      icon: <FiBarChart2 />,
    },
  ];
  return (
    <ul>
      {menuList.map((item) => (
        <li className="flex items-center my-2 cursor-pointer group">
          <div className="bg-blue-200/30 p-2 rounded-lg">
            {React.cloneElement(item.icon, {
              size: 16,
              className: "text-slate-600 group-hover:text-slate-900",
            })}
          </div>
          <span className="ml-2 text-md text-slate-600 group-hover:text-slate-900">
            {item.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

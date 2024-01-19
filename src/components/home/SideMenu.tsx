"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  ChartBarIcon,
  ChartPieIcon,
  ChartBarSquareIcon,
  ArrowsRightLeftIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function SideMenu() {
  const pathname = usePathname();
  const menuList = [
    {
      name: "Home",
      link: "/",
      icon: HomeIcon,
    },
    {
      name: "TVL",
      link: "/tvl",
      icon: ChartBarIcon,
    },
    {
      name: "Stablecoins",
      link: "/stablecoins",
      icon: CurrencyDollarIcon,
    },
    {
      name: "Yield",
      link: "/yield",
      icon: ChartPieIcon,
    },
    {
      name: "Bridges",
      link: "/bridges",
      icon: ArrowsRightLeftIcon,
    },
    {
      name: "Fees",
      link: "/fees",
      icon: ChartBarSquareIcon,
    },
  ];
  function isActive(link: string) {
    console.log(pathname, link);
    if (pathname === link) {
      return " text-slate-950";
    }
    return "";
  }
  return (
    <ul className="sticky top-32 mt-10">
      {menuList.map((item, index) => (
        <Link
          href={item.link}
          className="flex items-center my-2 cursor-pointer group"
          key={index}
        >
          <div className="bg-teal-200/50 p-[5px] rounded-lg">
            {React.createElement(item.icon, {
              className:
                "h-6 w-6 text-slate-500 group-hover:text-slate-950" +
                isActive(item.link),
            })}
          </div>
          <span
            className={
              "ml-2 text-md text-slate-500 group-hover:text-slate-950" +
              isActive(item.link)
            }
          >
            {item.name}
          </span>
        </Link>
      ))}
    </ul>
  );
}

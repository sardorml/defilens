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
import {} from "@heroicons/react/24/outline";

export default function SideMenu() {
  const pathname = usePathname();
  const menuList = [
    {
      name: "Home",
      link: "/",
      icon: HomeIcon,
    },
    // {
    //   name: "TVL",
    //   link: "/tvl",
    //   icon: ChartBarIcon,
    // },
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
    return pathname === link;
  }

  function MenuItem({
    name,
    link,
    icon,
    active,
  }: {
    name: string;
    link: string;
    icon: React.ForwardRefExoticComponent<
      React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>
    >;
    active: boolean;
  }) {
    const activeClass = active ? " text-slate-950" : " text-slate-500";
    return (
      <Link href={link} className="flex items-center my-2 cursor-pointer group">
        {/* Icon */}
        <div className="bg-stone-200/50 p-[5px] rounded-lg">
          {React.createElement(icon, {
            className: "h-6 w-6 group-hover:text-slate-950 text-slate-950",
          })}
        </div>
        {/* Menu name */}
        <span
          className={
            "ml-2 text-md font-medium group-hover:text-slate-950" + activeClass
          }
        >
          {name}
        </span>
      </Link>
    );
  }
  return (
    <ul className="sticky top-32 mt-10">
      {menuList.map((item, index) => (
        <MenuItem
          key={index}
          name={item.name}
          link={item.link}
          icon={item.icon}
          active={isActive(item.link)}
        />
      ))}
    </ul>
  );
}

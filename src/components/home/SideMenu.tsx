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

export const menuList = [
  {
    name: "Home",
    link: "/",
    icon: HomeIcon,
  },
  {
    name: "Fees",
    link: "/fees",
    icon: ChartBarSquareIcon,
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
];

export default function SideMenu() {
  const pathname = usePathname();

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
    const activeClass = active ? " text-rose-500" : " text-slate-500";
    const activeBg = active ? " bg-rose-300/50" : " bg-slate-200/50";
    return (
      <Link href={link} className="flex items-center my-2 cursor-pointer group">
        {/* Icon */}
        <div className={"p-[5px] rounded-lg" + activeBg}>
          {React.createElement(icon, {
            className: "h-6 w-6 text-slate-950",
          })}
        </div>
        {/* Menu name */}
        <span
          className={
            "ml-2 text-md font-medium group-hover:text-rose-500" + activeClass
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

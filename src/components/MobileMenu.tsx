import Link from "next/link";
import { menuList } from "./home/SideMenu";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { Transition } from "@headlessui/react";

export default function MobileMenu({
  handleMobileMenu,
}: {
  handleMobileMenu: (value: boolean) => void;
}) {
  const pathname = usePathname();

  function isActive(link: string) {
    return pathname === link;
  }
  return (
    <div className="fixed bg-slate-300 inset-0 z-[11] bg-white/50 backdrop-blur-lg backdrop-filter">
      <button
        onClick={() => handleMobileMenu(false)}
        className="flex justify-end w-full p-5"
      >
        <XMarkIcon className="h-12 w-12 text-slate-700" />
      </button>
      <div className="flex flex-col justify-center items-center h-full pb-56">
        {menuList.map((item) => (
          <Link
            href={item.link}
            key={item.name}
            onClick={() => handleMobileMenu(false)}
            className="mb-10"
          >
            <span
              className={
                isActive(item.link)
                  ? "text-3xl text-rose-500"
                  : "text-3xl text-slate-900"
              }
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

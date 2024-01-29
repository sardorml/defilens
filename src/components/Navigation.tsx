"use client";

import Image from "next/image";
import { Bars3Icon } from "@heroicons/react/24/outline";
import MobileMenu from "./MobileMenu";
import { use, useEffect, useState } from "react";
import Link from "next/link";

async function getEthPrice() {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
  );
  const data = await response.json();
  return data.ethereum.usd;
}

export default function Navigation() {
  const [ethPrice, setEthPrice] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    getEthPrice().then((price) => {
      setEthPrice(price);
    });
  }, []);
  function handleMobileMenu(value: boolean) {
    setIsMobileMenuOpen(value);
    if (value) {
      document.body.style.overflow = "hidden";
    }
    if (!value) {
      document.body.style.overflow = "auto";
    }
  }
  return (
    <>
      {isMobileMenuOpen && <MobileMenu handleMobileMenu={handleMobileMenu} />}
      <header className="sticky top-0 bg-white/60 backdrop-blur-2xl backdrop-filter z-[10] px-5 lg:px-0">
        <div className="flex justify-between py-3 border-b border-slate-200 max-w-7xl mx-auto">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-4xl font-bold text-slate-900 flex items-center"
            >
              <span className="text-rose-500">defi</span>
              <span className="text-slate-700">lens</span>
            </Link>
          </div>
          <div className="lg:hidden flex items-center">
            <button onClick={() => handleMobileMenu(true)}>
              <Bars3Icon className="h-8 w-8 text-slate-500" />
            </button>
          </div>
          <div className="hidden lg:block flex flex-col justify-center">
            <div className="flex items-center text-sm justify-between">
              <div className="flex items-center">
                {/* <span className="w-5 text-center">
                <Image
                  src="/ethereum-black.svg"
                  alt="Eth"
                  width={14}
                  height={14}
                />
              </span> */}
                <span className="mr-2 text-slate-500">ETH:</span>
              </div>
              <span className="font-medium text-slate-600 text-end">
                ${ethPrice}
              </span>
            </div>
            <div className="flex items-center text-sm justify-between">
              <div className="flex items-center">
                {/* <span className="w-5 text-center pl-[2px]">
                <Image
                  src="/gas-station2.png"
                  alt="Gas"
                  width={14}
                  height={14}
                />
              </span> */}
                <span className="mr-2 text-slate-500">Gas:</span>{" "}
              </div>
              <span className="font-medium text-slate-600 text-end">
                23 Gwei
              </span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

"use client";

import Image from "next/image";
import getAllProtocols, { Protocol } from "@/api/tvl";
import { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import SideMenu from "@/components/SideMenu";

export default function Home() {
  const [protocols, setProtocols] = useState([] as Protocol[]);
  useEffect(() => {
    getAllProtocols().then((protocols) => setProtocols(protocols));
  }, []);

  return (
    <div className="">
      <Navigation />
      <div className="mx-auto flex max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        <div className="w-56">
          <SideMenu />
        </div>
        <div>content</div>
      </div>
    </div>
  );
}

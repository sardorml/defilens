"use client";

import { Protocol, getAllProtocols } from "@/api/tvl";
import { useState, useEffect } from "react";
import TVLChart from "@/components/home/TVLChart";
import ProtocolListItem from "@/components/home/ProtocolListItem";

export default function Home() {
  const [protocols, setProtocols] = useState([] as Protocol[]);
  useEffect(() => {
    getAllProtocols().then((protocols) => setProtocols(protocols));
  }, []);

  return (
    <>
      <div className="w-full">
        <TVLChart />
      </div>
      {protocols.map((protocol) => (
        <ProtocolListItem protocol={protocol} />
      ))}
    </>
  );
}

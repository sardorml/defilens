"use client";

import { Bridge, getBridges } from "@/api/bridges";
import BridgeList from "@/components/bridges/BridgeList";
import { useEffect, useState } from "react";

export default function Bridges() {
  const [bridges, setBridges] = useState<Bridge[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBridges().then((bridges) => {
      setBridges(bridges);
      setIsLoading(false);
    });
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-5">Bridges</h1>
      {isLoading && <div>Loading...</div>}
      {!isLoading && <BridgeList data={bridges} isLoading={isLoading} />}
    </div>
  );
}

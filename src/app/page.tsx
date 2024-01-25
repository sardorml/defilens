"use client";

import {
  getAllProtocols,
  getHistoricalChainTVL,
  ProtocolTVL,
  TVLHistoryDataPoint,
} from "@/api/tvl";
import ChartTVL from "@/components/home/ChartTVL";
import Protocols from "@/components/home/Protocols";
import { useEffect, useState } from "react";

export default function Home() {
  const [protocols, setProtocols] = useState<ProtocolTVL[]>([]);
  const [historicalTVL, setHistoricalTVL] = useState<TVLHistoryDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllProtocols(), getHistoricalChainTVL()]).then(
      ([protocols, historicalTVL]) => {
        setProtocols(protocols);
        setHistoricalTVL(historicalTVL);
        setIsLoading(false);
      }
    );
  }, []);

  return (
    <>
      <ChartTVL
        historicalTVL={historicalTVL}
        topProtocols={protocols.slice(0, 5)}
        isLoading={isLoading}
      />
      <Protocols protocols={protocols} isLoading={isLoading} />
    </>
  );
}

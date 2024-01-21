import {
  Protocol,
  TVLHistoryDataPoint,
  getHistoricalChainTVL,
} from "@/api/tvl";
import ChartArea from "./ChartArea";
import { getPercentChange, numberToWord } from "@/helpers";
import TopProtocolsCard from "./TopProtocolsCard";
import { percentageChangeIcon } from "./ProtocolListItem";

export default async function ChartTVL({
  topProtocols,
}: {
  topProtocols: Protocol[];
}) {
  const historicalTVL: TVLHistoryDataPoint[] = await getHistoricalChainTVL();
  const percentChange = getPercentChange(historicalTVL, "7d");
  const percentChangeColor =
    percentChange > 0 ? "text-green-500" : "text-red-500";
  return (
    <div className="w-full">
      <div className="flex justify-between mb-10">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-slate-900 ">Value Locked</h1>
          <span className="text-md text-slate-600">
            Historical TVL (excludes liquid staking and double counted tvl) of
            DeFi on all chains
          </span>
        </div>
        <div className="flex flex-col items-end">
          <h1 className="text-3xl font-bold text-slate-900">
            ${numberToWord(historicalTVL[historicalTVL.length - 1].tvl)}
          </h1>
          <div className="flex items-center">
            <span className={percentChangeColor}>
              {percentageChangeIcon(percentChange)}
            </span>
            <span className={percentChangeColor}>
              {Math.abs(percentChange).toFixed(2)}%
            </span>
            <span> / 7 days</span>
          </div>
        </div>
      </div>

      <div className="grid grid-flow-col mb-5">
        <TopProtocolsCard topProtocols={topProtocols} />
        <ChartArea data={historicalTVL} />
      </div>
    </div>
  );
}

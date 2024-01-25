import ChartArea from "./ChartArea";
import {
  filterTVLHistoryDataPointsByDays,
  getPercentChange,
  numberToWord,
} from "@/helpers";
import TopProtocolsCard from "./TopProtocolsCard";
import { percentageChangeIcon } from "./ProtocolListItem";
import { useMemo, useState } from "react";
import { ProtocolTVL, TVLHistoryDataPoint } from "@/api/tvl";

interface ChartTVLProps {
  historicalTVL: TVLHistoryDataPoint[];
  topProtocols: ProtocolTVL[];
  isLoading: boolean;
}

export default function ChartTVL({
  historicalTVL,
  topProtocols,
  isLoading,
}: ChartTVLProps) {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const chartData = prepareChartData(historicalTVL);
  const percentChange = getPercentChange(historicalTVL, "7d");
  const percentChangeColor =
    percentChange > 0 ? "text-green-500" : "text-red-500";
  const filteredTVL = useMemo(
    () => filterTVLHistoryDataPointsByDays(chartData, selectedFilter),
    [historicalTVL, selectedFilter]
  );

  function prepareChartData(data: TVLHistoryDataPoint[]) {
    return data.map(({ tvl: value, ...rest }) => ({
      value,
      ...rest,
    }));
  }

  function handleFilterChange(value: string) {
    setSelectedFilter(value);
  }

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
        {
          <div className="flex flex-col items-end">
            <h1 className="text-3xl font-bold text-slate-900">
              $
              {isLoading
                ? 0
                : numberToWord(historicalTVL[historicalTVL.length - 1].tvl)}
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
        }
      </div>

      <div className="grid grid-flow-col mb-5">
        <TopProtocolsCard protocols={topProtocols} />
        <ChartArea data={filteredTVL} handleFilterChange={handleFilterChange} />
      </div>
    </div>
  );
}

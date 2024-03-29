import Image from "next/image";
import { filterTVLHistoryDataPointsByDays, numberToWord } from "@/helpers";
import { ProtocolInfo, TVLHistoryDataPoint } from "@/api/tvl";
import ChartArea from "../home/ChartArea";
import { use, useMemo, useState } from "react";
import SkeletonProtocolHeader from "../skeleton/protocol/SkeletonProtocolHeader";
import { SkeletonCard } from "../skeleton/SkeletonList";

interface ProtocolChartProps {
  protocol: ProtocolInfo;
  isLoading: boolean;
}
export default function ProtocolChart({
  protocol,
  isLoading,
}: ProtocolChartProps) {
  const [selectedFilter, setSelectedFilter] = useState("all");
  function handleFilterChange(value: string) {
    setSelectedFilter(value);
  }
  const chartData = prepareChartData(protocol?.tvl);
  const filteredTVL = useMemo(
    () => filterTVLHistoryDataPointsByDays(chartData, selectedFilter),
    [chartData, selectedFilter]
  );
  function prepareChartData(data: TVLHistoryDataPoint[]) {
    if (!data) return [];
    return data.map(({ totalLiquidityUSD: value, ...rest }) => ({
      value,
      ...rest,
    }));
  }
  return (
    <div className="">
      {isLoading && <SkeletonProtocolHeader />}
      {!isLoading && (
        <div className="flex justify-between my-5">
          <div className="flex items-center">
            <Image
              src={protocol.logo}
              alt={protocol.name}
              width={64}
              height={64}
              className="rounded-lg mr-3"
            />
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-medium text-slate-700">
                {protocol.name}
                <span className="text-xl text-slate-500 ml-1">
                  {protocol.symbol}
                </span>
              </h1>
              <span className="text-md text-slate-400">
                {protocol.category}
              </span>
            </div>
          </div>
          <span className="font-bold text-4xl text-slate-600">
            {numberToWord(
              protocol.tvl[protocol.tvl.length - 1].totalLiquidityUSD
            )}
          </span>
        </div>
      )}

      <div className="flex">
        <div className="w-80 shrink-0 hidden lg:block border-r border-slate-100 p-7 mr-5">
          <div className="flex flex-col">
            <span className="text-lg text-slate-500 my-3">Description </span>
            {isLoading && <SkeletonCard h="100" w="100%" />}
            {!isLoading && (
              <span className="text-slate-700">{protocol.description}</span>
            )}
          </div>
        </div>
        <ChartArea
          data={filteredTVL}
          isLoading={isLoading}
          handleFilterChange={handleFilterChange}
        />
      </div>
    </div>
  );
}

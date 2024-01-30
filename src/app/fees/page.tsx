"use client";

import { getFees } from "@/api/fees";
import { TVLHistoryDataPoint } from "@/api/tvl";
import FeeProtocolList from "@/components/fees/FeeProtocolList";
import ChartArea from "@/components/home/ChartArea";
import {
  percentageChangeClasses,
  percentageChangeIcon,
} from "@/components/home/ProtocolListItem";
import SkeletonHomePageHeader from "@/components/skeleton/SkeletonHomePageHeader";
import { filterTVLHistoryDataPointsByDays, numberToWord } from "@/helpers";
import { useEffect, useMemo, useState } from "react";

function FeesInfoCard({ fees, isLoading }: any) {
  const items = [
    {
      title: "Total 7d",
      value: fees.total7d,
      change: fees.change_7d,
    },
    {
      title: "Total 30d",
      value: fees.total30d,
      change: fees.change_1m,
    },
    {
      title: "Total 1y",
      value: fees.total1y,
      change: null,
    },
    {
      title: "1d revenue",
      value: fees.dailyRevenue,
      change: null,
    },
  ];
  return (
    <div className="hidden lg:block w-80 shrink-0 border-r border-slate-200 mr-5">
      <p className="text-lg font-bold text-slate-900 mb-5">Fee details</p>
      {items.map((item: any) => (
        <div className="flex flex-col p-2" key={item.title}>
          <span className="text-base text-medium text-slate-500">
            {item.title}
          </span>
          <div className="flex items-center text-medium text-slate-700">
            <span className="text-xl">${numberToWord(item.value)}</span>
            <span className="flex items-center text-base">
              {percentageChangeIcon(item.change)}
              {item.change && (
                <span className={percentageChangeClasses(item.change)}>
                  {item.change}%
                </span>
              )}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function sortProtocolsByTotalFees(protocols: any) {
  if (!protocols) return [];
  return protocols.sort((a: any, b: any) => {
    return b.total24h - a.total24h;
  });
}

export default function Bridges() {
  const [fees, setFees] = useState([]) as any;
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const chartData = prepareChartData(fees.totalDataChart);
  const filteredChartData = useMemo(
    () => filterTVLHistoryDataPointsByDays(chartData, selectedFilter),
    [fees, selectedFilter]
  );
  useEffect(() => {
    getFees().then((fees) => {
      setFees(fees);
      setIsLoading(false);
    });
  }, []);
  function prepareChartData(data: TVLHistoryDataPoint[]) {
    if (!data) return [];
    return data.map((item) => ({
      date: item[0],
      value: item[1],
    }));
  }
  function handleFilterChange(value: string) {
    setSelectedFilter(value);
  }
  const sortedProtocols = sortProtocolsByTotalFees(fees.protocols);
  return (
    <div>
      {isLoading && <SkeletonHomePageHeader />}
      {!isLoading && (
        <div className="flex justify-between mb-10">
          <div className="flex flex-col w-2/3">
            <div className="">
              <span className="text-3xl font-bold text-slate-800 mr-2">
                Fees
              </span>
              <span className="text-2xl font-medium text-slate-500">24h</span>
            </div>
            <span className="text-md text-slate-600">
              List of all protocols along with summaries of their fees and
              revenue and history data
            </span>
          </div>
          <div className="flex flex-col items-end">
            <h1 className="text-3xl font-bold text-slate-800">
              ${numberToWord(fees.total24h)}
            </h1>
            <div className="flex items-center">
              {percentageChangeIcon(fees.change_1d)}
              <span className={percentageChangeClasses(fees.change_1d)}>
                {fees.change_1d}%
              </span>
              <span> / 24h</span>
            </div>
          </div>
        </div>
      )}
      <div className="flex">
        <FeesInfoCard fees={fees} isLoading={isLoading} />
        <ChartArea
          data={filteredChartData}
          isLoading={isLoading}
          handleFilterChange={handleFilterChange}
        />
      </div>
      <FeeProtocolList data={sortedProtocols} isLoading={isLoading} />
    </div>
  );
}

"use client";

import { getStablecoins, Stablecoin } from "@/api/stablecoins";
import { SkeletonCard } from "@/components/skeleton/SkeletonList";
import SkeletonCardData from "@/components/skeleton/stablecoins/SkeletonCardData";
import SkeletonPieChart from "@/components/skeleton/stablecoins/SkeletonPieChart";
import ChainList from "@/components/stablecoins/ChainList";
import ChartPie, { ChartPieDataPoint } from "@/components/stablecoins/ChartPie";
import SelectAutocomplete, {
  DataPoint,
} from "@/components/stablecoins/SelectAutocomplete";
import { numberToWord } from "@/helpers";
import { Metadata } from "next";
import { useEffect, useState } from "react";

export const metadata: Metadata = {
  title: "Defilens - Stablecoins",
  description:
    "Track stablecoins data for DeFi protocols - Monitor stablecoin usage, liquidity, and market capitalization across various decentralized finance platforms.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://defilens.xyz",
    images: [
      {
        url: "https://defilens.xyz/defilens.png",
        width: 1200,
        height: 630,
        alt: "Defilens",
      },
    ],
  },
};

function CardData({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex flex-col shadow-sm rounded-lg p-4 mb-2">
      <span className="text-base text-slate-500">{title}</span>
      <span className="text-2xl text-slate-700 font-medium mt-2">${value}</span>
    </div>
  );
}

function prepareChartPieData(data: Stablecoin) {
  if (!data) return [];
  const result: ChartPieDataPoint[] = [];
  for (const [key, value] of Object.entries(data.chainCirculating)) {
    result.push({ name: key, value: value.current.peggedUSD });
  }
  return result;
}
function sortChartData(data: ChartPieDataPoint[]) {
  if (!data) return [];
  return data.sort((a: ChartPieDataPoint, b: ChartPieDataPoint) => {
    if (a.value > b.value) return -1;
    else if (a.value < b.value) return 1;
    else return 0;
  });
}
function prepareAutoCompleteData(data: Stablecoin[]) {
  const result: DataPoint[] = [];
  data.forEach((item) => {
    result.push({ id: item.id, name: item.name });
  });
  return result;
}
function getTopFive(data: ChartPieDataPoint[]) {
  if (!data) return [];
  if (data.length <= 5) return data;
  const topFive = data.slice(0, 5);
  const other = data.slice(5);
  const otherTotal = other.reduce((acc, curr) => acc + curr.value, 0);
  const topFiveWithOther = [...topFive, { name: "Other", value: otherTotal }];
  return topFiveWithOther;
}

export default function Stablecoins() {
  const [stablecoins, setStablecoins] = useState<Stablecoin[]>([]);
  const [selectedStablecoin, setSelectedStablecoin] =
    useState<Stablecoin>() as any;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getStablecoins().then((data) => {
      setStablecoins(data);
      setSelectedStablecoin(data[0]);
      setIsLoading(false);
    });
  }, []);
  function handleSelectChange(value: DataPoint) {
    setSelectedStablecoin(stablecoins.find((item) => item.id === value.id));
  }

  const autocompleteData = prepareAutoCompleteData(stablecoins);
  const pieChartData = prepareChartPieData(selectedStablecoin);
  const filteredChartData = sortChartData(pieChartData);
  const topFiveWithOther = getTopFive(filteredChartData);
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-5">Stablecoins</h1>
      <div className="flex flex-col lg:flex-row lg:items-center">
        <h1 className="text-xl font-bold text-slate-800 mr-2 mb-3 lg:mb-0">
          Select coin
        </h1>
        {isLoading && <SkeletonCard h="44" w="200" />}
        {!isLoading && (
          <SelectAutocomplete
            data={autocompleteData}
            selected={{
              id: selectedStablecoin.id,
              name: selectedStablecoin.name,
            }}
            handleSelectChange={handleSelectChange}
          />
        )}
      </div>
      <div className="flex flex-col lg:flex-row flex-col-reverse">
        {isLoading && (
          <div className="w-2/4 shrink-0 flex flex-col justify-center">
            <SkeletonCardData />
            <SkeletonCardData />
            <SkeletonCardData />
          </div>
        )}
        {!isLoading && (
          <div className="w-full lg:w-2/4 shrink-0 flex flex-col justify-center">
            <CardData
              title={`${selectedStablecoin.name} (${selectedStablecoin.symbol})`}
              value={
                selectedStablecoin.price
                  ? selectedStablecoin.price.toFixed(3)
                  : "N/A"
              }
            />
            <CardData
              title="Circulating Supply"
              value={numberToWord(selectedStablecoin.circulating.peggedUSD)}
            />
            <CardData
              title="Circulating supply last week"
              value={numberToWord(
                selectedStablecoin.circulatingPrevWeek.peggedUSD
              )}
            />
          </div>
        )}
        {isLoading && <SkeletonPieChart />}
        {!isLoading && <ChartPie data={topFiveWithOther} />}
      </div>
      {isLoading && <div className="">Loading...</div>}
      {!isLoading && <ChainList data={selectedStablecoin.chainCirculating} />}
    </div>
  );
}

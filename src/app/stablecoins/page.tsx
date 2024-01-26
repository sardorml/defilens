"use client";

import { getStablecoins, Stablecoin } from "@/api/stablecoins";
import ChartPie, { ChartPieDataPoint } from "@/components/stablecoins/ChartPie";
import SelectAutocomplete, {
  DataPoint,
} from "@/components/stablecoins/SelectAutocomplete";
import { numberToWord } from "@/helpers";
import { useEffect, useState } from "react";

function CardData({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex flex-col border rounded-lg p-4 mb-2">
      <span className="text-base text-slate-600 font-medium">{title}</span>
      <span className="text-lg text-teal-700 font-medium mt-2">{value}</span>
    </div>
  );
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
    const topFive = data.slice(0, 5);
    const other = data.slice(5);
    const otherTotal = other.reduce((acc, curr) => acc + curr.value, 0);
    const topFiveWithOther = [...topFive, { name: "Other", value: otherTotal }];
    return topFiveWithOther;
  }
  function handleSelectChange(value: DataPoint) {
    console.log(value);
    setSelectedStablecoin(stablecoins.find((item) => item.id === value.id));
  }

  const autocompleteData = prepareAutoCompleteData(stablecoins);
  const pieChartData = prepareChartPieData(selectedStablecoin);
  const filteredChartData = sortChartData(pieChartData);
  const topFiveWithOther = getTopFive(filteredChartData);

  return (
    <div>
      <div className="flex items-center">
        <h1 className="text-3xl text-late-600 font-medium mr-2">
          Select stablecoin
        </h1>
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
      <div className="flex">
        {!isLoading && (
          <div className="w-2/4 shrink-0 flex flex-col justify-center">
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
        <ChartPie data={topFiveWithOther} />
      </div>
    </div>
  );
}

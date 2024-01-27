"use client";

import { ProjectYield, getPools } from "@/api/yield";
import { SkeletonCard } from "@/components/skeleton/SkeletonList";
import SelectAutocomplete, {
  DataPoint,
} from "@/components/stablecoins/SelectAutocomplete";
import PoolList from "@/components/yield/PoolList";
import { groupProjectsByChain } from "@/helpers";
import { useEffect, useState } from "react";

interface GroupedYield {
  [key: string]: ProjectYield[];
}
export default function Yield() {
  const [pools, setPools] = useState<GroupedYield>({});
  const [selectedChainProjects, setSelectedChainProjects] = useState<
    ProjectYield[]
  >([]);
  const [selectedChain, setSelectedChain] = useState<DataPoint>() as any;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getPools().then((data) => {
      const grouped: GroupedYield = groupProjectsByChain(data);
      setPools(grouped);
      setSelectedChain({ id: "ethereum", name: "Ethereum" });
      setSelectedChainProjects(grouped["Ethereum"]);
      setIsLoading(false);
    });
  }, []);

  function prepareAutoCompleteData(data: GroupedYield) {
    if (!data) return [];
    const result: DataPoint[] = Object.entries(data).map(([key], index) => {
      return { id: key, name: key };
    });
    return result;
  }
  function handleSelectChange(value: DataPoint) {
    console.log(value);
    setSelectedChainProjects(pools[value.id]);
    setSelectedChain(value);
    console.log("selectedChainProjects", selectedChainProjects);
  }
  const autoCompleteData = prepareAutoCompleteData(pools);
  console.log("pools", pools);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-5">Yields/APY</h1>

      <div className="flex flex-col lg:flex-row lg:items-center mb-5">
        <h1 className="text-xl font-bold text-slate-800 mr-2 lg:mb-0">
          Select Chain
        </h1>
        {isLoading && <SkeletonCard h="44" w="200" />}
        {!isLoading && (
          <SelectAutocomplete
            data={autoCompleteData}
            selected={selectedChain}
            handleSelectChange={handleSelectChange}
          />
        )}
      </div>
      <div>
        <PoolList data={selectedChainProjects} isLoading={isLoading} />
      </div>
    </div>
  );
}

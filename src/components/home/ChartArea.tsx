"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import {
  timestampToDateString,
  numberToWord,
  getTVLHistoryDataPointsDateRange,
} from "@/helpers";
import { TVLHistoryDataPoint } from "@/api/tvl";
import { useEffect, useState } from "react";
import FilterOptions from "@/components/home/ChartFilterSelector";
import { useTVLContext } from "@/contexts/tvlContext";

const filterOptions = [
  {
    name: "30D",
    value: "30",
  },
  {
    name: "90D",
    value: "90",
  },
  {
    name: "180D",
    value: "180",
  },
  {
    name: "1Y",
    value: "365",
  },
  {
    name: "All",
    value: "all",
  },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active) {
    return (
      <div className="custom-tooltip bg-white/90 p-3 rounded-lg shadow-sm">
        <p className="label">{`${timestampToDateString(label)} : ${numberToWord(
          payload?.[0]?.value as number
        )}`}</p>
      </div>
    );
  }

  return null;
};

export default function ChartArea({
  data: historicalTVL,
  handleFilterChange,
}: {
  data: TVLHistoryDataPoint[];
  handleFilterChange: (value: string) => void;
}) {
  const [dateRange, setDateRange] = useState("");

  useEffect(() => {
    // setDateRange(getTVLHistoryDataPointsDateRange(historicalTVL));
  }, []);

  return (
    <div className="w-full h-full">
      <div className="flex justify-between mb-5">
        <div>
          <span className="font-bold">{dateRange}</span>
        </div>
        <FilterOptions
          options={filterOptions}
          handleFilterChange={handleFilterChange}
        />
      </div>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <AreaChart data={historicalTVL}>
            <CartesianGrid
              vertical={false}
              strokeDasharray="0"
              stroke="#e2e8f0"
            />
            <XAxis
              axisLine={false}
              dataKey="date"
              tickFormatter={(date) => timestampToDateString(date)}
              tick={false}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              dataKey="value"
              tickFormatter={(tvl) => numberToWord(tvl)}
            />
            <Tooltip
              cursor={{ stroke: "red", strokeWidth: 2 }}
              content={<CustomTooltip />}
            />
            <Area
              isAnimationActive={false}
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              fill="#34d399"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

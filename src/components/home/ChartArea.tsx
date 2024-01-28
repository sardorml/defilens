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
import FilterOptions from "@/components/home/ChartFilterSelector";
import { SkeletonCard } from "../skeleton/SkeletonList";

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

interface ChartAreaProps {
  data: TVLHistoryDataPoint[];
  isLoading: boolean;
  handleFilterChange: (value: string) => void;
}

export default function ChartArea({
  data: historicalTVL,
  isLoading,
  handleFilterChange,
}: ChartAreaProps) {
  const dateRange = getTVLHistoryDataPointsDateRange(historicalTVL);

  return (
    <div className="w-full h-full">
      <div className="flex flex-col flex-col-reverse items-center lg:justify-between mb-5 lg:flex-row">
        <div className="mt-3 lg:mb-0">
          <span className="font-bold">{dateRange}</span>
        </div>
        <FilterOptions
          options={filterOptions}
          handleFilterChange={handleFilterChange}
        />
      </div>
      {isLoading && (
        <div style={{ width: "100%", height: 300 }}>
          <SkeletonCard h="260" w="100%" />
        </div>
      )}
      {!isLoading && (
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <AreaChart data={historicalTVL}>
              <defs>
                <linearGradient id="colorUv" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="20%" stopColor="#9333ea" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#9333ea" stopOpacity={0.2} />
                </linearGradient>
              </defs>
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
                stroke="#9333ea"
                fill="url(#colorUv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

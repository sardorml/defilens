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
import { timestampToDateString, numberToWord } from "@/helpers";
import { TVLHistoryDataPoint } from "@/api/tvl";

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active) {
    return (
      <div className="custom-tooltip bg-teal-200/50 p-5 rounded-lg">
        <p className="label">{`${timestampToDateString(label)} : ${numberToWord(
          payload?.[0]?.value as number
        )}`}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
};

export default function TVLChart({ data }: { data: TVLHistoryDataPoint[] }) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            axisLine={false}
            dataKey="date"
            tickFormatter={(date) => timestampToDateString(date)}
            tick={false}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            dataKey="tvl"
            tickFormatter={(tvl) => numberToWord(tvl)}
          />
          <Tooltip
            cursor={{ stroke: "red", strokeWidth: 2 }}
            content={<CustomTooltip />}
          />
          <Area
            isAnimationActive={false}
            type="monotone"
            dataKey="tvl"
            stroke="#34d399"
            fill="#d1fae5"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

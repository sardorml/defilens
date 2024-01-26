import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active) {
    return (
      <div className="custom-tooltip bg-white/90 p-3 rounded-lg shadow-sm">
        <p className="label">{payload?.[0]?.value}</p>
      </div>
    );
  }

  return null;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#ff0000"];

export type ChartPieDataPoint = {
  name: string;
  value: number;
};

export default function ChartPie({ data }: { data: any }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={120}
          paddingAngle={5}
          fill="#8884d8"
          label={(entry) => entry.name}
        >
          {data.map((entry: ChartPieDataPoint, index: number) => (
            <Cell key={entry.name} fill={COLORS[index]} />
          ))}
          <Label value="Chains" position="center" />
        </Pie>
        <Tooltip content={CustomTooltip} />
      </PieChart>
    </ResponsiveContainer>
  );
}

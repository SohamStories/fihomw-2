import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend,
  LegendProps,
} from "recharts";
import { formatcurrency } from "@/lib/utils";

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"];

type RadialData = {
  value: number;
  name: string;
};

type Props = {
  data?: RadialData[];
};

const RadialVariant = ({ data }: Props) => {
  const chartData = data?.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  }));

  const CustomLegend: LegendProps["content"] = ({ payload }) => {
    if (!payload) return null;

    return (
      <ul className="flex flex-col space-y-2">
        {payload.map((entry) => {
          const {
            color,
            value,
            payload: entryPayload,
          } = entry as { color: string; value: string; payload: unknown };

          // Cast entryPayload to RadialData
          const radialData = entryPayload as RadialData;
          
          return (
            <li key={value} className="flex items-center space-x-2">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              <div className="space-x-1">
                <span className="text-sm text-muted-foreground">{radialData.name}</span>
                <span className="text-sm">{formatcurrency(radialData.value)}</span>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadialBarChart
        cx="50%"
        cy="30%"
        barSize={10}
        innerRadius="90%"
        outerRadius="40%"
        data={chartData}
      >
        <RadialBar
          dataKey="value"
          background
          label={{ position: "insideStart", fill: "#fff", fontSize: 12 }}
        />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={CustomLegend}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default RadialVariant;

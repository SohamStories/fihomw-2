import {
  Tooltip,
  XAxis,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { formatPercentage } from "@/lib/utils";
import CategoryTooltip from "./catrgory-tooltip";

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"];

type PieDataItem = {
  value: number;
  name: string;
  percent?: number;
};

type Props = {
  data?: PieDataItem[];
};

type CustomLegendItem = {
  color: string;
  value: string;
  payload: {
    percent?: number;
  };
};

const PieVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={({ payload }) => (
            <ul className="flex flex-col space-y-2">
              {(payload as CustomLegendItem[])?.map((entry, index) => (
                <li key={`item-${index}`} className="flex items-center space-x-2">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <div className="space-x-1">
                    <span className="text-sm text-muted-foreground">
                      {entry.value}
                    </span>
                    <span className="text-sm">
                      {formatPercentage((entry.payload?.percent ?? 0) * 100)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        />
        <Tooltip content={<CategoryTooltip />} />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={90}
          innerRadius={60}
          paddingAngle={2}
          fill="#8884d8"
          dataKey="value"
          labelLine={false}
        >
          {data?.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieVariant;

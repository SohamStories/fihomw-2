import { format } from "date-fns";
import { Separator } from "./ui/separator";
import { formatcurrency } from "@/lib/utils";

type CustomTooltipProps = {
  active?: boolean;
  payload?: {
    payload: {
      date: string | number | Date;
    };
    value: number;
  }[];
};

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload || payload.length < 2) return null;

  const date = payload[0].payload.date;
  const income = payload[0].value;
  const expenses = payload[1].value;

  return (
    <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
      <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
        {format(new Date(date), "MMM dd, yyyy")}
      </div>
      <Separator />
      <div className="p-2 px-3 space-y-1">
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 bg-blue-500 rounded-full" />
            <p className="text-sm text-muted-foreground">Income</p>
          </div>
          <p className="text-sm text-right font-medium">
            {formatcurrency(income)}
          </p>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 bg-rose-500 rounded-full" />
            <p className="text-sm text-muted-foreground">Expenses</p>
          </div>
          <p className="text-sm text-right font-medium">
            {formatcurrency(expenses * -1)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomTooltip;

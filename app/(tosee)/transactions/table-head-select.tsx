import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Props = {
  columnIndex: number;
  selectedcolumn: Record<string, string | null>;
  onChange: (columnIndex: number, value: string | null) => void;
};

const options = ["amount", "payee", "notes", "date"];

export const Tableheadselect = ({
  columnIndex,
  selectedcolumn,
  onChange,
}: Props) => {
  const currentSelect = selectedcolumn[`column_${columnIndex}`];

  // Log when the select is rendered for debugging
  console.log(`Rendering Select for column_${columnIndex}:`, currentSelect);

  return (
    <Select
      value={currentSelect || ""}
      onValueChange={(value) => {
        console.log("Column:", columnIndex, "Selected:", value);
        onChange(columnIndex, value);
      }}
    >
      <SelectTrigger
        className={cn(
          "focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-blue-500/10 capitalize",
          currentSelect && "text-blue-500"
        )}
      >
        <SelectValue placeholder="Skip" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="skip">Skip</SelectItem>
        {options.map((option, index) => {
          const disabled = 
            Object.values(selectedcolumn).includes(option) &&
            selectedcolumn[`column_${columnIndex}`] !== option;
          return (
            <SelectItem
              key={index}
              value={option}
              //disabled={disabled}
              className={cn(
                "capitalize bg-slate-300",
                disabled && "bg-slate-50 opacity-50 cursor-not-allowed"
              )}
            >
              {option}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

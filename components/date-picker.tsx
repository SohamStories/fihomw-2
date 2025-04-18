import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns";
import * as React from "react";
import { SelectSingleEventHandler } from "react-day-picker";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";


type Props = {
    value?: Date;
    onChange?: SelectSingleEventHandler;
    disabled?: boolean;
};

export const DatePicker = ({

    value,
    onChange,
    disabled,

}: Props ) => {
    return (
    <Popover>
        <PopoverTrigger asChild>
            <Button
            disabled={disabled}
            variant={"outline"}
            className={cn(
                "w-full justify-start text-left font-normal",
                !value && "text-muted-foreground ",
            )}>
                <CalendarIcon className="size-4 mr-2"/>
                {value ? format(value,"PPP") : <span>Pick a Date</span>}
            </Button>
        </PopoverTrigger>
            <PopoverContent>

                <Calendar
                mode="single"
                selected={value}
                onSelect={onChange}
                disabled={disabled}
                initialFocus
                />
            </PopoverContent>
    </Popover>
    )
}
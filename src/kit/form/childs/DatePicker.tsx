"use client";

import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { Popover } from "@radix-ui/react-popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { PopoverContent, PopoverTrigger } from "@/kit/popover/Popover";
import { Button } from "@/kit/button/Button";
import { Calendar } from "./Calendar";
import { cn } from "@/utils/utils";
import type { FieldInputProps, FieldMetaProps } from "formik";
import type { IDatePickerForm } from "@/types/forms/form";

type DatePickerProps = React.HTMLAttributes<HTMLDivElement> & {
    field: FieldInputProps<any>;
    meta: FieldMetaProps<any>;
    formField: IDatePickerForm;
};

export const DatePicker = ({
    formField,
    field,
    className,
}: DatePickerProps) => {
    const defaultDate: DateRange = {
        from: addDays(new Date(), -5),
        to: addDays(new Date(), 5),
    };

    const [date, setDate] = useState<DateRange | undefined>(defaultDate);

    const handleSelect = (date: DateRange | undefined) => {
        const value = !!date ? date : defaultDate;
        const formatted = `${new Date(value?.from!)?.toISOString()}|${new Date(
            value?.to!
        )?.toISOString()}`;

        setDate(date);
        field.onChange({
            target: {
                name: field.name,
                value: formatted,
            },
        });
    };

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={handleSelect}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};

// export const DatePicker = ({
//     formField,
//     field,
// }: {
//     field: FieldInputProps<any>;
//     meta: FieldMetaProps<any>;
//     formField: IDatePickerForm;
// }) => {
//     return (
//         <DateRangePicker
//             // className="border border-input-border rounded-md overflow-hidden w-full"
//             placeholder={formField.placeholder}
//             dropdownPlaceholder="Seleccionar"
//             options={[
//                 {
//                     value: "currentyear",
//                     text: "Current Year",
//                     startDate: new Date(new Date().getFullYear(), 0, 1),
//                     endDate: sub(new Date(), { days: 1 }),
//                 },
//                 {
//                     value: "tdy",
//                     text: "Last 5 days",
//                     startDate: sub(new Date(), { days: 5 }),
//                     endDate: sub(new Date(), { days: -5 }),
//                 },
//                 {
//                     value: "fl2weeks",
//                     text: "Last 2 Weeks",
//                     startDate: sub(new Date(), { weeks: 2 }),
//                     endDate: sub(new Date(), { days: 1 }),
//                 },
//                 {
//                     value: "xmas",
//                     text: "Christmas Holiday",
//                     startDate: new Date(2022, 12, 23),
//                     endDate: new Date(2022, 12, 26),
//                 },
//             ]}
//             enableDropdown
//             onValueChange={(value) => {
//                 const [start, end] = value;
//                 const formatted = `${new Date(start!).toISOString()}|${new Date(
//                     end!
//                 ).toISOString()}`;
//                 field.onChange({
//                     target: {
//                         name: field.name,
//                         value: formatted,
//                     },
//                 });
//             }}
//         />
//     );
// };

import clsx from "clsx";
import { isToday, isEqual, isPast, isSameMonth } from "date-fns";
import { CalendarStyle } from "@/types/forms/calendar";

type Props = {
    day: Date;
    selectedDay: Date | null;
    style: CalendarStyle;
};

export const useDay = ({ day, selectedDay, style }: Props) => {
    const colStartClasses = [
        "",
        "col-start-2",
        "col-start-3",
        "col-start-4",
        "col-start-5",
        "col-start-6",
        "col-start-7",
    ];

    const styles = clsx({
        "border-blue-500 text-white":
            isEqual(day, selectedDay!) && !isToday(day),
        "text-gray-500 bg-gray-200 cursor-not-allowed opacity-50":
            isPast(day) && isSameMonth(day, new Date()),
        hidden:
            isPast(day) &&
            isSameMonth(day, new Date()) &&
            style === CalendarStyle.List,
        "text-blue-600 font-bold": isToday(day),
        "hover:transition-all font-bold hover:border-green-500":
            !isToday(day) && !isPast(day),
    });

    return {
        colStartClasses,
        styles,
    };
};

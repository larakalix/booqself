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
        "md:col-start-2",
        "md:col-start-3",
        "md:col-start-4",
        "md:col-start-5",
        "md:col-start-6",
        "md:col-start-7",
    ];

    const styles = clsx({
        "border-blue-500 text-white": isEqual(day, selectedDay!) && !isToday(day),
        "hidden md:flex text-gray-500 bg-gray-200 cursor-not-allowed opacity-50": isPast(day) && isSameMonth(day, new Date()),
        hidden:
            isPast(day) &&
            isSameMonth(day, new Date()) &&
            style === CalendarStyle.List,
        "h-20 md:h-36 xl:h-48": style === CalendarStyle.Grid,
        "h-auto pb-2": style === CalendarStyle.List,
        "text-blue-600 font-bold": isToday(day),
        "hover:transition-all font-bold hover:border-green-500": !isToday(day) && !isPast(day),
    });

    return {
        colStartClasses,
        styles,
    };
};

"use client";

import {
    format,
    isToday,
    getDay,
    isEqual,
    isPast,
    isSameMonth,
    isSameDay,
} from "date-fns";
import clsx from "clsx";
import { useBookingStore } from "@/stores/bookingStore";

type Props = { day: Date; index: number };

let colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
];

export const Day = ({ day, index }: Props) => {
    const { selectedDay, selectDay } = useBookingStore((state) => state);

    const styles = clsx({
        "bg-green-500 text-white": isEqual(day, selectedDay!) && !isToday(day) || (selectedDay && isSameDay(day, selectedDay)),
        "text-gray-500 cursor-not-allowed":
            isPast(day) && isSameMonth(day, new Date()),
        "text-blue-600 font-bold": isToday(day),
        "hover:transition-all font-bold hover:border-green-500":
            !isToday(day) && !isPast(day),
    });

    return (
        <button
            type="button"
            disabled={isPast(day)}
            className={`
            border border-transparent flex flex-col items-center justify-center p-5 rounded-full h-8 w-8 font-light text-sm
                ${index === 0 && colStartClasses[getDay(day)]}
                ${styles}
            `}
            onClick={() => selectDay(day)}
        >
            <time dateTime={format(day, "yyyy-MM-dd")}>{format(day, "d")}</time>
        </button>
    );
};

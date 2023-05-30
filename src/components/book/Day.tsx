"use client";

import { format, getDay, isToday } from "date-fns";
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
        "bg-blue-500 text-white": isToday(day),
        "bg-green-500 text-white": selectedDay!.getDate() === day.getDate(),
    });

    return (
        <button
            type="button"
            className={`
                flex flex-col items-center justify-center p-5 rounded-full h-8 w-8 font-light text-sm
                ${index === 0 && colStartClasses[getDay(day)]}
                ${styles}
            `}
            onClick={() => selectDay(day)}
        >
            <time dateTime={format(day, "yyyy-MM-dd")}>{format(day, "d")}</time>
        </button>
    );
};

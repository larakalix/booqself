"use client";

import { Children, useState } from "react";
import {
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    parse,
    startOfMonth,
    startOfToday,
} from "date-fns";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Day } from "@/components/book/Day";
import { useBookingStore } from "@/stores/bookingStore";

export const Calendar = ({ appointments }: { appointments: any[] }) => {
    const { selectedDay } = useBookingStore((state) => state);
    let today = startOfToday();
    let firstDayCurrentMonth = parse(
        format(today, "MMM-yyyy"),
        "MMM-yyyy",
        new Date()
    );

    let days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    });

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Booking</h1>
            <div className="grid grid-cols-7 gap-4 mt-4">
                <header className="col-span-7">
                    <ul className="flex items-center justify-between w-full text-gray-500 text-sm">
                        <li>{format(today, "MMMM yyyy")}</li>
                        <li className="flex items-center gap-4">
                            <FiChevronLeft />
                            <FiChevronRight />
                        </li>
                    </ul>
                </header>
                {Children.toArray(
                    ["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                        <h6 className="flex flex-col items-center justify-center p-5 rounded-full h-8 w-8">
                            <p className="text-gray-400 font-semibold text-sm">
                                {day}
                            </p>
                        </h6>
                    ))
                )}
                {Children.toArray(
                    days.map((day, index) => {
                        return <Day day={day} index={index} />;
                    })
                )}
            </div>
        </div>
    );
};

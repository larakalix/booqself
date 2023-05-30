"use client";

import { Children } from "react";
import {
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    parse,
    add,
    startOfToday,
    isPast,
} from "date-fns";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Day } from "@/components/book/Day";
import { useBookingStore } from "@/stores/bookingStore";

export const Calendar = ({ appointments }: { appointments: any[] }) => {
    const { selectedDay, currentMonth, setCurrentMonth } = useBookingStore(
        (state) => state
    );
    let today = startOfToday();
    const firstDayOfCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

    let days = eachDayOfInterval({
        start: firstDayOfCurrentMonth,
        end: endOfMonth(firstDayOfCurrentMonth),
    });

    const prevMonth = () => {
        let firstDayNextMonth = add(firstDayOfCurrentMonth, { months: -1 });
        if (isPast(firstDayOfCurrentMonth)) return;
        setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    };

    const nextMonth = () => {
        let firstDayNextMonth = add(firstDayOfCurrentMonth, { months: 1 });
        setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    };

    return (
        <div className="flex flex-col items-center justify-center p-5">
            <div className="grid grid-cols-7 gap-4">
                <header className="col-span-7">
                    <ul className="flex items-center justify-between w-full text-gray-500 text-sm">
                        <li className="font-semibold text-base text-gray-900">
                            {format(firstDayOfCurrentMonth, "MMMM yyyy")}
                        </li>
                        <li className="flex items-center gap-4">
                            <button type="button" onClick={prevMonth}>
                                <FiChevronLeft />
                            </button>
                            <button type="button" onClick={nextMonth}>
                                <FiChevronRight />
                            </button>
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

"use client";

import { Children } from "react";
import {
    eachDayOfInterval,
    endOfMonth,
    format,
    parse,
    add,
    isPast,
} from "date-fns";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Day } from "@/components/book/Day";
import { useBookingStore } from "@/stores/bookingStore";
import type { ITenantAttributes } from "@/types/models/tenant";

type Props = { tenant: ITenantAttributes };

export const Calendar = ({ tenant }: Props) => {
    const { loading, currentMonth, setCurrentMonth } = useBookingStore(
        (state) => state
    );
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
        <div className="flex flex-col items-center justify-between p-5">
            <header>
                <h1 className="text-2xl font-semibold text-black mb-6">
                    {tenant.name}
                </h1>
            </header>
            <div className="grid grid-cols-7 gap-4">
                <header className="col-span-7">
                    <ul className="flex items-center justify-between w-full text-gray-500 text-sm">
                        <li className="font-semibold text-base text-gray-900">
                            {format(firstDayOfCurrentMonth, "MMMM yyyy")}
                        </li>
                        <li className="flex items-center gap-4">
                            <button type="button" onClick={prevMonth}>
                                <FiChevronLeft className="text-2xl" />
                            </button>
                            <button type="button" onClick={nextMonth}>
                                <FiChevronRight className="text-2xl" />
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
            <footer>
                <p className="text-gray-400 text-sm mt-6">
                    For some support, contact us at{" "}
                    <a
                        href={`mailto:${tenant.email}`}
                        className="text-blue-500"
                    >
                        {tenant.email}
                    </a>
                </p>
            </footer>
        </div>
    );
};

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
import { CiGrid41, CiGrid2H } from "react-icons/ci";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useCalendarStore } from "@/stores/bookingStore";
import { Day } from "./day/Day";
import { Card } from "@/kit/card/Card";
import type { IAppointmentFiltered } from "@/types/models/appointment";
import clsx from "clsx";
import { Switch } from "@/kit/form/childs";
import { CalendarStyle } from "@/types/forms/calendar";

export const AppointmentsCalendar = ({
    appointments,
}: {
    appointments: IAppointmentFiltered | null;
}) => {
    const { loading, style, currentMonth, setCurrentMonth, switchStyle } =
        useCalendarStore((state) => state);
    const firstDayOfCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

    const days = eachDayOfInterval({
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

    const calendarStyles = clsx({
        "grid grid-cols-1 md:grid-cols-3 md:grid-cols-7":
            style === CalendarStyle.Grid,
        "grid grid-cols-1": style === CalendarStyle.List,
    });

    return (
        <>
            <header className="w-full flex items-center justify-between p-6">
                <button
                    className="font-bold text-3xl text-gray-900 transition-all hover:text-gray-600"
                    onClick={() => switchStyle()}
                >
                    {style === CalendarStyle.Grid ? <CiGrid41 /> : <CiGrid2H />}
                </button>
            </header>
            <Card className="flex flex-col items-center justify-between mb-2">
                <header className="p-2 w-full">
                    <ul className="flex items-center justify-between text-gray-500 text-sm">
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
                {style === CalendarStyle.Grid && (
                    <div className="w-full hidden md:grid grid-cols-3 md:grid-cols-7 gap-1 overflow-hidden p-1">
                        {Children.toArray(
                            ["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                                <h6 className="flex flex-col items-center justify-center p-5 rounded-full text-gray-400 font-semibold text-sm">
                                    {day}
                                </h6>
                            ))
                        )}
                    </div>
                )}
                <div
                    className={`w-full ${calendarStyles} gap-1 overflow-hidden p-1`}
                >
                    {Children.toArray(
                        days.map((day, index) => {
                            const perDay =
                                appointments?.data.filter((appointment) =>
                                    appointment.appointmentDay.startsWith(
                                        format(day, "yyyy-MM-dd")
                                    )
                                ) ?? [];

                            return (
                                <Day
                                    day={day}
                                    index={index}
                                    appointments={perDay}
                                />
                            );
                        })
                    )}
                </div>
            </Card>
        </>
    );
};

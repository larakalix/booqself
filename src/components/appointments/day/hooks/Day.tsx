"use client";

import { Children } from "react";
import { Subtitle } from "@tremor/react";
import { format, getDay, isPast, parseISO } from "date-fns";
import { useCalendarStore } from "@/stores/bookingStore";
import type { IAppointment } from "@/types/models/appointment";
import { CalendarStyle } from "@/types/forms/calendar";
import { useDay } from "./useDay";

type Props = {
    day: Date;
    index: number;
    appointments: IAppointment[];
};

export const Day = ({ day, index, appointments }: Props) => {
    const { style, selectedDay, selectDay } = useCalendarStore(
        (state) => state
    );
    const { colStartClasses, styles } = useDay({ day, selectedDay, style });

    return (
        <button
            id={`day-${index}`}
            type="button"
            disabled={isPast(day)}
            className={`
            relative border border-bg-card flex flex-col gap-1 items-start justify-start rounded-lg font-light text-sm w-full h-20 md:h-36 xl:h-48 overflow-hidden px-2 py-1
                ${
                    index === 0 &&
                    style === CalendarStyle.Grid &&
                    colStartClasses[getDay(day)]
                }
                ${styles}
            `}
            onClick={() => selectDay(day)}
        >
            <Subtitle className="text-gray-400 text-xs">
                <time dateTime={format(day, "yyyy-MM-dd")}>
                    {style === CalendarStyle.Grid
                        ? format(day, "d")
                        : format(day, "EEEE, MMMM d")}
                </time>
            </Subtitle>

            <section className="flex gap-1 flex-wrap">
                {Children.toArray(
                    appointments.map((appointment, index) =>
                        style === CalendarStyle.Grid ? (
                            <figure className="flex bg-blue-500 text-white rounded-full text-xs px-2 py-1">
                                <Subtitle className="text-start text-white text-xs">
                                    {format(
                                        parseISO(appointment.appointmentDay),
                                        "h:mma"
                                    )}
                                </Subtitle>
                            </figure>
                        ) : (
                            <figure className="flex flex-col gap-2 justify-start bg-blue-500 text-white rounded-lg p-2 ring-2 hover:ring-4">
                                <header>
                                    <Subtitle className="text-start text-white text-xs">
                                        Client: {appointment.name}
                                    </Subtitle>
                                    <Subtitle className="text-white text-xs text-start">
                                        {appointment.service?.name} by{" "}
                                        {appointment.employee?.name}
                                    </Subtitle>
                                </header>
                                <footer>
                                    <Subtitle className="text-white text-xs text-start">
                                        <time
                                            dateTime={format(day, "yyyy-MM-dd")}
                                        >
                                            {format(
                                                parseISO(
                                                    appointment.appointmentDay
                                                ),
                                                "h:mma"
                                            )}
                                        </time>
                                    </Subtitle>
                                </footer>
                            </figure>
                        )
                    )
                )}
            </section>
        </button>
    );
};

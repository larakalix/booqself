"use client";

import { format, isToday, getDay, isEqual } from "date-fns";
import { useBookingStore } from "@/stores/bookingStore";

export const Apointments = ({ appointments }: { appointments: any[] }) => {
    const { selectedDay, selectDay } = useBookingStore((state) => state);

    return (
        <div className="flex items-center justify-center flex-col p-5 border-t border-l-0 md:border-t-0 md:border-l border-gray-300">
            <h2 className="font-semibold text-gray-900">
                Schedule for{" "}
                <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                    {format(selectedDay, "MMM dd, yyy")}
                </time>
            </h2>

            <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                        <>
                            <h1>Appointment</h1>
                        </>
                    ))
                ) : (
                    <p>No appointments for today.</p>
                )}
            </ol>
        </div>
    );
};

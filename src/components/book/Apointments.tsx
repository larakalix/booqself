"use client";

import { format, parseISO } from "date-fns";
import { BsCalendar3 } from "react-icons/bs";
import { useBookingStore, useSuccesBookingStore } from "@/stores/bookingStore";
import { AppointmentForm } from "./AppointmentForm";
import { generateTimeArray } from "@/utils/time";
import type { IFormSelections } from "@/types/forms/form";

export const Apointments = ({ appointments }: { appointments: any[] }) => {
    const { selectedDay, selectDay } = useBookingStore((state) => state);
    const { appointment } = useSuccesBookingStore((state) => state);

    const timeOptions = generateTimeArray<IFormSelections>(
        "9:00 AM",
        "4:00 PM",
        60
    );

    if (appointment && selectedDay) {
        return (
            <div className="flex items-center justify-center flex-col gap-8 p-5 border-t border-l-0 md:border-t-0 md:border-l border-gray-300">
                <header className="w-full max-w-[70%] text-center border-b border-gray-100 pb-4 px-8">
                    <h1 className="font-bold text-black">Confirmed</h1>
                    <h2 className="font-normal text-gray-900">
                        Your appointment has been booked.
                    </h2>
                </header>

                <ul className="text-base text-gray-600">
                    <li className="flex items-center gap-2">
                        <BsCalendar3 />
                        <time dateTime={appointment.attributes.appointmentDay}>
                            {format(
                                parseISO(appointment.attributes.appointmentDay),
                                "h:mma, EEEE, MMMM d, yyyy"
                            )}
                        </time>
                    </li>
                </ul>

                <p className="text-gray-800 font-bold">
                    We will send you an email confirmation shortly.
                </p>
            </div>
        );
    }

    if (!selectedDay) {
        return (
            <div className="flex items-center justify-center flex-col gap-8 p-5 border-t border-l-0 md:border-t-0 md:border-l border-gray-300">
                <h2 className="font-semibold text-gray-900">
                    Select a day to book an appointment.
                </h2>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center flex-col gap-8 p-5 border-t border-l-0 md:border-t-0 md:border-l border-gray-300">
            <h2 className="font-semibold text-gray-900">
                Schedule for{" "}
                <time dateTime={format(selectedDay!, "yyyy-MM-dd")}>
                    {format(selectedDay!, "MMM dd, yyy")}
                </time>
            </h2>

            <AppointmentForm
                selectedDay={selectedDay!}
                timeOptions={timeOptions}
                formFields={[
                    {
                        type: "dropdown",
                        label: "What time?",
                        name: "time",
                        required: true,
                        options: timeOptions,
                    },
                    {
                        type: "text",
                        label: "Name",
                        name: "name",
                        required: true,
                        placeholder: "ex: John Doe",
                    },
                    {
                        type: "text",
                        label: "Email",
                        name: "email",
                        required: true,
                        placeholder: "ex: john_doe@example.com",
                    },
                    {
                        type: "text",
                        label: "Phone",
                        name: "phone",
                        required: true,
                        placeholder: "ex: 555-555-5555",
                    },
                    {
                        type: "text",
                        label: "Comments",
                        name: "comment",
                        required: false,
                        fullWidth: true,
                    },
                ]}
            />

            <ol className="w-full mt-4 space-y-1 text-sm leading-6 text-gray-500 border-t border-gray-300 pt-8 text-center">
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

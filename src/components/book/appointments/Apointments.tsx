"use client";

import { format } from "date-fns";
import { useBookingStore, useSuccesBookingStore } from "@/stores/bookingStore";
import { AppointmentForm } from "../AppointmentForm";
import { generateTimeArray } from "@/utils/time";
import { NoSelectedDay, Success } from "./childs";
import type { IFormSelections } from "@/types/forms/form";
import type { ITenantAttributes } from "@/types/models/tenant";

type Props = { tenant: ITenantAttributes; appointments: any[] };

export const Apointments = ({ tenant, appointments }: Props) => {
    const { selectedDay } = useBookingStore((state) => state);
    const { appointment } = useSuccesBookingStore((state) => state);

    const timeOptions = generateTimeArray<IFormSelections>(
        "9:00 AM",
        "4:00 PM",
        60
    );

    if (appointment && selectedDay)
        return <Success appointment={appointment} />;

    if (!selectedDay) return <NoSelectedDay />;

    return (
        <div className="flex items-center justify-center flex-col gap-8 p-5 border-t border-l-0 md:border-t-0 md:border-l border-gray-300">
            <h2 className="font-semibold text-gray-900">
                Schedule for{" "}
                <time dateTime={format(selectedDay!, "yyyy-MM-dd")}>
                    {format(selectedDay!, "MMM dd, yyy")}
                </time>
            </h2>

            <AppointmentForm
                tenant={tenant}
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

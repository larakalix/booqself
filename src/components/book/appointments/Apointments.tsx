/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import Image from "next/image";
import { format, getMonth, getYear, parse } from "date-fns";
import { useBookingStore, useSuccesBookingStore } from "@/stores/bookingStore";
import { AppointmentForm } from "../AppointmentForm";
import { Availability, NoSelectedDay, Success } from "./childs";
import { useAppointments } from "./hooks/useAppointments";
import { AppointmentService } from "@/services/appointment/AppointmentServices";
import type { ITenantBooking } from "@/types/models/tenant";

export const Apointments = ({
    boilerplate,
}: {
    boilerplate: ITenantBooking;
}) => {
    const {
        loading,
        appointments,
        currentMonth,
        selectedDay,
        setLoading,
        setFlatAppointments,
    } = useBookingStore((state) => state);
    const { appointment } = useSuccesBookingStore((state) => state);
    const { buildDropdownlists } = useAppointments({
        timeOptions: boilerplate.tenant.data.timeOptions,
        appointments,
        selectedDay,
    });

    const { timeOptions, employeeDp, serviceDp } = buildDropdownlists(boilerplate);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const date = parse(currentMonth, "MMMM-yyyy", new Date());

            if (currentMonth) {
                const appointments =
                    await AppointmentService().getBookAppointments(
                        boilerplate.tenant.data.tenantId,
                        `${getMonth(date)}`,
                        `${getYear(date)}`
                    );
                if (appointments) setFlatAppointments(appointments);
            }
        })();

        return () => {};
    }, [currentMonth]);

    if (appointment && selectedDay)
        return <Success appointment={appointment} boilerplate={boilerplate} />;
    if (!selectedDay) return <NoSelectedDay />;

    return (
        <div className="flex items-center justify-center flex-col gap-8 p-5 border-t border-l-0 md:border-t-0 md:border-l border-gray-300 animate-fade">
            <header className="flex gap-2 justify-center items-center">
                <Image
                    src="/icon/pencil.webp"
                    width={40}
                    height={40}
                    alt="Schedule an appointment"
                    loading="lazy"
                />
                {boilerplate?.appointment ? (
                    <h2 className="font-semibold text-gray-900">
                        Scheduled for{" "}
                        <time dateTime={format(selectedDay!, "yyyy-MM-dd")}>
                            {format(
                                new Date(
                                    boilerplate.appointment.attributes.appointmentDay!
                                ),
                                "EEEE MMM dd yyyy, h:mma"
                            )}
                        </time>
                    </h2>
                ) : (
                    <h2 className="font-semibold text-gray-900">
                        Schedule for{" "}
                        <time dateTime={format(selectedDay!, "yyyy-MM-dd")}>
                            {format(selectedDay!, "MMM dd, yyy")}
                        </time>
                    </h2>
                )}
            </header>

            <AppointmentForm
                loading={loading}
                boilerplate={boilerplate}
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
                    employeeDp,
                    serviceDp,
                    {
                        type: "area",
                        label: "Comments",
                        name: "comment",
                        required: false,
                        fullWidth: true,
                    },
                ]}
            />
            <Availability
                selectedDay={selectedDay}
                appointments={appointments}
            />
        </div>
    );
};

/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import { format, getMonth, getYear, parse } from "date-fns";
import { useBookingStore, useSuccesBookingStore } from "@/stores/bookingStore";
import { AppointmentForm } from "../AppointmentForm";
import { Availability, NoSelectedDay, Success } from "./childs";
import { useAppointments } from "./hooks/useAppointments";
import { AppointmentService } from "@/services/appointment/AppointmentServices";
import type { ITenantBooking } from "@/types/models/tenant";

export const Apointments = ({ tenant }: { tenant: ITenantBooking }) => {
    const {
        loading,
        appointments,
        currentMonth,
        selectedDay,
        setLoading,
        setFlatAppointments,
    } = useBookingStore((state) => state);
    const { appointment } = useSuccesBookingStore((state) => state);
    const { buildDropdownlists } = useAppointments();

    const { employeeDp, serviceDp } = buildDropdownlists(tenant);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const date = parse(currentMonth, "MMMM-yyyy", new Date());

            if (currentMonth) {
                const appointments =
                    await AppointmentService().getBookAppointments(
                        tenant.tenantId,
                        `${getMonth(date)}`,
                        `${getYear(date)}`
                    );
                if (appointments) setFlatAppointments(appointments);
            }
        })();

        return () => {};
    }, [currentMonth]);

    if (appointment && selectedDay)
        return <Success appointment={appointment} tenant={tenant} />;

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
                loading={loading}
                tenant={tenant}
                selectedDay={selectedDay!}
                timeOptions={tenant.timeOptions}
                formFields={[
                    {
                        type: "dropdown",
                        label: "What time?",
                        name: "time",
                        required: true,
                        options: tenant.timeOptions,
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

            <Availability appointments={appointments} />
        </div>
    );
};

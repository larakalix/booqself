/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useMemo } from "react";
import { DynamicForm } from "../generic/form/DynamicForm";
import { Appointments } from "../home";
import { useAppoinmentsFilterStore } from "@/stores/filterStore";
import { AppointmentService } from "@/services/appointment/AppointmentServices";
import { EmptyResults } from "../generic/EmptyResults";
import { AppointmentsCalendar } from "./AppointmentsCalendar";

export const AppointmentsWithFilter = () => {
    const { loading, appointments, setLoading, setAppointments } = useAppoinmentsFilterStore((state) => state);

    const handleSubtmit = useMemo(
        () => async (values: any, actions: any) => {
            setLoading(true);
            const { name, email, employee, rangeDate } = values;

            const filteredAppointments = await AppointmentService().getByFilter(
                process.env.NEXT_APP_CLIENT_ID!,
                { name, email, employee, rangeDate, offset: 0, limit: 50 }
            );

            if (filteredAppointments) setAppointments(filteredAppointments);
            actions.setSubmitting(false);
            setLoading(false);
        },
        []
    );

    useEffect(() => {
        (async () => {
            const filteredAppointments = await AppointmentService().getByFilter(
                process.env.NEXT_APP_CLIENT_ID!,
                { offset: 0, limit: 50 }
            );

            if (filteredAppointments) setAppointments(filteredAppointments);
        })();
    }, []);

    return (
        <>
            <AppointmentsCalendar appointments={appointments} />
            <div className="flex flex-col gap-6">
                <DynamicForm
                    formFields={[
                        {
                            name: "name",
                            label: "Client name",
                            type: "text",
                            placeholder: "ex: John Doe",
                        },
                        {
                            name: "email",
                            label: "Email",
                            type: "text",
                            placeholder: "ex: john@doe.com",
                        },
                        {
                            name: "employee",
                            label: "Employee",
                            type: "text",
                            placeholder: "ex: John Doe",
                        },
                        {
                            name: "rangeDate",
                            label: "Range Date",
                            placeholder: "ex: 2021-10-01 - 2021-10-31",
                            type: "date",
                        },
                    ]}
                    config={{
                        buttonLabel: "Search",
                        areFilters: true,
                    }}
                    isLoading={loading}
                    onSubmit={handleSubtmit}
                />

                {!appointments || appointments.data.length === 0 ? (
                    <EmptyResults text="No appointments found" />
                ) : (
                    <Appointments
                        data={appointments.data}
                        meta={appointments.meta}
                    />
                )}
            </div>
        </>
    );
};

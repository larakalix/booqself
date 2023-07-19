/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToasts } from "react-toast-notifications";
import { useAuthStore } from "@/stores/authStore";
import { DynamicForm } from "../generic/form/DynamicForm";
import { Appointments } from "../home";
import { AppointmentService } from "@/services/appointment/AppointmentServices";
import { EmptyResults } from "../generic/EmptyResults";
import { Loading } from "../generic/Loading";
import { AppointmentsCalendar } from "./AppointmentsCalendar";
import { useAppoinmentsFilterStore } from "@/stores/filterStore";

export const AppointmentsWithFilter = ({ page = 1 }: { page: number}) => {
    const { addToast } = useToasts();
    const { loading, appointments, setLoading, setAppointments } = useAppoinmentsFilterStore((state) => state);
    const { refetch, isLoading } = useQuery({
        queryKey: ["getAppointments"],
        queryFn: async () => await AppointmentService().getByFilter(params?.merchant_id!, { offset: page, limit: 15 }),
        onSuccess: (data) => { if (data) {
            useAppoinmentsFilterStore.setState((state) => ({
                ...state,
                appointments: data,
                pagination: data.meta.pagination
            }))
        } },
        onError: (error) => addToast(`${error}`, { appearance: "error", autoDismiss: true }),
    });

    const { params } = useAuthStore((state) => state);

    const handleSubtmit = useMemo(
        () => async (values: any, actions: any) => {
            setLoading(true);
            const { name, email, employee, rangeDate } = values;

            const rows = await AppointmentService().getByFilter(
                params?.merchant_id!,
                { name, email, employee, rangeDate, offset: 4, limit: appointments?.meta.pagination.pageSize }
            );

            if (rows) setAppointments(rows);
            actions.setSubmitting(false);
            setLoading(false);
        },
        []
    );

    useEffect(() => {
        refetch();
    }, [page]);

    return (
        <>
            <div className="hidden md:flex flex-col gap-6">
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

                {isLoading ? (
                    <Loading />
                ) : !appointments || appointments.data.length === 0 ? (
                    <EmptyResults text="No appointments found." />
                ) : (
                    <Appointments
                        data={appointments.data}
                        meta={appointments.meta}
                    />
                )}
            </div>
            
            <hr />

            <AppointmentsCalendar appointments={appointments} />
        </>
    );
};

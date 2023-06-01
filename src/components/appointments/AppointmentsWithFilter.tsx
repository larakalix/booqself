/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import { Card, Text } from "@tremor/react";
import { FiltersForm } from "./FiltersForm";
import { Appointments } from "../home";
import { useAppoinmentsFilterStore } from "@/stores/filterStore";
import { AppointmentService } from "@/services/appointment/AppointmentServices";
import type { IMeta } from "@/types/models/generic";
import type { IAppointment } from "@/types/models/appointment";

export const AppointmentsWithFilter = ({
    appointments: data,
    meta,
}: {
    appointments: IAppointment[];
    meta: IMeta;
}) => {
    const { loading, appointments, setLoading, setAppointments } =
        useAppoinmentsFilterStore((state) => state);

    const handleSubtmit = async (values: any, actions: any) => {
        console.log("handleSubtmit__VALUES", values);
        const { name, email, hideCompleted } = values;

        const filteredAppointments = await AppointmentService().getByFilter(
            process.env.NEXT_APP_CLIENT_ID!,
            { name, email, offset: 0, limit: 10 }
        );

        setAppointments(filteredAppointments?.data || []);
        actions.setSubmitting(false);
    };

    useEffect(() => {
        setAppointments(data);
    }, []);

    if (!appointments) {
        return (
            <Card>
                <div className="flex items-center justify-center">
                    <Text>No appointments found</Text>
                </div>
            </Card>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <FiltersForm
                formFields={[
                    {
                        name: "name",
                        label: "Name",
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
                        name: "hideCompleted",
                        label: "Hide completed",
                        type: "switch",
                    },
                ]}
                config={{
                    buttonLabel: "Search",
                    areFilters: true,
                }}
                submit={handleSubtmit}
            />
            <Appointments data={appointments} meta={meta} />
        </div>
    );
};

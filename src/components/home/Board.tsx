import React from "react";
import { Clients } from "./Clients";
import { Appointments } from "./Appointments";
import type {
    ITenantAppointmentBoilerplate,
    ITenantClientBoilerplate,
} from "@/types/models/tenant";

export const Board = ({
    clients,
    appointments,
}: {
    clients: ITenantClientBoilerplate;
    appointments: ITenantAppointmentBoilerplate;
}) => {
    return (
        <>
            <Clients data={clients.data} meta={clients.meta} showFooter />

            <Appointments
                data={appointments.data}
                meta={appointments.meta}
                showFooter
            />
        </>
    );
};

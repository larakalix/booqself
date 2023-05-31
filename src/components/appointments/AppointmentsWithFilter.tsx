"use client";

import { Card, Text } from "@tremor/react";
import { Appointments } from "../home";
import { FiltersForm } from "./FiltersForm";
import type { IMeta } from "@/types/strapi/generic";
import type { IAppointment } from "@/types/models/appointment";

export const AppointmentsWithFilter = ({
    appointments,
    meta,
}: {
    appointments: IAppointment[];
    meta: IMeta;
}) => {
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
        <div>
            <FiltersForm />
            <Appointments appointments={appointments} meta={meta} />
        </div>
    );
};

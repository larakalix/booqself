"use client";

import { Card, Text } from "@tremor/react";
import { FiltersForm } from "./FiltersForm";
import { Appointments } from "../home";
import type { IMeta } from "@/types/models/generic";
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
            <Appointments data={appointments} meta={meta} />
        </div>
    );
};

"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Title, Text, BarChart } from "@tremor/react";
import { kFormatter } from "@/utils/format";
import { AppointmentService } from "@/services/appointment/AppointmentServices";
import { useAuthStore } from "@/stores/authStore";
import type { IAppointment } from "@/types/models/appointment";

interface AppointmentsByMonth {
    month: string;
    "Appointments on morning": number;
    "Appointments on afternoon": number;
    Total: number;
}

function materializeAppointments(appointments: IAppointment[]): AppointmentsByMonth[] {
    const groupedAppointments: { [month: string]: { morning: number; afternoon: number } } = {};

    appointments.forEach((appointment) => {
        const appointmentDate = new Date(appointment.appointmentDay);
        const month = appointmentDate.toLocaleString("default", {
            month: "long",
        });

        groupedAppointments[month] = groupedAppointments[month] || { morning: 0, afternoon: 0 };
        groupedAppointments[month][appointmentDate.getHours() < 12 ? "morning" : "afternoon"]++;
    });

    const result = Object.entries(groupedAppointments).map(
        ([month, { morning, afternoon }]) => ({
            month,
            "Appointments on morning": morning,
            "Appointments on afternoon": afternoon,
            Total: morning + afternoon,
        })
    );

    result.sort((a, b) => new Date(`1 ${a.month}`).getMonth() - new Date(`1 ${b.month}`).getMonth());

    return result;
}

export const Charts = () => {
    const [appointments, setAppointments] = useState<AppointmentsByMonth[]>([]);
    useQuery(
        ["getAppointments"],
        async () => await AppointmentService().getByFilter(params?.merchant_id!, { offset: 0, limit: 50 }),
        {
            refetchInterval: 7200,
            onSuccess: (data) => {
                if (data) setAppointments(materializeAppointments(data.data));
            },
        }
    );

    const { params } = useAuthStore((state) => state);

    return (
        <>
            <BarChart
                className="mt-4 h-80"
                data={appointments}
                index="month"
                categories={[
                    "Total",
                    "Appointments on morning",
                    "Appointments on afternoon",
                ]}
                colors={["green", "blue", "orange"]}
                stack={false}
                valueFormatter={kFormatter}
            >
                <Title>Performance</Title>
                <Text>Comparison between Sales and Profit</Text>
            </BarChart>
        </>
    );
};

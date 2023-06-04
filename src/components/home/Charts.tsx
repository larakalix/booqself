"use client";

import { Title, Text, BarChart } from "@tremor/react";
import { kFormatter } from "@/utils/format";

const data = [
    {
        Month: "Jan 23",
        Clients: 2890,
        Appointments: 2400,
    },
    {
        Month: "Feb 23",
        Clients: 1890,
        Appointments: 1398,
    },
    {
        Month: "Mar 23",
        Clients: 3890,
        Appointments: 2980,
    },
    {
        Month: "Apr 23",
        Clients: 4890,
        Appointments: 3980,
    },
    {
        Month: "May 23",
        Clients: 5890,
        Appointments: 4980,
    },
    {
        Month: "Jun 23",
        Clients: 6890,
        Appointments: 5980,
    },
];

export const Charts = () => {
    return (
        <>
            <BarChart
                className="mt-4 h-80"
                data={data}
                index="Month"
                categories={["Clients", "Appointments"]}
                colors={["green", "blue"]}
                stack={false}
                valueFormatter={kFormatter}
            >
                <Title>Performance</Title>
                <Text>Comparison between Sales and Profit</Text>
            </BarChart>
        </>
    );
};

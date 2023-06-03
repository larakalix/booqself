"use client";

import { kFormatter } from "@/utils/format";
import { Title, LineChart } from "@tremor/react";
import { useState } from "react";

export const Charts = () => {
    const [data, setData] = useState([
        {
            month: "Jan 23",
            Appointments: 500,
            Clients: 1_000,
        },
        {
            month: "Feb 23",
            Appointments: 340,
            Clients: 2_312,
        },
        {
            month: "Mar 23",
            Appointments: 231,
            Clients: 2_789,
        },
        {
            month: "April 23",
            Appointments: 420,
            Clients: 3_321,
        },
        {
            month: "May 23",
            Appointments: 1290,
            Clients: 3_992,
        },
        {
            month: "Jun 2023",
            Appointments: 213,
            Clients: 4_317,
        },
    ]);
    return (
        <>
            <Title>Export/Import Growth Rates (2020 to 2023)</Title>
            <LineChart
                data={data}
                index="month"
                categories={["Appointments", "Clients"]}
                colors={["blue", "green"]}
                valueFormatter={kFormatter}
                yAxisWidth={40}
            />
        </>
    );
};

import React, { Children } from "react";
import Link from "next/link";
import { useTenantStore } from "@/stores/tenantStore";
import { Header } from "./Header";
import { Card, CardTitle } from "@/kit/card/Card";
import { Charts } from "./Charts";
import { AdviceCard } from "../generic/AdviceCard";
import { ROUTES } from "@/ constants/routes";
import { Latest } from "./Latest";

export const Board = () => {
    const { tenant } = useTenantStore((state) => state);
    const tiles = [
        {
            route: ROUTES.APPOINTMENTS,
            title: "Appointments",
        },
        {
            route: ROUTES.CLIENTS,
            title: "Clients",
        },
        {
            route: ROUTES.EMPLOYEES,
            title: "Employees",
        },
        {
            route: ROUTES.SERVICES,
            title: "Services",
        },
        {
            route: ROUTES.ORDERS,
            title: "Orders",
        },
    ];

    if (!tenant) {
        return (
            <AdviceCard
                title="No tenant found"
                description="No tenant found, please contact support."
            />
        );
    }

    return (
        <>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Header tenant={tenant} />

                <Latest />

                <div className="md:col-span-2">
                    <Charts />
                </div>

                <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                    {Children.toArray(
                        tiles.map((tile) => (
                            <Card className="h-full flex flex-col justify-between">
                                <CardTitle className="text-xl font-bold p-4">
                                    {tile.title}
                                </CardTitle>

                                <Link
                                    href={tile.route}
                                    className="text-blue-500 text-sm p-4"
                                >
                                    View more
                                </Link>
                            </Card>
                        ))
                    )}
                </div>
            </section>
        </>
    );
};

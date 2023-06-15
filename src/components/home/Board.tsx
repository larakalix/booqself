import React, { Children } from "react";
import Link from "next/link";
import { useTenantStore } from "@/stores/tenantStore";
import { Header } from "./Header";
import { Card, CardTitle } from "@/kit/card/Card";
import { Charts } from "./Charts";
import { AdviceCard } from "../generic/AdviceCard";
import { ROUTES } from "@/ constants/routes";

export const Board = () => {
    const { tenant } = useTenantStore((state) => state);
    const tiles = [
        {
            route: ROUTES.CLIENTS,
            title: "Clients",
        },
        {
            route: ROUTES.APPOINTMENTS,
            title: "Appointments",
        },
        {
            route: ROUTES.EMPLOYEES,
            title: "Employees",
        },
        {
            route: ROUTES.SERVICES,
            title: "Services",
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
            <Header tenant={tenant} />

            {/* <Card>
                <Charts appointments={tenant.appointments.data ?? []} />
            </Card> */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Children.toArray(
                    tiles.map((tile) => (
                        <Card className="h-[10rem] flex flex-col justify-between">
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
        </>
    );
};

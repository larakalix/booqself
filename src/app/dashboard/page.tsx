import Link from "next/link";

import { Children } from "react";
import { Card, CardTitle } from "@/kit/card/Card";
import { Header } from "@/components/home";
import { PageWrapper } from "@/components/wrapper/PageWrapper";
import { Charts } from "@/components/home/Charts";
import { TenantService } from "@/services/tenant/TenantService";
import { ROUTES } from "@/ constants/routes";
import type { ITenantAttributes } from "@/types/models/tenant";

export default async function Dashboard() {
    // const { tenant } = await TenantService().getTenantBoilerplate(
    //     process.env.NEXT_APP_CLIENT_ID!
    // );

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

    return (
        <PageWrapper className="flex flex-col gap-8">
            {/* <Header tenant={props as ITenantAttributes} /> */}

            <Card>
                <Charts />
            </Card>
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
        </PageWrapper>
    );
}

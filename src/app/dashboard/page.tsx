import Link from "next/link";
import { Card, Title } from "@tremor/react";
import { Header } from "@/components/home";
import { PageWrapper } from "@/components/wrapper/PageWrapper";
import { Charts } from "@/components/home/Charts";
import { TenantService } from "@/services/tenant/TenantService";
import { ROUTES } from "@/ constants/routes";
import type { ITenantAttributes } from "@/types/models/tenant";

export default async function Dashboard() {
    const { clients, appointments, ...props } =
        await TenantService().getTenantBoilerplate(
            process.env.NEXT_APP_CLIENT_ID!
        );

    return (
        <PageWrapper className="flex flex-col gap-8">
            <Header tenant={props as ITenantAttributes} />

            <Card>
                <Charts />
            </Card>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="h-[10rem] flex flex-col justify-between">
                    <Title className="text-xl font-bold">Clients</Title>

                    <Link
                        href={ROUTES.CLIENTS}
                        className="text-blue-500 text-sm"
                    >
                        View more
                    </Link>
                </Card>
                <Card className="h-[10rem] flex flex-col justify-between">
                    <Title className="text-xl font-bold">Appointments</Title>

                    <Link
                        href={ROUTES.APPOINTMENTS}
                        className="text-blue-500 text-sm"
                    >
                        View more
                    </Link>
                </Card>
                <Card className="h-[10rem] flex flex-col justify-between">
                    <Title className="text-xl font-bold">Employees</Title>

                    <Link
                        href={ROUTES.EMPLOYEES}
                        className="text-blue-500 text-sm"
                    >
                        View more
                    </Link>
                </Card>
                <Card className="h-[10rem] flex flex-col justify-between">
                    <Title className="text-xl font-bold">Services</Title>

                    <Link
                        href={ROUTES.SERVICES}
                        className="text-blue-500 text-sm"
                    >
                        View more
                    </Link>
                </Card>
            </div>
        </PageWrapper>
    );
}

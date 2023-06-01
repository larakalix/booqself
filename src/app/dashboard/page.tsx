import { Header } from "@/components/home";
import { PageWrapper } from "@/components/wrapper/PageWrapper";
import { TenantService } from "@/services/tenant/TenantService";
import { Board } from "@/components/home/Board";
import type { ITenantAttributes } from "@/types/models/tenant";

export default async function Dashboard() {
    const { clients, appointments, ...props } =
        await TenantService().getTenantBoilerplate(
            process.env.NEXT_APP_CLIENT_ID!
        );

    console.log("__CLIENTS__", props);

    return (
        <PageWrapper className="flex flex-col gap-8">
            <Header tenant={props as ITenantAttributes} />

            <Board clients={clients} appointments={appointments} />
        </PageWrapper>
    );
}

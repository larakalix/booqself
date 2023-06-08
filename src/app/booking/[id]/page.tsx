import { Card } from "@tremor/react";
import { Apointments, Calendar } from "@/components/book";
import { TenantService } from "@/services/tenant/TenantService";
import { AdviceCard } from "@/components/generic/AdviceCard";

type Props = {
    params: { id: string };
};

export default async function BookingById({ params: { id } }: Props) {
    const boilerplate = await TenantService().getTenantBookBoilerplate(
        {
            id,
            justTenant: false,
        },
        process.env.NEXT_CLOVER_APP_SECRET!
    );

    if (!boilerplate.tenant) {
        return (
            <AdviceCard
                title="No tenant found."
                description="No tenant found. Please check your tenant and try, or
                contact your administrator."
            />
        );
    }

    if (boilerplate.tenant && !boilerplate.tenant.data.isActive) {
        return (
            <AdviceCard
                title="Your tenant is not active."
                description="Please contact your administrator."
            />
        );
    }

    return (
        <section className="min-h-screen w-full p-5">
            <Card className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[calc(100vh-2.5rem)] p-0">
                <Calendar tenant={boilerplate.tenant.data} />
                <Apointments boilerplate={boilerplate} />
            </Card>
        </section>
    );
}

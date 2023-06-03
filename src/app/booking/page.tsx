import { Card } from "@tremor/react";
import { Apointments, Calendar } from "@/components/book";
import { TenantService } from "@/services/tenant/TenantService";
import { AdviceCard } from "@/components/generic/AdviceCard";

export default async function Booking() {
    const { tenant } = await TenantService().getTenantById({
        id: process.env.NEXT_APP_CLIENT_ID!,
    });

    if (!tenant) {
        return (
            <AdviceCard
                title="No tenant found."
                description="No tenant found. Please check your tenant and try, or
                contact your administrator."
            />
        );
    }

    if (!tenant.isActive) {
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
                <Calendar tenant={tenant} />
                <Apointments tenant={tenant} />
            </Card>
        </section>
    );
}

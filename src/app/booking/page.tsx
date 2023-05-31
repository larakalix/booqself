import { Card } from "@tremor/react";
import { Apointments, Calendar } from "@/components/book";
import { TenantService } from "@/services/tenant/TenantService";

export default async function Booking() {
    const { tenant } = await TenantService().getTenantById({
        id: process.env.NEXT_APP_CLIENT_ID!,
    });

    return (
        <section className="min-h-screen w-full p-5">
            <Card className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[calc(100vh-2.5rem)] p-0">
                <Calendar tenant={tenant} appointments={[]} />
                <Apointments tenant={tenant} appointments={[]} />
            </Card>
        </section>
    );
}

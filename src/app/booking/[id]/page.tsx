import { Card } from "@tremor/react";
import { Apointments, Calendar } from "@/components/book";
import { TenantService } from "@/services/tenant/TenantService";

type Props = {
    params: { id: string };
};

export default async function BookingById({ params: { id } }: Props) {
    const { tenant } = await TenantService().getTenantById({
        id,
    });

    if (!tenant) {
        return (
            <section className="min-h-screen w-full p-5">
                <Card className="flex items-center justify-center min-h-[calc(100vh-2.5rem)] p-0">
                    <h1 className="text-xl">
                        No tenant found. Please check your tenant id and try, or
                        contact your administrator.
                    </h1>
                </Card>
            </section>
        );
    }

    return (
        <section className="min-h-screen w-full p-5">
            <Card className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[calc(100vh-2.5rem)] p-0">
                <Calendar tenant={tenant} appointments={[]} />
                <Apointments tenant={tenant} appointments={[]} />
            </Card>
        </section>
    );
}

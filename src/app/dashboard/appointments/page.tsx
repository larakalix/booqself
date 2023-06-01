import { PageWrapper } from "@/components/wrapper/PageWrapper";
import { AppointmentService } from "@/services/appointment/AppointmentServices";
import { AppointmentsWithFilter } from "@/components/appointments/AppointmentsWithFilter";
import type { IMeta } from "@/types/models/generic";

export default async function AppointmentsPage() {
    const result = await AppointmentService().getByFilter(
        process.env.NEXT_APP_CLIENT_ID!,
        { offset: 0, limit: 10 }
    );

    return (
        <PageWrapper>
            <header className="w-full lg:flex lg:items-center lg:justify-between p-6">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Appointments
                    </h2>
                </div>
            </header>

            <AppointmentsWithFilter
                appointments={result?.data ?? []}
                meta={result?.meta ?? ({} as IMeta)}
            />
        </PageWrapper>
    );
}

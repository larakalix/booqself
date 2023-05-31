import { AppointmentsWithFilter } from "@/components/appointments/AppointmentsWithFilter";
import { PageWrapper } from "@/components/wrapper/PageWrapper";
import { AppointmentService } from "@/services/appointment/AppointmentServices";

export default async function SummaryPage() {
    const data = await AppointmentService().getByFilter({
        email: "",
    });

    return (
        <PageWrapper>
            <header className="w-full lg:flex lg:items-center lg:justify-between p-8 border-b border-gray-200">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Appointments
                    </h2>
                </div>
            </header>

            <AppointmentsWithFilter
                appointments={data.appointments}
                meta={data.meta}
            />
        </PageWrapper>
    );
}

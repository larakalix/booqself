import { PageWrapper } from "@/components/wrapper/PageWrapper";
import { AppointmentsWithFilter } from "@/components/appointments/AppointmentsWithFilter";

export default function AppointmentsPage() {
    return (
        <PageWrapper title="Appointments">
            <AppointmentsWithFilter />
        </PageWrapper>
    );
}

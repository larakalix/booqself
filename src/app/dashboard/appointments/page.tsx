import { PageWrapper } from "@/components/wrapper/PageWrapper";
import { AppointmentsWithFilter } from "@/components/appointments/AppointmentsWithFilter";

type Props = {
    searchParams: { page?: number };
};

export default async function AppointmentsPage({ searchParams }: Props) {
    const { page } = searchParams;

    return (
        <PageWrapper title="Appointments">
            <AppointmentsWithFilter page={page ?? 1} />
        </PageWrapper>
    );
}

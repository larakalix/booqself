import { ClientSummary } from "@/components/client/ClientSummary";
import { PageWrapper } from "@/components/wrapper/PageWrapper";
import { AppointmentService } from "@/services/appointment/AppointmentServices";
import { ClientService } from "@/services/client/ClientService";
import type { IAppointment } from "@/types/models/appointment";

export default async function SummaryPage({
    params: { id },
}: {
    params: { id: number };
}) {
    const client = await ClientService().getClientById(id);
    let appointments: IAppointment[] = [];
    if (client) {
        appointments = await AppointmentService().getClientAppointments(
            process.env.NEXT_APP_CLIENT_ID!,
            client.emailAddressesList[0].emailAddress
        );
    }

    return (
        <PageWrapper>
            <ClientSummary client={client} appointments={appointments} />
        </PageWrapper>
    );
}

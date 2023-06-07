import { ClientSummary } from "@/components/client/ClientSummary";
import { RouteModal } from "@/components/generic";
import { AppointmentService } from "@/services/appointment/AppointmentServices";
import { ClientService } from "@/services/client/ClientService";
import type { IAppointment } from "@/types/models/appointment";

export default async function SummaryModal({
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
        <RouteModal showClose>
            <ClientSummary client={client} appointments={appointments} />
        </RouteModal>
    );
}

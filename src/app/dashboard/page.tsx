import { Appointments, Clients, Header } from "@/components/home";
import { PageWrapper } from "@/components/wrapper/PageWrapper";
import { ClientService } from "@/services/client/ClientService";
import { AppointmentService } from "@/services/appointment/AppointmentServices";

export default async function Dashboard() {
    const fetchClients = await ClientService().getClients();
    const fetchAppointments = await AppointmentService().getAppointments({});

    return (
        <PageWrapper className="flex flex-col gap-8">
            <Header />

            <Clients clients={fetchClients.clients} meta={fetchClients.meta} />

            <Appointments
                appointments={fetchAppointments.appointments}
                meta={fetchAppointments.meta}
            />
        </PageWrapper>
    );
}

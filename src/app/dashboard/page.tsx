import { Appointments, Clients, Header } from "@/components/home";
import { PageWrapper } from "@/components/wrapper/PageWrapper";
import { TenantService } from "@/services/tenant/TenantService";
import { ClientService } from "@/services/client/ClientService";
import { AppointmentService } from "@/services/appointment/AppointmentServices";

export default async function Dashboard() {
    const { tenant } = await TenantService().getTenantById({
        id: process.env.NEXT_APP_CLIENT_ID!,
    });
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

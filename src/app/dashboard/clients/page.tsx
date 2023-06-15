import { PageWrapper } from "@/components/wrapper/PageWrapper";
import { ClientsWithFilter } from "@/components/client/ClientsWithFilter";

export default function ClientsPage() {
    return (
        <PageWrapper title="Clients">
            <ClientsWithFilter />
        </PageWrapper>
    );
}

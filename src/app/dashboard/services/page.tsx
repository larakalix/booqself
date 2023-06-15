import { PageWrapper } from "@/components/wrapper/PageWrapper";
import { ServicesWithFilter } from "@/components/services/ServicesWithFilter";

export default function ServicesPage() {
    return (
        <PageWrapper title="Services">
            <ServicesWithFilter />
        </PageWrapper>
    );
}

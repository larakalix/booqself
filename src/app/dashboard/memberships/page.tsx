import { PageWrapper } from "@/components/wrapper/PageWrapper";
import { MembershipsWithFilter } from "@/components/membership/MembershipsWithFilter";

export default function MembershipsPage() {
    return (
        <PageWrapper title="Memberships">
            <MembershipsWithFilter />
        </PageWrapper>
    );
}

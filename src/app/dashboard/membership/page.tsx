import { PageWrapper } from "@/components/wrapper/PageWrapper";
import { MembershipForm } from "@/components/membership/MembershipForm";

export default function NewMembershipPage() {
    return (
        <PageWrapper title="New membership">
            <MembershipForm />
        </PageWrapper>
    );
}

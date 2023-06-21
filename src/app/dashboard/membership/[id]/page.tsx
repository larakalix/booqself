import { PageWrapper } from "@/components/wrapper/PageWrapper";
import { MembershipForm } from "@/components/membership/MembershipForm";

type Props = {
    params: { id: number };
};

export default function UpdateMembershipPage({ params: { id } }: Props) {
    return (
        <PageWrapper title="Update membership">
            <MembershipForm id={id} />
        </PageWrapper>
    );
}

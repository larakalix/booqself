import { PageWrapper } from "@/components/wrapper/PageWrapper";
import { MembershipForm } from "@/components/membership/MembershipForm";

type Props = {
    params: { id: string };
};

export default function UpdateMembershipPage({ params: { id } }: Props) {
    return (
        <PageWrapper title="Update membership">
            <MembershipForm id={id} />
        </PageWrapper>
    );
}

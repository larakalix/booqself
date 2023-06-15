import { PageWrapper } from "@/components/wrapper/PageWrapper";
import { EmployeesWithFilter } from "@/components/employees/EmployeesWithFilter";

export default function EmployeesPage() {
    return (
        <PageWrapper title="Employees">
            <EmployeesWithFilter />
        </PageWrapper>
    );
}

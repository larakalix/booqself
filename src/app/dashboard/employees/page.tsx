// import { useEffect } from "react";
import { PageWrapper } from "@/components/wrapper/PageWrapper";
import { EmployeesWithFilter } from "@/components/employees/EmployeesWithFilter";

export default function EmployeesPage() {
    // useEffect(() => {}, []);

    return (
        <PageWrapper>
            <header className="w-full lg:flex lg:items-center lg:justify-between p-6">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Employees
                    </h2>
                </div>
            </header>

            <EmployeesWithFilter
                merchantId="S4SA1MP87BQQ1"
                apiKey="f76b3aa6-aa0a-d159-6426-7bd38453d5c4"
            />
        </PageWrapper>
    );
}

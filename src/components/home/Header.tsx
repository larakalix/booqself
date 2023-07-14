"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@tremor/react";
import { useHeader } from "./hooks/useHeader";
import { useAuthStore } from "@/stores/authStore";
import { EmployeeService } from "@/services/employee/EmployeeService";
import { useEmployeeStore } from "@/stores/employeeStore";
import { AdviceCard } from "../generic/AdviceCard";
import type { ITenantAttributes } from "@/types/models/tenant";

export const Header = ({ tenant }: { tenant: ITenantAttributes }) => {
    const { greetings } = useHeader();
    const { params } = useAuthStore((state) => state);
    const { setEmployee } = useEmployeeStore((state) => state);
    const { data, isLoading, error } = useQuery({
        queryKey: ["getMerchantById", { id: params?.merchant_id!, justTenant: false }],
        queryFn: async () => await EmployeeService().getEmployeeById(params?.employee_id!, params?.merchant_id!, process.env.NEXT_CLOVER_APP_SECRET!),
        onSuccess: (data) => { if (data) setEmployee(data); },
    });

    if (!data || error) {
        return (
            <AdviceCard
                title="An error has ocurred"
                description="An error has ocurred, please contact support."
            />
        );
    }

    return (
        <header className="flex items-center justify-between">
            <Card className="flex justify-between items-center w-full h-full">
                {tenant && (
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">
                            Welcome to {tenant.name}!
                        </h1>
                        <h2>{ greetings } { data.name }!</h2>

                        <a
                            href={`mailto:${tenant.email}`}
                            className="text-blue-600"
                        >
                            Contact us, we&apos;ll help you!
                        </a>
                    </div>
                )}

                <Image
                    src="/images/jump.webp"
                    width={256}
                    height={256}
                    alt="No selected day"
                    loading="lazy"
                />
            </Card>
        </header>
    );
};

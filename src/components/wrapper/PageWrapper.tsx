/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ToastProvider } from "react-toast-notifications";
import { useAuthStore } from "@/stores/authStore";
import { useTenantStore } from "@/stores/tenantStore";
import { QueryProvider } from "@/context/QueryProvider";
import { TenantService } from "@/services/tenant/TenantService";
import { AdviceCard } from "../generic/AdviceCard";
import type { AuthParamProps } from "@/types/auth/auth";

type Props = {
    title?: string;
    className?: string;
    children: React.ReactNode;
};

const InnerComponent = ({
    params,
    children,
}: Props & {
    params: AuthParamProps;
}) => {
    const { data, isLoading, error } = useQuery(
        ["getTenantById"],
        async () =>
            await TenantService().getTenantById({
                id: params?.merchant_id!,
                justTenant: false,
            }),
        {
            onSuccess: (data) => {
                if (data) setTenant(data, true);
            },
        }
    );

    const { tenant, setTenant } = useTenantStore((state) => state);

    if (isLoading) {
        return (
            <AdviceCard
                title="Please wait"
                description="Retrieveing tenant data, please wait..."
                isLoader
            />
        );
    }

    if (error) {
        return (
            <AdviceCard
                title="An error has ocurred"
                description="An error has ocurred, please contact support."
            />
        );
    }

    return children as React.ReactElement;
};

export const PageWrapper = ({ title, className = "", children }: Props) => {
    const { push } = useRouter();
    const { params } = useAuthStore((state) => state);

    useEffect(() => {
        if (!params) push("/");

        return () => {};
    }, []);

    return (
        <QueryProvider>
            <InnerComponent params={params!}>
                <ToastProvider>
                    <section
                        className={`min-h-screen w-full ml-0 xl:ml-60 p-5 ${className}`}
                    >
                        {title && (
                            <header className="w-full lg:flex lg:items-center lg:justify-between p-6">
                                <div className="min-w-0 flex-1">
                                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                                        {title}
                                    </h2>
                                </div>
                            </header>
                        )}

                        {children}
                    </section>
                </ToastProvider>
            </InnerComponent>
        </QueryProvider>
    );
};

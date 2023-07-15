"use client";

import { ToastProvider } from "react-toast-notifications";
import { useQuery } from "@tanstack/react-query";
import { TenantService } from "@/services/tenant/TenantService";
import { Card } from "@/kit/card/Card";
import { AdviceCard } from "@/components/generic/AdviceCard";
import { Calendar } from "./Calendar";
import { Appointments } from "./appointments/Appointments";

type Props = {
    id: string;
    appointmentId?: string;
    employeeId?: string;
};

export const BookingBoard = ({ id, appointmentId }: Props) => {
    const {
        data: boilerplate,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["tenantBookBoilerplate", id, appointmentId],
        queryFn: async () => await TenantService().getTenantBookBoilerplate({ id, justTenant: false, appointmentId }, process.env.NEXT_CLOVER_APP_SECRET!),
    }); 

    if (isLoading) {
        return (
            <AdviceCard
                title="Please wait"
                description="Retrieveing tenant data, please wait..."
                isLoader
            />
        );
    }

    if (error || !boilerplate || !boilerplate.tenant) {
        return (
            <AdviceCard
                title="No tenant found."
                description="No tenant found. Please check your tenant and try, or contact your administrator."
            />
        );
    }

    if (boilerplate.tenant && !boilerplate.tenant.data.isActive) {
        return (
            <AdviceCard
                title="Your tenant is not active."
                description="Please contact your administrator."
            />
        );
    }

    return (
        <ToastProvider>
            <Card className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[calc(100vh-2.5rem)] p-0">
                <Calendar boilerplate={boilerplate} />
                <Appointments boilerplate={boilerplate} />
            </Card>
        </ToastProvider>
    );
};

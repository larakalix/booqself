/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { TenantService } from "@/services/tenant/TenantService";
import { Card } from "@/kit/card/Card";
import { AdviceCard } from "@/components/generic/AdviceCard";
import { Calendar } from "./Calendar";
import { Apointments } from "./appointments/Apointments";
import type { ITenantBooking } from "@/types/models/tenant";

type Props = {
    id: string;
    appointmentId?: string;
};

export const BookingBoard = ({ id, appointmentId }: Props) => {
    const [boilerplate, setBoilerplate] = useState<ITenantBooking | null>(null);

    useEffect(() => {
        (async () => {
            const boilerplate = await TenantService().getTenantBookBoilerplate(
                {
                    id,
                    justTenant: false,
                    appointmentId,
                },
                process.env.NEXT_CLOVER_APP_SECRET!
            );

            setBoilerplate(boilerplate);
        })();
    }, []);

    if (!boilerplate || !boilerplate.tenant) {
        return (
            <AdviceCard
                title="No tenant found."
                description="No tenant found. Please check your tenant and try, or
                contact your administrator."
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
        <Card className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[calc(100vh-2.5rem)] p-0">
            <Calendar boilerplate={boilerplate} />
            <Apointments boilerplate={boilerplate} />
        </Card>
    );
};

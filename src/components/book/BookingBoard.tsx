/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { TenantService } from "@/services/tenant/TenantService";
import { Card } from "@/kit/card/Card";
import { AdviceCard } from "@/components/generic/AdviceCard";
import { Calendar } from "./Calendar";
import { Apointments } from "./appointments/Apointments";
import type { ITenantBooking } from "@/types/models/tenant";

export const BookingBoard = ({ id }: { id: string }) => {
    const [boilerplate, setBoilerplate] = useState<ITenantBooking | null>(null);

    useEffect(() => {
        (async () => {
            const boilerplate = await TenantService().getTenantBookBoilerplate(
                {
                    id,
                    justTenant: false,
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
            <Calendar tenant={boilerplate.tenant.data} />
            <Apointments boilerplate={boilerplate} />
        </Card>
    );
};

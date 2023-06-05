"use client";

import { useEffect, useMemo } from "react";
import { DynamicForm } from "../generic/form/DynamicForm";
import { TenantService } from "@/services/tenant/TenantService";
import { useTenantStore } from "@/stores/tenantStore";
import { SettingsForm } from "./SettingsForm";
import { Card } from "@/kit/card/Card";
import { generateTimes } from "@/utils/time";
import { IOptionable } from "@/types/models/generic";

export const SettingsBoard = () => {
    const { loading, tenant, setTenant } = useTenantStore((state) => state);

    const timeOptions: IOptionable[] = useMemo(
        () =>
            generateTimes().map((time, index) => ({
                label: time,
                value: `index-${index}`,
            })),
        []
    );

    useEffect(() => {
        (async () => {
            // Retreive Tenant Settings
            const { tenant } = await TenantService().getTenantById({
                id: process.env.NEXT_APP_CLIENT_ID!,
                justTenant: true,
            });

            setTenant(tenant);
        })();
    }, []);

    return (
        <Card className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SettingsForm
                loading={loading}
                tenant={tenant}
                formFields={[
                    {
                        name: "name",
                        label: "Name",
                        type: "text",
                    },
                    {
                        name: "email",
                        label: "Email",
                        type: "text",
                    },
                    {
                        name: "cloverMerchantId",
                        label: "Merchant ID (Clover)",
                        type: "text",
                    },
                    {
                        name: "minutesInterval",
                        label: "Minutes Interval",
                        type: "text",
                    },
                    {
                        name: "openingTime",
                        label: "Opening Time",
                        type: "dropdown",
                        required: true,
                        options: timeOptions,
                    },
                    {
                        name: "closingTime",
                        label: "Closing Time",
                        type: "dropdown",
                        required: true,
                        options: timeOptions,
                    },
                    {
                        name: "isActive",
                        label: "Active/Inactive",
                        type: "switch",
                        required: false,
                    },
                ]}
            />
        </Card>
    );
};

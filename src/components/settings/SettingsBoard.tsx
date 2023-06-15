/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTenantStore } from "@/stores/tenantStore";
import { useAuthStore } from "@/stores/authStore";
import { TenantService } from "@/services/tenant/TenantService";
import { SettingsForm } from "./SettingsForm";
import { Card } from "@/kit/card/Card";
import { AdviceCard } from "../generic/AdviceCard";
import { generateTimes } from "@/utils/time";
import type { IOptionable } from "@/types/models/generic";

export const SettingsBoard = () => {
    const { tenant } = useTenantStore((state) => state);

    // const timeOptions: IOptionable[] = useMemo(
    //     () =>
    //         generateTimes().map((time, index) => ({
    //             label: time,
    //             value: `index-${index}`,
    //         })),
    //     []
    // );

    if (!tenant) {
        return (<AdviceCard title="No tenant found" description="No tenant found, please contact support." />);
    }

    return (
        <Card className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SettingsForm
                loading={false}
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
                        name: "timeZone",
                        label: "Time Zone",
                        type: "text",
                    },
                    // {
                    //     name: "openingTime",
                    //     label: "Opening Time",
                    //     type: "dropdown",
                    //     required: false,
                    //     options: timeOptions,
                    // },
                    // {
                    //     name: "closingTime",
                    //     label: "Closing Time",
                    //     type: "dropdown",
                    //     required: false,
                    //     options: timeOptions,
                    // },
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

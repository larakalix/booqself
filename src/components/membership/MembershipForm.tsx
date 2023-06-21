/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { CiCircleInfo } from "react-icons/ci";
import { useToasts } from "react-toast-notifications";
import { useAuthStore } from "@/stores/authStore";
import { useAppointment } from "./hooks/useAppointment";
import { useTenantStore } from "@/stores/tenantStore";
import { Card } from "@/kit/card/Card";
import { DynamicForm } from "../generic/form/DynamicForm";
import { ServiceService } from "@/services/service/ServiceService";
import { FormikHelpers } from "formik";
import { MembershipService } from "@/services/membership/MembershipService";
import { ROUTES } from "@/ constants/routes";
import type { IFormMembership } from "@/types/models/membership";
import type { IService } from "@/types/models/service";

type Props = {
    id?: number;
};

export const MembershipForm = ({ id }: Props) => {
    const router = useRouter();
    const [services, setServices] = useState<IService[]>([]);
    const { buildDropdownlists } = useAppointment();
    const { addToast } = useToasts();
    const { data, isLoading, error } = useQuery(
        ["getCloverServicesForMembership"],
        async () =>
            await ServiceService().getCloverServices(
                params?.merchant_id!,
                process.env.NEXT_CLOVER_APP_SECRET!
            ),
        {
            onSuccess: (data) => {
                if (data) setServices(data);
            },
            onError: (error) =>
                addToast(`${error}`, {
                    appearance: "error",
                    autoDismiss: true,
                }),
        }
    );
    const { params } = useAuthStore((state) => state);
    const { tenant } = useTenantStore((state) => state);
    const { serviceDp } = buildDropdownlists(services);

    const handleClick = useMemo(
        () =>
            async (
                values: Record<string, any>,
                actions: FormikHelpers<Record<string, any>>
            ) => {
                const { name, price, tier, service } = values;

                const services =
                    data?.filter((s) => service.includes(s.id)) ?? [];

                const membership: IFormMembership = {
                    id,
                    name,
                    price,
                    tier,
                    services: service
                        .filter((id: number) =>
                            services.some((service) => service.id === id)
                        )
                        .map((s: number) => {
                            const { id, name, parsedPrice } = services.find(
                                (item) => item.id === s
                            )!;
                            return {
                                name,
                                price: parsedPrice,
                                cloverId: id,
                                redeemed: false,
                            };
                        }),
                };

                const response = id
                    ? await MembershipService().update(
                          id,
                          membership,
                          tenant?.id!
                      )
                    : await MembershipService().create(membership, tenant?.id!);

                if (response?.id) {
                    const message = !id ? "created" : "updated";
                    actions.resetForm();
                    addToast(`Membership ${message} successfully`, {
                        appearance: "success",
                        autoDismiss: true,
                    });
                    router.push(ROUTES.MEMBERSHIPS);
                }
            },
        [tenant?.id]
    );

    return (
        <Card className="p-6">
            <header className="flex items-center gap-2 mb-4">
                <CiCircleInfo className="text-yellow-400 text-xl" />
                <p className="text-gray-400 text-sm">
                    Here you can create a new membership. A membership is a
                    service that you can sell to your regular customers.
                </p>
            </header>

            <DynamicForm
                formFields={[
                    {
                        name: "name",
                        label: "Name",
                        type: "text",
                        required: true,
                        placeholder: "ex: Deluxe service",
                    },
                    {
                        name: "price",
                        label: "Price",
                        type: "text",
                        required: true,
                        placeholder: "ex: 100",
                    },
                    {
                        name: "tier",
                        label: "Tier Color",
                        type: "colorpicker",
                        placeholder: "ex: #2549df",
                    },
                    serviceDp,
                ]}
                isLoading={false}
                config={{
                    areFilters: false,
                    buttonLabel: "Create new membership",
                }}
                onSubmit={handleClick}
            />
        </Card>
    );
};

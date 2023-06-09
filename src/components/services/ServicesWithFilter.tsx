/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToasts } from "react-toast-notifications";
import { EmptyResults } from "../generic/EmptyResults";
import { Loading } from "../generic/Loading";
import { useServicesFilterStore } from "@/stores/filterStore";
import { ServiceService } from "@/services/service/ServiceService";
import { DynamicForm } from "../generic/form/DynamicForm";
import { Services } from "./Services";
import { useAuthStore } from "@/stores/authStore";

export const ServicesWithFilter = () => {
    const { addToast } = useToasts();
    const { data, isLoading, error } = useQuery({
        queryKey: ["getCloverServices"],
        queryFn: async () => await ServiceService().getCloverServices(params?.merchant_id!, process.env.NEXT_CLOVER_APP_SECRET!),
        onSuccess: (data) => { if (data) setServices(data); },
        onError: (error) => addToast(`${error}`, { appearance: "error", autoDismiss: true }),
    });

    const { params } = useAuthStore((state) => state);
    const { loading, services, setLoading, setServices } = useServicesFilterStore((state) => state);

    const handleSubtmit = useMemo(
        () => async (values: any, actions: any) => {
            setLoading(true);
            const { name, price, description } = values;

            const rows = await ServiceService().getCloverServices(
                params?.merchant_id!,
                process.env.NEXT_CLOVER_APP_SECRET!
            );

            if (rows) setServices(rows);
            actions.setSubmitting(false);
        },
        []
    );

    return (
        <div className="flex flex-col gap-6">
            <DynamicForm
                formFields={[
                    {
                        name: "name",
                        label: "Name",
                        type: "text",
                        placeholder: "ex: Some service",
                    },
                    {
                        name: "price",
                        label: "Service price",
                        type: "text",
                        placeholder: "ex: 100",
                    },
                    {
                        name: "description",
                        label: "Description",
                        type: "text",
                        placeholder: "ex: Some description",
                    },
                ]}
                config={{
                    buttonLabel: "Search",
                    areFilters: true,
                }}
                isLoading={loading}
                onSubmit={handleSubtmit}
            />

            {isLoading ? (
                <Loading />
            ) : !services || services.length === 0 ? (
                <EmptyResults text="No services found." />
            ) : (
                <Services data={services} />
            )}
        </div>
    );
};

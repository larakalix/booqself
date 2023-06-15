/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToasts } from "react-toast-notifications";
import { DynamicForm } from "../generic/form/DynamicForm";
import { EmptyResults } from "../generic/EmptyResults";
import { Loading } from "../generic/Loading";
import { Clients } from "../home";
import { useClientsFilterStore } from "@/stores/filterStore";
import { ClientService } from "@/services/client/ClientService";
import { useAuthStore } from "@/stores/authStore";

export const ClientsWithFilter = () => {
    const { addToast } = useToasts();
    const { data, isLoading, error } = useQuery(
        ["getCloverClients"],
        async () => await ClientService().getCloverClients(params?.merchant_id!, process.env.NEXT_CLOVER_APP_SECRET!),
        {
            onSuccess: (data) => {
                if (data) setClients(data);
            },
            onError: (error) => addToast(`${error}`, { appearance: "error", autoDismiss: true }),
        }
    );

    const { params } = useAuthStore((state) => state);
    const { loading, clients, setLoading, setClients } = useClientsFilterStore(
        (state) => state
    );

    const handleSubmit = useMemo(
        () => async (values: any, actions: any) => {
            setLoading(true);
            const { name, lastName, email, phone } = values;

            const rows = await ClientService().getCloverClients(
                params?.merchant_id!,
                process.env.NEXT_CLOVER_APP_SECRET!
            );

            if (rows) setClients(rows);
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
                        placeholder: "ex: John",
                    },
                    {
                        name: "lastName",
                        label: "Last name",
                        type: "text",
                        placeholder: "ex: Doe",
                    },
                    {
                        name: "phone",
                        label: "Phone",
                        type: "text",
                        placeholder: "ex: 1234567890",
                    },
                    {
                        name: "email",
                        label: "Email",
                        type: "text",
                        placeholder: "ex: john@doe.com",
                    },
                ]}
                config={{
                    buttonLabel: "Search",
                    areFilters: true,
                }}
                isLoading={loading}
                onSubmit={handleSubmit}
            />

            {isLoading ? (
                <Loading />
            ) : !clients || clients.length === 0 ? (
                <EmptyResults text="No clients found." />
            ) : (
                <Clients data={clients} />
            )}
        </div>
    );
};

/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useMemo } from "react";
import { DynamicForm } from "../generic/form/DynamicForm";
import { Clients } from "../home";
import { useClientsFilterStore } from "@/stores/filterStore";
import { ClientService } from "@/services/client/ClientService";
import { EmptyResults } from "../generic/EmptyResults";
import { useAuthStore } from "@/stores/authStore";

export const ClientsWithFilter = () => {
    const { params } = useAuthStore((state) => state);
    const { loading, clients, setLoading, setClients } = useClientsFilterStore(
        (state) => state
    );

    const handleSubmit = useMemo(
        () => async (values: any, actions: any) => {
            setLoading(true);
            const { name, lastName, email, phone } = values;

            // const filteredClients = await ClientService().getByFilter(
            //     process.env.NEXT_APP_CLIENT_ID!,
            //     { name, lastName, email, phone, offset: 0, limit: 50 }
            // );
            const rows = await ClientService().getCloverClients(
                params?.merchant_id!,
                process.env.NEXT_CLOVER_APP_SECRET!
            );

            if (rows) setClients(rows);
            actions.setSubmitting(false);
        },
        []
    );

    useEffect(() => {
        (async () => {
            // const filteredClients = await ClientService().getByFilter(
            //     process.env.NEXT_APP_CLIENT_ID!,
            //     { offset: 0, limit: 50 }
            // );
            const rows = await ClientService().getCloverClients(
                params?.merchant_id!,
                process.env.NEXT_CLOVER_APP_SECRET!
            );

            if (rows) setClients(rows);
        })();
    }, []);

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

            {!clients || clients.length === 0 ? (
                <EmptyResults text="No appointments found" />
            ) : (
                <Clients data={clients} />
            )}
        </div>
    );
};

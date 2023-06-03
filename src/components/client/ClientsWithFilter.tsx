/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useMemo } from "react";
import { FiltersForm } from "../appointments";
import { Clients } from "../home";
import { useClientsFilterStore } from "@/stores/filterStore";
import { ClientService } from "@/services/client/ClientService";
import { EmptyResults } from "../generic/EmptyResults";
import type { IMeta } from "@/types/models/generic";
import type { IClient } from "@/types/models/client";

export const ClientsWithFilter = ({
    clients: data,
    meta,
}: {
    clients: IClient[];
    meta: IMeta;
}) => {
    const { loading, clients, setLoading, setClients } = useClientsFilterStore(
        (state) => state
    );

    const handleSubmit = useMemo(
        () => async (values: any, actions: any) => {
            setLoading(true);
            const { name, email } = values;

            const filteredClients = await ClientService().getByFilter(
                process.env.NEXT_APP_CLIENT_ID!,
                { name, email, offset: 0, limit: 10 }
            );

            setClients(filteredClients?.data || []);
            actions.setSubmitting(false);
        },
        []
    );

    useEffect(() => {
        setClients(data);
    }, []);

    return (
        <div className="flex flex-col gap-6">
            <FiltersForm
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
                submit={handleSubmit}
            />

            {!clients || clients.length === 0 ? (
                <EmptyResults text="No appointments found" />
            ) : (
                <Clients data={clients} meta={meta} />
            )}
        </div>
    );
};

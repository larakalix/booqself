/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import { Card, Text } from "@tremor/react";
import { FiltersForm } from "../appointments";
import { Clients } from "../home";
import { useClientsFilterStore } from "@/stores/filterStore";
import { ClientService } from "@/services/client/ClientService";
import type { IMeta } from "@/types/models/generic";
import type { IClient } from "@/types/models/clients";

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

    const handleSubtmit = async (values: any, actions: any) => {
        console.log("handleSubtmit__VALUES", values);
        const { name, email } = values;

        const filteredAppointments = await ClientService().getByFilter(
            process.env.NEXT_APP_CLIENT_ID!,
            { name, email, offset: 0, limit: 10 }
        );

        console.log("handleSubtmit__RESPONSE", filteredAppointments?.data);

        // setAppointments(filteredAppointments);
        actions.setSubmitting(false);
    };

    useEffect(() => {
        setClients(data);
    }, []);

    if (!clients) {
        return (
            <Card>
                <div className="flex items-center justify-center">
                    <Text>No appointments found</Text>
                </div>
            </Card>
        );
    }

    return (
        <div>
            <FiltersForm
                formFields={[
                    {
                        name: "name",
                        label: "Name",
                        type: "text",
                        placeholder: "ex: John Doe",
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
                submit={handleSubtmit}
            />
            <Clients data={clients} meta={meta} />
        </div>
    );
};

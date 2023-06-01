"use client";

import { Card, Text } from "@tremor/react";
import { FiltersForm } from "../appointments";
import { Clients } from "../home";
import type { IMeta } from "@/types/models/generic";
import type { IClient } from "@/types/models/clients";

export const ClientsWithFilter = ({
    clients,
    meta,
}: {
    clients: IClient[];
    meta: IMeta;
}) => {
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
            <FiltersForm />
            <Clients data={clients} meta={meta} />
        </div>
    );
};

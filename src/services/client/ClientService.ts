import { GET_CONFIG } from "../configurations/generic";
import type { ClientAttributes } from "@/types/strapi/clients";
import type { IClient } from "@/types/models/clients";
import type { IEntity, IMeta } from "@/types/strapi/generic";

export const ClientService = () => {
    const getClients = async (): Promise<{
        clients: IClient[];
        meta: IMeta;
    }> => {
        const res = await fetch(
            `${process.env.NEXT_STRAPI_URL}/clients`,
            GET_CONFIG
        );
        if (!res.ok) throw new Error("Failed to fetch data");

        const { data, meta } = await res.json();

        const clients: IClient[] = data.map(
            ({ id, attributes }: IEntity<ClientAttributes>) => ({
                id,
                ...attributes,
            })
        );

        return { clients, meta };
    };

    const getClientById = async (id: number): Promise<IClient> => {
        const res = await fetch(
            `${process.env.NEXT_STRAPI_URL}/clients/${id}`,
            GET_CONFIG
        );
        if (!res.ok) throw new Error("Failed to fetch data");

        const { data } = await res.json();

        return {
            id: data.id,
            ...data.attributes,
        };
    };

    return {
        getClientById,
        getClients,
    };
};

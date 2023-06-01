import { GET_CONFIG } from "../configurations/generic";
import type { IEntity, IMeta, IPaginable } from "@/types/models/generic";
import type {
    IClient,
    IClientAttributes,
    IClientFiltered,
} from "@/types/models/clients";
import { appendQueryParams } from "@/utils/utils";

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
            ({ id, attributes }: IEntity<IClientAttributes>) => ({
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

    const getByFilter = async (
        tenantId: string,
        {
            name,
            lastName,
            email,
            phone,
            offset = 0,
            limit = 20,
        }: Partial<IPaginable> &
            Partial<{
                name: string;
                lastName: string;
                email: string;
                phone: string;
            }>
    ) => {
        try {
            const URI = appendQueryParams(
                `${process.env.NEXT_STRAPI_URL}/client-custom/filter/${tenantId}/${offset}/${limit}`,
                { name, lastName, email, phone }
            );
            const res = await fetch(URI, GET_CONFIG);
            if (!res.ok) throw new Error("Failed to create appointment");

            const { data, meta } = await res.json();

            return { data, meta } as IClientFiltered;
        } catch (error) {
            console.log("error", error);
        }
    };

    return {
        getClientById,
        getClients,
        getByFilter,
    };
};

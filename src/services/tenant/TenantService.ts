import { GET_CONFIG, POST_CONFIG } from "../configurations/generic";
import { appendQueryParams } from "@/utils/utils";
import type {
    ITenantAttributes,
    ITenantBoilerplate,
    ITenantBooking,
} from "@/types/models/tenant";

export const TenantService = () => {
    const getTenantById = async ({
        id,
        ...params
    }: {
        id: string;
        justTenant?: boolean;
    }) => {
        const URI = appendQueryParams(
            `${process.env.NEXT_STRAPI_URL}/custom-tenant/${id}`,
            { ...params }
        );
        const res = await fetch(URI, GET_CONFIG);
        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();

        const tenant: ITenantBooking = data.data;

        return { tenant };
    };

    const getTenantBoilerplate = async (id: string) => {
        const res = await fetch(
            `${process.env.NEXT_STRAPI_URL}/custom-tenant/boilerplate/${id}`,
            GET_CONFIG
        );
        if (!res.ok) throw new Error("Failed to fetch data");

        const { data } = await res.json();

        return data as ITenantBoilerplate;
    };

    const update = async (
        tenant: Omit<ITenantAttributes, "createdAt">,
        id: number
    ) => {
        const res = await fetch(
            `${process.env.NEXT_STRAPI_URL}/custom-tenant/update/${id}`,
            {
                ...POST_CONFIG,
                body: JSON.stringify({ tenant }),
            }
        );

        if (!res.ok) throw new Error("Failed to create appointment");

        const data = await res.json();

        return data as ITenantAttributes;
    };

    return {
        update,
        getTenantById,
        getTenantBoilerplate,
    };
};

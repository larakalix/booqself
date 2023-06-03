import { GET_CONFIG } from "../configurations/generic";
import type { ITenantBoilerplate, ITenantBooking } from "@/types/models/tenant";

export const TenantService = () => {
    const getTenantById = async ({ id }: { id: string }) => {
        const res = await fetch(
            `${process.env.NEXT_STRAPI_URL}/custom-tenant/${id}`,
            GET_CONFIG
        );
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

    return {
        getTenantById,
        getTenantBoilerplate,
    };
};

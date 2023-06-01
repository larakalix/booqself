import { GET_CONFIG } from "../configurations/generic";
import type { TenantAttributes } from "@/types/strapi/tenant";

export const TenantService = () => {
    const getTenantById = async ({ id }: { id: string }) => {
        const res = await fetch(
            `${process.env.NEXT_STRAPI_URL}/tenant-custom/${id}`,
            GET_CONFIG
        );
        if (!res.ok) throw new Error("Failed to fetch data");

        const { data } = await res.json();

        const tenant: TenantAttributes = data;

        return { tenant };
    };

    return {
        getTenantById,
    };
};

import { GET_CONFIG, PUT_CONFIG } from "../configurations/generic";
import { appendQueryParams } from "@/utils/utils";
import type {
    ITenant,
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

        const { data } = await res.json();

        return data as ITenantBoilerplate;
    };

    const getTenantBookBoilerplate = async (
        {
            id,
            ...params
        }: {
            id: string;
            justTenant?: boolean;
            appointmentId?: string;
        },
        apiKey: string
    ) => {
        const URI = appendQueryParams(
            `${process.env.NEXT_CLOVER_API_URL}/book`,
            { ...params }
        );

        const res = await fetch(URI, {
            ...GET_CONFIG,
            headers: {
                ...GET_CONFIG.headers,
                authorization: `Bearer ${apiKey}`,
                merchantid: id,
            },
        });
        if (!res.ok) throw new Error("Failed to fetch data");

        const { tenant, services, employees, appointments, appointment } =
            await res.json();

        return {
            tenant,
            services,
            employees,
            appointments,
            appointment,
        } as ITenantBooking;
    };

    const update = async (
        id: number,
        tenant: Omit<ITenantAttributes, "createdAt" | "timeOptions">
    ) => {
        const res = await fetch(
            `${process.env.NEXT_STRAPI_URL}/custom-tenant/update/${id}`,
            {
                ...PUT_CONFIG,
                body: JSON.stringify(tenant),
            }
        );

        if (!res.ok) throw new Error("Failed to create appointment");

        const { data } = await res.json();

        return data as ITenantAttributes;
    };

    return {
        update,
        getTenantById,
        getTenantBookBoilerplate,
    };
};

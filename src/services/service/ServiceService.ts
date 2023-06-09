import { GET_CONFIG } from "../configurations/generic";
import { appendQueryParams } from "@/utils/utils";
import type { IPaginable } from "@/types/models/generic";
import type { IService, IServiceFiltered } from "@/types/models/service";

export const ServiceService = () => {
    const getByFilter = async (
        tenantId: string,
        {
            offset = 0,
            limit = 20,
            ...params
        }: Partial<IPaginable> &
            Partial<{
                name: string;
                price: string;
                description: string;
            }>
    ) => {
        try {
            const URI = appendQueryParams(
                `${process.env.NEXT_STRAPI_URL}/custom-service/filter/${tenantId}/${offset}/${limit}`,
                { ...params }
            );
            const res = await fetch(URI, GET_CONFIG);
            if (!res.ok) throw new Error("Failed to create appointment");

            const { data, meta } = await res.json();

            return { data, meta } as IServiceFiltered;
        } catch (error) {
            console.log("error", error);
        }
    };

    const getCloverServices = async (merchantId: string, apiKey: string) => {
        try {
            const URI = `${process.env.NEXT_CLOVER_API_URL}/inventory`;
            const res = await fetch(URI, {
                ...GET_CONFIG,
                headers: {
                    ...GET_CONFIG.headers,
                    authorization: `Bearer ${apiKey}`,
                    merchantid: merchantId,
                },
            });
            if (!res.ok) throw new Error("Failed to create appointment");

            const { elements } = await res.json();

            return elements as IService[];
        } catch (error) {
            console.log("error", error);
        }
    };

    return {
        getByFilter,
        getCloverServices,
    };
};

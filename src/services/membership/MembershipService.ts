import { GET_CONFIG, POST_CONFIG, PUT_CONFIG } from "../configurations/generic";
import { appendQueryParams } from "@/utils/utils";
import type { IPaginable } from "@/types/models/generic";
import type {
    IFormMembership,
    IMembershipFiltered,
} from "@/types/models/membership";

export const MembershipService = () => {
    const getByFilter = async (
        tenantId: string,
        {
            offset = 0,
            limit = 20,
            ...params
        }: Partial<IPaginable> &
            Partial<{
                name: string;
                email: string;
                employee: string;
                rangeDate: string;
            }>
    ) => {
        try {
            const URI = appendQueryParams(
                `${process.env.NEXT_STRAPI_URL}/custom-membership/filter/${tenantId}/${offset}/${limit}`,
                { ...params }
            );
            const res = await fetch(URI, GET_CONFIG);
            if (!res.ok) throw new Error("Failed to create appointment");

            const { data, meta } = await res.json();

            return { data, meta } as IMembershipFiltered;
        } catch (error) {
            console.log("error", error);
        }
    };

    const create = async (membership: IFormMembership, tenant: number) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_STRAPI_URL}/custom-membership/create`,
                {
                    ...POST_CONFIG,
                    body: JSON.stringify({
                        ...membership,
                        tenant,
                    }),
                }
            );
            if (!res.ok) throw new Error("Failed to create membership");

            const data = await res.json();

            return data.data as IFormMembership;
        } catch (error) {
            console.log("error", error);
        }
    };

    const update = async (
        id: number,
        appointment: IFormMembership,
        tenant: number
    ) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_STRAPI_URL}/custom-membership/update/${id}`,
                {
                    ...PUT_CONFIG,
                    body: JSON.stringify(appointment),
                }
            );
            if (!res.ok) throw new Error("Failed to create membership");

            const { data } = await res.json();

            return data as IFormMembership;
        } catch (error) {
            console.log("error", error);
        }
    };

    return {
        create,
        update,
        getByFilter,
    };
};

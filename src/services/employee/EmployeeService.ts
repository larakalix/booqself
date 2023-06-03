import { GET_CONFIG } from "../configurations/generic";
import { appendQueryParams } from "@/utils/utils";
import type { IPaginable } from "@/types/models/generic";
import type { IEmployeeFiltered } from "@/types/models/employee";

export const EmployeeService = () => {
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
                nickname: string;
                pin: string;
            }>
    ) => {
        try {
            const URI = appendQueryParams(
                `${process.env.NEXT_STRAPI_URL}/custom-employee/filter/${tenantId}/${offset}/${limit}`,
                { ...params }
            );
            const res = await fetch(URI, GET_CONFIG);
            if (!res.ok) throw new Error("Failed to create appointment");

            const { data, meta } = await res.json();

            return { data, meta } as IEmployeeFiltered;
        } catch (error) {
            console.log("error", error);
        }
    };

    return {
        getByFilter,
    };
};

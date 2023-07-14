import { GET_CONFIG } from "../configurations/generic";
import { appendQueryParams } from "@/utils/utils";
import type { IPaginable } from "@/types/models/generic";
import type { IEmployee, IEmployeeFiltered } from "@/types/models/employee";

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
            if (!res.ok) throw new Error("Failed to get employees");

            const { data, meta } = await res.json();

            return { data, meta } as IEmployeeFiltered;
        } catch (error) {
            console.log("error", error);
        }
    };

    const getCloverEmployees = async (merchantId: string, apiKey: string) => {
        try {
            const URI = `${process.env.NEXT_CLOVER_API_URL}/employees`;
            const res = await fetch(URI, {
                ...GET_CONFIG,
                headers: {
                    ...GET_CONFIG.headers,
                    authorization: `Bearer ${apiKey}`,
                    merchantid: merchantId,
                },
            });
            if (!res.ok) throw new Error("Failed to get employees");

            const { elements } = await res.json();

            return elements as IEmployee[];
        } catch (error) {
            console.log("error", error);
        }
    };

    const getEmployeeById = async (
        id: string,
        merchantId: string,
        apiKey: string
    ) => {
        try {
            const URI = `${process.env.NEXT_CLOVER_API_URL}/employees/${id}`;
            const res = await fetch(URI, {
                ...GET_CONFIG,
                headers: {
                    ...GET_CONFIG.headers,
                    authorization: `Bearer ${apiKey}`,
                    merchantid: merchantId,
                },
            });
            if (!res.ok) throw new Error("Failed to get employee");

            const data = await res.json();
            console.log("__DATAA", data);
            return data as IEmployee;
        } catch (error) {
            console.log("error", error);
        }
    };

    return {
        getByFilter,
        getCloverEmployees,
        getEmployeeById,
    };
};

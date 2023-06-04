import { GET_CONFIG } from "../configurations/generic";
import type {
    IAppointmentAttributes,
    IAppointment,
    IAppointmentFiltered,
    IFormAppointment,
} from "@/types/models/appointment";
import type {
    IEntity,
    IIdentifier,
    IMeta,
    IPaginable,
} from "@/types/models/generic";
import { appendQueryParams } from "@/utils/utils";

export const AppointmentService = () => {
    const getAppointments = async ({
        page = 1,
        pageSize = 10,
    }: Partial<{
        page: number;
        pageSize: number;
    }>) => {
        const res = await fetch(
            `${process.env.NEXT_STRAPI_URL}/appointments?pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
            GET_CONFIG
        );
        if (!res.ok) throw new Error("Failed to fetch data");

        const { data, meta } = await res.json();

        const appointments: IAppointment[] = data.map(
            ({ id, attributes }: IEntity<IAppointmentAttributes>) => ({
                id,
                ...attributes,
            })
        );

        return { appointments, meta } as {
            appointments: IAppointment[];
            meta: IMeta;
        };
    };

    const create = async (appointment: IFormAppointment, tenant: number) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_STRAPI_URL}/custom-appointment/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...appointment,
                        tenant,
                    }),
                }
            );
            if (!res.ok) throw new Error("Failed to create appointment");

            const data = await res.json();

            return data as IFormAppointment;
        } catch (error) {
            console.log("error", error);
        }
    };

    const getClientAppointments = async (tenantId: string, email: string) => {
        const res = await fetch(
            `${process.env.NEXT_STRAPI_URL}/custom-client/appointment/${tenantId}/${email}/0/30`,
            GET_CONFIG
        );
        if (!res.ok) throw new Error("Failed to fetch data");

        const { data } = await res.json();

        return data as IAppointment[];
    };

    const getBookAppointments = async (
        tenantId: string,
        month?: string,
        year?: string
    ) => {
        const URI = appendQueryParams(
            `${process.env.NEXT_STRAPI_URL}/custom-appointment/book/${tenantId}`,
            { month, year }
        );

        const res = await fetch(URI, GET_CONFIG);
        if (!res.ok) throw new Error("Failed to fetch data");

        const { data } = await res.json();

        return data as IAppointment[];
    };

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
                `${process.env.NEXT_STRAPI_URL}/custom-appointment/filter/${tenantId}/${offset}/${limit}`,
                { ...params }
            );
            const res = await fetch(URI, GET_CONFIG);
            if (!res.ok) throw new Error("Failed to create appointment");

            const { data, meta } = await res.json();

            return { data, meta } as IAppointmentFiltered;
        } catch (error) {
            console.log("error", error);
        }
    };

    return {
        create,
        getByFilter,
        getAppointments,
        getBookAppointments,
        getClientAppointments,
    };
};

import type { IAppointment } from "@/types/models/appointment";
import type { IEntity, IMeta } from "@/types/strapi/generic";
import type { AppointmentAttributes } from "@/types/strapi/appointments";

export const AppointmentService = () => {
    const getAppointments = async ({
        page = 1,
        pageSize = 10,
    }: Partial<{
        page: number;
        pageSize: number;
    }>): Promise<{
        appointments: IAppointment[];
        meta: IMeta;
    }> => {
        const res = await fetch(
            `${process.env.NEXT_STRAPI_URL}/appointments?pagination[page]=${page}&pagination[pageSize]=${pageSize}`
        );
        if (!res.ok) throw new Error("Failed to fetch data");

        const { data, meta } = await res.json();

        const appointments: IAppointment[] = data.map(
            ({ id, attributes }: IEntity<AppointmentAttributes>) => ({
                id,
                ...attributes,
            })
        );

        return { appointments, meta };
    };

    return {
        getAppointments,
    };
};

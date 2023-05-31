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
    }>) => {
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

        return { appointments, meta } as {
            appointments: IAppointment[];
            meta: IMeta;
        };
    };

    const create = async (
        appointment: Omit<AppointmentAttributes, "createdAt">,
        tenant: number
    ) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_STRAPI_URL}/appointments`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        data: {
                            ...appointment,
                            tenant,
                        },
                    }),
                }
            );
            if (!res.ok) throw new Error("Failed to create appointment");

            const { data } = await res.json();

            return data as IEntity<AppointmentAttributes>;
        } catch (error) {
            console.log("error", error);
        }
    };

    return {
        create,
        getAppointments,
    };
};

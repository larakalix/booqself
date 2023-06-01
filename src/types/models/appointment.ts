import type { ICreatedAt, IMeta } from "./generic";

export type IAppointmentAttributes = ICreatedAt & {
    name: string;
    email: string;
    comment: string;
    appointmentDay: string;
    phone: string;
};

export interface IAppointment extends IAppointmentAttributes, ICreatedAt {
    id: number;
}

export type IAppointmentFiltered = {
    data: IAppointment[];
    meta: IMeta;
};

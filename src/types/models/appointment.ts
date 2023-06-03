import type { ICreatedAt, IIdentifier, IMeta } from "./generic";
import type { IEmployee } from "./employee";
import type { IService } from "./service";

export type IAppointmentAttributes = ICreatedAt & {
    name: string;
    email: string;
    comment: string;
    appointmentDay: string;
    phone: string;
    employee: IEmployee | null;
    service: IService | null;
};

export interface IAppointment extends IAppointmentAttributes, ICreatedAt {
    id: number;
}

export type IAppointmentFiltered = {
    data: IAppointment[];
    meta: IMeta;
};

export type IFormAppointment = Partial<IIdentifier> &
    Omit<IAppointmentAttributes, "createdAt" | "employee" | "service"> & {
        employee?: string;
        service?: string;
    };

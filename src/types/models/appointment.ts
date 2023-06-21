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

export type IAppointment = IIdentifier &
    IAppointmentAttributes &
    ICreatedAt & {};

export type IAppointmentFiltered = {
    data: IAppointment[];
    meta: IMeta;
};

export type IFormAppointment = Partial<IIdentifier> &
    Omit<IAppointmentAttributes, "createdAt" | "employee" | "service"> & {
        cloverEmployeeId?: string;
        cloverServiceId?: string;
        employee: IAppointmentEmployee;
        service: IAppointmentService;
    };

export type IAppointmentEmployee = {
    name: string;
    cloverId: string;
    pin: string;
    email: string;
};

export type IAppointmentService = {
    name: string;
    cloverId: string;
    price: string;
};

export type IFlatAppointment = IIdentifier & { appointmentDay: string };

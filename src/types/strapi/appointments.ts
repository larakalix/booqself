import { IEntity, IData, IMeta, ICreatedAt } from "./generic";

export type Appointment = {
    data: IData<IEntity<AppointmentAttributes>[]>;
    meta: IMeta;
};

export type AppointmentAttributes = ICreatedAt & {
    name: string;
    email: string;
    comment: string;
    appointmentDay: string;
    phone: string;
};

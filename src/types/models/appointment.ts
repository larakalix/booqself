import { AppointmentAttributes } from "../strapi/appointments";

export interface IAppointment extends AppointmentAttributes {
    id: number;
}

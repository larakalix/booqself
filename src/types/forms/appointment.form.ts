import type { ITenantBooking } from "../models/tenant";
import type { IFormField, IFormSelections } from "./form";

export type AppointmentFormProps = {
    selectedDay: Date | null;
    timeOptions: IFormSelections[];
    formFields: IFormField[];
    boilerplate: ITenantBooking;
    loading: boolean;
};

import type { ITenantBooking } from "../models/tenant";
import type { IFormDropdown, IFormField, IFormSelections } from "./form";

export type AppointmentFormProps = {
    selectedDay: Date | null;
    timeOptions: IFormSelections[];
    formFields: IFormField[];
    boilerplate: ITenantBooking;
    loading: boolean;
};

export type ScheduleType = "Form" | "Wizard";

export type WizardStep = {
    label: string;
    content: JSX.Element;
};

export type ScheduleData = {
    employees: IFormDropdown;
    services: IFormDropdown;
};

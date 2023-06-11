import { FormikHelpers } from "formik";
import * as yup from "yup";
import type { IEntity } from "@/types/models/generic";
import type { IFormField, IFormSelections } from "@/types/forms/form";
import type {
    IAppointmentEmployee,
    IAppointmentService,
    IFormAppointment,
} from "@/types/models/appointment";
import { mergeTimeWithDate } from "@/utils/time";
import { findAndReturn } from "@/utils/utils";
import { IService } from "@/types/models/service";
import { IEmployee } from "@/types/models/employee";
import { ITenantBooking } from "@/types/models/tenant";

export type FormProps = {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    service: string[];
    storeBranch: string;
};

export const useRegisterForm = ({
    formFields,
}: {
    formFields: IFormField[];
}) => {
    const initialValues: Record<string, any> = {};
    const validationSchema: Record<string, any> = {};

    formFields.forEach((field) => {
        initialValues[field.name] = "";

        validationSchema[field.name] = field.required
            ? yup.string().required(`${field.label} is required`)
            : yup.string();

        switch (field.type) {
            case "text":
                if (field.regex) {
                    validationSchema[field.name] = validationSchema[
                        field.name
                    ].matches(field.regex, `${field.label} is invalid`);
                }
                break;
            case "dropdown":
            case "checkbox":
            case "radio":
                validationSchema[field.name] = validationSchema[
                    field.name
                ].oneOf(
                    field.options?.map((option) => option.value),
                    `Invalid ${field.label} selection`
                );
                break;
            case "switch":
                validationSchema[field.name] = yup.boolean();
                break;
            default:
                break;
        }
    });

    const buildAppointment = (
        selectedDay: Date,
        timeOptions: IFormSelections[],
        values: Record<string, any>,
        boilerplate: ITenantBooking
    ): IFormAppointment => {
        const {
            name,
            email,
            phone,
            comment,
            employee: cloverEmployeeId,
            service: cloverServiceId,
            time,
        } = values;
        const hour = timeOptions.find((t) => t.value === time)?.label!;

        const appointmentDay = mergeTimeWithDate(
            hour,
            selectedDay,
            boilerplate.tenant.data.timeZone ?? "America/New_York"
        );

        const appointment: IFormAppointment = {
            name,
            email,
            phone,
            comment,
            cloverEmployeeId,
            cloverServiceId,
            appointmentDay,
            employee: findAndReturn<IEmployee, IAppointmentEmployee>(
                boilerplate.employees.elements,
                (obj) => obj.id === cloverEmployeeId,
                ({ id, name, pin, email }) => ({
                    name,
                    pin,
                    email,
                    cloverId: `${id}`,
                })
            )!,
            service: findAndReturn<IService, IAppointmentService>(
                boilerplate.services.elements,
                (obj) => obj.id === cloverServiceId,
                ({ id, name, price }) => ({
                    name,
                    price: `${price}`,
                    cloverId: `${id}`,
                })
            )!,
        };

        return appointment;
    };

    return {
        initialValues,
        validationSchema,
        buildAppointment,
    };
};

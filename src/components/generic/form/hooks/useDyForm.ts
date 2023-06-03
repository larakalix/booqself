import * as yup from "yup";
import type { IFormField } from "@/types/forms/form";

export type FormProps = {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    service: string[];
    storeBranch: string;
};

export const useDyForm = ({ formFields }: { formFields: IFormField[] }) => {
    const initialValues: Record<string, any> = {};
    const validationSchema: Record<string, any> = {};

    if (!formFields) throw new Error("formFields is required");
    if (!Array.isArray(formFields))
        throw new Error("formFields must be an array");
    if (formFields.length === 0) return { initialValues, validationSchema };

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

    return {
        initialValues,
        validationSchema,
    };
};
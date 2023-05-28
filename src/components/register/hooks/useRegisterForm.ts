import * as yup from "yup";
import type {
    IFormField,
    IFormDropdown,
    IFormTextInput,
    IFormRadioGroup,
    IFormCheckboxGroup,
    IFormSwitchInput,
} from "@/types/form";

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

    // formFields.forEach((field) => {
    //     initialValues[field.name] = "";

    //     if (field.name === "email") {
    //         validationSchema[field.name] = yup
    //             .string()
    //             .email("Invalid email format")
    //             .required("Email is required")
    //             .min(3, "Too Short!");
    //     } else {
    //         validationSchema[field.name] = field.required
    //             ? yup.string().required(`${field.label} is required`)
    //             : yup.string();
    //     }
    // });

    return {
        initialValues,
        validationSchema,
    };
};

// const validationSchema = yup.object().shape(
//     formFields.reduce((schema, field) => {
//         const fieldSchema: any = {};

//         if (field.required) {
//             fieldSchema[field.name] = yup
//                 .string()
//                 .required(`${field.label} is required`);
//         } else {
//             fieldSchema[field.name] = yup.string();
//         }

//         // console.log("selections", field.selections);

//         // if (field.selections && field.selections.length > 0) {
//         //     fieldSchema[field.name] = yup.string().oneOf(
//         //         field.selections.map((selection) => selection.text),
//         //         `${field.label} is required`
//         //     );
//         // }

//         // Add additional validation rules for specific fields if needed
//         // For example, validating email format
//         if (field.name === "email") {
//             fieldSchema[field.name] = yup
//                 .string()
//                 .email("Invalid email format")
//                 .required("Email is required")
//                 .min(3, "Too Short!");
//         }

//         return {
//             ...schema,
//             ...fieldSchema,
//         };
//     }, {})
// );

import type { FieldInputProps, FieldMetaProps } from "formik";
import type { IFormField } from "@/types/forms/form";

export const Input = ({
    field,
    meta,
    formField,
}: {
    field: FieldInputProps<any>;
    meta: FieldMetaProps<any>;
    formField: IFormField;
}) => {
    return (
        <input
            type="text"
            placeholder={formField.placeholder ? formField.placeholder : ""}
            className={`border border-input-border rounded-md w-full bg-gray-100 py-4 px-6 text-sm disabled:bg-gray-200 disabled:text-gray-600`}
            {...field}
        />
    );
};

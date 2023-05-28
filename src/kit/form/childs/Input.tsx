import type { FieldInputProps, FieldMetaProps } from "formik";
import type { IFormField } from "@/types/form";

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
            className="border border-input-border rounded-md w-full bg-white py-3 px-5 disabled:bg-gray-200 disabled:text-gray-600"
            {...field}
        />
    );
};

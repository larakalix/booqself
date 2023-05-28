import { Children } from "react";
import { Field, type FieldInputProps, type FieldMetaProps } from "formik";
import type { IFormCheckboxGroup, IFormSelections } from "@/types/form";

export const Checkbox = ({
    field,
    meta,
    formField,
}: {
    field: FieldInputProps<any>;
    meta: FieldMetaProps<any>;
    formField: IFormCheckboxGroup;
}) => {
    return (
        <>
            {Children.toArray(
                formField.options.map((option: IFormSelections) => (
                    <div>
                        <label htmlFor={option.value}>
                            <Field
                                type="checkbox"
                                name={field.name}
                                value={option.value}
                            />
                            {option.label}
                        </label>
                    </div>
                ))
            )}
        </>
    );
};

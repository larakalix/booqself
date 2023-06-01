import { Switch as HSwitch } from "@headlessui/react";
import { useField, type FieldInputProps, type FieldMetaProps } from "formik";
import type { IFormSwitchInput } from "@/types/forms/form";

export const Switch = ({
    formField,
}: {
    field: FieldInputProps<any>;
    meta: FieldMetaProps<any>;
    formField: IFormSwitchInput;
}) => {
    const [field] = useField({ name: formField.name });

    return (
        <HSwitch
            checked={field.value}
            onChange={(value) => {
                field.onChange({
                    target: {
                        name: field.name,
                        value,
                    },
                });
            }}
            className={`${
                field.value ? "bg-green-500" : "bg-gray-200"
            } relative inline-flex h-7 w-12 items-center rounded-full`}
        >
            <span className="sr-only">{formField.label}</span>
            <span
                className={`${
                    field.value ? "translate-x-6" : "translate-x-1"
                } inline-block h-5 w-5 transform rounded-full bg-gray-100 transition`}
            />
        </HSwitch>
    );
};

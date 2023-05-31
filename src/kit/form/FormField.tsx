import { ErrorMessage, Field } from "formik";
import { RiErrorWarningFill } from "react-icons/ri";
import { Checkbox, Dropdown, Input, Switch, Radio } from "./childs";
import type { IFormField } from "@/types/forms/form";

const componentMap: { [key: string]: React.ComponentType<any> } = {
    text: Input,
    dropdown: Dropdown,
    checkbox: Checkbox,
    switch: Switch,
    radio: Radio,
};

export const FormField = ({
    formField,
    hideLabel = false,
}: {
    formField: IFormField;
    hideLabel?: boolean;
}) => {
    return (
        <div className={`flex flex-col ${formField.fullWidth ? "col-span-2" : ""}`}>
            {!hideLabel && (
                <label htmlFor={formField.name} className="mb-2 text-gray-500 text-sm">
                    {formField.label}
                </label>
            )}
            <Field name={formField.name}>
                {({ field, meta }: any) => {
                    const Component = componentMap[formField.type];
                    return Component ? (
                        <Component
                            field={field}
                            meta={meta}
                            formField={formField}
                        />
                    ) : null;
                }}
            </Field>
            <ErrorMessage name={formField.name} component="div">
                {(msg) => (
                    <div className="flex items-center gap-1 text-rose-400">
                        <RiErrorWarningFill /> <span>{msg}</span>
                    </div>
                )}
            </ErrorMessage>
        </div>
    );
};

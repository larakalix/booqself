import { ErrorMessage, Field } from "formik";
import { RiErrorWarningFill } from "react-icons/ri";
import {
    Checkbox,
    Dropdown,
    Input,
    Switch,
    Radio,
    DatePicker,
    Textarea,
} from "./childs";
import type { IFormField } from "@/types/forms/form";

const componentMap: { [key: string]: React.ComponentType<any> } = {
    text: Input,
    dropdown: Dropdown,
    checkbox: Checkbox,
    switch: Switch,
    radio: Radio,
    date: DatePicker,
    area: Textarea,
};

export const FormField = ({
    formField,
    hideLabel = false,
}: {
    formField: IFormField;
    hideLabel?: boolean;
}) => {
    return (
        <div
            className={`flex flex-col space-between ${
                formField.fullWidth ? "col-span-1 lg:col-span-2" : "form-box"
            }`}
        >
            {!hideLabel && (
                <label
                    htmlFor={formField.name}
                    className="mb-2 text-gray-500 text-sm"
                >
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
                    <div className="flex items-center gap-1 text-rose-400 text-sm mt-1 font-light transition-all">
                        <RiErrorWarningFill className="animate-bounce" /> {msg}
                    </div>
                )}
            </ErrorMessage>
        </div>
    );
};

import { Children } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import clsx from "clsx";
import { useDyForm } from "./hooks/useDyForm";
import { FormField } from "@/kit/form/FormField";
import type { IFormField } from "@/types/forms/form";
import type { IFormConfig } from "@/kit/form/types";

type Props = {
    formFields: IFormField[];
    config: IFormConfig;
    submit: (values: any, actions: any) => void;
};

export const DynamicForm = ({ formFields, config, submit }: Props) => {
    const { initialValues, validationSchema } = useDyForm({ formFields });

    return (
        <Formik
            enableReinitialize
            validationSchema={yup.object(validationSchema)}
            initialValues={initialValues}
            onSubmit={submit}
        >
            {({ errors, isSubmitting }) => (
                <Form
                    // className={`grid grid-cols-1 md:grid-cols-${formFields.length + 1} gap-2 md:gap-4`}
                    className="flex flex-wrap items-stretch justify-start gap-2 md:gap-4 w-full"
                >
                    {Children.toArray(
                        formFields.map((field) => (
                            <FormField formField={field} />
                        ))
                    )}

                    <div className="flex flex-col items-center justify-end">
                        <button
                            disabled={isSubmitting}
                            className="bg-blue-400 text-white text-sm rounded-md py-[0.6rem] px-8"
                            type="submit"
                        >
                            {config?.buttonLabel ?? "Submit"}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

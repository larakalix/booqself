"use client";

import { Children } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { useRegisterForm } from "./hooks/useRegisterForm";
import { FormField } from "@/kit/form/FormField";
import { registerStore } from "@/stores/registerStore";
import type { IFormField } from "@/types/form";

type Props = { formFields: IFormField[]; close: () => void };

export const RegisterForm = ({ formFields, close }: Props) => {
    const { initialValues, validationSchema } = useRegisterForm({ formFields });
    const { assign } = registerStore((state) => state);

    return (
        <div className="flex flex-col ">
            <Formik
                enableReinitialize
                validationSchema={yup.object(validationSchema)}
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    console.log("values", values);
                    const { name, lastName, email } = values;
                    assign({ name, lastName, email });
                    close();
                    actions.setSubmitting(false);
                }}
            >
                {({ errors, isSubmitting }) => (
                    <Form className="grid grid-cols-2 gap-4">
                        {Children.toArray(
                            formFields.map((field) => (
                                <FormField formField={field} />
                            ))
                        )}

                        <button
                            disabled={isSubmitting}
                            className="col-span-2 bg-blue-400 text-white rounded-md py-[0.813rem] px-[1.969rem]"
                            type="submit"
                        >
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

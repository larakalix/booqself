"use client";

import { Children } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { useRegisterForm } from "./hooks/useRegisterForm";
import { FormField } from "@/kit/form/FormField";
import { useRegisterStore } from "@/stores/registerStore";
import type { IFormField } from "@/types/forms/form";
import type { IClientAttributes } from "@/types/models/client";

type Props = { formFields: IFormField[]; close: () => void };

export const RegisterForm = ({ formFields, close }: Props) => {
    const { initialValues, validationSchema } = useRegisterForm({ formFields });
    const { assign } = useRegisterStore((state) => state);

    return (
        <div className="flex flex-col ">
            <Formik
                enableReinitialize
                validationSchema={yup.object(validationSchema)}
                initialValues={initialValues}
                onSubmit={(values: typeof initialValues, actions) => {
                    const { name, email, phone, lastName } = values;
                    // const client: IClientAttributes = {
                    //     firstName: name,
                    //     lastName,
                    // };

                    // assign(client);
                    close();
                    actions.setSubmitting(false);
                }}
            >
                {({ errors, isSubmitting }) => (
                    <Form className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                        {Children.toArray(
                            formFields.map((field) => (
                                <FormField formField={field} />
                            ))
                        )}

                        <button
                            disabled={isSubmitting}
                            className="col-span-1 md:col-span-2 bg-blue-400 text-white rounded-md py-4 px-8"
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

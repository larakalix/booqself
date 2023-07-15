"use client";

import { Children, useContext } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { useRegisterForm } from "@/components/register/hooks/useRegisterForm";
import { type WizarContextProps, WizardContext } from "../../WizardProvider";
import { FormField } from "@/kit/form/FormField";
import { useWizardStore } from "@/stores/appointmentWizardStore";
import { StepperActions } from "../childs/StepperActions";

export const Info = () => {
    const { boilerplate, selectedDay, formFields, steps } = useContext(
        WizardContext
    ) as WizarContextProps;
    const { initialValues, validationSchema } = useRegisterForm({ formFields });
    const { step, setInfo } = useWizardStore((state) => state);

    return (
        <div className="flex flex-col w-full xl:max-w-4xl">
            <h5 className="text-start uppercase text-base font-bold mb-4 text-gray-900 dark:text-gray-100">
                {steps[step].label}
            </h5>
            <Formik
                enableReinitialize
                validationSchema={yup.object(validationSchema)}
                initialValues={
                    !boilerplate?.appointment
                        ? initialValues
                        : { ...boilerplate?.appointment.attributes }
                }
                onSubmit={async (values: any, actions) => {
                    if (!selectedDay) return;

                    setInfo({ ...values });

                    actions.setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4">
                        {Children.toArray(
                            formFields.map((field) => (
                                <FormField formField={field} />
                            ))
                        )}

                        <StepperActions
                            className="col-span-1 lg:col-span-2"
                            step={step}
                            handleBack={() => {}}
                        >
                            <button
                                type="submit"
                                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                disabled={isSubmitting || !selectedDay}
                            >
                                Next
                            </button>
                        </StepperActions>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

"use client";

import { Children } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { useRegisterForm } from "../register/hooks/useRegisterForm";
import { FormField } from "@/kit/form/FormField";
import { formatToISO, mergeTimeWithDate } from "@/utils/time";
import { AppointmentService } from "@/services/appointment/AppointmentServices";
import { useSuccesBookingStore } from "@/stores/bookingStore";
import type { IFormField, IFormSelections } from "@/types/forms/form";
import type { ITenantAttributes } from "@/types/models/tenant";
import type { IAppointmentAttributes } from "@/types/models/appointment";

type Props = {
    selectedDay: Date | null;
    timeOptions: IFormSelections[];
    formFields: IFormField[];
    tenant: ITenantAttributes;
};

export const AppointmentForm = ({
    tenant,
    selectedDay,
    timeOptions,
    formFields,
}: Props) => {
    const { initialValues, validationSchema } = useRegisterForm({ formFields });
    const { setAppointment } = useSuccesBookingStore((state) => state);

    return (
        <div className="flex flex-col w-full px-4 md:px-14 xl:max-w-4xl">
            <Formik
                enableReinitialize
                validationSchema={yup.object(validationSchema)}
                initialValues={initialValues}
                onSubmit={async (values, actions) => {
                    if (!selectedDay) return;

                    const { name, email, phone, comment, time } = values;
                    const hour = timeOptions.find((t) => t.value === time)
                        ?.label!;
                    const appointment: Omit<
                        IAppointmentAttributes,
                        "createdAt"
                    > = {
                        name,
                        email,
                        phone,
                        comment,
                        appointmentDay: `${formatToISO(
                            mergeTimeWithDate(hour, selectedDay)
                        )}`,
                    };

                    const response = await AppointmentService().create(
                        appointment,
                        tenant.id
                    );

                    if (response?.id) {
                        actions.resetForm();
                        setAppointment(response);
                    }

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
                            disabled={isSubmitting || !selectedDay}
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

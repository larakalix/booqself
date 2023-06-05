"use client";

import { Children } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { intlFormat } from "date-fns";
import { useRegisterForm } from "../register/hooks/useRegisterForm";
import { FormField } from "@/kit/form/FormField";
import { formatToISO, mergeTimeWithDate } from "@/utils/time";
import { AppointmentService } from "@/services/appointment/AppointmentServices";
import { useSuccesBookingStore } from "@/stores/bookingStore";
import type { IFormField, IFormSelections } from "@/types/forms/form";
import type { ITenantAttributes } from "@/types/models/tenant";
import type { IFormAppointment } from "@/types/models/appointment";

type Props = {
    selectedDay: Date | null;
    timeOptions: IFormSelections[];
    formFields: IFormField[];
    tenant: ITenantAttributes;
    loading: boolean;
};

export const AppointmentForm = ({
    tenant,
    selectedDay,
    timeOptions,
    formFields,
    loading,
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

                    const {
                        name,
                        email,
                        phone,
                        comment,
                        employee,
                        service,
                        time,
                    } = values;
                    const hour = timeOptions.find((t) => t.value === time)
                        ?.label!;
                    // const appointmentDay = `${formatToISO(
                    //     mergeTimeWithDate(hour, selectedDay, "America/New_York")
                    // )}`;
                    // const appointmentDay = mergeTimeWithDate(hour, selectedDay, "America/New_York");
                    const appointmentDay = mergeTimeWithDate(
                        hour,
                        selectedDay,
                        "America/New_York"
                    );
                    const appointment: IFormAppointment = {
                        name,
                        email,
                        phone,
                        comment,
                        employee,
                        service,
                        appointmentDay,
                    };

                    const response = await AppointmentService().create(
                        appointment,
                        tenant.id
                    );

                    if (response?.id) {
                        actions.resetForm();
                        setAppointment({
                            ...response,
                            employee,
                            service,
                        });
                    }

                    actions.setSubmitting(false);
                }}
            >
                {({ values, errors, isSubmitting }) => (
                    <Form className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4">
                        {Children.toArray(
                            formFields.map((field) => (
                                <FormField formField={field} />
                            ))
                        )}

                        <button
                            disabled={isSubmitting || !selectedDay || loading}
                            className="col-span-1 lg:col-span-2 bg-blue-400 text-white rounded-md py-4 px-8"
                            type="submit"
                        >
                            Book now
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

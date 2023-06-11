"use client";

import { Children } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { useRegisterForm } from "../register/hooks/useRegisterForm";
import { FormField } from "@/kit/form/FormField";
import { mergeTimeWithDate } from "@/utils/time";
import { AppointmentService } from "@/services/appointment/AppointmentServices";
import { useSuccesBookingStore } from "@/stores/bookingStore";
import { findAndReturn } from "@/utils/utils";
import type {
    IAppointmentEmployee,
    IAppointmentService,
    IFormAppointment,
} from "@/types/models/appointment";
import type { IEmployee } from "@/types/models/employee";
import type { IService } from "@/types/models/service";
import type { AppointmentFormProps } from "@/types/forms/appointment.form";

export const AppointmentForm = ({
    boilerplate,
    selectedDay,
    timeOptions,
    formFields,
    loading,
}: AppointmentFormProps) => {
    const { initialValues, validationSchema, buildAppointment } =
        useRegisterForm({ formFields });
    const { setAppointment } = useSuccesBookingStore((state) => state);

    return (
        <div className="flex flex-col w-full px-4 md:px-14 xl:max-w-4xl">
            <Formik
                enableReinitialize
                validationSchema={yup.object(validationSchema)}
                initialValues={
                    !boilerplate?.appointment
                        ? initialValues
                        : {
                              time: null,
                              ...boilerplate?.appointment.attributes,
                              employee:
                                  boilerplate?.appointment.attributes.employee
                                      .cloverId,
                              service:
                                  boilerplate?.appointment.attributes.service
                                      .cloverId,
                          }
                }
                onSubmit={async (values, actions) => {
                    if (!selectedDay) return;

                    const appointment = buildAppointment(
                        selectedDay!,
                        timeOptions,
                        values,
                        boilerplate
                    );

                    const response = boilerplate?.appointment
                        ? await AppointmentService().update(
                              boilerplate?.appointment.id,
                              appointment,
                              boilerplate.tenant.data.id
                          )
                        : await AppointmentService().create(
                              appointment,
                              boilerplate.tenant.data.id
                          );

                    if (response?.id) {
                        actions.resetForm();
                        setAppointment({ ...response });
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
                            {boilerplate?.appointment
                                ? "Reschedule"
                                : "Book now"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

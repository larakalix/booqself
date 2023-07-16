"use client";

import { Children } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { useToasts } from "react-toast-notifications";
import { useRegisterForm } from "../../../register/hooks/useRegisterForm";
import { FormField } from "@/kit/form/FormField";
import { AppointmentService } from "@/services/appointment/AppointmentServices";
import { useSuccesBookingStore } from "@/stores/bookingStore";
import type { AppointmentFormProps } from "@/types/forms/appointment.form";

export const AppointmentForm = ({
    boilerplate,
    selectedDay,
    timeOptions,
    formFields,
    loading,
}: AppointmentFormProps) => {
    const { addToast } = useToasts();
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
                              boilerplate.tenant.data.id,
                              boilerplate.tenant.data.cloverMerchantId ?? ""
                          );

                    if (response?.id) {
                        actions.resetForm();
                        setAppointment({ ...response });
                        addToast("Appointment booked successfully", {
                            appearance: "success",
                            autoDismiss: true,
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
                            className="relative col-span-1 lg:col-span-2 bg-blue-400 text-white rounded-md py-4 px-8 hover:ring-2 hover:ring-blue-200 hover:bg-blue-500"
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

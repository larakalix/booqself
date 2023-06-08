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
import type { IFormField, IFormSelections } from "@/types/forms/form";
import type { ITenantBooking } from "@/types/models/tenant";
import type {
    IAppointmentEmployee,
    IAppointmentService,
    IFormAppointment,
} from "@/types/models/appointment";
import type { IEmployee } from "@/types/models/employee";
import type { IService } from "@/types/models/service";

type Props = {
    selectedDay: Date | null;
    timeOptions: IFormSelections[];
    formFields: IFormField[];
    boilerplate: ITenantBooking;
    loading: boolean;
};

export const AppointmentForm = ({
    boilerplate,
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
                        employee: cloverEmployeeId,
                        service: cloverServiceId,
                        time,
                    } = values;
                    const hour = timeOptions.find((t) => t.value === time)
                        ?.label!;

                    const appointmentDay = mergeTimeWithDate(
                        hour,
                        selectedDay,
                        boilerplate.tenant.data.timeZone ?? "America/New_York"
                    );
                    const appointment: IFormAppointment = {
                        name,
                        email,
                        phone,
                        comment,
                        cloverEmployeeId,
                        cloverServiceId,
                        appointmentDay,
                        employee: findAndReturn<
                            IEmployee,
                            IAppointmentEmployee
                        >(
                            boilerplate.employees.elements,
                            (obj) => obj.id === cloverEmployeeId,
                            ({ id, name, pin, email }) => ({
                                name,
                                pin,
                                email,
                                cloverId: `${id}`,
                            })
                        )!,
                        service: findAndReturn<IService, IAppointmentService>(
                            boilerplate.services.elements,
                            (obj) => obj.id === cloverServiceId,
                            ({ id, name, price }) => ({
                                name,
                                price: `${price}`,
                                cloverId: `${id}`,
                            })
                        )!,
                    };

                    const response = await AppointmentService().create(
                        appointment,
                        boilerplate.tenant.data.id
                    );

                    if (response?.id) {
                        actions.resetForm();
                        setAppointment({
                            ...response,
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

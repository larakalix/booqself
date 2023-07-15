"use client";

import { useWizardStore } from "@/stores/appointmentWizardStore";
import { Availability, Confirmation, Info, Service } from "./steps";
import { Stepper } from "./childs/Stepper";
import { AppointmentProvider } from "../WizardProvider";
import type {
    AppointmentFormProps,
    ScheduleData,
    WizardStep,
} from "@/types/forms/appointment.form";

export const AppointmentWizard = ({
    boilerplate,
    selectedDay,
    timeOptions,
    formFields,
    employees,
    services,
}: AppointmentFormProps & ScheduleData) => {
    const { step, ...props } = useWizardStore((state) => state);

    const steps: WizardStep[] = [
        {
            label: "Your Information",
            content: <Info />,
        },
        {
            label: "Availability",
            content: <Availability />,
        },
        {
            label: "Service and Technician",
            content: <Service />,
        },
        {
            label: "Confirmation",
            content: <Confirmation />,
        },
    ];

    return (
        <AppointmentProvider
            boilerplate={boilerplate}
            selectedDay={selectedDay}
            timeOptions={timeOptions}
            formFields={formFields}
            employees={employees}
            services={services}
            loading={false}
            steps={steps}
        >
            <span>{JSON.stringify(props, null, 10)}</span>
            <Stepper steps={steps}>
                <section className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 max-w-full">
                    {steps[step].content ?? null}
                </section>
            </Stepper>
        </AppointmentProvider>
    );
};

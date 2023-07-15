import { Children } from "react";
import clsx from "clsx";
import type { WizardStep } from "@/types/forms/appointment.form";
import { useWizardStore } from "@/stores/appointmentWizardStore";
import { DoneIcon } from "./DoneIcon";
import { StepHeader } from "./StepHeader";
import { StepIcon } from "./StepIcon";

type Props = {
    steps: WizardStep[];
    children: React.ReactNode;
};

export const Stepper = ({ steps, children }: Props) => {
    const { step } = useWizardStore((state) => state);

    return (
        <div className="flex flex-col gap-4 w-full xl:max-w-4xl">
            <header className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 max-w-full">
                <ol className="grid grid-cols-2 xl:flex items-center justify-center xl:justify-between xl:flex-wrap gap-4 w-full">
                    {Children.toArray(
                        steps.map(({ label }, index) => (
                            <li
                                className={`flex items-center space-x-2.5
                                ${clsx({
                                    ["text-blue-600 dark:text-blue-500"]:
                                        step === index,
                                    ["text-gray-500 dark:text-gray-300"]:
                                        step !== index,
                                })}
                            `}
                            >
                                {step > index ? (
                                    <DoneIcon />
                                ) : (
                                    <StepIcon step={step} index={index} />
                                )}

                                <StepHeader label={label} index={index} />
                            </li>
                        ))
                    )}
                </ol>
            </header>

            {children}
        </div>
    );
};

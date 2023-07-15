import { Children, MouseEvent, useContext } from "react";
import { useToasts } from "react-toast-notifications";
import { useWizardStore } from "@/stores/appointmentWizardStore";
import { type WizarContextProps, WizardContext } from "../../WizardProvider";
import { StepperActions } from "../childs/StepperActions";

export const Availability = () => {
    const { addToast } = useToasts();
    const { selectedDay, steps, timeOptions } = useContext(
        WizardContext
    ) as WizarContextProps;
    const { step, time, setTime, setStep } = useWizardStore((state) => state);

    const handleInputChange = (event: MouseEvent<HTMLInputElement>) => {
        const { value } = event.target as HTMLInputElement;
        setTime(value);
    };

    const handleClick = () => {
        if (!time || !selectedDay) {
            addToast("Please select a time to continue.", { appearance: "warning", autoDismiss: true });
            return;
        }
        setStep(step + 1);
    };

    return (
        <div className="flex flex-col w-full">
            <h5 className="text-start uppercase text-base font-bold mb-4 text-gray-900 dark:text-gray-100">
                {steps[step].label}
            </h5>
            <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-2 w-full">
                {Children.toArray(
                    timeOptions.map(({ label, value }, index) => (
                        <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                            <input
                                id={`time-radio-${index}`}
                                type="radio"
                                value={value}
                                name="time-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                onClick={handleInputChange}
                            />
                            <label
                                htmlFor={`time-radio-${index}`}
                                className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                {label}
                            </label>
                        </div>
                    ))
                )}
            </div>
            <StepperActions
                className="w-full"
                step={step}
                handleBack={() => setStep(step - 1)}
            >
                <button
                    type="button"
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    // disabled={isSubmitting || !selectedDay}
                    onClick={() => handleClick()}
                >
                    Next
                </button>
            </StepperActions>
        </div>
    );
};

import { Children, MouseEvent, useContext } from "react";
import { useToasts } from "react-toast-notifications";
import { type WizarContextProps, WizardContext } from "../../WizardProvider";
import { StepperActions } from "../childs/StepperActions";
import { SectionBox } from "@/components/generic/SectionBox";
import { useWizardStore } from "@/stores/appointmentWizardStore";

export const Service = () => {
    const { addToast } = useToasts();
    const { boilerplate, employees, services } = useContext(WizardContext) as WizarContextProps;
    const { step, service, employee, setStep, setService, setEmployee } = useWizardStore((state) => state);

    const disableOptions = !!boilerplate.appointment;

    const handleServiceChange = (event: MouseEvent<HTMLInputElement>) => {
        const { value } = event.target as HTMLInputElement;
        setService(value);
    };

    const handleEmployeeChange = (event: MouseEvent<HTMLInputElement>) => {
        const { value } = event.target as HTMLInputElement;
        setEmployee(value);
    };

    const handleClick = () => {
        if (!service || !employee) {
            addToast("Please select an employee and a service to continue.", {
                appearance: "warning",
                autoDismiss: true,
            });
            return;
        }
        setStep(step + 1);
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            <SectionBox title={`Choose a ${services.label}`}>
                {Children.toArray(
                    services.options.map(({ label, value }, index) => (
                        <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                            <input
                                id={`service-radio-${index}`}
                                type="radio"
                                value={value}
                                checked={service === value}
                                name="service-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={disableOptions}
                                onClick={handleServiceChange}
                            />
                            <label
                                htmlFor={`service-radio-${index}`}
                                className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                {label}
                            </label>
                        </div>
                    ))
                )}
            </SectionBox>
            <SectionBox title={`Choose a ${employees.label}`}>
                {Children.toArray(
                    employees.options.map(({ label, value }, index) => (
                        <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                            <input
                                id={`employee-radio-${index}`}
                                type="radio"
                                value={value}
                                checked={employee === value}
                                name="employee-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={disableOptions}
                                onClick={handleEmployeeChange}
                            />
                            <label
                                htmlFor={`employee-radio-${index}`}
                                className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                {label}
                            </label>
                        </div>
                    ))
                )}
            </SectionBox>
            <StepperActions
                className="w-full"
                step={step}
                handleBack={() => setStep(step - 1)}
            >
                <button
                    type="button"
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={() => handleClick()}
                >
                    Next
                </button>
            </StepperActions>
        </div>
    );
};

import { ReactNode, createContext } from "react";
import type {
    AppointmentFormProps,
    ScheduleData,
    WizardStep,
} from "@/types/forms/appointment.form";

export type WizarContextProps = AppointmentFormProps & ScheduleData & { steps: WizardStep[] };

export const WizardContext = createContext<WizarContextProps | undefined>(undefined);

export const AppointmentProvider = ({
    children,
    ...props
}: WizarContextProps & { children: ReactNode }) => {
    return (
        <WizardContext.Provider value={props}>
            {children}
        </WizardContext.Provider>
    );
};

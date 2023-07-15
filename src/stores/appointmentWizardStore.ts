import { create } from "zustand";
import type {
    IFormAppointment,
    IWizardAppointment,
} from "@/types/models/appointment";

type WizardProps = {
    step: number;
    info: IWizardAppointment | null;
    time: string | null;
    service: string | null;
    employee: string | null;
    setStep: (step: number) => void;
    setInfo: (info: IWizardAppointment) => void;
    setTime: (time: string) => void;
    setService: (service: string) => void;
    setEmployee: (employee: string) => void;
};

export const useWizardStore = create<WizardProps>((set, get) => ({
    step: 0,
    info: null,
    time: null,
    service: null,
    employee: null,
    setStep: (step) => set({ step }),
    setInfo: (info) => set({ info, step: 1 }),
    setTime: (time) => set({ time }),
    setService: (service) => set({ service }),
    setEmployee: (employee) => set({ employee }),
}));

import { create } from "zustand";
import type { IClientAttributes } from "@/types/models/clients";

type Props = {
    assignee: IClientAttributes | null;
    step: number;
    assign: (assignee: IClientAttributes) => void;
    remove: (step?: number) => void;
    changeStep: (step: number) => void;
};

export const useRegisterStore = create<Props>((set, get) => ({
    step: 0,
    assignee: null,
    assign: (assignee) => set({ assignee, step: 1 }),
    remove: (step?: number) => set({ assignee: null, step: step ?? 0 }),
    changeStep: (step) => set({ step }),
}));

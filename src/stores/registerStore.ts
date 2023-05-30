import { create } from "zustand";
import type { ClientAttributes } from "@/types/strapi/clients";

type Props = {
    assignee: ClientAttributes | null;
    step: number;
    assign: (assignee: ClientAttributes) => void;
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

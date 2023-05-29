import { create } from "zustand";
import type { IAssignee } from "@/types/asignee";

type Props = {
    assignee: IAssignee | null;
    step: number;
    assign: ({ name, lastName, email }: IAssignee) => void;
    remove: (step?: number) => void;
    changeStep: (step: number) => void;
};

export const registerStore = create<Props>((set, get) => ({
    step: 0,
    assignee: null,
    assign: ({ name, lastName, email }) =>
        set({ assignee: { name, lastName, email }, step: 1 }),
    remove: (step?: number) => set({ assignee: null, step: step ?? 0 }),
    changeStep: (step) => set({ step }),
}));

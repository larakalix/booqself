import { create } from "zustand";
import type { IAssignee } from "@/types/asignee";

type Props = {
    assignee: IAssignee | null;
    step: number;
    assign: ({ name, lastName, email }: IAssignee) => void;
    remove: () => void;
    changeStep: (step: number) => void;
};

export const registerStore = create<Props>((set, get) => ({
    step: 1,
    assignee: {
        name: "Ivan",
        lastName: "Lara",
        email: "uki@live.co.uk",
    },
    assign: ({ name, lastName, email }) =>
        set({ assignee: { name, lastName, email }, step: 1 }),
    remove: () => set({ assignee: null, step: 0 }),
    changeStep: (step) => set({ step }),
}));

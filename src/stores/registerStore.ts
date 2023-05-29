import { create } from "zustand";

type Props = {
    assignee: {
        name: string;
        lastName: string;
    } | null;
    step: number;
    assign: (name: string, lastName: string) => void;
    remove: () => void;
    changeStep: (step: number) => void;
};

export const registerStore = create<Props>((set, get) => ({
    step: 1,
    assignee: {
        name: "Jose",
        lastName: "Perez",
    },
    assign: (name, lastName) => set({ assignee: { name, lastName }, step: 1 }),
    remove: () => set({ assignee: null, step: 0 }),
    changeStep: (step) => set({ step }),
}));

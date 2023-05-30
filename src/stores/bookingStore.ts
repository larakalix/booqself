import { startOfToday } from "date-fns";
import { create } from "zustand";

type Props = {
    selectedDay: Date | null;
    selectDay: (day: Date) => void;
};

export const useBookingStore = create<Props>((set, get) => ({
    selectedDay: startOfToday(),
    selectDay: (selectedDay) => set({ selectedDay }),
}));

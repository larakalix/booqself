import { create } from "zustand";
import { parse, format, startOfToday } from "date-fns";

type Props = {
    selectedDay: Date;
    currentMonth: string;
    selectDay: (day: Date) => void;
    setCurrentMonth: (month: string) => void;
};

const today = startOfToday();

export const useBookingStore = create<Props>((set, get) => ({
    selectedDay: today,
    currentMonth: format(today, "MMM-yyyy"),
    selectDay: (selectedDay) => set({ selectedDay }),
    setCurrentMonth: (currentMonth) => set({ currentMonth }),
}));

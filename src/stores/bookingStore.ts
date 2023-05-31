import { create } from "zustand";
import { format, startOfToday } from "date-fns";
import type { IEntity } from "@/types/strapi/generic";
import type { AppointmentAttributes } from "@/types/strapi/appointments";

type BookingStoreProps = {
    selectedDay: Date | null;
    currentMonth: string;
    selectDay: (day: Date) => void;
    setCurrentMonth: (month: string) => void;
};

type SuccessBookingStoreProps = {
    appointment: IEntity<AppointmentAttributes> | null;
    setAppointment: (appointment: IEntity<AppointmentAttributes>) => void;
};

const today = startOfToday();

export const useBookingStore = create<BookingStoreProps>((set, get) => ({
    selectedDay: null,
    currentMonth: format(today, "MMM-yyyy"),
    selectDay: (selectedDay) => set({ selectedDay }),
    setCurrentMonth: (currentMonth) => set({ currentMonth }),
}));

export const useSuccesBookingStore = create<SuccessBookingStoreProps>(
    (set, get) => ({
        appointment: null,
        setAppointment: (appointment) => set({ appointment }),
    })
);

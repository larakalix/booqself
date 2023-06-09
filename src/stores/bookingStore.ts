import { create } from "zustand";
import { format, startOfToday } from "date-fns";
import type {
    IFlatAppointment,
    IFormAppointment,
} from "@/types/models/appointment";
import { CalendarStyle } from "@/types/forms/calendar";

type GenericStoreProps = {
    loading: boolean;
    selectedDay: Date | null;
    currentMonth: string;
    setLoading: (loading: boolean) => void;
    selectDay: (day: Date) => void;
    setCurrentMonth: (month: string) => void;
};

type CalendarStoreProps = GenericStoreProps & {
    style: CalendarStyle;
    switchStyle: () => void;
};

type BookingStoreProps = GenericStoreProps & {
    appointments: IFlatAppointment[];
    setFlatAppointments: (appointments: IFlatAppointment[]) => void;
};

type SuccessBookingStoreProps = {
    appointment: IFormAppointment | null;
    setAppointment: (appointment: IFormAppointment) => void;
};

const today = startOfToday();

export const useBookingStore = create<BookingStoreProps>((set, get) => ({
    loading: false,
    selectedDay: null,
    currentMonth: format(today, "MMM-yyyy"),
    appointments: [],
    setLoading: (loading) => set({ loading }),
    selectDay: (selectedDay) => set({ selectedDay }),
    setCurrentMonth: (currentMonth) => set({ currentMonth }),
    setFlatAppointments: (appointments) =>
        set({ appointments, loading: false }),
}));

export const useSuccesBookingStore = create<SuccessBookingStoreProps>(
    (set, get) => ({
        appointment: null,
        setAppointment: (appointment) => set({ appointment }),
    })
);

export const useCalendarStore = create<CalendarStoreProps>((set, get) => ({
    style: CalendarStyle.Grid,
    loading: false,
    selectedDay: null,
    currentMonth: format(today, "MMM-yyyy"),
    appointments: [],
    setLoading: (loading) => set({ loading }),
    selectDay: (selectedDay) => set({ selectedDay }),
    setCurrentMonth: (currentMonth) => set({ currentMonth }),
    switchStyle: () =>
        set({
            style:
                get().style === CalendarStyle.Grid
                    ? CalendarStyle.List
                    : CalendarStyle.Grid,
        }),
}));

import { create } from "zustand";
import type { IAppointment } from "@/types/models/appointment";
import type { IClient } from "@/types/models/clients";

type AppointmentsFilterStoreProps = {
    appointments: IAppointment[];
    loading: boolean;
    setAppointments: (appointments: IAppointment[]) => void;
    setLoading: (loading: boolean) => void;
};

type ClientsFilterStoreProps = {
    clients: IClient[];
    loading: boolean;
    setClients: (clients: IClient[]) => void;
    setLoading: (loading: boolean) => void;
};

export const useAppoinmentsFilterStore = create<AppointmentsFilterStoreProps>(
    (set, get) => ({
        loading: false,
        appointments: [],
        setAppointments: (appointments) => set({ appointments }),
        setLoading: (loading) => set({ loading }),
    })
);

export const useClientsFilterStore = create<ClientsFilterStoreProps>(
    (set, get) => ({
        loading: false,
        clients: [],
        setClients: (clients) => set({ clients }),
        setLoading: (loading) => set({ loading }),
    })
);

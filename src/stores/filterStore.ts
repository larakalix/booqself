import { create } from "zustand";
import type {
    AppointmentsFilterStoreProps,
    ClientsFilterStoreProps,
    EmployeesFilterStoreProps,
    MembershipsFilterStoreProps,
    OrdersFilterStoreProps,
    ServicesFilterStoreProps,
} from "@/types/stores/stores";

export const useAppoinmentsFilterStore = create<AppointmentsFilterStoreProps>(
    (set, get) => ({
        loading: false,
        appointments: null,
        setAppointments: (appointments) => set({ appointments, loading: false }),
        setLoading: (loading) => set({ loading }),
        getByDay: async (day) => {
            const rows = get().appointments;
            if (!rows) return [];

            return rows?.data.filter(
                (appointment) => appointment.appointmentDay === day
            );
        },
    })
);

export const useClientsFilterStore = create<ClientsFilterStoreProps>(
    (set, get) => ({
        loading: false,
        clients: [],
        setClients: (clients) => set({ clients, loading: false }),
        setLoading: (loading) => set({ loading }),
    })
);

export const useEmployeesFilterStore = create<EmployeesFilterStoreProps>(
    (set, get) => ({
        loading: false,
        employees: [],
        setEmployees: (employees) => set({ employees, loading: false }),
        setLoading: (loading) => set({ loading }),
    })
);

export const useServicesFilterStore = create<ServicesFilterStoreProps>(
    (set, get) => ({
        loading: false,
        services: [],
        setServices: (services) => set({ services, loading: false }),
        setLoading: (loading) => set({ loading }),
    })
);

export const useOrdersFilterStore = create<OrdersFilterStoreProps>(
    (set, get) => ({
        loading: false,
        orders: [],
        setOrders: (orders) => set({ orders, loading: false }),
        setLoading: (loading) => set({ loading }),
    })
);

export const useMembershipsFilterStore = create<MembershipsFilterStoreProps>(
    (set, get) => ({
        loading: false,
        memberships: null,
        setMemberships: (memberships) => set({ memberships, loading: false }),
        setLoading: (loading) => set({ loading }),
    })
);

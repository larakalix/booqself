import type { IAppointmentFiltered } from "../models/appointment";
import type { IClient } from "../models/client";
import type { IEmployee } from "../models/employee";
import type { IPagination } from "../models/generic";
import type { IMembershipFiltered } from "../models/membership";
import type { IOrder } from "../models/order";
import type { IService } from "../models/service";

type IGenericStore = {
    loading: boolean;
    setLoading: (loading: boolean) => void;
};

export type AppointmentsFilterStoreProps = IGenericStore & {
    appointments: IAppointmentFiltered | null;
    setAppointments: (appointments: IAppointmentFiltered) => void;
    getByDay: (day: string) => void;
};

export type ClientsFilterStoreProps = IGenericStore & {
    clients: IClient[];
    setClients: (clients: IClient[]) => void;
};

export type EmployeesFilterStoreProps = IGenericStore & {
    employees: IEmployee[];
    setEmployees: (employees: IEmployee[]) => void;
};

export type ServicesFilterStoreProps = IGenericStore & {
    services: IService[];
    setServices: (services: IService[]) => void;
};

export type OrdersFilterStoreProps = IGenericStore & {
    orders: IOrder[];
    setOrders: (orders: IOrder[]) => void;
};

export type MembershipsFilterStoreProps = IGenericStore & {
    memberships: IMembershipFiltered | null;
    setMemberships: (memberships: IMembershipFiltered) => void;
};

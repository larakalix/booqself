import type { IAppointmentFiltered } from "../models/appointment";
import type { IClientFiltered } from "../models/client";
import type { IEmployeeFiltered } from "../models/employee";
import type { IServiceFiltered } from "../models/service";

type IGenericStore = {
    loading: boolean;
    setLoading: (loading: boolean) => void;
};

export type AppointmentsFilterStoreProps = IGenericStore & {
    appointments: IAppointmentFiltered | null;
    setAppointments: (appointments: IAppointmentFiltered) => void;
};

export type ClientsFilterStoreProps = IGenericStore & {
    clients: IClientFiltered | null;
    setClients: (clients: IClientFiltered) => void;
};

export type EmployeesFilterStoreProps = IGenericStore & {
    employees: IEmployeeFiltered | null;
    setEmployees: (employees: IEmployeeFiltered) => void;
};

export type ServicesFilterStoreProps = IGenericStore & {
    services: IServiceFiltered | null;
    setServices: (services: IServiceFiltered) => void;
};

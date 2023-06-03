import type {
    ICreatedAt,
    IData,
    IIdentifier,
    IIsActive,
    IMeta,
} from "./generic";
import type { IAppointment } from "./appointment";
import type { IClient } from "./client";
import type { IService } from "./service";
import type { IEmployee } from "./employee";

export type ITenant = {
    data: IData<ITenantAttributes>;
    error: any;
};

export type ITenantAttributes = IIsActive &
    IIdentifier &
    ICreatedAt & {
        name: string;
        email: string;
        tenantId: string;
    };

export type ITenantBoilerplate = ITenantAttributes & {
    clients: ITenantClientBoilerplate;
    appointments: ITenantAppointmentBoilerplate;
};

export type ITenantBooking = ITenantAttributes & {
    employees: IEmployee[];
    services: IService[];
};

export type ITenantClientBoilerplate = ITenantBoilerplateChunk<IClient>;

export type ITenantAppointmentBoilerplate =
    ITenantBoilerplateChunk<IAppointment>;

export type ITenantBoilerplateChunk<T> = {
    data: T[];
    meta: IMeta;
};

import type { ICreatedAt, IData, IIdentifier, IMeta } from "./generic";
import type { IAppointment } from "./appointment";
import type { IClient } from "./clients";

export type ITenant = {
    data: IData<ITenantAttributes>;
    error: any;
};

export type ITenantAttributes = IIdentifier &
    ICreatedAt & {
        name: string;
        email: string;
        tenantId: string;
    };

export type ITenantBoilerplate = ITenantAttributes & {
    clients: ITenantClientBoilerplate;
    appointments: ITenantAppointmentBoilerplate;
};

export type ITenantClientBoilerplate = ITenantBoilerplateChunk<IClient>;

export type ITenantAppointmentBoilerplate = ITenantBoilerplateChunk<IAppointment>;

export type ITenantBoilerplateChunk<T> = {
    data: T[];
    meta: IMeta;
};

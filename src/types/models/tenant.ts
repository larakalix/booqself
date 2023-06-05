import type {
    ICreatedAt,
    IData,
    IIdentifier,
    IIsActive,
    IMeta,
    IOptionable,
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
        cloverMerchantId?: string;
        openingTime: Date;
        closingTime: Date;
        minutesInterval: number;
    };

export type ITenantBoilerplate = ITenantAttributes & {
    clients: ITenantBoilerplateChunk<IClient>;
    appointments: ITenantBoilerplateChunk<IAppointment>;
    employees: ITenantBoilerplateChunk<IEmployee>;
};

export type ITenantBooking = ITenantAttributes & {
    employees: IEmployee[];
    services: IService[];
    appointments: IIdentifier & { appointmentDay: string }[];
    timeOptions: IOptionable[];
};

export type ITenantClientBoilerplate = ITenantBoilerplateChunk<IClient>;

export type ITenantBoilerplateChunk<T> = {
    data: T[];
    meta: IMeta;
};

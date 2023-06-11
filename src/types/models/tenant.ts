import type {
    ICreatedAt,
    IData,
    IElement,
    IEntity,
    IIdentifier,
    IIsActive,
    IMeta,
    IOptionable,
} from "./generic";
import type { IAppointment, IFormAppointment } from "./appointment";
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
        timeZone: string;
        timeOptions: IOptionable[];
    };

export type ITenantBoilerplate = ITenantAttributes & {
    clients: ITenantBoilerplateChunk<IClient>;
    appointments: ITenantBoilerplateChunk<IAppointment>;
    employees: ITenantBoilerplateChunk<IEmployee>;
};

export type ITenantBooking = {
    tenant: { data: ITenantAttributes };
    employees: IElement<IEmployee>;
    services: IElement<IService>;
    appointments: IIdentifier & { appointmentDay: string }[];
    appointment: IEntity<IFormAppointment> | null;
};

export type ITenantClientBoilerplate = ITenantBoilerplateChunk<IClient>;

export type ITenantBoilerplateChunk<T> = {
    data: T[];
    meta: IMeta;
};

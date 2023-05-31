import { ICreatedAt, IData, IIdentifier } from "./generic";

export type Tenant = {
    data: IData<TenantAttributes>;
    error: any;
};

export type TenantAttributes = IIdentifier &
    ICreatedAt & {
        name: string;
        email: string;
        tenantId: string;
    };

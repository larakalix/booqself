import { ICreatedAt, IIdentifier, IMeta } from "./generic";

export type IMembershipAttributes = ICreatedAt & {
    name: string;
    price: string;
    tier: string;
    services: IMembershipService[];
};

export type IMembership = IIdentifier & IMembershipAttributes & ICreatedAt & {};

export type IMembershipFiltered = {
    data: IMembership[];
    meta: IMeta;
};

export type IMembershipService = IIdentifier & {
    name: string;
    price: string;
    cloverId: string;
    redeemed: boolean;
};

export type IFormMembership = Partial<IIdentifier> &
    Omit<IMembershipAttributes, "createdAt"> & {};

import { ICreatedAt, IIdentifier, IMeta } from "./generic";

export type IMembershipAttributes = {
    name: string;
    price: string;
    tier: string;
    services: IMembershipService[];
};

export type IMembershipService = IIdentifier & {
    name: string;
    price: string;
    redeemed: boolean;
};

export interface IMembership
    extends IIdentifier,
        IMembershipAttributes,
        ICreatedAt {}

export type IMembershipFiltered = {
    data: IMembership[];
    meta: IMeta;
};

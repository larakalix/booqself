import type { ICreatedAt, IMeta } from "./generic";

export type IServiceAttributes = {
    hidden: boolean;
    available: boolean;
    autoManage: boolean;
    name: string;
    price: number;
    parsedPrice: string;
    priceType: string;
    defaultTaxRates: boolean;
    cost: number;
    isRevenue: boolean;
    modifiedTime: number;
};

export enum InventoryPriceType {
    FIXED = "FIXED",
    VARIABLE = "VARIABLE",
}

export interface IService extends IServiceAttributes, ICreatedAt {
    id: number;
}

export interface IServiceFiltered {
    data: IService[];
    meta: IMeta;
}

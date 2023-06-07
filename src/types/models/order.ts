import type { ICreatedAt, IMeta } from "./generic";

export type IOrderAttributes = {
    currency: string;
    total: number;
    parsedTotal: string;
    paymentState: string;
    title: string;
    taxRemoved: boolean;
    isVat: boolean;
    state: string;
    manualTransaction: boolean;
    groupLineItems: boolean;
    testMode: boolean;
    payType: string;
    createdTime: number;
    clientCreatedTime: number;
    modifiedTime: number;
    itemList: LineItem[];
};

export interface LineItem {
    name: string;
    price: number;
    parsedPrice: string;
    printed: boolean;
    createdTime: number;
    orderClientCreatedTime: number;
    exchanged: boolean;
    refunded: boolean;
    isRevenue: boolean;
}

export interface IOrder extends IOrderAttributes, ICreatedAt {
    id: number;
}

export type IOrderFiltered = {
    data: IOrder[];
    meta: IMeta;
};

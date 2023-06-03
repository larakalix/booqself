import type { ICreatedAt, IMeta } from "./generic";

export type IServiceAttributes = {
    name: string;
    description: string;
    duration: string;
    price: string;
    isActive: boolean;
};

export interface IService extends IServiceAttributes, ICreatedAt {
    id: number;
}

export interface IServiceFiltered {
    data: IService[];
    meta: IMeta;
}

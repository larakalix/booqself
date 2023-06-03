import type { ICreatedAt, IMeta } from "./generic";

export type IEmployeeAttributes = {
    name: string;
    nickname: string;
    email: string;
    pin: string;
};

export interface IEmployee extends IEmployeeAttributes, ICreatedAt {
    id: number;
}

export type IEmployeeFiltered = {
    data: IEmployee[];
    meta: IMeta;
};

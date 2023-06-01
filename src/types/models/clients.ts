import type { ICreatedAt, IMeta } from "./generic";

export type IClientAttributes = {
    name: string;
    lastName: string;
    email: string;
    phone: string;
};

export interface IClient extends IClientAttributes, ICreatedAt {
    id: number;
}

export type IClientFiltered = {
    data: IClient[];
    meta: IMeta;
};

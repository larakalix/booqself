import { IEntity, IData, IMeta } from "./generic";

export type Client = {
    data: IData<IEntity<ClientAttributes>[]>;
    meta: IMeta;
};

export type ClientAttributes = {
    name: string;
    lastName: string;
    email: string;
    phone: string;
};

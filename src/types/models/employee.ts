import type { ICreatedAt } from "./generic";

export type IEmployeeAttributes = {
    name: string;
    nickname: string;
    email: string;
    pin: string;
};

export interface IEmployee extends IEmployeeAttributes, ICreatedAt {
    id: number;
}

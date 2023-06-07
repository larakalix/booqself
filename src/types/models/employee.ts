import type { ICreatedAt, IMeta } from "./generic";

export type IEmployeeAttributes = {
    name: string;
    nickname: string;
    email: string;
    pin: string;
    href: string;
    customId: string;
    inviteSent: boolean;
    role: EmployeeRole;
    isOwner: boolean;
};

export enum EmployeeRole {
    ADMIN = "ADMIN",
    EMPLOYEE = "EMPLOYEE",
    MANAGER = "MANAGER",
}

export interface IEmployee extends IEmployeeAttributes, ICreatedAt {
    id: number;
}

export type IEmployeeFiltered = {
    data: IEmployee[];
    meta: IMeta;
};

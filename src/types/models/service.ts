import type { ICreatedAt } from "./generic";

export type IServiceAttributes = {
    name: string;
    description: string;
    duration: string;
};

export interface IService extends IServiceAttributes, ICreatedAt {
    id: number;
}

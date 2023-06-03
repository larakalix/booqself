import type { ICreatedAt } from "./generic";

export type ICategoryAttributes = {
    name: string;
    description: string;
    categories: ICategory[];
};

export interface ICategory extends ICategoryAttributes, ICreatedAt {
    id: number;
}

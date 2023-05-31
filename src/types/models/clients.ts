import type { ICreatedAt } from "../strapi/generic";
import type { ClientAttributes } from "../strapi/clients";

export interface IClient extends ClientAttributes, ICreatedAt {
    id: number;
}

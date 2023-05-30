import type { ClientAttributes } from "../strapi/clients";

export interface IClient extends ClientAttributes {
    id: number;
}

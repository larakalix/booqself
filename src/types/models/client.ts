import type { ICreatedAt, IElement, IMeta } from "./generic";

export type IClientAttributes = {
    firstName: string;
    lastName: string;
    marketingAllowed: boolean;
    customerSince: number;
    emailAddressesList: EmailAddressesElement[];
    phoneNumbersList: PhoneNumbersElement[];
};

export interface EmailAddressesElement {
    emailAddress: string;
    primaryEmail: boolean;
}

export interface PhoneNumbersElement {
    phoneNumber: string;
}

export interface IClient extends IClientAttributes, ICreatedAt {
    id: number;
}

export type IClientFiltered = {
    data: IClient[];
    meta: IMeta;
};

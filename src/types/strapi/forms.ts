import { IEntity, IData } from "./generic";

export type Form = {
    data: IData<FormEntity>;
};

export type FormEntity = {
    form: IData<IEntity<FormAttributes>>;
};

export type FormAttributes = {
    name: string;
    formFields: IData<IEntity<FormFieldAttributes>[]>;
};

export type FormFieldAttributes = {
    name: string;
    label: string;
    isRequired: boolean;
    formFieldType: IData<IEntity<FormFieldTypeAttributes>>;
};

export type FormFieldTypeAttributes = {
    description: string;
    type: string;
};

export interface IIdentifier {
    id: number;
}

export interface IIsActive {
    isActive: boolean;
}

export interface IEntity<T> extends IIdentifier {
    attributes: T;
}

export interface IData<T> {
    data: T;
}

export interface IMeta {
    pagination: IPagination;
}

export interface IPagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export interface ICreatedAt {
    createdAt: string;
}

export interface IPaginable {
    offset: number;
    limit: number;
}

export interface IOptionable {
    value: string;
    label: string;
}

export interface IElement<T> {
    elements: T[];
    href: string;
}

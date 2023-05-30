export interface IEntity<T> {
    id: number;
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

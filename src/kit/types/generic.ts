export interface IValue<T> {
    id: string;
    value: T;
}

export interface ICommon {
    id: string;
}

export interface IStateChange<T> {
    handleChange(): T | void;
}

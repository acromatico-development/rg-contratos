export interface IAppResponse<T> {
    code: number;
    status: string;
    message: string;
    data: T | null;
}
export interface IContractsResponse<T> {
    code: number;
    status: string;
    message: string;
    data: T | null;
}

import { IUserFirebase, IPagination } from "@interface";

export interface IFirebaseUsersResponse {
    users: IUserFirebase[];
    pagination: IPagination;
}
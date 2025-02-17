import { EUserRole } from "./role.enum";

export interface IUser {
    Id: number;
    Name: string;
    Email: string;
    Password?: string;
    Avatar: string;
    //ContractsId?: IContract[];
    //ClausesId?: IClause[];
    UID: string;
    Role: EUserRole;
    Identifier: string;
    IsActive: boolean;
    CreatedAt: Date;
    UpdatedAt: Date;
}
import { IContract, IClause, EUserRole } from "@interface";

export interface IUser {
    Id: number;
    Name: string;
    Email: string;
    Password?: string;
    Avatar: string;
    ContractsId?: IContract[];
    ClausesId?: IClause[];
    UID: string;
    Role: EUserRole;
    Identifier: string;
    IsActive: boolean;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface IUserDTO {
    UID: string;
    Email: string;
    DisplayName?: string;
    Identifier: string;
    Password: string;
    Role: string;
}
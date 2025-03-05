import { IUser, IContractClause, IUserContract } from "@interface";

export interface IContract {
  Id: number;
  Identifier: string;
  Name: string;
  Description?: string;
  IsActive: boolean;
  CreatedByUserId?: IUser;
  ContractClausesId?: IContractClause[];
  UserContracts: IUserContract;
  CreatedAt: Date;
  UpdatedAt: Date;
}

export interface IContractDTO {
  Identifier?: string;
  Name: string;
  Description?: string;
  IsActive: boolean;
  nc_yz6c___Users_id: string;
}

export interface IContractRelations {
  UserContracts?: {
    fields?: string[];
    limit?: number;
    offset?: number;
  };
  CreatedByUserId?: {
    fields?: string[];
  };
  ContractClausesId?: {
    fields?: string[];
    limit?: number;
    offset?: number;
  };
}

export interface IContractQueryOptions {
  fields?: string[];
  relations?: IContractRelations;
}

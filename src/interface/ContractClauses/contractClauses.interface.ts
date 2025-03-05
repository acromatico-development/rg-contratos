import { IUser, IClause, IContract } from "@interface";

export interface IContractClause {
  Id: number;
  Identifier: string;
  ContractId: IContract;
  Order: number;
  ClauseId: IClause;
  Optional: boolean;
  CreatedByUserId?: IUser;
  CreatedAt: Date;
  UpdatedAt: Date;
}

export interface IContractClauseDTO {
  Identifier: string;
  nc_yz6c__Contracts_id: number;
  nc_yz6c___Clauses_id: number;
  Order: number;
  Optional: boolean;
  CreatedByUserId?: number;
}

export interface IContractClauseRelations {
  ContractId?: {
    fields?: string[];
  };
  ClauseId?: {
    fields?: string[];
  };
}

export interface IContractClauseQueryOptions {
  fields?: string[];
  relations?: IContractClauseRelations;
}